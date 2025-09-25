'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Activity, TrendingUp, Clock, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

interface CompetitiveThreat {
  id: string
  competitor: string
  type: 'pricing' | 'product' | 'marketing' | 'partnership' | 'acquisition'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  impact: number
  responseTime: number
  status: 'detected' | 'analyzing' | 'responding' | 'resolved'
  timestamp: string
  response: string
}

interface ResponseMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function CompetitiveResponse() {
  const [threats, setThreats] = useState<CompetitiveThreat[]>([])
  const [metrics, setMetrics] = useState<ResponseMetric[]>([])
  const [responseTime, setResponseTime] = useState(0)

  useEffect(() => {
    const initialThreats: CompetitiveThreat[] = [
      {
        id: 'threat-001',
        competitor: 'TechCorp Industries',
        type: 'pricing',
        severity: 'High',
        impact: 78.5,
        responseTime: 0.3,
        status: 'responding',
        timestamp: '2 min ago',
        response: 'Dynamic pricing adjustment activated'
      },
      {
        id: 'threat-002',
        competitor: 'InnovateLabs',
        type: 'product',
        severity: 'Medium',
        impact: 65.3,
        responseTime: 0.8,
        status: 'analyzing',
        timestamp: '5 min ago',
        response: 'Product feature analysis in progress'
      },
      {
        id: 'threat-003',
        competitor: 'FutureTech Solutions',
        type: 'marketing',
        severity: 'Critical',
        impact: 89.2,
        responseTime: 0.2,
        status: 'resolved',
        timestamp: '15 min ago',
        response: 'Counter-marketing campaign deployed'
      },
      {
        id: 'threat-004',
        competitor: 'Digital Dynamics',
        type: 'partnership',
        severity: 'Low',
        impact: 45.8,
        responseTime: 1.2,
        status: 'detected',
        timestamp: '1 hour ago',
        response: 'Partnership strategy under review'
      }
    ]

    const initialMetrics: ResponseMetric[] = [
      {
        name: 'Average Response Time',
        value: 0.3,
        target: 1.0,
        trend: 'down',
        color: 'text-neon-green'
      },
      {
        name: 'Threat Detection Rate',
        value: 94.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Response Success Rate',
        value: 89.2,
        target: 85,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Automation Level',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setThreats(initialThreats)
    setMetrics(initialMetrics)
    setResponseTime(0.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setResponseTime(prev => Math.max(0.1, prev + (Math.random() - 0.5) * 0.1))
      setThreats(prev => prev.map(threat => ({
        ...threat,
        timestamp: 'Just now'
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'pricing': return <TrendingUp className="h-4 w-4" />
      case 'product': return <Target className="h-4 w-4" />
      case 'marketing': return <Activity className="h-4 w-4" />
      case 'partnership': return <Shield className="h-4 w-4" />
      case 'acquisition': return <Zap className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getThreatTypeColor = (type: string) => {
    switch (type) {
      case 'pricing': return 'text-neon-red'
      case 'product': return 'text-neon-blue'
      case 'marketing': return 'text-neon-yellow'
      case 'partnership': return 'text-neon-green'
      case 'acquisition': return 'text-neon-purple'
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
      case 'responding': return 'text-neon-red'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected': return <AlertTriangle className="h-4 w-4" />
      case 'analyzing': return <Clock className="h-4 w-4" />
      case 'responding': return <Activity className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Competitive Response</h2>
            <p className="text-muted-foreground">Real-time competitive threat detection and automated response</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-neon-red" />
            <span className="text-sm font-medium text-neon-red">
              {responseTime.toFixed(1)}s Response Time
            </span>
          </div>
        </div>

        {/* Response Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-neon-green' :
                  metric.trend === 'down' ? 'bg-neon-red' : 'bg-neon-blue'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Level') ? '%' : metric.name.includes('Time') ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Level') ? '%' : metric.name.includes('Time') ? 's' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Threats</h3>
        <div className="space-y-4">
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
                    <div className="font-medium text-sm">{threat.competitor}</div>
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
                <div className="text-sm text-muted-foreground mb-2">{threat.response}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-red">{threat.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{threat.responseTime.toFixed(1)}s</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
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
