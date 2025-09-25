"""
StrategicAI Platform - GraphQL Endpoint
Main GraphQL endpoint with authentication and rate limiting
"""

import asyncio
import logging
from typing import Dict, Any, Optional
from datetime import datetime
import json

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
import graphene
from graphene import ObjectType, String, Float, Int, List, Boolean, Field, InputObjectType
from graphene.types.datetime import DateTime

from app.api.graphql.schema import schema
from app.api.graphql.resolvers import resolvers
from app.core.auth import get_current_user, verify_token
from app.core.config import settings

logger = logging.getLogger(__name__)

class RateLimitMiddleware(BaseHTTPMiddleware):
    """Rate limiting middleware for GraphQL endpoint"""
    
    def __init__(self, app, calls_per_minute: int = 100):
        super().__init__(app)
        self.calls_per_minute = calls_per_minute
        self.requests = {}
    
    async def dispatch(self, request: Request, call_next):
        # Get client IP
        client_ip = request.client.host
        
        # Check rate limit
        current_time = datetime.now()
        minute_key = current_time.strftime("%Y-%m-%d %H:%M")
        
        if client_ip not in self.requests:
            self.requests[client_ip] = {}
        
        if minute_key not in self.requests[client_ip]:
            self.requests[client_ip][minute_key] = 0
        
        self.requests[client_ip][minute_key] += 1
        
        # Check if rate limit exceeded
        if self.requests[client_ip][minute_key] > self.calls_per_minute:
            return JSONResponse(
                status_code=429,
                content={"error": "Rate limit exceeded", "retry_after": 60}
            )
        
        # Clean up old entries
        self._cleanup_old_entries(client_ip, current_time)
        
        response = await call_next(request)
        return response
    
    def _cleanup_old_entries(self, client_ip: str, current_time: datetime):
        """Clean up old rate limit entries"""
        minute_key = current_time.strftime("%Y-%m-%d %H:%M")
        if client_ip in self.requests:
            # Remove entries older than current minute
            self.requests[client_ip] = {
                k: v for k, v in self.requests[client_ip].items() 
                if k >= minute_key
            }

class GraphQLEndpoint:
    """GraphQL endpoint for StrategicAI Platform"""
    
    def __init__(self):
        self.schema = schema
        self.resolvers = resolvers
        self.app = self._create_app()
    
    def _create_app(self) -> FastAPI:
        """Create FastAPI application with GraphQL endpoint"""
        app = FastAPI(
            title="StrategicAI Platform - GraphQL API",
            description="Unified GraphQL API for StrategicAI Navigation Intelligence",
            version="1.0.0"
        )
        
        # Add middleware
        app.add_middleware(
            CORSMiddleware,
            allow_origins=settings.cors_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        app.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=["*"]  # Configure appropriately for production
        )
        
        app.add_middleware(RateLimitMiddleware, calls_per_minute=100)
        
        # Add GraphQL endpoint
        app.add_route("/graphql", self._graphql_endpoint, methods=["GET", "POST"])
        app.add_route("/graphql/playground", self._graphql_playground, methods=["GET"])
        app.add_route("/graphql/schema", self._graphql_schema, methods=["GET"])
        
        return app
    
    async def _graphql_endpoint(self, request: Request):
        """Main GraphQL endpoint"""
        try:
            # Get request data
            if request.method == "GET":
                query = request.query_params.get("query")
                variables = request.query_params.get("variables")
                operation_name = request.query_params.get("operationName")
            else:
                body = await request.json()
                query = body.get("query")
                variables = body.get("variables")
                operation_name = body.get("operationName")
            
            if not query:
                raise HTTPException(status_code=400, detail="No query provided")
            
            # Parse variables
            if variables and isinstance(variables, str):
                variables = json.loads(variables)
            
            # Check authentication for protected operations
            await self._check_authentication(request, query, operation_name)
            
            # Execute GraphQL query
            result = await self._execute_graphql_query(query, variables, operation_name, request)
            
            return JSONResponse(content=result)
            
        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"error": e.detail}
            )
        except Exception as e:
            logger.error(f"GraphQL endpoint error: {e}")
            return JSONResponse(
                status_code=500,
                content={"error": "Internal server error"}
            )
    
    async def _graphql_playground(self, request: Request):
        """GraphQL Playground endpoint"""
        playground_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>StrategicAI Platform - GraphQL Playground</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
            <link rel="shortcut icon" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png" />
            <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
        </head>
        <body>
            <div id="root">
                <style>
                    body {
                        background-color: rgb(23, 42, 58);
                        font-family: Open Sans, sans-serif;
                        height: 90vh;
                        margin: 0;
                        overflow: hidden;
                    }
                    #root {
                        height: 100vh;
                    }
                    .playgroundIn {
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        text-rendering: optimizeLegibility;
                        font-feature-settings: "liga" on, "kern" on;
                        color: rgba(0, 0, 0, 0.8);
                        box-sizing: border-box;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        margin: 0;
                    }
                </style>
                <div class="playgroundIn">
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 24px;">
                        StrategicAI Platform - GraphQL Playground
                    </div>
                </div>
            </div>
            <script>
                window.addEventListener('load', function (event) {
                    const root = document.getElementById('root');
                    root.style.display = 'none';
                    
                    GraphQLPlayground.init(root, {
                        endpoint: '/graphql',
                        settings: {
                            'request.credentials': 'include',
                        },
                        tabs: [
                            {
                                endpoint: '/graphql',
                                query: `# StrategicAI Platform - GraphQL Queries

# Business Intelligence Navigation
query BusinessIntelligenceNavigation {
  businessIntelligenceNavigation(
    marketData: {
      marketSegment: "AI"
      timeHorizon: 5
      analysisDepth: 5
    }
    competitiveData: {
      competitorIds: ["competitor_1", "competitor_2"]
      patentAnalysis: true
      marketResearch: true
    }
    strategicObjectives: [
      {
        objectiveId: "growth_1"
        objectiveType: "market_expansion"
        priority: 0.8
        targetValue: 1000000
        currentValue: 500000
      }
    ]
  ) {
    strategicRecommendations {
      recommendationId
      recommendationType
      priority
      expectedValue
      requiredInvestment
      timeHorizon
      successProbability
      riskFactors
      implementationSteps
      roiEstimate
    }
    intelligenceConfidence
    marketInsights
    marketOpportunities {
      opportunityId
      marketSegment
      marketSize
      growthRate
      competitionLevel
      entryBarriers
      profitabilityPotential
      strategicFit
      timeToMarket
      requiredInvestment
      riskScore
      opportunityScore
    }
    competitiveAdvantages {
      advantageId
      advantageType
      strength
      sustainability
      differentiation
      marketImpact
      competitiveMoat
    }
    executionTime
    analysisTimestamp
  }
}

# Strategic Navigation Intelligence
query StrategicNavigationIntelligence {
  strategicNavigationIntelligence(
    businessContext: "{\\"market_conditions\\": {\\"growth_rate\\": 0.15, \\"volatility\\": 0.2}}"
    competitiveLandscape: "{\\"competitors\\": [{\\"id\\": \\"comp1\\", \\"strength\\": 0.7}]}"
    agentCapabilities: "{\\"market_analyst\\": {\\"capabilities\\": {\\"strategic_thinking\\": 0.8}}}"
    simulationParameters: "{\\"monte_carlo_iterations\\": 10000, \\"simulation_horizon\\": 5}"
    strategicObjectives: [
      {
        objectiveId: "strategic_1"
        objectiveType: "competitive_advantage"
        priority: 0.9
        targetValue: 2000000
        currentValue: 1000000
      }
    ]
  ) {
    optimalPath {
      positionX
      positionY
      velocityX
      velocityY
      accelerationX
      accelerationY
      confidence
      timestamp
    }
    strategicRecommendations
    confidenceScore
    riskAssessment {
      marketRisk
      competitiveRisk
      operationalRisk
      strategicRisk
      overallRisk
    }
    competitiveAnalysis
    agentCoordination
    simulationResults
    executionPlan {
      phases
      resourceAllocation
      monitoringFramework
    }
  }
}

# Health Check
query HealthCheck {
  healthCheck {
    status
    timestamp
    services
  }
}

# System Status
query SystemStatus {
  systemStatus {
    overallStatus
    timestamp
    components
    performanceMetrics
    resourceUtilization
  }
}`
                            }
                        ]
                    });
                });
            </script>
        </body>
        </html>
        """
        
        return JSONResponse(content=playground_html, media_type="text/html")
    
    async def _graphql_schema(self, request: Request):
        """GraphQL schema endpoint"""
        try:
            schema_introspection = self.schema.introspect()
            return JSONResponse(content=schema_introspection)
        except Exception as e:
            logger.error(f"GraphQL schema error: {e}")
            return JSONResponse(
                status_code=500,
                content={"error": "Failed to generate schema"}
            )
    
    async def _check_authentication(self, request: Request, query: str, operation_name: Optional[str]):
        """Check authentication for protected operations"""
        # List of operations that require authentication
        protected_operations = [
            "strategicNavigationIntelligence",
            "unifiedNavigationIntelligence",
            "updateSystemConfiguration",
            "uploadMarketData",
            "updateAgentCapabilities"
        ]
        
        # Check if operation requires authentication
        requires_auth = any(op in query for op in protected_operations)
        
        if requires_auth:
            # Get authorization header
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                raise HTTPException(status_code=401, detail="Authentication required")
            
            # Verify token
            token = auth_header.split(" ")[1]
            payload = verify_token(token)
            if not payload:
                raise HTTPException(status_code=401, detail="Invalid token")
    
    async def _execute_graphql_query(self, query: str, variables: Optional[Dict], 
                                   operation_name: Optional[str], request: Request) -> Dict[str, Any]:
        """Execute GraphQL query"""
        try:
            # Create context with request information
            context = {
                "request": request,
                "user": await self._get_current_user(request),
                "timestamp": datetime.now()
            }
            
            # Execute query
            result = await self.schema.execute_async(
                query,
                variables=variables,
                operation_name=operation_name,
                context=context
            )
            
            if result.errors:
                logger.error(f"GraphQL execution errors: {result.errors}")
                return {
                    "data": result.data,
                    "errors": [{"message": str(error)} for error in result.errors]
                }
            
            return {"data": result.data}
            
        except Exception as e:
            logger.error(f"GraphQL execution error: {e}")
            return {
                "data": None,
                "errors": [{"message": str(e)}]
            }
    
    async def _get_current_user(self, request: Request) -> Optional[Dict[str, Any]]:
        """Get current user from request"""
        try:
            auth_header = request.headers.get("Authorization")
            if auth_header and auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]
                payload = verify_token(token)
                if payload:
                    return {"username": payload.get("sub"), "permissions": []}
        except Exception as e:
            logger.error(f"Error getting current user: {e}")
        return None

# Create GraphQL endpoint instance
graphql_endpoint = GraphQLEndpoint()
app = graphql_endpoint.app
