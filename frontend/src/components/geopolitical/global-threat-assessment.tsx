'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, AlertTriangle, Target, Activity, TrendingUp, Shield, Zap, Brain } from 'lucide-react'

interface GlobalThreat {
  id: string
  name: string
  region: string
  category: 'military' | 'economic' | 'cyber' | 'environmental' | 'social'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  probability: number
  impact: number
  timeframe: string
  status: 'monitored' | 'escalating' | 'critical' | 'resolved'
  lastUpdate: string
  description: string
  confidence: number
}

interface ThreatMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function GlobalThreatAssessment() {
  const [threats, setThreats] = useState<GlobalThreat[]>([])
  const [metrics, setMetrics] = useState<ThreatMetric[]>([])
  const [overallThreatLevel, setOverallThreatLevel] = useState(0)

  useEffect(() => {
    const initialThreats: GlobalThreat[] = [
      {
        id: 'threat-001',
        name: 'Regional Military Tensions',
        region: 'Eastern Europe',
        category: 'military',
        severity: 'High',
        probability: 65.3,
        impact: 78.5,
        timeframe: '3-6 months',
        status: 'escalating',
        lastUpdate: '2 hours ago',
        description: 'Escalating military tensions with potential for conflict',
        confidence: 87.2
      },
      {
        id: 'threat-002',
        name: 'Global Economic Instability',
        region: 'Global',
        category: 'economic',
        severity: 'Critical',
        probability: 78.9,
        impact: 92.1,
        timeframe: '6-12 months',
        status: 'critical',
        lastUpdate: '4 hours ago',
        description: 'Widespread economic instability affecting multiple regions',
        confidence: 94.5
      },
      {
        id: 'threat-003',
        name: 'Cyber Infrastructure Attack',
        region: 'North America',
        category: 'cyber',
        severity: 'High',
        probability: 45.7,
        impact: 67.8,
        timeframe: '1-3 months',
        status: 'monitored',
        lastUpdate: '1 day ago',
        description: 'Advanced persistent threat targeting critical infrastructure',
        confidence: 76.8
      },
      {
        id: 'threat-004',
        name: 'Climate Migration Crisis',
        region: 'Global',
        category: 'environmental',
        severity: 'Medium',
        probability: 89.2,
        impact: 54.3,
        timeframe: '12-18 months',
        status: 'monitored',
        lastUpdate: '3 days ago',
        description: 'Large-scale migration due to climate change impacts',
        confidence: 91.3
      }
    ]

    const initialMetrics: ThreatMetric[] = [
      {
        name: 'Overall Threat Level',
        value: 67.3,
        target: 50,
        trend: 'up',
        color: 'text-neon-yellow'
      },
      {
        name: 'Critical Threats',
        value: 3,
        target: 2,
        trend: 'up',
        color: 'text-neon-red'
      },
      {
        name: 'Monitoring Coverage',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Response Readiness',
        value: 89.7,
        target: 85,
        trend: 'up',
        color: 'text-neon-blue'
      }
    ]

    setThreats(initialThreats)
    setMetrics(initialMetrics)
    setOverallThreatLevel(67.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallThreatLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setThreats(prev => prev.map(threat => ({
        ...threat,
        lastUpdate: 'Just now'
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'military': return <Shield className="h-4 w-4" />
      case 'economic': return <TrendingUp className="h-4 w-4" />
      case 'cyber': return <Zap className="h-4 w-4" />
      case 'environmental': return <Globe className="h-4 w-4" />
      case 'social': return <Activity className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'military': return 'text-neon-red'
      case 'economic': return 'text-neon-green'
      case 'cyber': return 'text-neon-purple'
      case 'environmental': return 'text-neon-yellow'
      case 'social': return 'text-neon-blue'
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
      case 'monitored': return 'text-neon-blue'
      case 'escalating': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monitored': return <Target className="h-4 w-4" />
      case 'escalating': return <TrendingUp className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      case 'resolved': return <Shield className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Global Threat Assessment</h2>
            <p className="text-muted-foreground">Comprehensive global threat monitoring and assessment</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              overallThreatLevel > 70 ? 'bg-neon-red' :
              overallThreatLevel > 40 ? 'bg-neon-yellow' : 'bg-neon-green'
            } animate-pulse`} />
            <span className="text-sm font-medium">
              Threat Level: {overallThreatLevel.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Threat Metrics */}
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
                  {metric.value}{metric.name.includes('Level') || metric.name.includes('Coverage') || metric.name.includes('Readiness') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Level') || metric.name.includes('Coverage') || metric.name.includes('Readiness') ? '%' : ''}
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
                  {getCategoryIcon(threat.category)}
                  <div>
                    <div className="font-medium text-sm">{threat.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {threat.region} • {threat.timeframe} • {threat.lastUpdate}
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
                    <div className="text-sm font-bold text-neon-red">{threat.probability.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-yellow">{threat.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{threat.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(threat.status)}`}>
                  Status: {threat.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {threat.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
