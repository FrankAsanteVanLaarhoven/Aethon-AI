"""
AethonAI Intelligence API Endpoints
RESTful API for Strategic Intelligence Platform
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import logging
import uuid

from ..services.data_orchestrator import (
    AethonDataOrchestrator, 
    IntelligenceQuery, 
    QueryType,
    data_orchestrator
)
from ..services.osint_data_sources import get_source_count, get_active_sources, ALL_DATA_SOURCES
from ..models.intelligence import (
    IntelligenceRequest,
    IntelligenceResponse,
    DataSourceStatus,
    AnalysisStatus
)

logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/intelligence", tags=["intelligence"])

# In-memory storage for analysis results (in production, use Redis or database)
analysis_results = {}
analysis_status = {}

@router.post("/analyze", response_model=IntelligenceResponse)
async def analyze_intelligence(
    request: IntelligenceRequest,
    background_tasks: BackgroundTasks
):
    """
    Main intelligence analysis endpoint
    Initiates comprehensive strategic intelligence analysis
    """
    try:
        # Generate unique query ID
        query_id = str(uuid.uuid4())
        
        # Create intelligence query
        query = IntelligenceQuery(
            id=query_id,
            query_type=QueryType(request.query_type),
            keywords=request.keywords,
            industry=request.industry,
            geography=request.geography,
            time_range=timedelta(days=request.time_range_days) if request.time_range_days else None,
            priority=request.priority,
            user_id=request.user_id
        )
        
        # Set initial status
        analysis_status[query_id] = AnalysisStatus(
            query_id=query_id,
            status="processing",
            progress=0,
            message="Initializing intelligence analysis...",
            created_at=datetime.utcnow()
        )
        
        # Start background processing
        background_tasks.add_task(
            process_intelligence_analysis,
            query_id,
            query
        )
        
        return IntelligenceResponse(
            query_id=query_id,
            status="processing",
            message="Intelligence analysis initiated successfully",
            estimated_completion_time=datetime.utcnow() + timedelta(minutes=5)
        )
        
    except Exception as e:
        logger.error(f"Error initiating intelligence analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{query_id}", response_model=AnalysisStatus)
async def get_analysis_status(query_id: str):
    """Get the status of an intelligence analysis"""
    if query_id not in analysis_status:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return analysis_status[query_id]

@router.get("/results/{query_id}")
async def get_analysis_results(query_id: str):
    """Get the results of a completed intelligence analysis"""
    if query_id not in analysis_results:
        raise HTTPException(status_code=404, detail="Analysis results not found")
    
    return analysis_results[query_id]

@router.get("/sources", response_model=Dict[str, Any])
async def get_available_sources():
    """Return available data sources and their status"""
    try:
        active_sources = get_active_sources()
        total_sources = get_source_count()
        
        # Categorize sources
        source_categories = {}
        for category, sources in ALL_DATA_SOURCES.items():
            if isinstance(sources, dict):
                source_categories[category] = len(sources)
            else:
                source_categories[category] = 1
        
        return {
            "total_sources": total_sources,
            "active_sources": len(active_sources),
            "source_categories": source_categories,
            "real_time_feeds": sum(1 for sources in ALL_DATA_SOURCES.values() 
                                 if isinstance(sources, dict) and 
                                 any("real_time" in str(config).lower() or "live" in str(config).lower() 
                                     for config in sources.values())),
            "update_frequency": "real-time to daily",
            "coverage": {
                "geographic": "150+ countries",
                "languages": "25+ languages",
                "industries": "20+ verticals",
                "data_types": ["news", "social", "regulatory", "financial", "research"]
            }
        }
        
    except Exception as e:
        logger.error(f"Error getting data sources: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sources/{source_type}")
async def get_source_details(source_type: str):
    """Get detailed information about a specific source type"""
    if source_type not in ALL_DATA_SOURCES:
        raise HTTPException(status_code=404, detail="Source type not found")
    
    sources = ALL_DATA_SOURCES[source_type]
    
    if isinstance(sources, dict):
        return {
            "source_type": source_type,
            "total_sources": len(sources),
            "sources": sources,
            "status": "active"
        }
    else:
        return {
            "source_type": source_type,
            "total_sources": 1,
            "sources": {source_type: sources},
            "status": "active"
        }

@router.post("/quick-analysis")
async def quick_analysis(request: IntelligenceRequest):
    """Quick analysis for immediate insights (synchronous)"""
    try:
        # Generate query ID
        query_id = str(uuid.uuid4())
        
        # Create query
        query = IntelligenceQuery(
            id=query_id,
            query_type=QueryType(request.query_type),
            keywords=request.keywords,
            industry=request.industry,
            geography=request.geography,
            time_range=timedelta(days=request.time_range_days) if request.time_range_days else None,
            priority=request.priority,
            user_id=request.user_id
        )
        
        # Perform quick analysis
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        return {
            "query_id": query_id,
            "status": "completed",
            "intelligence": result.insights,
            "sources_analyzed": result.sources_analyzed,
            "processing_time": result.processing_time,
            "confidence_score": result.confidence_score,
            "recommendations": result.recommendations,
            "created_at": result.created_at.isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error in quick analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights/regulatory")
async def get_regulatory_insights(
    industry: Optional[str] = None,
    geography: Optional[str] = None,
    days_back: int = 30
):
    """Get regulatory insights for specific industry/geography"""
    try:
        # Create regulatory query
        query = IntelligenceQuery(
            id=str(uuid.uuid4()),
            query_type=QueryType.REGULATORY,
            keywords=["regulation", "compliance", "policy"],
            industry=industry,
            geography=geography,
            time_range=timedelta(days=days_back)
        )
        
        # Get regulatory insights
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        return {
            "regulatory_insights": result.insights.get("regulatory", []),
            "analysis_period": f"{days_back} days",
            "industry": industry or "All industries",
            "geography": geography or "Global",
            "confidence_score": result.confidence_score,
            "sources_analyzed": result.sources_analyzed
        }
        
    except Exception as e:
        logger.error(f"Error getting regulatory insights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights/competitive")
async def get_competitive_insights(
    industry: Optional[str] = None,
    geography: Optional[str] = None
):
    """Get competitive intelligence insights"""
    try:
        # Create competitive query
        query = IntelligenceQuery(
            id=str(uuid.uuid4()),
            query_type=QueryType.COMPETITIVE,
            keywords=["competitor", "market", "competition"],
            industry=industry,
            geography=geography
        )
        
        # Get competitive insights
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        return {
            "competitive_insights": result.insights.get("competitive", []),
            "industry": industry or "All industries",
            "geography": geography or "Global",
            "confidence_score": result.confidence_score,
            "sources_analyzed": result.sources_analyzed
        }
        
    except Exception as e:
        logger.error(f"Error getting competitive insights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights/financial")
async def get_financial_insights(
    industry: Optional[str] = None,
    geography: Optional[str] = None
):
    """Get financial intelligence insights"""
    try:
        # Create financial query
        query = IntelligenceQuery(
            id=str(uuid.uuid4()),
            query_type=QueryType.FINANCIAL,
            keywords=["financial", "market", "performance"],
            industry=industry,
            geography=geography
        )
        
        # Get financial insights
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        return {
            "financial_insights": result.insights.get("financial", []),
            "industry": industry or "All industries",
            "geography": geography or "Global",
            "confidence_score": result.confidence_score,
            "sources_analyzed": result.sources_analyzed
        }
        
    except Exception as e:
        logger.error(f"Error getting financial insights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights/risk")
async def get_risk_insights(
    industry: Optional[str] = None,
    geography: Optional[str] = None
):
    """Get risk assessment insights"""
    try:
        # Create risk query
        query = IntelligenceQuery(
            id=str(uuid.uuid4()),
            query_type=QueryType.RISK,
            keywords=["risk", "threat", "vulnerability"],
            industry=industry,
            geography=geography
        )
        
        # Get risk insights
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        return {
            "risk_insights": result.insights.get("risk", []),
            "industry": industry or "All industries",
            "geography": geography or "Global",
            "confidence_score": result.confidence_score,
            "sources_analyzed": result.sources_analyzed
        }
        
    except Exception as e:
        logger.error(f"Error getting risk insights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights/opportunity")
async def get_opportunity_insights(
    industry: Optional[str] = None,
    geography: Optional[str] = None
):
    """Get opportunity assessment insights"""
    try:
        # Create opportunity query
        query = IntelligenceQuery(
            id=str(uuid.uuid4()),
            query_type=QueryType.OPPORTUNITY,
            keywords=["opportunity", "growth", "market"],
            industry=industry,
            geography=geography
        )
        
        # Get opportunity insights
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        return {
            "opportunity_insights": result.insights.get("opportunity", []),
            "industry": industry or "All industries",
            "geography": geography or "Global",
            "confidence_score": result.confidence_score,
            "sources_analyzed": result.sources_analyzed
        }
        
    except Exception as e:
        logger.error(f"Error getting opportunity insights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    """Health check endpoint for the intelligence service"""
    try:
        # Check if orchestrator is available
        orchestrator_status = "healthy" if data_orchestrator else "unhealthy"
        
        return {
            "status": "healthy",
            "service": "AethonAI Intelligence API",
            "version": "1.0.0",
            "orchestrator_status": orchestrator_status,
            "active_analyses": len(analysis_status),
            "completed_analyses": len(analysis_results),
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }

# Background task function
async def process_intelligence_analysis(query_id: str, query: IntelligenceQuery):
    """Background task to process intelligence analysis"""
    try:
        # Update status
        analysis_status[query_id] = AnalysisStatus(
            query_id=query_id,
            status="processing",
            progress=25,
            message="Collecting data from sources...",
            created_at=datetime.utcnow()
        )
        
        # Perform analysis
        result = await data_orchestrator.orchestrate_intelligence_gathering(query)
        
        # Update status
        analysis_status[query_id] = AnalysisStatus(
            query_id=query_id,
            status="processing",
            progress=75,
            message="Generating strategic insights...",
            created_at=datetime.utcnow()
        )
        
        # Store results
        analysis_results[query_id] = {
            "query_id": query_id,
            "status": "completed",
            "intelligence": result.insights,
            "sources_analyzed": result.sources_analyzed,
            "processing_time": result.processing_time,
            "confidence_score": result.confidence_score,
            "recommendations": result.recommendations,
            "created_at": result.created_at.isoformat()
        }
        
        # Final status update
        analysis_status[query_id] = AnalysisStatus(
            query_id=query_id,
            status="completed",
            progress=100,
            message="Analysis completed successfully",
            created_at=datetime.utcnow()
        )
        
    except Exception as e:
        logger.error(f"Error in background analysis processing: {e}")
        analysis_status[query_id] = AnalysisStatus(
            query_id=query_id,
            status="failed",
            progress=0,
            message=f"Analysis failed: {str(e)}",
            created_at=datetime.utcnow()
        )

