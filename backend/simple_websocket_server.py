#!/usr/bin/env python3
"""
Simple WebSocket server for StrategicAI Platform
Provides basic WebSocket functionality while the main backend is being set up
"""

import asyncio
import json
import logging
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="StrategicAI Platform - Simple WebSocket Server", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store active connections
active_connections: list[WebSocket] = []

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "StrategicAI Platform - Simple WebSocket Server",
        "version": "1.0.0",
        "status": "operational",
        "active_connections": len(active_connections)
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "active_connections": len(active_connections)
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time communication"""
    await websocket.accept()
    active_connections.append(websocket)
    logger.info(f"WebSocket connection accepted. Total connections: {len(active_connections)}")
    
    try:
        # Send initial connection confirmation
        await websocket.send_text(json.dumps({
            "type": "connection_established",
            "timestamp": datetime.now().isoformat(),
            "message": "Connected to StrategicAI Platform",
            "connection_id": id(websocket)
        }))
        logger.info("Sent connection confirmation")
        
        # Keep connection alive and handle messages
        while True:
            try:
                # Wait for client message with timeout
                data = await asyncio.wait_for(websocket.receive_text(), timeout=60.0)
                logger.info(f"Received: {data}")
                
                # Parse the message
                try:
                    message = json.loads(data)
                    message_type = message.get("type", "unknown")
                    
                    if message_type == "ping":
                        # Send pong response
                        await websocket.send_text(json.dumps({
                            "type": "pong",
                            "timestamp": datetime.now().isoformat(),
                            "data": "pong"
                        }))
                        logger.info("Sent pong response")
                        
                    elif message_type == "get_status":
                        # Send system status
                        await websocket.send_text(json.dumps({
                            "type": "status_update",
                            "timestamp": datetime.now().isoformat(),
                            "data": {
                                "active_connections": len(active_connections),
                                "server_status": "operational",
                                "uptime": "running"
                            }
                        }))
                        logger.info("Sent status update")
                        
                    else:
                        # Echo back other messages
                        await websocket.send_text(json.dumps({
                            "type": "echo",
                            "timestamp": datetime.now().isoformat(),
                            "data": data
                        }))
                        logger.info("Sent echo response")
                        
                except json.JSONDecodeError:
                    # If not JSON, echo back as text
                    await websocket.send_text(json.dumps({
                        "type": "echo",
                        "timestamp": datetime.now().isoformat(),
                        "data": data
                    }))
                    logger.info("Sent text echo response")
                    
            except asyncio.TimeoutError:
                # Send a ping to check if connection is still alive
                try:
                    await websocket.send_text(json.dumps({
                        "type": "ping",
                        "timestamp": datetime.now().isoformat(),
                        "message": "Server ping"
                    }))
                    logger.info("Sent server ping due to timeout")
                except:
                    logger.info("Connection appears to be dead, closing")
                    break
            except WebSocketDisconnect:
                logger.info("WebSocket disconnected by client")
                break
            except Exception as e:
                logger.error(f"Error handling WebSocket message: {e}")
                break
                
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        # Remove connection from active list
        if websocket in active_connections:
            active_connections.remove(websocket)
        logger.info(f"WebSocket connection closed. Remaining connections: {len(active_connections)}")

async def broadcast_message(message: dict):
    """Broadcast a message to all connected clients"""
    if not active_connections:
        return
        
    message_str = json.dumps(message)
    disconnected = []
    
    for connection in active_connections:
        try:
            await connection.send_text(message_str)
        except Exception as e:
            logger.error(f"Error broadcasting to connection: {e}")
            disconnected.append(connection)
    
    # Remove disconnected connections
    for connection in disconnected:
        if connection in active_connections:
            active_connections.remove(connection)

if __name__ == "__main__":
    logger.info("Starting StrategicAI Platform - Simple WebSocket Server")
    uvicorn.run(
        "simple_websocket_server:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
        log_level="info"
    )
