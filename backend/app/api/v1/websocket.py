"""
WebSocket endpoints for real-time data streaming
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import Dict, List, Set
import json
import asyncio
import logging
from datetime import datetime
import uuid

from app.services.realtime_data_simulator import (
    realtime_simulator,
    DataType
)
from app.core.auth import verify_security_clearance

logger = logging.getLogger(__name__)

router = APIRouter()

class ConnectionManager:
    """Manages WebSocket connections"""
    
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.client_subscriptions: Dict[str, Set[str]] = {}
        
    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket
        self.client_subscriptions[client_id] = set()
        logger.info(f"Client {client_id} connected via WebSocket")
        
    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]
        if client_id in self.client_subscriptions:
            # Unsubscribe from data simulator
            realtime_simulator.unsubscribe(client_id)
            del self.client_subscriptions[client_id]
        logger.info(f"Client {client_id} disconnected")
        
    async def send_personal_message(self, message: str, client_id: str):
        if client_id in self.active_connections:
            websocket = self.active_connections[client_id]
            await websocket.send_text(message)
            
    async def broadcast(self, message: str, channel: str = None):
        """Broadcast message to all connected clients or specific channel subscribers"""
        disconnected_clients = []
        
        for client_id, websocket in self.active_connections.items():
            # If channel specified, only send to subscribers
            if channel and channel not in self.client_subscriptions.get(client_id, set()):
                continue
                
            try:
                await websocket.send_text(message)
            except Exception as e:
                logger.error(f"Error sending to client {client_id}: {e}")
                disconnected_clients.append(client_id)
        
        # Clean up disconnected clients
        for client_id in disconnected_clients:
            self.disconnect(client_id)
    
    def subscribe_client(self, client_id: str, channels: List[str]):
        """Subscribe client to specific channels"""
        if client_id in self.client_subscriptions:
            self.client_subscriptions[client_id].update(channels)
            
            # Map channels to data types for simulator
            data_types = []
            channel_mapping = {
                "market_data": DataType.MARKET_DATA,
                "threat_alerts": DataType.THREAT_ALERT,
                "regulatory_updates": DataType.REGULATORY_UPDATE,
                "economic_indicators": DataType.ECONOMIC_INDICATOR,
                "geopolitical_events": DataType.GEOPOLITICAL_EVENT
            }
            
            for channel in channels:
                if channel in channel_mapping:
                    data_types.append(channel_mapping[channel])
            
            if data_types:
                realtime_simulator.subscribe(client_id, data_types)
            
            logger.info(f"Client {client_id} subscribed to channels: {channels}")
    
    def unsubscribe_client(self, client_id: str, channels: List[str]):
        """Unsubscribe client from specific channels"""
        if client_id in self.client_subscriptions:
            for channel in channels:
                self.client_subscriptions[client_id].discard(channel)
            logger.info(f"Client {client_id} unsubscribed from channels: {channels}")

# Global connection manager
manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """Main WebSocket endpoint for real-time data streaming"""
    client_id = str(uuid.uuid4())
    
    try:
        await manager.connect(websocket, client_id)
        
        # Send welcome message
        await manager.send_personal_message(
            json.dumps({
                "type": "connection",
                "status": "connected",
                "client_id": client_id,
                "timestamp": datetime.now().isoformat(),
                "available_channels": [
                    "market_data",
                    "threat_alerts",
                    "regulatory_updates",
                    "economic_indicators",
                    "geopolitical_events"
                ]
            }),
            client_id
        )
        
        # Start data streaming task for this client
        streaming_task = asyncio.create_task(stream_data_to_client(client_id))
        
        # Handle incoming messages
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("action") == "subscribe":
                channels = message.get("channels", [])
                manager.subscribe_client(client_id, channels)
                
                await manager.send_personal_message(
                    json.dumps({
                        "type": "subscription",
                        "status": "subscribed",
                        "channels": channels,
                        "timestamp": datetime.now().isoformat()
                    }),
                    client_id
                )
                
            elif message.get("action") == "unsubscribe":
                channels = message.get("channels", [])
                manager.unsubscribe_client(client_id, channels)
                
                await manager.send_personal_message(
                    json.dumps({
                        "type": "subscription",
                        "status": "unsubscribed",
                        "channels": channels,
                        "timestamp": datetime.now().isoformat()
                    }),
                    client_id
                )
                
            elif message.get("action") == "ping":
                await manager.send_personal_message(
                    json.dumps({
                        "type": "pong",
                        "timestamp": datetime.now().isoformat()
                    }),
                    client_id
                )
                
    except WebSocketDisconnect:
        logger.info(f"Client {client_id} disconnected normally")
    except Exception as e:
        logger.error(f"WebSocket error for client {client_id}: {e}")
    finally:
        streaming_task.cancel()
        manager.disconnect(client_id)

async def stream_data_to_client(client_id: str):
    """Stream real-time data to a specific client based on their subscriptions"""
    try:
        while client_id in manager.active_connections:
            try:
                # Get data from simulator
                data = await asyncio.wait_for(
                    realtime_simulator.get_data(client_id),
                    timeout=1.0
                )
                
                if data:
                    await manager.send_personal_message(
                        json.dumps(data),
                        client_id
                    )
                    
            except asyncio.TimeoutError:
                # No data available, continue
                continue
            except Exception as e:
                logger.error(f"Error streaming data to client {client_id}: {e}")
                await asyncio.sleep(1)
                
    except asyncio.CancelledError:
        logger.info(f"Data streaming stopped for client {client_id}")

@router.websocket("/ws/secure/{clearance_level}")
async def secure_websocket_endpoint(
    websocket: WebSocket,
    clearance_level: str
):
    """Secure WebSocket endpoint requiring security clearance"""
    client_id = str(uuid.uuid4())
    
    # Verify clearance level
    valid_clearances = ["secret", "top_secret", "sci"]
    if clearance_level not in valid_clearances:
        await websocket.close(code=4003, reason="Invalid clearance level")
        return
    
    try:
        await manager.connect(websocket, client_id)
        
        # Send secure welcome message
        await manager.send_personal_message(
            json.dumps({
                "type": "secure_connection",
                "status": "connected",
                "client_id": client_id,
                "clearance_level": clearance_level.upper(),
                "timestamp": datetime.now().isoformat(),
                "classification": "SECRET" if clearance_level == "secret" else "TOP SECRET"
            }),
            client_id
        )
        
        # Subscribe to classified channels based on clearance
        classified_channels = []
        if clearance_level in ["top_secret", "sci"]:
            classified_channels.extend(["classified_threats", "military_intel"])
        if clearance_level == "sci":
            classified_channels.extend(["strategic_operations", "allied_intelligence"])
        
        if classified_channels:
            manager.subscribe_client(client_id, classified_channels)
        
        # Handle secure communications
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Process secure messages based on clearance
            logger.info(f"Secure message from {client_id} ({clearance_level}): {message.get('action')}")
            
    except WebSocketDisconnect:
        logger.info(f"Secure client {client_id} disconnected")
    except Exception as e:
        logger.error(f"Secure WebSocket error for client {client_id}: {e}")
    finally:
        manager.disconnect(client_id)

@router.get("/ws/status")
async def get_websocket_status():
    """Get current WebSocket connection status"""
    return {
        "active_connections": len(manager.active_connections),
        "client_ids": list(manager.active_connections.keys()),
        "subscriptions": {
            client_id: list(channels)
            for client_id, channels in manager.client_subscriptions.items()
        },
        "simulator_running": realtime_simulator.running,
        "timestamp": datetime.now().isoformat()
    }
