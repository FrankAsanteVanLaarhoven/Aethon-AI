'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, AlertTriangle, Target, Activity, Clock, CheckCircle, Zap, Shield } from 'lucide-react'

interface Threat {
  id: string
  source: string
  type: 'competitive' | 'market' | 'regulatory' | 'technological' | 'economic'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  confidence: number
  impact: number
  status: 'detected' | 'analyzing' | 'confirmed' | 'mitigated'
  timestamp: string
  description: string
}

interface DetectionMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function ThreatDetection() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [metrics, setMetrics] = useState<DetectionMetric[]>([])
  const [detectionRate, setDetectionRate] = useState(0)

  useEffect(() => {
    const initialThreats: Threat[] = [
      {
        id: 'threat-001',
        source: 'TechCorp Industries',
        type: 'competitive',
        severity: 'High',
        confidence: 94.2,
        impact: 78.5,
        status: 'confirmed',
        timestamp: '2 min ago',
        description: 'Aggressive pricing strategy targeting market share'
      },
      {
        id: 'threat-002',
        source: 'Regulatory Body',
        type: 'regulatory',
        severity: 'Critical',
        confidence: 89.7,
        impact: 85.3,
        status: 'analyzing',
        timestamp: '5 min ago',
        description: 'New compliance requirements affecting operations'
      },
      {
        id: 'threat-003',
        source: 'Market Forces',
        type: 'market',
        severity: 'Medium',
        confidence: 76.8,
        impact: 65.2,
        status: 'detected',
        timestamp: '10 min ago',
        description: 'Demand volatility in key market segments'
      },
      {
        id: 'threat-004',
        source: 'InnovateLabs',
        type: 'technological',
        severity: 'High',
        confidence: 91.3,
        impact: 72.8,
        status: 'mitigated',
        timestamp: '1 hour ago',
        description: 'Breakthrough technology announcement'
      }
    ]

    const initialMetrics: DetectionMetric[] = [
      {
        name: 'Detection Rate',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'False Positive Rate',
        value: 3.2,
        target: 5,
        trend: 'down',
        color: 'text-neon-blue'
      },
      {
        name: 'Response Time',
        value: 0.8,
        target: 2.0,
        trend: 'down',
        color: 'text-neon-purple'
      },
      {
        name: 'Coverage Rate',
        value: 94.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setThreats(initialThreats)
    setMetrics(initialMetrics)
    setDetectionRate(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDetectionRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setThreats(prev => prev.map(threat => ({
        ...threat,
        timestamp: 'Just now'
      })))
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'competitive': return <Target className="h-4 w-4" />
      case 'market': return <Activity className="h-4 w-4" />
      case 'regulatory': return <Shield className="h-4 w-4" />
      case 'technological': return <Zap className="h-4 w-4" />
      case 'economic': return <AlertTriangle className="h-4 w-4" />
      default: return <Eye className="h-4 w-4" />
    }
  }

  const getThreatTypeColor = (type: string) => {
    switch (type) {
      case 'competitive': return 'text-neon-red'
      case 'market': return 'text-neon-blue'
      case 'regulatory': return 'text-neon-yellow'
      case 'technological': return 'text-neon-purple'
      case 'economic': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detected': return 'text-neon-yellow'
      case 'analyzing': return 'text-neon-blue'
      case 'confirmed': return 'text-neon-red'
      case 'mitigated': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected': return <Eye className="h-4 w-4" />
      case 'analyzing': return <Clock className="h-4 w-4" />
      case 'confirmed': return <AlertTriangle className="h-4 w-4" />
      case 'mitigated': return <CheckCircle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Threat Detection</h2>
            <p className="text-muted-foreground">Advanced threat detection and analysis system</p>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {detectionRate.toFixed(1)}% Detection Rate
            </span>
          </div>
        </div>

        {/* Detection Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-neon-green' :
                  metric.trend === 'down' ? 'bg-neon-red' : 'bg-neon-blue'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Time') ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Time') ? 's' : ''}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Detected Threats</h3>
        <div className="space-y-3">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getThreatTypeIcon(threat.type)}
                  <div>
                    <div className="font-medium text-sm">{threat.source}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {threat.type} • {threat.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(threat.status)}
                  <div className={`text-sm font-bold ${getSeverityColor(threat.severity)}`}>
                    {threat.severity}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-2">{threat.description}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{threat.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-red">{threat.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
