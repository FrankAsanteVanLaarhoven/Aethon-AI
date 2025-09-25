from fastapi import APIRouter
from .health import router as health_router
from .intelligence import router as intelligence_router
from .simulations import router as simulations_router
from .agents import router as agents_router
from .quant_data import router as quant_data_router
from .stream_analytics import router as stream_analytics_router
from .regulatory_prophecy import router as regulatory_prophecy_router
from .sovereign_security import router as sovereign_security_router
from .qeso import router as qeso_router
from .abme import router as abme_router
from .chess_bi import router as chess_bi_router
from .qemasi_mock import router as qemasi_router
from .webrtc_signaling import router as webrtc_router


api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(intelligence_router, prefix="/intel", tags=["intelligence"])
api_router.include_router(simulations_router, prefix="/simulations", tags=["simulations"])
api_router.include_router(agents_router, tags=["agents"])
api_router.include_router(quant_data_router, prefix="/quant", tags=["quantitative-data"])
api_router.include_router(stream_analytics_router, prefix="/streams", tags=["stream-analytics"])
api_router.include_router(regulatory_prophecy_router, prefix="/regulatory-prophecy", tags=["regulatory-prophecy"])
api_router.include_router(sovereign_security_router, prefix="/sovereign-security", tags=["sovereign-security"])
api_router.include_router(qeso_router, prefix="/qeso", tags=["quantum-optimization"])
api_router.include_router(abme_router, prefix="/abme", tags=["autonomous-execution"])
api_router.include_router(chess_bi_router, tags=["chess-business-intelligence"])
api_router.include_router(qemasi_router, tags=["qemasi-quantum-intelligence"])
api_router.include_router(webrtc_router, prefix="/webrtc", tags=["webrtc-signaling"])

