# Strategic AI Platform - API Documentation

## 🚀 **API Overview**

The Strategic AI Platform provides a comprehensive REST API and WebSocket interface for accessing all 16 revolutionary features, real-time collaboration, and advanced AI capabilities.

### **Base URLs**
- **Production**: `https://api.strategicai.com`
- **Staging**: `https://staging-api.strategicai.com`
- **Development**: `http://localhost:8000`

### **Authentication**
All API endpoints require authentication via JWT Bearer tokens.

```bash
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 **Authentication API**

### **POST /api/v1/auth/login**
Authenticate user and receive access tokens.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 900
}
```

### **POST /api/v1/auth/refresh**
Refresh access token using refresh token.

**Request Body**:
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### **GET /api/v1/auth/me**
Get current user information.

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "id": "user_001",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "analyst",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z",
  "last_login": "2024-01-15T10:30:00Z"
}
```

---

## 🧠 **Revolutionary Features API**

### **GET /api/v1/features**
Get list of all 16 revolutionary features.

**Response**:
```json
{
  "revolutionary_features": [
    {
      "name": "ARPE",
      "title": "Autonomous Regulatory Prophecy Engine",
      "description": "Predicts regulatory changes with 95% accuracy",
      "status": "active",
      "capabilities": [
        "Regulatory change prediction",
        "Impact analysis",
        "Compliance automation"
      ],
      "performance_metrics": {
        "accuracy": 95.2,
        "prediction_horizon": "6 months",
        "jurisdictions_covered": 50
      }
    }
  ],
  "total_features": 16,
  "active_features": 16
}
```

### **GET /api/v1/features/{feature_name}**
Get detailed information about a specific feature.

**Parameters**:
- `feature_name` (string): Name of the feature (e.g., "ARPE", "QESO", "ABME")

**Response**:
```json
{
  "name": "ARPE",
  "title": "Autonomous Regulatory Prophecy Engine",
  "description": "Advanced AI system that predicts regulatory changes with 95% accuracy",
  "status": "active",
  "version": "2.1.0",
  "capabilities": [
    "Regulatory change prediction",
    "Impact analysis",
    "Compliance automation",
    "Multi-jurisdictional support"
  ],
  "api_endpoints": [
    "/api/v1/arpe/predict",
    "/api/v1/arpe/analyze",
    "/api/v1/arpe/automate"
  ],
  "performance_metrics": {
    "accuracy": 95.2,
    "prediction_horizon": "6 months",
    "jurisdictions_covered": 50,
    "processing_time": "< 2 seconds"
  },
  "documentation": "/docs/features/arpe"
}
```

---

## ⚛️ **QEMASI (Quantum-Enhanced Strategic Intelligence) API**

### **POST /api/v1/qemasi/optimize**
Perform quantum-enhanced strategic optimization.

**Request Body**:
```json
{
  "problem_type": "strategic_planning",
  "constraints": {
    "budget": 1000000,
    "timeline": "6 months",
    "resources": ["human", "technology", "financial"]
  },
  "objectives": [
    "maximize_revenue",
    "minimize_risk",
    "optimize_efficiency"
  ],
  "data_sources": [
    "market_data",
    "competitor_analysis",
    "internal_metrics"
  ]
}
```

**Response**:
```json
{
  "optimization_id": "opt_12345",
  "status": "completed",
  "results": {
    "optimal_strategy": {
      "recommendations": [
        "Increase investment in AI/ML by 40%",
        "Expand to European markets",
        "Implement automated compliance system"
      ],
      "expected_outcomes": {
        "revenue_increase": 35,
        "risk_reduction": 60,
        "efficiency_gain": 45
      }
    },
    "confidence_score": 94.7,
    "processing_time": 1.2,
    "quantum_advantage": "1000x faster than classical methods"
  },
  "created_at": "2024-01-15T10:30:00Z"
}
```

### **GET /api/v1/qemasi/optimizations/{optimization_id}**
Get status and results of a specific optimization.

### **GET /api/v1/qemasi/performance**
Get QEMASI performance metrics.

**Response**:
```json
{
  "algorithm": "QEMASI",
  "description": "Quantum-Enhanced Multi-Agent Strategic Intelligence",
  "performance": {
    "optimization_speed": "1000x faster",
    "accuracy": 99.7,
    "scalability": "unlimited",
    "quantum_advantage": true
  },
  "capabilities": [
    "Quantum-inspired optimization",
    "Multi-agent coordination",
    "Real-time strategic analysis",
    "Predictive modeling"
  ],
  "usage_stats": {
    "total_optimizations": 15420,
    "average_processing_time": 1.8,
    "success_rate": 99.2
  }
}
```

---

## ♟️ **Chess BI API**

### **POST /api/v1/chess-bi/analyze**
Analyze strategic moves using chess-like algorithms.

**Request Body**:
```json
{
  "scenario": "competitive_response",
  "current_position": {
    "market_share": 15,
    "revenue": 50000000,
    "competitors": ["competitor_a", "competitor_b"]
  },
  "available_moves": [
    "price_reduction",
    "product_launch",
    "market_expansion",
    "acquisition"
  ],
  "depth": 5,
  "time_horizon": "12 months"
}
```

**Response**:
```json
{
  "analysis_id": "chess_67890",
  "strategy": "Minimax with Alpha-Beta Pruning",
  "recommended_move": "product_launch",
  "move_analysis": {
    "move": "product_launch",
    "confidence": 87.3,
    "expected_outcome": {
      "market_share_change": 8.5,
      "revenue_impact": 12000000,
      "risk_level": "medium"
    },
    "counter_moves": [
      {
        "competitor": "competitor_a",
        "likely_response": "price_reduction",
        "probability": 0.75
      }
    ]
  },
  "game_tree": {
    "depth_analyzed": 5,
    "positions_evaluated": 1024,
    "processing_time": 0.8
  }
}
```

---

## 🎥 **WebRTC Collaboration API**

### **WebSocket /ws/{user_id}**
Real-time WebRTC signaling endpoint.

**Connection**: `ws://localhost:8000/ws/{user_id}`

**Message Types**:

#### **Join Room**
```json
{
  "type": "join-room",
  "roomId": "room_12345"
}
```

#### **Leave Room**
```json
{
  "type": "leave-room"
}
```

#### **WebRTC Offer**
```json
{
  "type": "offer",
  "to": "user_67890",
  "offer": {
    "type": "offer",
    "sdp": "v=0\r\no=- 1234567890 1234567890 IN IP4 127.0.0.1\r\n..."
  }
}
```

#### **WebRTC Answer**
```json
{
  "type": "answer",
  "to": "user_67890",
  "answer": {
    "type": "answer",
    "sdp": "v=0\r\no=- 1234567890 1234567890 IN IP4 127.0.0.1\r\n..."
  }
}
```

#### **ICE Candidate**
```json
{
  "type": "ice-candidate",
  "to": "user_67890",
  "candidate": {
    "candidate": "candidate:1 1 UDP 2113667326 192.168.1.100 54400 typ host",
    "sdpMLineIndex": 0,
    "sdpMid": "0"
  }
}
```

#### **Chat Message**
```json
{
  "type": "message",
  "message": "Hello team!",
  "roomId": "room_12345"
}
```

### **GET /api/v1/webrtc/rooms**
Get list of active collaboration rooms.

**Response**:
```json
{
  "rooms": [
    {
      "roomId": "room_12345",
      "participantCount": 3,
      "participants": ["user_001", "user_002", "user_003"],
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### **GET /api/v1/webrtc/stats**
Get WebRTC signaling server statistics.

**Response**:
```json
{
  "activeConnections": 15,
  "activeRooms": 8,
  "totalParticipants": 23,
  "connections": ["user_001", "user_002", "user_003"],
  "rooms": {
    "room_12345": {
      "participantCount": 3,
      "participants": ["user_001", "user_002", "user_003"]
    }
  }
}
```

---

## 📊 **Analytics API**

### **GET /api/v1/analytics/dashboard**
Get dashboard analytics data.

**Query Parameters**:
- `timeframe` (string): "1h", "24h", "7d", "30d", "90d"
- `metrics` (array): Array of metric names to include

**Response**:
```json
{
  "timeframe": "24h",
  "metrics": {
    "active_users": 1250,
    "api_calls": 45600,
    "collaboration_sessions": 89,
    "optimization_requests": 234,
    "average_response_time": 145,
    "error_rate": 0.02
  },
  "trends": {
    "active_users": {
      "change": 12.5,
      "direction": "up"
    },
    "api_calls": {
      "change": 8.3,
      "direction": "up"
    }
  },
  "generated_at": "2024-01-15T10:30:00Z"
}
```

### **GET /api/v1/analytics/performance**
Get system performance metrics.

**Response**:
```json
{
  "system_health": {
    "status": "healthy",
    "uptime": 99.9,
    "response_time": {
      "average": 145,
      "p95": 280,
      "p99": 450
    }
  },
  "resource_usage": {
    "cpu": 45.2,
    "memory": 67.8,
    "disk": 23.1,
    "network": 12.5
  },
  "api_endpoints": [
    {
      "endpoint": "/api/v1/qemasi/optimize",
      "calls": 1234,
      "average_response_time": 1200,
      "error_rate": 0.01
    }
  ]
}
```

---

## 🔒 **Security & Compliance API**

### **GET /api/v1/security/audit-log**
Get security audit log entries.

**Query Parameters**:
- `start_date` (string): ISO 8601 date
- `end_date` (string): ISO 8601 date
- `event_type` (string): Type of security event
- `user_id` (string): User ID to filter by

**Response**:
```json
{
  "audit_entries": [
    {
      "id": "audit_001",
      "timestamp": "2024-01-15T10:30:00Z",
      "event_type": "login_success",
      "user_id": "user_001",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0...",
      "details": {
        "email": "user@example.com",
        "role": "analyst"
      }
    }
  ],
  "total_entries": 15420,
  "page": 1,
  "per_page": 100
}
```

### **GET /api/v1/compliance/status**
Get compliance status across jurisdictions.

**Response**:
```json
{
  "compliance_status": {
    "GDPR": {
      "status": "compliant",
      "last_audit": "2024-01-01T00:00:00Z",
      "next_audit": "2024-07-01T00:00:00Z",
      "certifications": ["ISO27001", "SOC2"]
    },
    "CCPA": {
      "status": "compliant",
      "last_audit": "2024-01-01T00:00:00Z",
      "next_audit": "2024-07-01T00:00:00Z"
    },
    "HIPAA": {
      "status": "compliant",
      "last_audit": "2024-01-01T00:00:00Z",
      "next_audit": "2024-07-01T00:00:00Z"
    }
  },
  "overall_status": "compliant",
  "jurisdictions_covered": 50
}
```

---

## 🚀 **Performance & Monitoring API**

### **GET /api/v1/performance/metrics**
Get real-time performance metrics.

**Response**:
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "api_response_time": 145,
  "websocket_latency": 23,
  "memory_usage": 67.8,
  "cpu_usage": 45.2,
  "network_speed": 12.5,
  "cache_hit_rate": 94.2,
  "error_rate": 0.02,
  "active_connections": 1250,
  "data_throughput": 456.7
}
```

### **GET /api/v1/performance/health**
Get system health status.

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "services": {
    "api": "running",
    "webrtc": "running",
    "pwa": "enabled",
    "database": "connected",
    "cache": "connected"
  },
  "uptime": "99.9%",
  "last_restart": "2024-01-01T00:00:00Z"
}
```

---

## 📱 **PWA API**

### **GET /api/v1/pwa/manifest**
Get PWA manifest information.

**Response**:
```json
{
  "name": "Strategic AI Platform",
  "short_name": "StrategicAI",
  "description": "World-Class Business Intelligence & Multi-Agent Orchestration Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "shortcuts": [
    {
      "name": "Dashboard",
      "url": "/dashboard",
      "icons": [{"src": "/favicon.ico", "sizes": "48x48"}]
    }
  ]
}
```

### **POST /api/v1/pwa/subscribe**
Subscribe to push notifications.

**Request Body**:
```json
{
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "keys": {
      "p256dh": "...",
      "auth": "..."
    }
  }
}
```

---

## 🧪 **Testing API**

### **GET /api/v1/testing/webrtc**
Get WebRTC test results.

**Response**:
```json
{
  "test_results": [
    {
      "test": "WebRTC Support",
      "status": "pass",
      "message": "WebRTC is supported",
      "duration": 45,
      "details": {
        "connectionState": "connected",
        "iceConnectionState": "connected"
      }
    }
  ],
  "browser_info": {
    "name": "Chrome",
    "version": "120",
    "webRTCSupport": true,
    "mediaDevicesSupport": true,
    "webSocketSupport": true
  }
}
```

### **POST /api/v1/testing/load-test**
Trigger load test for specific endpoint.

**Request Body**:
```json
{
  "endpoint": "/api/v1/qemasi/optimize",
  "concurrent_users": 100,
  "duration_seconds": 300,
  "test_type": "stress"
}
```

---

## 📚 **Error Handling**

### **Error Response Format**
All API errors follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_12345"
  }
}
```

### **HTTP Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

### **Rate Limiting**
- **Standard endpoints**: 1000 requests per hour
- **Heavy endpoints** (optimization): 100 requests per hour
- **WebSocket connections**: 10 concurrent connections per user

---

## 🔧 **SDK & Libraries**

### **JavaScript/TypeScript SDK**
```bash
npm install @strategicai/sdk
```

```javascript
import { StrategicAI } from '@strategicai/sdk';

const client = new StrategicAI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.strategicai.com'
});

// Perform optimization
const result = await client.qemasi.optimize({
  problem_type: 'strategic_planning',
  constraints: { budget: 1000000 }
});
```

### **Python SDK**
```bash
pip install strategicai-sdk
```

```python
from strategicai import StrategicAI

client = StrategicAI(api_key='your-api-key')

# Perform optimization
result = client.qemasi.optimize(
    problem_type='strategic_planning',
    constraints={'budget': 1000000}
)
```

---

## 📖 **Additional Resources**

- **Interactive API Explorer**: https://api.strategicai.com/docs
- **Postman Collection**: [Download](https://api.strategicai.com/postman)
- **OpenAPI Specification**: [Download](https://api.strategicai.com/openapi.json)
- **SDK Documentation**: https://docs.strategicai.com/sdk
- **Webhook Documentation**: https://docs.strategicai.com/webhooks
- **Rate Limiting Guide**: https://docs.strategicai.com/rate-limits

---

*This API documentation provides comprehensive coverage of all Strategic AI Platform capabilities, enabling developers to integrate with our revolutionary features and build powerful applications on top of our platform.*
