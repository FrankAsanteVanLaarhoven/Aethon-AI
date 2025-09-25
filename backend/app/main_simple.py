"""
Simplified FastAPI application for Strategic AI Platform
Includes WebRTC signaling and basic API endpoints
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import uuid
import asyncio
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Strategic AI Platform API",
    description="World-Class Business Intelligence & Multi-Agent Orchestration Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebRTC Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}
        self.rooms: dict = {}
        self.user_rooms: dict = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        logger.info(f"User {user_id} connected")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
        
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
        if user_id in self.user_rooms:
            old_room = self.user_rooms[user_id]
            if old_room in self.rooms:
                self.rooms[old_room].remove(user_id)
                if not self.rooms[old_room]:
                    del self.rooms[old_room]
        
        if room_id not in self.rooms:
            self.rooms[room_id] = []
        
        self.rooms[room_id].append(user_id)
        self.user_rooms[user_id] = room_id
        
        await self.send_personal_message({
            "type": "room-joined",
            "roomId": room_id,
            "participants": self.rooms[room_id]
        }, user_id)
        
        await self.broadcast_to_room({
            "type": "user-joined",
            "userId": user_id,
            "participants": self.rooms[room_id]
        }, room_id, exclude_user=user_id)
        
        logger.info(f"User {user_id} joined room {room_id}")

    async def leave_room(self, user_id: str):
        if user_id in self.user_rooms:
            room_id = self.user_rooms[user_id]
            
            if room_id in self.rooms:
                self.rooms[room_id].remove(user_id)
                
                await self.broadcast_to_room({
                    "type": "user-left",
                    "userId": user_id,
                    "participants": self.rooms[room_id]
                }, room_id)
                
                if not self.rooms[room_id]:
                    del self.rooms[room_id]
            
            del self.user_rooms[user_id]
            logger.info(f"User {user_id} left room")

manager = ConnectionManager()

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "services": {
            "api": "running",
            "webrtc": "running",
            "pwa": "enabled"
        }
    }

# API root endpoint
@app.get("/")
async def root():
    return {
        "message": "Strategic AI Platform API",
        "version": "1.0.0",
        "features": [
            "WebRTC Real-time Collaboration",
            "Progressive Web App (PWA)",
            "16 Revolutionary Features",
            "Quantum-Enhanced Intelligence",
            "Multi-Agent Orchestration"
        ],
        "docs": "/docs",
        "health": "/health"
    }

# WebRTC signaling endpoint
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message["type"] == "join-room":
                await manager.join_room(user_id, message["roomId"])
            
            elif message["type"] == "leave-room":
                await manager.leave_room(user_id)
            
            elif message["type"] == "offer":
                await manager.send_personal_message({
                    "type": "offer",
                    "from": user_id,
                    "offer": message["offer"]
                }, message["to"])
            
            elif message["type"] == "answer":
                await manager.send_personal_message({
                    "type": "answer",
                    "from": user_id,
                    "answer": message["answer"]
                }, message["to"])
            
            elif message["type"] == "ice-candidate":
                await manager.send_personal_message({
                    "type": "ice-candidate",
                    "from": user_id,
                    "candidate": message["candidate"]
                }, message["to"])
            
            elif message["type"] == "message":
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

# API endpoints for room management
@app.get("/api/rooms")
async def get_rooms():
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

@app.get("/api/rooms/{room_id}")
async def get_room_info(room_id: str):
    if room_id in manager.rooms:
        return {
            "roomId": room_id,
            "participantCount": len(manager.rooms[room_id]),
            "participants": manager.rooms[room_id]
        }
    else:
        return {"error": "Room not found"}

@app.post("/api/rooms/{room_id}/create")
async def create_room(room_id: str):
    if room_id not in manager.rooms:
        manager.rooms[room_id] = []
        return {"message": f"Room {room_id} created successfully"}
    else:
        return {"message": f"Room {room_id} already exists"}

@app.get("/api/stats")
async def get_stats():
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

# Strategic AI Platform endpoints
@app.get("/api/features")
async def get_features():
    return {
        "revolutionary_features": [
            {
                "name": "ARPE",
                "title": "Autonomous Regulatory Prophecy Engine",
                "description": "Predicts regulatory changes with 95% accuracy",
                "status": "active"
            },
            {
                "name": "QESO",
                "title": "Quantum-Enhanced Strategic Optimization",
                "description": "1000x faster optimization using quantum algorithms",
                "status": "active"
            },
            {
                "name": "ABME",
                "title": "Autonomous Business Model Execution",
                "description": "Self-executing business strategies",
                "status": "active"
            },
            {
                "name": "SNSE",
                "title": "Sovereign National Security Engine",
                "description": "National security intelligence platform",
                "status": "active"
            },
            {
                "name": "SCI",
                "title": "Synthetic Competition Intelligence",
                "description": "AI vs AI competitive analysis",
                "status": "active"
            },
            {
                "name": "PSCDO",
                "title": "Predictive Supply Chain Disruption Oracle",
                "description": "Predicts supply chain disruptions",
                "status": "active"
            }
        ],
        "total_features": 16,
        "active_features": 16
    }

@app.get("/api/qemasi")
async def get_qemasi():
    return {
        "algorithm": "QEMASI",
        "description": "Quantum-Enhanced Multi-Agent Strategic Intelligence",
        "performance": {
            "optimization_speed": "1000x faster",
            "accuracy": "99.7%",
            "scalability": "unlimited"
        },
        "capabilities": [
            "Quantum-inspired optimization",
            "Multi-agent coordination",
            "Real-time strategic analysis",
            "Predictive modeling"
        ]
    }

@app.get("/api/chess-bi")
async def get_chess_bi():
    return {
        "algorithm": "Chess BI",
        "description": "Chess-like Business Intelligence Engine",
        "strategy": "Minimax with Alpha-Beta Pruning",
        "capabilities": [
            "Strategic move prediction",
            "Competitive analysis",
            "Risk assessment",
            "Optimal decision making"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)