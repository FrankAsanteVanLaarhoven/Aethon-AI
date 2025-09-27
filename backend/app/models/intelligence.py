"""
AethonAI Intelligence Data Models
Pydantic models for Strategic Intelligence Platform
"""

from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional
from datetime import datetime
from enum import Enum

class QueryTypeEnum(str, Enum):
    """Query type enumeration"""
    REGULATORY = "regulatory"
    COMPETITIVE = "competitive"
    FINANCIAL = "financial"
    MARKET = "market"
    RISK = "risk"
    OPPORTUNITY = "opportunity"

class AnalysisStatusEnum(str, Enum):
    """Analysis status enumeration"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class IntelligenceRequest(BaseModel):
    """Request model for intelligence analysis"""
    query_type: QueryTypeEnum = Field(..., description="Type of intelligence analysis")
    keywords: List[str] = Field(..., description="Keywords for the analysis")
    industry: Optional[str] = Field(None, description="Industry focus")
    geography: Optional[str] = Field(None, description="Geographic focus")
    time_range_days: Optional[int] = Field(30, description="Time range in days")
    priority: int = Field(1, description="Analysis priority (1-5)")
    user_id: Optional[str] = Field(None, description="User ID for tracking")

class IntelligenceResponse(BaseModel):
    """Response model for intelligence analysis initiation"""
    query_id: str = Field(..., description="Unique query identifier")
    status: str = Field(..., description="Analysis status")
    message: str = Field(..., description="Status message")
    estimated_completion_time: datetime = Field(..., description="Estimated completion time")

class AnalysisStatus(BaseModel):
    """Analysis status model"""
    query_id: str = Field(..., description="Query identifier")
    status: AnalysisStatusEnum = Field(..., description="Current status")
    progress: int = Field(0, description="Progress percentage (0-100)")
    message: str = Field(..., description="Status message")
    created_at: datetime = Field(..., description="Creation timestamp")

class DataSourceStatus(BaseModel):
    """Data source status model"""
    source_name: str = Field(..., description="Source name")
    status: str = Field(..., description="Source status")
    last_updated: datetime = Field(..., description="Last update timestamp")
    rate_limit: Optional[str] = Field(None, description="Rate limit information")
    data_types: List[str] = Field(..., description="Available data types")

class RegulatoryInsight(BaseModel):
    """Regulatory insight model"""
    regulation_name: str = Field(..., description="Name of the regulation")
    impact_level: str = Field(..., description="Impact level (low/medium/high/critical)")
    effective_date: datetime = Field(..., description="Effective date")
    compliance_requirements: List[str] = Field(..., description="Compliance requirements")
    business_impact: str = Field(..., description="Business impact description")
    recommended_actions: List[str] = Field(..., description="Recommended actions")
    confidence: float = Field(..., description="Confidence score (0-1)")

class CompetitiveInsight(BaseModel):
    """Competitive insight model"""
    competitor_name: str = Field(..., description="Competitor name")
    market_position: str = Field(..., description="Market position")
    strengths: List[str] = Field(..., description="Competitor strengths")
    weaknesses: List[str] = Field(..., description="Competitor weaknesses")
    recent_activities: List[str] = Field(..., description="Recent activities")
    threat_level: str = Field(..., description="Threat level (low/medium/high)")
    opportunities: List[str] = Field(..., description="Identified opportunities")

class FinancialInsight(BaseModel):
    """Financial insight model"""
    metric_name: str = Field(..., description="Financial metric name")
    current_value: float = Field(..., description="Current value")
    trend: str = Field(..., description="Trend direction")
    benchmark_comparison: float = Field(..., description="Benchmark comparison")
    forecast: Dict[str, float] = Field(..., description="Forecast values")
    risk_factors: List[str] = Field(..., description="Risk factors")
    opportunities: List[str] = Field(..., description="Opportunities")

class RiskAssessment(BaseModel):
    """Risk assessment model"""
    risk_category: str = Field(..., description="Risk category")
    risk_level: str = Field(..., description="Risk level (low/medium/high/critical)")
    probability: float = Field(..., description="Risk probability (0-1)")
    impact: float = Field(..., description="Risk impact (0-1)")
    mitigation_strategies: List[str] = Field(..., description="Mitigation strategies")
    monitoring_requirements: List[str] = Field(..., description="Monitoring requirements")

class OpportunityAssessment(BaseModel):
    """Opportunity assessment model"""
    opportunity_type: str = Field(..., description="Type of opportunity")
    market_size: float = Field(..., description="Market size")
    competitive_advantage: float = Field(..., description="Competitive advantage score")
    implementation_timeline: str = Field(..., description="Implementation timeline")
    required_resources: List[str] = Field(..., description="Required resources")
    expected_roi: float = Field(..., description="Expected ROI")

class StrategicRecommendations(BaseModel):
    """Strategic recommendations model"""
    executive_summary: str = Field(..., description="Executive summary")
    key_findings: List[str] = Field(..., description="Key findings")
    strategic_recommendations: List[str] = Field(..., description="Strategic recommendations")
    action_items: List[str] = Field(..., description="Action items")
    risk_mitigation: List[str] = Field(..., description="Risk mitigation strategies")
    opportunity_prioritization: List[Dict[str, Any]] = Field(..., description="Opportunity prioritization")
    monitoring_requirements: List[str] = Field(..., description="Monitoring requirements")
    next_steps: List[str] = Field(..., description="Next steps")

class IntelligenceInsights(BaseModel):
    """Intelligence insights model"""
    regulatory: Optional[List[RegulatoryInsight]] = Field(None, description="Regulatory insights")
    competitive: Optional[List[CompetitiveInsight]] = Field(None, description="Competitive insights")
    financial: Optional[List[FinancialInsight]] = Field(None, description="Financial insights")
    risk: Optional[List[RiskAssessment]] = Field(None, description="Risk assessments")
    opportunity: Optional[List[OpportunityAssessment]] = Field(None, description="Opportunity assessments")

class IntelligenceResult(BaseModel):
    """Complete intelligence result model"""
    query_id: str = Field(..., description="Query identifier")
    insights: IntelligenceInsights = Field(..., description="Intelligence insights")
    recommendations: StrategicRecommendations = Field(..., description="Strategic recommendations")
    sources_analyzed: int = Field(..., description="Number of sources analyzed")
    processing_time: float = Field(..., description="Processing time in seconds")
    confidence_score: float = Field(..., description="Overall confidence score")
    created_at: datetime = Field(..., description="Creation timestamp")

class QuickAnalysisRequest(BaseModel):
    """Quick analysis request model"""
    query_type: QueryTypeEnum = Field(..., description="Type of analysis")
    keywords: List[str] = Field(..., description="Analysis keywords")
    industry: Optional[str] = Field(None, description="Industry focus")
    geography: Optional[str] = Field(None, description="Geographic focus")

class QuickAnalysisResponse(BaseModel):
    """Quick analysis response model"""
    query_id: str = Field(..., description="Query identifier")
    status: str = Field(..., description="Analysis status")
    insights: Dict[str, Any] = Field(..., description="Analysis insights")
    confidence_score: float = Field(..., description="Confidence score")
    processing_time: float = Field(..., description="Processing time")
    created_at: datetime = Field(..., description="Creation timestamp")

class DataSourceInfo(BaseModel):
    """Data source information model"""
    source_type: str = Field(..., description="Type of data source")
    total_sources: int = Field(..., description="Total number of sources")
    sources: Dict[str, Any] = Field(..., description="Source details")
    status: str = Field(..., description="Source status")

class HealthCheckResponse(BaseModel):
    """Health check response model"""
    status: str = Field(..., description="Service status")
    service: str = Field(..., description="Service name")
    version: str = Field(..., description="Service version")
    orchestrator_status: str = Field(..., description="Orchestrator status")
    active_analyses: int = Field(..., description="Number of active analyses")
    completed_analyses: int = Field(..., description="Number of completed analyses")
    timestamp: datetime = Field(..., description="Check timestamp")

class ErrorResponse(BaseModel):
    """Error response model"""
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Error details")
    timestamp: datetime = Field(..., description="Error timestamp")

