"""
WebRTC Signaling Server for Real-time Collaboration
Handles peer-to-peer connection establishment and media coordination
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import Dict, List
import json
import uuid
import asyncio
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Store active connections and rooms
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.rooms: Dict[str, List[str]] = {}
        self.user_rooms: Dict[str, str] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        logger.info(f"User {user_id} connected")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
        
        # Remove from room
        if user_id in self.user_rooms:
            room_id = self.user_rooms[user_id]
            if room_id in self.rooms:
                self.rooms[room_id].remove(user_id)
                if not self.rooms[room_id]:
                    del self.rooms[room_id]
            del self.user_rooms[user_id]
        
        logger.info(f"User {user_id} disconnected")

    async def send_personal_message(self, message: dict, user_id: str):
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].send_text(json.dumps(message))
            except Exception as e:
                logger.error(f"Error sending message to {user_id}: {e}")

    async def broadcast_to_room(self, message: dict, room_id: str, exclude_user: str = None):
        if room_id in self.rooms:
            for user_id in self.rooms[room_id]:
                if user_id != exclude_user:
                    await self.send_personal_message(message, user_id)

    async def join_room(self, user_id: str, room_id: str):
        # Leave current room if any
        if user_id in self.user_rooms:
            old_room = self.user_rooms[user_id]
            if old_room in self.rooms:
                self.rooms[old_room].remove(user_id)
                if not self.rooms[old_room]:
                    del self.rooms[old_room]
        
        # Join new room
        if room_id not in self.rooms:
            self.rooms[room_id] = []
        
        self.rooms[room_id].append(user_id)
        self.user_rooms[user_id] = room_id
        
        # Notify user of successful join
        await self.send_personal_message({
            "type": "room-joined",
            "roomId": room_id,
            "participants": self.rooms[room_id]
        }, user_id)
        
        # Notify other participants
        await self.broadcast_to_room({
            "type": "user-joined",
            "userId": user_id,
            "participants": self.rooms[room_id]
        }, room_id, exclude_user=user_id)
        
        logger.info(f"User {user_id} joined room {room_id}")

    async def leave_room(self, user_id: str):
        if user_id in self.user_rooms:
            room_id = self.user_rooms[user_id]
            
            # Remove from room
            if room_id in self.rooms:
                self.rooms[room_id].remove(user_id)
                
                # Notify other participants
                await self.broadcast_to_room({
                    "type": "user-left",
                    "userId": user_id,
                    "participants": self.rooms[room_id]
                }, room_id)
                
                # Clean up empty room
                if not self.rooms[room_id]:
                    del self.rooms[room_id]
            
            del self.user_rooms[user_id]
            logger.info(f"User {user_id} left room")

manager = ConnectionManager()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message["type"] == "join-room":
                await manager.join_room(user_id, message["roomId"])
            
            elif message["type"] == "leave-room":
                await manager.leave_room(user_id)
            
            elif message["type"] == "offer":
                # Forward offer to target user
                await manager.send_personal_message({
                    "type": "offer",
                    "from": user_id,
                    "offer": message["offer"]
                }, message["to"])
            
            elif message["type"] == "answer":
                # Forward answer to target user
                await manager.send_personal_message({
                    "type": "answer",
                    "from": user_id,
                    "answer": message["answer"]
                }, message["to"])
            
            elif message["type"] == "ice-candidate":
                # Forward ICE candidate to target user
                await manager.send_personal_message({
                    "type": "ice-candidate",
                    "from": user_id,
                    "candidate": message["candidate"]
                }, message["to"])
            
            elif message["type"] == "message":
                # Broadcast chat message to room
                if user_id in manager.user_rooms:
                    room_id = manager.user_rooms[user_id]
                    await manager.broadcast_to_room({
                        "type": "message",
                        "id": str(uuid.uuid4()),
                        "user": f"User {user_id}",
                        "message": message["message"],
                        "timestamp": datetime.utcnow().isoformat()
                    }, room_id, exclude_user=user_id)
            
            else:
                logger.warning(f"Unknown message type: {message['type']}")
    
    except WebSocketDisconnect:
        manager.disconnect(user_id)
    except Exception as e:
        logger.error(f"WebSocket error for user {user_id}: {e}")
        manager.disconnect(user_id)

@router.get("/rooms")
async def get_rooms():
    """Get list of active rooms"""
    return {
        "rooms": [
            {
                "roomId": room_id,
                "participantCount": len(participants),
                "participants": participants
            }
            for room_id, participants in manager.rooms.items()
        ]
    }

@router.get("/rooms/{room_id}")
async def get_room_info(room_id: str):
    """Get information about a specific room"""
    if room_id in manager.rooms:
        return {
            "roomId": room_id,
            "participantCount": len(manager.rooms[room_id]),
            "participants": manager.rooms[room_id]
        }
    else:
        return {"error": "Room not found"}

@router.post("/rooms/{room_id}/create")
async def create_room(room_id: str):
    """Create a new collaboration room"""
    if room_id not in manager.rooms:
        manager.rooms[room_id] = []
        return {"message": f"Room {room_id} created successfully"}
    else:
        return {"message": f"Room {room_id} already exists"}

@router.delete("/rooms/{room_id}")
async def delete_room(room_id: str):
    """Delete a collaboration room"""
    if room_id in manager.rooms:
        # Notify all participants
        for user_id in manager.rooms[room_id]:
            await manager.send_personal_message({
                "type": "room-deleted",
                "roomId": room_id
            }, user_id)
        
        del manager.rooms[room_id]
        return {"message": f"Room {room_id} deleted successfully"}
    else:
        return {"error": "Room not found"}

@router.get("/stats")
async def get_signaling_stats():
    """Get signaling server statistics"""
    return {
        "activeConnections": len(manager.active_connections),
        "activeRooms": len(manager.rooms),
        "totalParticipants": sum(len(participants) for participants in manager.rooms.values()),
        "connections": list(manager.active_connections.keys()),
        "rooms": {
            room_id: {
                "participantCount": len(participants),
                "participants": participants
            }
            for room_id, participants in manager.rooms.items()
        }
    }
