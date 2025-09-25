'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, AlertTriangle, Activity, Shield, Globe, Zap, Brain, CheckCircle } from 'lucide-react'

interface MilitaryThreat {
  id: string
  name: string
  region: string
  type: 'conventional' | 'cyber' | 'nuclear' | 'hybrid' | 'terrorist'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  probability: number
  impact: number
  timeframe: string
  status: 'monitored' | 'escalating' | 'critical' | 'neutralized'
  lastUpdate: string
  description: string
  countermeasures: string[]
}

interface ThreatMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function ThreatAssessment() {
  const [threats, setThreats] = useState<MilitaryThreat[]>([])
  const [metrics, setMetrics] = useState<ThreatMetric[]>([])
  const [overallThreatLevel, setOverallThreatLevel] = useState(0)

  useEffect(() => {
    const initialThreats: MilitaryThreat[] = [
      {
        id: 'threat-001',
        name: 'Regional Military Buildup',
        region: 'Eastern Europe',
        type: 'conventional',
        severity: 'High',
        probability: 65.3,
        impact: 78.5,
        timeframe: '3-6 months',
        status: 'escalating',
        lastUpdate: '2 hours ago',
        description: 'Significant military buildup with potential for conflict',
        countermeasures: ['Enhanced Surveillance', 'Defensive Positioning', 'Diplomatic Engagement']
      },
      {
        id: 'threat-002',
        name: 'Cyber Infrastructure Attack',
        region: 'Global',
        type: 'cyber',
        severity: 'Critical',
        probability: 45.7,
        impact: 92.1,
        timeframe: '1-3 months',
        status: 'monitored',
        lastUpdate: '4 hours ago',
        description: 'Advanced persistent threat targeting critical infrastructure',
        countermeasures: ['Cyber Defense', 'Network Isolation', 'Intelligence Sharing']
      },
      {
        id: 'threat-003',
        name: 'Hybrid Warfare Operations',
        region: 'Multiple',
        type: 'hybrid',
        severity: 'Medium',
        probability: 78.9,
        impact: 54.3,
        timeframe: '6-12 months',
        status: 'monitored',
        lastUpdate: '1 day ago',
        description: 'Coordinated hybrid warfare combining multiple threat vectors',
        countermeasures: ['Multi-Domain Defense', 'Information Operations', 'Alliance Coordination']
      },
      {
        id: 'threat-004',
        name: 'Terrorist Activity',
        region: 'Middle East',
        type: 'terrorist',
        severity: 'Medium',
        probability: 34.2,
        impact: 67.8,
        timeframe: '2-4 months',
        status: 'neutralized',
        lastUpdate: '3 days ago',
        description: 'Terrorist threat successfully neutralized through joint operations',
        countermeasures: ['Intelligence Operations', 'Special Forces', 'International Cooperation']
      }
    ]

    const initialMetrics: ThreatMetric[] = [
      {
        name: 'Overall Threat Level',
        value: 67.3,
        target: 50,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Detection Rate',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Response Time',
        value: 2.1,
        target: 4.0,
        trend: 'down',
        color: 'text-blue-300'
      },
      {
        name: 'Countermeasure Success',
        value: 89.7,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
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

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'conventional': return <Target className="h-4 w-4" />
      case 'cyber': return <Zap className="h-4 w-4" />
      case 'nuclear': return <AlertTriangle className="h-4 w-4" />
      case 'hybrid': return <Brain className="h-4 w-4" />
      case 'terrorist': return <Activity className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getThreatTypeColor = (type: string) => {
    switch (type) {
      case 'conventional': return 'text-blue-400'
      case 'cyber': return 'text-gray-300'
      case 'nuclear': return 'text-gray-400'
      case 'hybrid': return 'text-blue-300'
      case 'terrorist': return 'text-green-400'
      default: return 'text-muted-foreground'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-gray-300'
      case 'High': return 'text-blue-400'
      case 'Medium': return 'text-blue-300'
      case 'Low': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monitored': return 'text-blue-400'
      case 'escalating': return 'text-blue-300'
      case 'critical': return 'text-gray-300'
      case 'neutralized': return 'text-green-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monitored': return <Target className="h-4 w-4" />
      case 'escalating': return <AlertTriangle className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      case 'neutralized': return <CheckCircle className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Threat Assessment</h2>
            <p className="text-muted-foreground">Military threat analysis and countermeasure planning</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              overallThreatLevel > 70 ? 'bg-gray-300' :
              overallThreatLevel > 40 ? 'bg-blue-400' : 'bg-green-400'
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
                  metric.trend === 'up' ? 'bg-green-400' :
                  metric.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Level') || metric.name.includes('Rate') || metric.name.includes('Success') ? '%' : metric.name.includes('Time') ? 'h' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Level') || metric.name.includes('Rate') || metric.name.includes('Success') ? '%' : metric.name.includes('Time') ? 'h' : ''}
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
                  {getThreatTypeIcon(threat.type)}
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
                <div className="flex flex-wrap gap-1 mb-2">
                  {threat.countermeasures.map((countermeasure, counterIndex) => (
                    <span
                      key={counterIndex}
                      className="px-2 py-1 text-xs bg-blue-400/10 text-blue-400 rounded-full border border-blue-400/20"
                    >
                      {countermeasure}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{threat.probability.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{threat.impact.toFixed(1)}%</div>
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
