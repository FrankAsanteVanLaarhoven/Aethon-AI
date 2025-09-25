"""
Stream Analytics API Endpoints
Real-time analytics and monitoring for data streams
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import asyncio
import logging

from app.services.stream_processor import stream_processor

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/streams/status")
async def get_stream_status() -> Dict[str, Any]:
    """Get status of all data streams"""
    try:
        return {
            "status": "success",
            "streams": {
                "market_data": {
                    "status": "active" if stream_processor.running else "inactive",
                    "topic": "market-data",
                    "consumers": len([c for c in stream_processor.consumers.keys() if 'market' in c]),
                    "last_update": datetime.now().isoformat()
                },
                "trade_data": {
                    "status": "active" if stream_processor.running else "inactive",
                    "topic": "trade-data",
                    "consumers": len([c for c in stream_processor.consumers.keys() if 'trade' in c]),
                    "last_update": datetime.now().isoformat()
                },
                "government_data": {
                    "status": "active" if stream_processor.running else "inactive",
                    "topic": "government-data",
                    "consumers": len([c for c in stream_processor.consumers.keys() if 'government' in c]),
                    "last_update": datetime.now().isoformat()
                }
            },
            "kafka_status": "connected" if stream_processor.producer else "disconnected",
            "redis_status": "connected" if stream_processor.redis_client else "disconnected",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting stream status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/streams/metrics/{data_type}")
async def get_stream_metrics(data_type: str) -> Dict[str, Any]:
    """Get real-time metrics for a specific data type"""
    try:
        valid_types = ["market", "trade", "government"]
        if data_type not in valid_types:
            raise HTTPException(status_code=400, detail=f"Invalid data type. Must be one of: {valid_types}")
        
        metrics = await stream_processor.get_real_time_metrics(data_type)
        
        return {
            "status": "success",
            "data_type": data_type,
            "metrics": metrics,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting stream metrics for {data_type}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/streams/latest/{topic}")
async def get_latest_stream_data(
    topic: str,
    limit: int = 100
) -> Dict[str, Any]:
    """Get latest data from a specific stream topic"""
    try:
        valid_topics = ["market-data", "trade-data", "government-data"]
        if topic not in valid_topics:
            raise HTTPException(status_code=400, detail=f"Invalid topic. Must be one of: {valid_topics}")
        
        latest_data = await stream_processor.get_latest_data(topic, limit)
        
        return {
            "status": "success",
            "topic": topic,
            "limit": limit,
            "data": latest_data,
            "count": len(latest_data),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting latest data for topic {topic}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/streams/cached/{topic}/{key}")
async def get_cached_stream_data(topic: str, key: str) -> Dict[str, Any]:
    """Get cached data from a specific topic and key"""
    try:
        cached_data = await stream_processor.get_cached_data(topic, key)
        
        if not cached_data:
            raise HTTPException(status_code=404, detail="Data not found in cache")
        
        return {
            "status": "success",
            "topic": topic,
            "key": key,
            "data": cached_data,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting cached data for {topic}/{key}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/streams/publish/market")
async def publish_market_data(
    symbol: str,
    data: Dict[str, Any],
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """Publish market data to stream"""
    try:
        background_tasks.add_task(
            stream_processor.publish_market_data,
            symbol,
            data
        )
        
        return {
            "status": "success",
            "message": f"Market data for {symbol} queued for publishing",
            "symbol": symbol,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error publishing market data for {symbol}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/streams/publish/trade")
async def publish_trade_data(
    country: str,
    data: Dict[str, Any],
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """Publish trade data to stream"""
    try:
        background_tasks.add_task(
            stream_processor.publish_trade_data,
            country,
            data
        )
        
        return {
            "status": "success",
            "message": f"Trade data for {country} queued for publishing",
            "country": country,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error publishing trade data for {country}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/streams/publish/government")
async def publish_government_data(
    country: str,
    data: Dict[str, Any],
    background_tasks: BackgroundTasks
) -> Dict[str, Any]:
    """Publish government data to stream"""
    try:
        background_tasks.add_task(
            stream_processor.publish_government_data,
            country,
            data
        )
        
        return {
            "status": "success",
            "message": f"Government data for {country} queued for publishing",
            "country": country,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error publishing government data for {country}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/streams/initialize")
async def initialize_stream_processor(background_tasks: BackgroundTasks) -> Dict[str, Any]:
    """Initialize the stream processor"""
    try:
        background_tasks.add_task(stream_processor.initialize)
        background_tasks.add_task(stream_processor.start_real_time_analytics)
        
        return {
            "status": "success",
            "message": "Stream processor initialization started",
            "services": [
                "Kafka producer and consumers",
                "Redis caching layer",
                "Real-time analytics processing",
                "Data stream monitoring"
            ],
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error initializing stream processor: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/streams/analytics/dashboard")
async def get_analytics_dashboard() -> Dict[str, Any]:
    """Get comprehensive analytics dashboard data"""
    try:
        # Get metrics for all data types
        market_metrics = await stream_processor.get_real_time_metrics("market")
        trade_metrics = await stream_processor.get_real_time_metrics("trade")
        government_metrics = await stream_processor.get_real_time_metrics("government")
        
        # Calculate summary statistics
        total_market_symbols = len(market_metrics.get("metrics", {}))
        total_trade_countries = len(trade_metrics.get("metrics", {}))
        total_government_policies = len(government_metrics.get("metrics", {}))
        
        # Calculate average metrics
        market_prices = []
        trade_tariffs = []
        government_impacts = []
        
        for symbol_data in market_metrics.get("metrics", {}).values():
            if "price" in symbol_data:
                market_prices.append(symbol_data["price"])
        
        for country_data in trade_metrics.get("metrics", {}).values():
            if "tariff_rate" in country_data:
                trade_tariffs.append(country_data["tariff_rate"])
        
        for country_data in government_metrics.get("metrics", {}).values():
            if "impact_score" in country_data:
                government_impacts.append(country_data["impact_score"])
        
        avg_market_price = sum(market_prices) / len(market_prices) if market_prices else 0
        avg_tariff_rate = sum(trade_tariffs) / len(trade_tariffs) if trade_tariffs else 0
        avg_impact_score = sum(government_impacts) / len(government_impacts) if government_impacts else 0
        
        return {
            "status": "success",
            "dashboard": {
                "summary": {
                    "total_market_symbols": total_market_symbols,
                    "total_trade_countries": total_trade_countries,
                    "total_government_policies": total_government_policies,
                    "avg_market_price": round(avg_market_price, 2),
                    "avg_tariff_rate": round(avg_tariff_rate, 4),
                    "avg_impact_score": round(avg_impact_score, 3)
                },
                "market_data": market_metrics,
                "trade_data": trade_metrics,
                "government_data": government_metrics,
                "stream_status": {
                    "kafka_connected": stream_processor.producer is not None,
                    "redis_connected": stream_processor.redis_client is not None,
                    "analytics_running": stream_processor.running,
                    "active_consumers": len(stream_processor.consumers)
                }
            },
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"Error getting analytics dashboard: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/streams/health")
async def get_stream_health() -> Dict[str, Any]:
    """Get health status of all stream components"""
    try:
        health_status = {
            "overall_status": "healthy",
            "components": {},
            "timestamp": datetime.now().isoformat()
        }
        
        # Check Kafka producer
        try:
            if stream_processor.producer:
                # Test producer
                future = stream_processor.producer.send('health-check', {'test': 'message'})
                future.get(timeout=5)
                health_status["components"]["kafka_producer"] = "healthy"
            else:
                health_status["components"]["kafka_producer"] = "unhealthy"
                health_status["overall_status"] = "degraded"
        except Exception:
            health_status["components"]["kafka_producer"] = "unhealthy"
            health_status["overall_status"] = "degraded"
        
        # Check Redis
        try:
            if stream_processor.redis_client:
                stream_processor.redis_client.ping()
                health_status["components"]["redis"] = "healthy"
            else:
                health_status["components"]["redis"] = "unhealthy"
                health_status["overall_status"] = "degraded"
        except Exception:
            health_status["components"]["redis"] = "unhealthy"
            health_status["overall_status"] = "degraded"
        
        # Check consumers
        active_consumers = len(stream_processor.consumers)
        if active_consumers > 0:
            health_status["components"]["kafka_consumers"] = f"healthy ({active_consumers} active)"
        else:
            health_status["components"]["kafka_consumers"] = "unhealthy"
            health_status["overall_status"] = "degraded"
        
        # Check analytics processing
        if stream_processor.running:
            health_status["components"]["analytics_processing"] = "healthy"
        else:
            health_status["components"]["analytics_processing"] = "unhealthy"
            health_status["overall_status"] = "degraded"
        
        return health_status
        
    except Exception as e:
        logger.error(f"Error checking stream health: {e}")
        raise HTTPException(status_code=500, detail=str(e))
