"""
Stream Processing Service
High-performance data stream processing using Apache Kafka for real-time analytics
"""

import asyncio
import json
import logging
from typing import Dict, List, Any, Optional, Callable
from datetime import datetime
from dataclasses import dataclass, asdict
from kafka import KafkaProducer, KafkaConsumer
from kafka.errors import KafkaError
import redis
import pickle

logger = logging.getLogger(__name__)

@dataclass
class StreamMessage:
    topic: str
    key: str
    value: Dict[str, Any]
    timestamp: datetime
    source: str
    message_id: str

class StreamProcessor:
    """High-performance stream processing for real-time data analytics"""
    
    def __init__(self, kafka_bootstrap_servers: str = "localhost:9092", 
                 redis_host: str = "localhost", redis_port: int = 6379):
        self.kafka_bootstrap_servers = kafka_bootstrap_servers
        self.redis_host = redis_host
        self.redis_port = redis_port
        
        self.producer = None
        self.consumers = {}
        self.redis_client = None
        self.stream_processors = {}
        self.running = False
        
    async def initialize(self):
        """Initialize Kafka producer, consumers, and Redis client"""
        try:
            # Initialize Kafka producer
            self.producer = KafkaProducer(
                bootstrap_servers=self.kafka_bootstrap_servers,
                value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                key_serializer=lambda k: k.encode('utf-8') if k else None,
                acks='all',
                retries=3,
                batch_size=16384,
                linger_ms=10,
                compression_type='gzip'
            )
            
            # Initialize Redis client
            self.redis_client = redis.Redis(
                host=self.redis_host,
                port=self.redis_port,
                decode_responses=True
            )
            
            # Test connections
            await self._test_connections()
            
            logger.info("Stream processor initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize stream processor: {e}")
            raise
            
    async def _test_connections(self):
        """Test Kafka and Redis connections"""
        try:
            # Test Kafka
            future = self.producer.send('test-topic', {'test': 'message'})
            future.get(timeout=10)
            
            # Test Redis
            self.redis_client.ping()
            
            logger.info("All connections tested successfully")
            
        except Exception as e:
            logger.error(f"Connection test failed: {e}")
            raise
            
    async def publish_market_data(self, symbol: str, data: Dict[str, Any]):
        """Publish market data to Kafka topic"""
        try:
            message = {
                "symbol": symbol,
                "data": data,
                "timestamp": datetime.now().isoformat(),
                "source": "market_data"
            }
            
            future = self.producer.send(
                'market-data',
                key=symbol,
                value=message
            )
            
            # Wait for confirmation
            record_metadata = future.get(timeout=10)
            logger.debug(f"Published market data for {symbol} to partition {record_metadata.partition}")
            
        except KafkaError as e:
            logger.error(f"Failed to publish market data for {symbol}: {e}")
            
    async def publish_trade_data(self, country: str, data: Dict[str, Any]):
        """Publish trade/tariff data to Kafka topic"""
        try:
            message = {
                "country": country,
                "data": data,
                "timestamp": datetime.now().isoformat(),
                "source": "trade_data"
            }
            
            future = self.producer.send(
                'trade-data',
                key=country,
                value=message
            )
            
            record_metadata = future.get(timeout=10)
            logger.debug(f"Published trade data for {country} to partition {record_metadata.partition}")
            
        except KafkaError as e:
            logger.error(f"Failed to publish trade data for {country}: {e}")
            
    async def publish_government_data(self, country: str, data: Dict[str, Any]):
        """Publish government policy data to Kafka topic"""
        try:
            message = {
                "country": country,
                "data": data,
                "timestamp": datetime.now().isoformat(),
                "source": "government_data"
            }
            
            future = self.producer.send(
                'government-data',
                key=country,
                value=message
            )
            
            record_metadata = future.get(timeout=10)
            logger.debug(f"Published government data for {country} to partition {record_metadata.partition}")
            
        except KafkaError as e:
            logger.error(f"Failed to publish government data for {country}: {e}")
            
    async def start_consumer(self, topic: str, group_id: str, 
                           processor: Callable[[Dict[str, Any]], None]):
        """Start a Kafka consumer for a specific topic"""
        try:
            consumer = KafkaConsumer(
                topic,
                bootstrap_servers=self.kafka_bootstrap_servers,
                group_id=group_id,
                value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                key_deserializer=lambda m: m.decode('utf-8') if m else None,
                auto_offset_reset='latest',
                enable_auto_commit=True,
                auto_commit_interval_ms=1000,
                max_poll_records=500,
                session_timeout_ms=30000,
                heartbeat_interval_ms=10000
            )
            
            self.consumers[topic] = consumer
            self.stream_processors[topic] = processor
            
            # Start consumer in background task
            asyncio.create_task(self._consume_messages(topic, consumer, processor))
            
            logger.info(f"Started consumer for topic {topic}")
            
        except Exception as e:
            logger.error(f"Failed to start consumer for topic {topic}: {e}")
            
    async def _consume_messages(self, topic: str, consumer: KafkaConsumer, 
                              processor: Callable[[Dict[str, Any]], None]):
        """Consume messages from Kafka topic"""
        try:
            for message in consumer:
                try:
                    # Process message
                    await processor(message.value)
                    
                    # Cache in Redis for fast access
                    await self._cache_message(topic, message.key, message.value)
                    
                except Exception as e:
                    logger.error(f"Error processing message from {topic}: {e}")
                    continue
                    
        except Exception as e:
            logger.error(f"Consumer error for topic {topic}: {e}")
            
    async def _cache_message(self, topic: str, key: str, value: Dict[str, Any]):
        """Cache message in Redis for fast access"""
        try:
            cache_key = f"{topic}:{key}"
            self.redis_client.setex(
                cache_key,
                3600,  # 1 hour TTL
                json.dumps(value)
            )
            
        except Exception as e:
            logger.error(f"Failed to cache message: {e}")
            
    async def get_cached_data(self, topic: str, key: str) -> Optional[Dict[str, Any]]:
        """Get cached data from Redis"""
        try:
            cache_key = f"{topic}:{key}"
            data = self.redis_client.get(cache_key)
            
            if data:
                return json.loads(data)
            return None
            
        except Exception as e:
            logger.error(f"Failed to get cached data: {e}")
            return None
            
    async def get_latest_data(self, topic: str, limit: int = 100) -> List[Dict[str, Any]]:
        """Get latest data from a topic"""
        try:
            # Get from Redis cache first
            pattern = f"{topic}:*"
            keys = self.redis_client.keys(pattern)
            
            if not keys:
                return []
                
            # Get latest data
            data_list = []
            for key in keys[:limit]:
                data = self.redis_client.get(key)
                if data:
                    data_list.append(json.loads(data))
                    
            # Sort by timestamp
            data_list.sort(key=lambda x: x.get('timestamp', ''), reverse=True)
            
            return data_list
            
        except Exception as e:
            logger.error(f"Failed to get latest data: {e}")
            return []
            
    async def start_real_time_analytics(self):
        """Start real-time analytics processing"""
        try:
            # Market data analytics
            await self.start_consumer(
                'market-data',
                'market-analytics-group',
                self._process_market_analytics
            )
            
            # Trade data analytics
            await self.start_consumer(
                'trade-data',
                'trade-analytics-group',
                self._process_trade_analytics
            )
            
            # Government data analytics
            await self.start_consumer(
                'government-data',
                'government-analytics-group',
                self._process_government_analytics
            )
            
            self.running = True
            logger.info("Real-time analytics started")
            
        except Exception as e:
            logger.error(f"Failed to start real-time analytics: {e}")
            
    async def _process_market_analytics(self, message: Dict[str, Any]):
        """Process market data for real-time analytics"""
        try:
            symbol = message.get('symbol')
            data = message.get('data', {})
            
            # Calculate real-time metrics
            price = data.get('price', 0)
            volume = data.get('volume', 0)
            
            # Store in Redis for dashboard
            analytics_key = f"analytics:market:{symbol}"
            analytics_data = {
                "symbol": symbol,
                "price": price,
                "volume": volume,
                "timestamp": message.get('timestamp'),
                "metrics": {
                    "price_change": data.get('change', 0),
                    "volume_trend": "increasing" if volume > 1000000 else "normal"
                }
            }
            
            self.redis_client.setex(
                analytics_key,
                300,  # 5 minutes TTL
                json.dumps(analytics_data)
            )
            
            logger.debug(f"Processed market analytics for {symbol}")
            
        except Exception as e:
            logger.error(f"Error processing market analytics: {e}")
            
    async def _process_trade_analytics(self, message: Dict[str, Any]):
        """Process trade data for real-time analytics"""
        try:
            country = message.get('country')
            data = message.get('data', {})
            
            # Calculate trade metrics
            tariff_rate = data.get('tariff_rate', 0)
            
            analytics_key = f"analytics:trade:{country}"
            analytics_data = {
                "country": country,
                "tariff_rate": tariff_rate,
                "timestamp": message.get('timestamp'),
                "metrics": {
                    "tariff_trend": "increasing" if tariff_rate > 0.1 else "stable",
                    "impact_score": min(tariff_rate * 10, 1.0)
                }
            }
            
            self.redis_client.setex(
                analytics_key,
                3600,  # 1 hour TTL
                json.dumps(analytics_data)
            )
            
            logger.debug(f"Processed trade analytics for {country}")
            
        except Exception as e:
            logger.error(f"Error processing trade analytics: {e}")
            
    async def _process_government_analytics(self, message: Dict[str, Any]):
        """Process government data for real-time analytics"""
        try:
            country = message.get('country')
            data = message.get('data', {})
            
            # Calculate policy impact
            impact_score = data.get('impact_score', 0)
            policy_type = data.get('policy_type', '')
            
            analytics_key = f"analytics:government:{country}"
            analytics_data = {
                "country": country,
                "policy_type": policy_type,
                "impact_score": impact_score,
                "timestamp": message.get('timestamp'),
                "metrics": {
                    "risk_level": "high" if impact_score > 0.7 else "medium" if impact_score > 0.4 else "low",
                    "policy_impact": impact_score
                }
            }
            
            self.redis_client.setex(
                analytics_key,
                3600,  # 1 hour TTL
                json.dumps(analytics_data)
            )
            
            logger.debug(f"Processed government analytics for {country}")
            
        except Exception as e:
            logger.error(f"Error processing government analytics: {e}")
            
    async def get_real_time_metrics(self, data_type: str) -> Dict[str, Any]:
        """Get real-time metrics for dashboard"""
        try:
            pattern = f"analytics:{data_type}:*"
            keys = self.redis_client.keys(pattern)
            
            metrics = {}
            for key in keys:
                data = self.redis_client.get(key)
                if data:
                    parsed_data = json.loads(data)
                    identifier = key.split(':')[-1]  # Get symbol/country
                    metrics[identifier] = parsed_data
                    
            return {
                "data_type": data_type,
                "timestamp": datetime.now().isoformat(),
                "metrics": metrics,
                "total_count": len(metrics)
            }
            
        except Exception as e:
            logger.error(f"Failed to get real-time metrics: {e}")
            return {}
            
    async def close(self):
        """Close all connections"""
        try:
            self.running = False
            
            # Close consumers
            for consumer in self.consumers.values():
                consumer.close()
                
            # Close producer
            if self.producer:
                self.producer.close()
                
            # Close Redis
            if self.redis_client:
                self.redis_client.close()
                
            logger.info("Stream processor closed")
            
        except Exception as e:
            logger.error(f"Error closing stream processor: {e}")

# Global instance
stream_processor = StreamProcessor()
