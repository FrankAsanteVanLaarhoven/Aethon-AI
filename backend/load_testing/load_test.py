"""
Load Testing Suite for Strategic AI Platform WebRTC Signaling Server
Tests concurrent connections, message throughput, and system reliability
"""

import asyncio
import websockets
import json
import time
import statistics
import argparse
from typing import List, Dict, Any
import logging
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor
import aiohttp
import random
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class TestResult:
    test_name: str
    success_count: int
    failure_count: int
    total_duration: float
    avg_response_time: float
    min_response_time: float
    max_response_time: float
    throughput: float
    errors: List[str]

class LoadTester:
    def __init__(self, base_url: str = "ws://localhost:8000"):
        self.base_url = base_url
        self.http_base_url = "http://localhost:8000"
        self.results: List[TestResult] = []
        self.active_connections: List[websockets.WebSocketServerProtocol] = []
        
    async def create_websocket_connection(self, user_id: str) -> websockets.WebSocketServerProtocol:
        """Create a WebSocket connection for testing"""
        uri = f"{self.base_url}/ws/{user_id}"
        try:
            websocket = await websockets.connect(uri)
            self.active_connections.append(websocket)
            return websocket
        except Exception as e:
            logger.error(f"Failed to create WebSocket connection for {user_id}: {e}")
            raise

    async def send_message(self, websocket: websockets.WebSocketServerProtocol, message: Dict[str, Any]) -> float:
        """Send a message and measure response time"""
        start_time = time.time()
        try:
            await websocket.send(json.dumps(message))
            # Wait for acknowledgment or response
            response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
            end_time = time.time()
            return end_time - start_time
        except asyncio.TimeoutError:
            logger.warning("Message timeout")
            return -1
        except Exception as e:
            logger.error(f"Message send error: {e}")
            return -1

    async def test_concurrent_connections(self, num_connections: int = 100) -> TestResult:
        """Test concurrent WebSocket connections"""
        logger.info(f"Testing {num_connections} concurrent connections...")
        
        start_time = time.time()
        success_count = 0
        failure_count = 0
        response_times = []
        errors = []
        
        async def create_connection(user_id: str):
            nonlocal success_count, failure_count
            try:
                websocket = await self.create_websocket_connection(user_id)
                success_count += 1
                
                # Send a test message
                response_time = await self.send_message(websocket, {
                    "type": "ping",
                    "timestamp": time.time()
                })
                
                if response_time > 0:
                    response_times.append(response_time)
                
                await websocket.close()
                
            except Exception as e:
                failure_count += 1
                errors.append(f"Connection {user_id}: {str(e)}")
        
        # Create connections concurrently
        tasks = [create_connection(f"user_{i}") for i in range(num_connections)]
        await asyncio.gather(*tasks, return_exceptions=True)
        
        end_time = time.time()
        total_duration = end_time - start_time
        
        return TestResult(
            test_name="Concurrent Connections",
            success_count=success_count,
            failure_count=failure_count,
            total_duration=total_duration,
            avg_response_time=statistics.mean(response_times) if response_times else 0,
            min_response_time=min(response_times) if response_times else 0,
            max_response_time=max(response_times) if response_times else 0,
            throughput=success_count / total_duration if total_duration > 0 else 0,
            errors=errors
        )

    async def test_room_management(self, num_rooms: int = 50, users_per_room: int = 10) -> TestResult:
        """Test room creation and management"""
        logger.info(f"Testing {num_rooms} rooms with {users_per_room} users each...")
        
        start_time = time.time()
        success_count = 0
        failure_count = 0
        response_times = []
        errors = []
        
        async def test_room(room_id: str):
            nonlocal success_count, failure_count
            try:
                # Create users for this room
                users = [f"user_{room_id}_{i}" for i in range(users_per_room)]
                websockets_list = []
                
                # Connect all users
                for user_id in users:
                    websocket = await self.create_websocket_connection(user_id)
                    websockets_list.append(websocket)
                
                # Join room
                room_start = time.time()
                for websocket in websockets_list:
                    response_time = await self.send_message(websocket, {
                        "type": "join-room",
                        "roomId": room_id
                    })
                    if response_time > 0:
                        response_times.append(response_time)
                
                # Send messages in room
                for i in range(5):  # 5 messages per user
                    for websocket in websockets_list:
                        response_time = await self.send_message(websocket, {
                            "type": "message",
                            "message": f"Test message {i}",
                            "roomId": room_id
                        })
                        if response_time > 0:
                            response_times.append(response_time)
                
                # Leave room
                for websocket in websockets_list:
                    await self.send_message(websocket, {
                        "type": "leave-room"
                    })
                    await websocket.close()
                
                success_count += 1
                
            except Exception as e:
                failure_count += 1
                errors.append(f"Room {room_id}: {str(e)}")
        
        # Test rooms concurrently
        tasks = [test_room(f"room_{i}") for i in range(num_rooms)]
        await asyncio.gather(*tasks, return_exceptions=True)
        
        end_time = time.time()
        total_duration = end_time - start_time
        
        return TestResult(
            test_name="Room Management",
            success_count=success_count,
            failure_count=failure_count,
            total_duration=total_duration,
            avg_response_time=statistics.mean(response_times) if response_times else 0,
            min_response_time=min(response_times) if response_times else 0,
            max_response_time=max(response_times) if response_times else 0,
            throughput=success_count / total_duration if total_duration > 0 else 0,
            errors=errors
        )

    async def test_message_throughput(self, num_messages: int = 1000, num_connections: int = 10) -> TestResult:
        """Test message throughput"""
        logger.info(f"Testing {num_messages} messages across {num_connections} connections...")
        
        start_time = time.time()
        success_count = 0
        failure_count = 0
        response_times = []
        errors = []
        
        async def message_sender(connection_id: int):
            nonlocal success_count, failure_count
            try:
                websocket = await self.create_websocket_connection(f"sender_{connection_id}")
                
                for i in range(num_messages // num_connections):
                    response_time = await self.send_message(websocket, {
                        "type": "message",
                        "message": f"Throughput test message {i}",
                        "connectionId": connection_id
                    })
                    
                    if response_time > 0:
                        response_times.append(response_time)
                        success_count += 1
                    else:
                        failure_count += 1
                
                await websocket.close()
                
            except Exception as e:
                failure_count += 1
                errors.append(f"Connection {connection_id}: {str(e)}")
        
        # Send messages concurrently
        tasks = [message_sender(i) for i in range(num_connections)]
        await asyncio.gather(*tasks, return_exceptions=True)
        
        end_time = time.time()
        total_duration = end_time - start_time
        
        return TestResult(
            test_name="Message Throughput",
            success_count=success_count,
            failure_count=failure_count,
            total_duration=total_duration,
            avg_response_time=statistics.mean(response_times) if response_times else 0,
            min_response_time=min(response_times) if response_times else 0,
            max_response_time=max(response_times) if response_times else 0,
            throughput=success_count / total_duration if total_duration > 0 else 0,
            errors=errors
        )

    async def test_webrtc_signaling(self, num_pairs: int = 20) -> TestResult:
        """Test WebRTC signaling (offer/answer/ICE)"""
        logger.info(f"Testing WebRTC signaling for {num_pairs} peer pairs...")
        
        start_time = time.time()
        success_count = 0
        failure_count = 0
        response_times = []
        errors = []
        
        async def test_peer_pair(pair_id: int):
            nonlocal success_count, failure_count
            try:
                # Create two peers
                peer1 = await self.create_websocket_connection(f"peer1_{pair_id}")
                peer2 = await self.create_websocket_connection(f"peer2_{pair_id}")
                
                # Simulate WebRTC signaling
                # 1. Send offer
                offer_time = await self.send_message(peer1, {
                    "type": "offer",
                    "to": f"peer2_{pair_id}",
                    "offer": {"type": "offer", "sdp": "mock_sdp"}
                })
                if offer_time > 0:
                    response_times.append(offer_time)
                
                # 2. Send answer
                answer_time = await self.send_message(peer2, {
                    "type": "answer",
                    "to": f"peer1_{pair_id}",
                    "answer": {"type": "answer", "sdp": "mock_sdp"}
                })
                if answer_time > 0:
                    response_times.append(answer_time)
                
                # 3. Send ICE candidates
                for i in range(3):  # Multiple ICE candidates
                    ice_time = await self.send_message(peer1, {
                        "type": "ice-candidate",
                        "to": f"peer2_{pair_id}",
                        "candidate": {"candidate": f"mock_candidate_{i}"}
                    })
                    if ice_time > 0:
                        response_times.append(ice_time)
                
                await peer1.close()
                await peer2.close()
                success_count += 1
                
            except Exception as e:
                failure_count += 1
                errors.append(f"Peer pair {pair_id}: {str(e)}")
        
        # Test peer pairs concurrently
        tasks = [test_peer_pair(i) for i in range(num_pairs)]
        await asyncio.gather(*tasks, return_exceptions=True)
        
        end_time = time.time()
        total_duration = end_time - start_time
        
        return TestResult(
            test_name="WebRTC Signaling",
            success_count=success_count,
            failure_count=failure_count,
            total_duration=total_duration,
            avg_response_time=statistics.mean(response_times) if response_times else 0,
            min_response_time=min(response_times) if response_times else 0,
            max_response_time=max(response_times) if response_times else 0,
            throughput=success_count / total_duration if total_duration > 0 else 0,
            errors=errors
        )

    async def test_api_endpoints(self) -> TestResult:
        """Test HTTP API endpoints"""
        logger.info("Testing HTTP API endpoints...")
        
        start_time = time.time()
        success_count = 0
        failure_count = 0
        response_times = []
        errors = []
        
        endpoints = [
            "/health",
            "/api/stats",
            "/api/rooms",
            "/api/features",
            "/api/qemasi",
            "/api/chess-bi"
        ]
        
        async with aiohttp.ClientSession() as session:
            for endpoint in endpoints:
                try:
                    request_start = time.time()
                    async with session.get(f"{self.http_base_url}{endpoint}") as response:
                        request_end = time.time()
                        response_time = request_end - request_start
                        
                        if response.status == 200:
                            success_count += 1
                            response_times.append(response_time)
                        else:
                            failure_count += 1
                            errors.append(f"{endpoint}: HTTP {response.status}")
                            
                except Exception as e:
                    failure_count += 1
                    errors.append(f"{endpoint}: {str(e)}")
        
        end_time = time.time()
        total_duration = end_time - start_time
        
        return TestResult(
            test_name="API Endpoints",
            success_count=success_count,
            failure_count=failure_count,
            total_duration=total_duration,
            avg_response_time=statistics.mean(response_times) if response_times else 0,
            min_response_time=min(response_times) if response_times else 0,
            max_response_time=max(response_times) if response_times else 0,
            throughput=success_count / total_duration if total_duration > 0 else 0,
            errors=errors
        )

    async def run_stress_test(self, duration_minutes: int = 5) -> TestResult:
        """Run continuous stress test"""
        logger.info(f"Running stress test for {duration_minutes} minutes...")
        
        start_time = time.time()
        end_time = start_time + (duration_minutes * 60)
        success_count = 0
        failure_count = 0
        response_times = []
        errors = []
        
        async def stress_worker(worker_id: int):
            nonlocal success_count, failure_count
            while time.time() < end_time:
                try:
                    # Create connection
                    websocket = await self.create_websocket_connection(f"stress_{worker_id}_{int(time.time())}")
                    
                    # Send random messages
                    for _ in range(random.randint(1, 10)):
                        response_time = await self.send_message(websocket, {
                            "type": "message",
                            "message": f"Stress test message from worker {worker_id}",
                            "timestamp": time.time()
                        })
                        
                        if response_time > 0:
                            response_times.append(response_time)
                            success_count += 1
                        else:
                            failure_count += 1
                    
                    await websocket.close()
                    await asyncio.sleep(random.uniform(0.1, 1.0))  # Random delay
                    
                except Exception as e:
                    failure_count += 1
                    errors.append(f"Worker {worker_id}: {str(e)}")
                    await asyncio.sleep(1.0)  # Wait before retry
        
        # Run multiple stress workers
        workers = [stress_worker(i) for i in range(10)]
        await asyncio.gather(*workers, return_exceptions=True)
        
        total_duration = time.time() - start_time
        
        return TestResult(
            test_name="Stress Test",
            success_count=success_count,
            failure_count=failure_count,
            total_duration=total_duration,
            avg_response_time=statistics.mean(response_times) if response_times else 0,
            min_response_time=min(response_times) if response_times else 0,
            max_response_time=max(response_times) if response_times else 0,
            throughput=success_count / total_duration if total_duration > 0 else 0,
            errors=errors
        )

    def print_results(self):
        """Print test results in a formatted way"""
        print("\n" + "="*80)
        print("LOAD TEST RESULTS")
        print("="*80)
        
        for result in self.results:
            print(f"\n{result.test_name}")
            print("-" * len(result.test_name))
            print(f"Success Rate: {result.success_count}/{result.success_count + result.failure_count} ({result.success_count/(result.success_count + result.failure_count)*100:.1f}%)")
            print(f"Total Duration: {result.total_duration:.2f}s")
            print(f"Average Response Time: {result.avg_response_time*1000:.2f}ms")
            print(f"Min Response Time: {result.min_response_time*1000:.2f}ms")
            print(f"Max Response Time: {result.max_response_time*1000:.2f}ms")
            print(f"Throughput: {result.throughput:.2f} operations/second")
            
            if result.errors:
                print(f"Errors ({len(result.errors)}):")
                for error in result.errors[:5]:  # Show first 5 errors
                    print(f"  - {error}")
                if len(result.errors) > 5:
                    print(f"  ... and {len(result.errors) - 5} more errors")
        
        # Summary
        total_success = sum(r.success_count for r in self.results)
        total_failure = sum(r.failure_count for r in self.results)
        avg_response_time = statistics.mean([r.avg_response_time for r in self.results if r.avg_response_time > 0])
        
        print(f"\nSUMMARY")
        print("-" * 20)
        print(f"Overall Success Rate: {total_success}/{total_success + total_failure} ({total_success/(total_success + total_failure)*100:.1f}%)")
        print(f"Average Response Time: {avg_response_time*1000:.2f}ms")
        print(f"Total Tests Run: {len(self.results)}")

    async def run_all_tests(self, stress_duration: int = 1):
        """Run all load tests"""
        logger.info("Starting comprehensive load testing...")
        
        # Clean up any existing connections
        for conn in self.active_connections:
            try:
                await conn.close()
            except:
                pass
        self.active_connections.clear()
        
        # Run tests
        tests = [
            self.test_concurrent_connections(50),
            self.test_room_management(20, 5),
            self.test_message_throughput(500, 5),
            self.test_webrtc_signaling(10),
            self.test_api_endpoints(),
            self.run_stress_test(stress_duration)
        ]
        
        for test in tests:
            try:
                result = await test
                self.results.append(result)
            except Exception as e:
                logger.error(f"Test failed: {e}")
        
        # Clean up
        for conn in self.active_connections:
            try:
                await conn.close()
            except:
                pass
        
        self.print_results()

async def main():
    parser = argparse.ArgumentParser(description='Load test the Strategic AI Platform WebRTC signaling server')
    parser.add_argument('--host', default='localhost', help='Server host')
    parser.add_argument('--port', default='8000', help='Server port')
    parser.add_argument('--stress-duration', type=int, default=1, help='Stress test duration in minutes')
    parser.add_argument('--test', choices=['all', 'connections', 'rooms', 'throughput', 'signaling', 'api', 'stress'], 
                       default='all', help='Specific test to run')
    
    args = parser.parse_args()
    
    base_url = f"ws://{args.host}:{args.port}"
    tester = LoadTester(base_url)
    
    if args.test == 'all':
        await tester.run_all_tests(args.stress_duration)
    elif args.test == 'connections':
        result = await tester.test_concurrent_connections(100)
        tester.results.append(result)
        tester.print_results()
    elif args.test == 'rooms':
        result = await tester.test_room_management(50, 10)
        tester.results.append(result)
        tester.print_results()
    elif args.test == 'throughput':
        result = await tester.test_message_throughput(1000, 10)
        tester.results.append(result)
        tester.print_results()
    elif args.test == 'signaling':
        result = await tester.test_webrtc_signaling(20)
        tester.results.append(result)
        tester.print_results()
    elif args.test == 'api':
        result = await tester.test_api_endpoints()
        tester.results.append(result)
        tester.print_results()
    elif args.test == 'stress':
        result = await tester.run_stress_test(args.stress_duration)
        tester.results.append(result)
        tester.print_results()

if __name__ == "__main__":
    asyncio.run(main())
