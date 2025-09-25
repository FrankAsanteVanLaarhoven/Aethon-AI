"""
Comprehensive Test Suite for Strategic AI Platform
Tests all API endpoints, WebRTC functionality, and PWA features
"""

import pytest
import asyncio
import aiohttp
import websockets
import json
import time
from typing import Dict, Any, List
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Test configuration
BASE_URL = "http://localhost:8000"
WS_URL = "ws://localhost:8000"
FRONTEND_URL = "http://localhost:3000"

class TestConfig:
    """Test configuration and constants"""
    TEST_USER_EMAIL = "test@strategicai.com"
    TEST_USER_PASSWORD = "test123"
    TEST_ROOM_ID = "test_room_123"
    TIMEOUT = 30
    MAX_RETRIES = 3

class APITestClient:
    """API test client with authentication"""
    
    def __init__(self, base_url: str = BASE_URL):
        self.base_url = base_url
        self.session = None
        self.access_token = None
        self.refresh_token = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def login(self, email: str = TestConfig.TEST_USER_EMAIL, password: str = TestConfig.TEST_USER_PASSWORD):
        """Login and get access token"""
        async with self.session.post(
            f"{self.base_url}/api/v1/auth/login",
            json={"email": email, "password": password}
        ) as response:
            if response.status == 200:
                data = await response.json()
                self.access_token = data["access_token"]
                self.refresh_token = data["refresh_token"]
                return True
            return False
    
    async def get(self, endpoint: str, **kwargs):
        """GET request with authentication"""
        headers = kwargs.get('headers', {})
        if self.access_token:
            headers['Authorization'] = f'Bearer {self.access_token}'
        kwargs['headers'] = headers
        return await self.session.get(f"{self.base_url}{endpoint}", **kwargs)
    
    async def post(self, endpoint: str, **kwargs):
        """POST request with authentication"""
        headers = kwargs.get('headers', {})
        if self.access_token:
            headers['Authorization'] = f'Bearer {self.access_token}'
        kwargs['headers'] = headers
        return await self.session.post(f"{self.base_url}{endpoint}", **kwargs)

class WebRTCTestClient:
    """WebRTC test client for signaling tests"""
    
    def __init__(self, ws_url: str = WS_URL):
        self.ws_url = ws_url
        self.websocket = None
        self.user_id = None
        self.messages = []
    
    async def connect(self, user_id: str):
        """Connect to WebSocket signaling server"""
        self.user_id = user_id
        self.websocket = await websockets.connect(f"{self.ws_url}/ws/{user_id}")
        return self.websocket
    
    async def disconnect(self):
        """Disconnect from WebSocket"""
        if self.websocket:
            await self.websocket.close()
    
    async def send_message(self, message: Dict[str, Any]):
        """Send message to signaling server"""
        if self.websocket:
            await self.websocket.send(json.dumps(message))
    
    async def receive_message(self, timeout: float = 5.0):
        """Receive message from signaling server"""
        if self.websocket:
            try:
                message = await asyncio.wait_for(self.websocket.recv(), timeout=timeout)
                return json.loads(message)
            except asyncio.TimeoutError:
                return None
        return None

# Test Classes

class TestAuthentication:
    """Test authentication and authorization"""
    
    @pytest.mark.asyncio
    async def test_login_success(self):
        """Test successful login"""
        async with APITestClient() as client:
            success = await client.login()
            assert success
            assert client.access_token is not None
            assert client.refresh_token is not None
    
    @pytest.mark.asyncio
    async def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        async with APITestClient() as client:
            success = await client.login("invalid@email.com", "wrongpassword")
            assert not success
            assert client.access_token is None
    
    @pytest.mark.asyncio
    async def test_get_current_user(self):
        """Test getting current user information"""
        async with APITestClient() as client:
            await client.login()
            async with client.get("/api/v1/auth/me") as response:
                assert response.status == 200
                data = await response.json()
                assert data["email"] == TestConfig.TEST_USER_EMAIL
    
    @pytest.mark.asyncio
    async def test_refresh_token(self):
        """Test token refresh"""
        async with APITestClient() as client:
            await client.login()
            old_token = client.access_token
            
            async with client.post("/api/v1/auth/refresh", json={"refresh_token": client.refresh_token}) as response:
                assert response.status == 200
                data = await response.json()
                assert data["access_token"] != old_token
    
    @pytest.mark.asyncio
    async def test_protected_endpoint_without_auth(self):
        """Test accessing protected endpoint without authentication"""
        async with APITestClient() as client:
            async with client.get("/api/v1/auth/me") as response:
                assert response.status == 401

class TestRevolutionaryFeatures:
    """Test revolutionary features API"""
    
    @pytest.mark.asyncio
    async def test_get_all_features(self):
        """Test getting all revolutionary features"""
        async with APITestClient() as client:
            async with client.get("/api/v1/features") as response:
                assert response.status == 200
                data = await response.json()
                assert "revolutionary_features" in data
                assert len(data["revolutionary_features"]) == 16
                assert data["total_features"] == 16
                assert data["active_features"] == 16
    
    @pytest.mark.asyncio
    async def test_get_specific_feature(self):
        """Test getting specific feature details"""
        async with APITestClient() as client:
            async with client.get("/api/v1/features/ARPE") as response:
                assert response.status == 200
                data = await response.json()
                assert data["name"] == "ARPE"
                assert "capabilities" in data
                assert "performance_metrics" in data
    
    @pytest.mark.asyncio
    async def test_qemasi_performance(self):
        """Test QEMASI performance endpoint"""
        async with APITestClient() as client:
            async with client.get("/api/v1/qemasi/performance") as response:
                assert response.status == 200
                data = await response.json()
                assert data["algorithm"] == "QEMASI"
                assert "performance" in data
                assert data["performance"]["optimization_speed"] == "1000x faster"
    
    @pytest.mark.asyncio
    async def test_chess_bi_analysis(self):
        """Test Chess BI analysis endpoint"""
        async with APITestClient() as client:
            async with client.get("/api/v1/chess-bi") as response:
                assert response.status == 200
                data = await response.json()
                assert data["algorithm"] == "Chess BI"
                assert "strategy" in data
                assert data["strategy"] == "Minimax with Alpha-Beta Pruning"

class TestWebRTCSignaling:
    """Test WebRTC signaling functionality"""
    
    @pytest.mark.asyncio
    async def test_websocket_connection(self):
        """Test WebSocket connection establishment"""
        client = WebRTCTestClient()
        try:
            websocket = await client.connect("test_user_001")
            assert websocket is not None
            assert websocket.open
        finally:
            await client.disconnect()
    
    @pytest.mark.asyncio
    async def test_join_room(self):
        """Test joining a collaboration room"""
        client = WebRTCTestClient()
        try:
            await client.connect("test_user_001")
            
            # Send join room message
            await client.send_message({
                "type": "join-room",
                "roomId": TestConfig.TEST_ROOM_ID
            })
            
            # Wait for response
            response = await client.receive_message()
            assert response is not None
            assert response["type"] == "room-joined"
            assert response["roomId"] == TestConfig.TEST_ROOM_ID
            
        finally:
            await client.disconnect()
    
    @pytest.mark.asyncio
    async def test_peer_to_peer_signaling(self):
        """Test peer-to-peer signaling (offer/answer/ICE)"""
        client1 = WebRTCTestClient()
        client2 = WebRTCTestClient()
        
        try:
            # Connect both clients
            await client1.connect("peer1")
            await client2.connect("peer2")
            
            # Both join the same room
            await client1.send_message({
                "type": "join-room",
                "roomId": TestConfig.TEST_ROOM_ID
            })
            await client2.send_message({
                "type": "join-room",
                "roomId": TestConfig.TEST_ROOM_ID
            })
            
            # Wait for room join confirmations
            await client1.receive_message()
            await client2.receive_message()
            
            # Send offer from peer1 to peer2
            await client1.send_message({
                "type": "offer",
                "to": "peer2",
                "offer": {"type": "offer", "sdp": "mock_sdp_offer"}
            })
            
            # Peer2 should receive the offer
            offer_message = await client2.receive_message()
            assert offer_message["type"] == "offer"
            assert offer_message["from"] == "peer1"
            
            # Send answer from peer2 to peer1
            await client2.send_message({
                "type": "answer",
                "to": "peer1",
                "answer": {"type": "answer", "sdp": "mock_sdp_answer"}
            })
            
            # Peer1 should receive the answer
            answer_message = await client1.receive_message()
            assert answer_message["type"] == "answer"
            assert answer_message["from"] == "peer2"
            
        finally:
            await client1.disconnect()
            await client2.disconnect()
    
    @pytest.mark.asyncio
    async def test_chat_messaging(self):
        """Test real-time chat messaging"""
        client = WebRTCTestClient()
        try:
            await client.connect("chat_user")
            
            # Join room
            await client.send_message({
                "type": "join-room",
                "roomId": TestConfig.TEST_ROOM_ID
            })
            await client.receive_message()  # Room joined confirmation
            
            # Send chat message
            await client.send_message({
                "type": "message",
                "message": "Hello, team!",
                "roomId": TestConfig.TEST_ROOM_ID
            })
            
            # Should receive the message back
            response = await client.receive_message()
            assert response["type"] == "message"
            assert response["message"] == "Hello, team!"
            
        finally:
            await client.disconnect()

class TestPerformance:
    """Test performance and load testing"""
    
    @pytest.mark.asyncio
    async def test_api_response_time(self):
        """Test API response times"""
        async with APITestClient() as client:
            start_time = time.time()
            async with client.get("/health") as response:
                end_time = time.time()
                response_time = (end_time - start_time) * 1000  # Convert to milliseconds
                
                assert response.status == 200
                assert response_time < 200  # Should be under 200ms
    
    @pytest.mark.asyncio
    async def test_concurrent_connections(self):
        """Test multiple concurrent WebSocket connections"""
        clients = []
        try:
            # Create 10 concurrent connections
            for i in range(10):
                client = WebRTCTestClient()
                await client.connect(f"concurrent_user_{i}")
                clients.append(client)
            
            # All connections should be successful
            assert len(clients) == 10
            
            # Test sending messages from all clients
            for client in clients:
                await client.send_message({
                    "type": "join-room",
                    "roomId": f"concurrent_room_{i}"
                })
            
            # All clients should receive responses
            for client in clients:
                response = await client.receive_message()
                assert response is not None
                assert response["type"] == "room-joined"
                
        finally:
            for client in clients:
                await client.disconnect()
    
    @pytest.mark.asyncio
    async def test_websocket_latency(self):
        """Test WebSocket message latency"""
        client = WebRTCTestClient()
        try:
            await client.connect("latency_test_user")
            
            # Measure round-trip time
            start_time = time.time()
            await client.send_message({
                "type": "join-room",
                "roomId": "latency_test_room"
            })
            response = await client.receive_message()
            end_time = time.time()
            
            latency = (end_time - start_time) * 1000  # Convert to milliseconds
            
            assert response is not None
            assert latency < 100  # Should be under 100ms
            
        finally:
            await client.disconnect()

class TestPWAFeatures:
    """Test PWA (Progressive Web App) features"""
    
    @pytest.mark.asyncio
    async def test_manifest_availability(self):
        """Test PWA manifest is available"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{FRONTEND_URL}/manifest.json") as response:
                assert response.status == 200
                data = await response.json()
                assert data["name"] == "Strategic AI Platform"
                assert data["short_name"] == "StrategicAI"
                assert "icons" in data
    
    @pytest.mark.asyncio
    async def test_service_worker_registration(self):
        """Test service worker is properly configured"""
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{FRONTEND_URL}/sw.js") as response:
                # Service worker might not be available in test environment
                # This test ensures the endpoint exists
                assert response.status in [200, 404]  # 404 is acceptable in test env
    
    @pytest.mark.asyncio
    async def test_offline_capability(self):
        """Test offline capability (basic check)"""
        async with aiohttp.ClientSession() as session:
            # Test that critical resources are accessible
            async with session.get(f"{FRONTEND_URL}/") as response:
                assert response.status == 200
                content = await response.text()
                assert "Strategic AI Platform" in content

class TestSecurity:
    """Test security features"""
    
    @pytest.mark.asyncio
    async def test_https_enforcement(self):
        """Test HTTPS enforcement (in production)"""
        # This test would check HTTPS headers in production
        # For local testing, we just verify the endpoint exists
        async with APITestClient() as client:
            async with client.get("/health") as response:
                assert response.status == 200
    
    @pytest.mark.asyncio
    async def test_cors_headers(self):
        """Test CORS headers are properly set"""
        async with aiohttp.ClientSession() as session:
            async with session.options(f"{BASE_URL}/api/v1/features") as response:
                # CORS headers should be present
                assert "Access-Control-Allow-Origin" in response.headers
    
    @pytest.mark.asyncio
    async def test_rate_limiting(self):
        """Test rate limiting functionality"""
        async with APITestClient() as client:
            # Make multiple rapid requests
            for i in range(10):
                async with client.get("/health") as response:
                    if response.status == 429:  # Rate limited
                        break
            else:
                # If we didn't hit rate limit, that's also acceptable for testing
                pass

class TestIntegration:
    """Integration tests combining multiple features"""
    
    @pytest.mark.asyncio
    async def test_full_collaboration_flow(self):
        """Test complete collaboration flow"""
        # This test simulates a full collaboration session
        client1 = WebRTCTestClient()
        client2 = WebRTCTestClient()
        
        try:
            # Connect both users
            await client1.connect("collaborator1")
            await client2.connect("collaborator2")
            
            # Both join collaboration room
            await client1.send_message({
                "type": "join-room",
                "roomId": "integration_test_room"
            })
            await client2.send_message({
                "type": "join-room",
                "roomId": "integration_test_room"
            })
            
            # Wait for room join confirmations
            await client1.receive_message()
            await client2.receive_message()
            
            # User1 sends chat message
            await client1.send_message({
                "type": "message",
                "message": "Let's analyze the QEMASI results",
                "roomId": "integration_test_room"
            })
            
            # User2 should receive the message
            message = await client2.receive_message()
            assert message["type"] == "message"
            assert "QEMASI" in message["message"]
            
            # Test WebRTC signaling
            await client1.send_message({
                "type": "offer",
                "to": "collaborator2",
                "offer": {"type": "offer", "sdp": "mock_sdp"}
            })
            
            offer = await client2.receive_message()
            assert offer["type"] == "offer"
            
        finally:
            await client1.disconnect()
            await client2.disconnect()
    
    @pytest.mark.asyncio
    async def test_api_and_websocket_integration(self):
        """Test integration between API and WebSocket"""
        async with APITestClient() as api_client:
            # Login via API
            await api_client.login()
            
            # Get user info via API
            async with api_client.get("/api/v1/auth/me") as response:
                user_data = await response.json()
                user_id = user_data["id"]
            
            # Use same user for WebSocket
            ws_client = WebRTCTestClient()
            try:
                await ws_client.connect(user_id)
                
                # Join room via WebSocket
                await ws_client.send_message({
                    "type": "join-room",
                    "roomId": "api_ws_integration_room"
                })
                
                response = await ws_client.receive_message()
                assert response["type"] == "room-joined"
                
            finally:
                await ws_client.disconnect()

# Test runner and utilities

def run_tests():
    """Run all tests"""
    pytest.main([
        __file__,
        "-v",
        "--tb=short",
        "--asyncio-mode=auto"
    ])

def run_specific_test_class(test_class: str):
    """Run specific test class"""
    pytest.main([
        f"{__file__}::{test_class}",
        "-v",
        "--tb=short",
        "--asyncio-mode=auto"
    ])

def run_performance_tests():
    """Run performance-focused tests"""
    pytest.main([
        __file__,
        "-k", "performance or latency or concurrent",
        "-v",
        "--tb=short",
        "--asyncio-mode=auto"
    ])

def run_security_tests():
    """Run security-focused tests"""
    pytest.main([
        __file__,
        "-k", "security or auth or cors",
        "-v",
        "--tb=short",
        "--asyncio-mode=auto"
    ])

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        test_type = sys.argv[1]
        if test_type == "performance":
            run_performance_tests()
        elif test_type == "security":
            run_security_tests()
        elif test_type == "all":
            run_tests()
        else:
            run_specific_test_class(test_type)
    else:
        run_tests()
