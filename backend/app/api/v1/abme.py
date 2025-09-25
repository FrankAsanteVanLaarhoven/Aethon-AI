"""
API endpoints for Autonomous Business Model Execution (ABME)
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from pydantic import BaseModel
import logging

from app.services.revolutionary_features.abme import (
    abme_engine,
    BusinessModel,
    ExecutionPlan,
    ExecutionStatus
)

logger = logging.getLogger(__name__)
router = APIRouter()

class BusinessModelRequest(BaseModel):
    """Request model for business model creation"""
    name: str
    description: str
    target_market: str
    value_proposition: str
    revenue_streams: List[str]
    cost_structure: Dict[str, float]
    key_resources: List[str]
    key_activities: List[str]
    key_partnerships: List[str]
    customer_segments: List[str]
    channels: List[str]
    customer_relationships: List[str]

class ExecutionPlanRequest(BaseModel):
    """Request model for execution plan generation"""
    business_model: BusinessModelRequest
    timeline_months: int = 12
    budget: float = 1000000.0

class ExecutionResponse(BaseModel):
    """Response model for execution"""
    plan_id: str
    business_model_name: str
    execution_status: str
    progress_percentage: float
    autonomous_agents: List[str]
    ai_insights: List[str]
    timeline: Dict[str, str]
    resource_allocation: Dict[str, float]
    success_metrics: Dict[str, float]

@router.post("/initialize", response_model=Dict[str, Any])
async def initialize_execution_engine():
    """Initialize the autonomous execution engine"""
    try:
        result = await abme_engine.initialize_execution_engine()
        return result
    except Exception as e:
        logger.error(f"Failed to initialize execution engine: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/business-model", response_model=Dict[str, Any])
async def create_business_model(request: BusinessModelRequest):
    """Create a new business model"""
    try:
        business_model = await abme_engine.create_business_model(
            name=request.name,
            description=request.description,
            target_market=request.target_market,
            value_proposition=request.value_proposition,
            revenue_streams=request.revenue_streams,
            cost_structure=request.cost_structure,
            key_resources=request.key_resources,
            key_activities=request.key_activities,
            key_partnerships=request.key_partnerships,
            customer_segments=request.customer_segments,
            channels=request.channels,
            customer_relationships=request.customer_relationships
        )
        
        return {
            "model_id": business_model.model_id,
            "name": business_model.name,
            "description": business_model.description,
            "target_market": business_model.target_market,
            "value_proposition": business_model.value_proposition,
            "revenue_streams": business_model.revenue_streams,
            "cost_structure": business_model.cost_structure,
            "key_resources": business_model.key_resources,
            "key_activities": business_model.key_activities,
            "key_partnerships": business_model.key_partnerships,
            "customer_segments": business_model.customer_segments,
            "channels": business_model.channels,
            "customer_relationships": business_model.customer_relationships,
            "created_at": business_model.model_id.split('_')[1]  # Extract timestamp
        }
        
    except Exception as e:
        logger.error(f"Failed to create business model: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/execution-plan", response_model=Dict[str, Any])
async def generate_execution_plan(request: ExecutionPlanRequest):
    """Generate autonomous execution plan"""
    try:
        # Create business model first
        business_model = await abme_engine.create_business_model(
            name=request.business_model.name,
            description=request.business_model.description,
            target_market=request.business_model.target_market,
            value_proposition=request.business_model.value_proposition,
            revenue_streams=request.business_model.revenue_streams,
            cost_structure=request.business_model.cost_structure,
            key_resources=request.business_model.key_resources,
            key_activities=request.business_model.key_activities,
            key_partnerships=request.business_model.key_partnerships,
            customer_segments=request.business_model.customer_segments,
            channels=request.business_model.channels,
            customer_relationships=request.business_model.customer_relationships
        )
        
        # Generate execution plan
        execution_plan = await abme_engine.generate_execution_plan(
            business_model=business_model,
            timeline_months=request.timeline_months,
            budget=request.budget
        )
        
        return {
            "plan_id": execution_plan.plan_id,
            "business_model": {
                "model_id": execution_plan.business_model.model_id,
                "name": execution_plan.business_model.name,
                "description": execution_plan.business_model.description,
                "target_market": execution_plan.business_model.target_market,
                "value_proposition": execution_plan.business_model.value_proposition
            },
            "phases": {
                phase.value: {
                    "duration_days": info["duration_days"],
                    "activities": info["activities"],
                    "deliverables": info["deliverables"],
                    "autonomous_agents": info["autonomous_agents"]
                }
                for phase, info in execution_plan.phases.items()
            },
            "timeline": {
                key: value.isoformat() if hasattr(value, 'isoformat') else str(value)
                for key, value in execution_plan.timeline.items()
            },
            "resource_allocation": execution_plan.resource_allocation,
            "success_metrics": execution_plan.success_metrics,
            "risk_mitigation": execution_plan.risk_mitigation,
            "autonomous_agents": execution_plan.autonomous_agents,
            "execution_status": execution_plan.execution_status.value,
            "progress_percentage": execution_plan.progress_percentage,
            "ai_insights": execution_plan.ai_insights
        }
        
    except Exception as e:
        logger.error(f"Failed to generate execution plan: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/execute/{plan_id}", response_model=Dict[str, Any])
async def start_autonomous_execution(plan_id: str):
    """Start autonomous execution of business model"""
    try:
        # Find the execution plan
        execution_plan = None
        for plan in abme_engine.active_executions.values():
            if plan.plan_id == plan_id:
                execution_plan = plan
                break
        
        if not execution_plan:
            # Check in history
            for plan in abme_engine.execution_history:
                if plan.plan_id == plan_id:
                    execution_plan = plan
                    break
        
        if not execution_plan:
            raise HTTPException(status_code=404, detail="Execution plan not found")
        
        result = await abme_engine.start_autonomous_execution(execution_plan)
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to start autonomous execution: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/executions", response_model=Dict[str, Any])
async def get_execution_status():
    """Get status of all executions"""
    try:
        active_executions = []
        for plan in abme_engine.active_executions.values():
            active_executions.append({
                "plan_id": plan.plan_id,
                "business_model_name": plan.business_model.name,
                "execution_status": plan.execution_status.value,
                "progress_percentage": plan.progress_percentage,
                "autonomous_agents": plan.autonomous_agents,
                "ai_insights": plan.ai_insights[:3]  # First 3 insights
            })
        
        completed_executions = []
        for plan in abme_engine.execution_history[-10:]:  # Last 10 completed
            completed_executions.append({
                "plan_id": plan.plan_id,
                "business_model_name": plan.business_model.name,
                "execution_status": plan.execution_status.value,
                "progress_percentage": plan.progress_percentage,
                "completion_time": plan.timeline.get("completion", "N/A")
            })
        
        return {
            "active_executions": active_executions,
            "completed_executions": completed_executions,
            "total_active": len(abme_engine.active_executions),
            "total_completed": len(abme_engine.execution_history)
        }
        
    except Exception as e:
        logger.error(f"Failed to get execution status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics", response_model=Dict[str, Any])
async def get_execution_analytics():
    """Get comprehensive execution analytics"""
    try:
        analytics = await abme_engine.get_execution_analytics()
        return analytics
    except Exception as e:
        logger.error(f"Failed to get execution analytics: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status", response_model=Dict[str, Any])
async def get_execution_engine_status():
    """Get execution engine status and capabilities"""
    return {
        "engine_status": "active" if abme_engine.execution_engine_active else "inactive",
        "autonomous_agents": abme_engine.autonomous_agents,
        "active_executions": len(abme_engine.active_executions),
        "execution_history_count": len(abme_engine.execution_history),
        "capabilities": [
            "Autonomous business model creation",
            "Autonomous execution planning",
            "Real-time execution monitoring",
            "Autonomous strategy adaptation",
            "Self-optimization and improvement",
            "Risk autonomous mitigation",
            "Performance autonomous monitoring"
        ]
    }
