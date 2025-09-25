from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import asyncio

from app.api.v1.router import api_router
from app.api.v1.websocket import router as websocket_router
from app.core.config import settings
from app.db.session import engine
from app.db.models import Base
from app.services.data_acquisition import data_service
from app.services.stream_processor import stream_processor
from app.services.realtime_data_simulator import realtime_simulator

# Configure logging
logging.basicConfig(level=getattr(logging, settings.log_level))
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("Starting StrategicAI Platform...")
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created")
    
    # Initialize data acquisition service
    try:
        await data_service.initialize()
        logger.info("Data acquisition service initialized")
    except Exception as e:
        logger.error(f"Failed to initialize data acquisition service: {e}")
    
    # Initialize stream processor
    try:
        await stream_processor.initialize()
        await stream_processor.start_real_time_analytics()
        logger.info("Stream processor initialized")
    except Exception as e:
        logger.error(f"Failed to initialize stream processor: {e}")
    
    # Start real-time data simulator
    simulator_task = None
    try:
        simulator_task = asyncio.create_task(realtime_simulator.start())
        logger.info("Real-time data simulator started")
    except Exception as e:
        logger.error(f"Failed to start data simulator: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down StrategicAI Platform...")
    
    # Stop data simulator
    if simulator_task:
        await realtime_simulator.stop()
        simulator_task.cancel()
        try:
            await simulator_task
        except asyncio.CancelledError:
            pass
        logger.info("Real-time data simulator stopped")
    
    # Close data service
    try:
        await data_service.close()
        logger.info("Data acquisition service closed")
    except Exception as e:
        logger.error(f"Error closing data acquisition service: {e}")
    
    # Close stream processor
    try:
        await stream_processor.close()
        logger.info("Stream processor closed")
    except Exception as e:
        logger.error(f"Error closing stream processor: {e}")

app = FastAPI(
    title="StrategicAI Platform",
    description="World-Class Business Intelligence & Multi-Agent Orchestration System",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
if settings.enable_cors:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include API routes
app.include_router(api_router, prefix="/api/v1")
app.include_router(websocket_router)  # WebSocket routes at root level

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "StrategicAI Platform - Business Intelligence & Multi-Agent Orchestration",
        "version": "1.0.0",
        "status": "operational",
        "features": [
            "Real-time market data acquisition",
            "Government policy monitoring",
            "Trade tariff analysis",
            "Quantitative risk assessment",
            "Portfolio optimization",
            "Multi-agent orchestration",
            "Stream processing analytics"
        ],
        "data_sources": [
            "Finage API (55+ global markets)",
            "Finnhub (real-time global data)",
            "Alpha Vantage (technical indicators)",
            "Marketstack (EOD data)",
            "WTO Tariff Data (150+ economies)",
            "UK GOV Trade Tariff API",
            "DBT Data API"
        ],
        "endpoints": {
            "health": "/api/v1/health",
            "intelligence": "/api/v1/intel",
            "simulations": "/api/v1/simulations",
            "agents": "/api/v1/agents",
            "quantitative_data": "/api/v1/quant",
            "stream_analytics": "/api/v1/streams"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": "2024-01-01T00:00:00Z",
        "services": {
            "api": "operational",
            "database": "operational",
            "data_acquisition": "operational" if data_service else "not_initialized",
            "stream_processing": "operational" if stream_processor.running else "not_initialized"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level=settings.log_level.lower()
    )