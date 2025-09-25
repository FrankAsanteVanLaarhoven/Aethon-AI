'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Target, TrendingUp, AlertTriangle, Activity, Shield, Zap, Globe } from 'lucide-react'

interface EconomicWarfareEvent {
  id: string
  name: string
  type: 'sanctions' | 'trade' | 'currency' | 'cyber' | 'resource'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  actors: string[]
  target: string
  impact: number
  status: 'detected' | 'analyzing' | 'confirmed' | 'mitigated'
  timestamp: string
  description: string
  confidence: number
}

interface WarfareMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function EconomicWarfareDetection() {
  const [events, setEvents] = useState<EconomicWarfareEvent[]>([])
  const [metrics, setMetrics] = useState<WarfareMetric[]>([])
  const [detectionRate, setDetectionRate] = useState(0)

  useEffect(() => {
    const initialEvents: EconomicWarfareEvent[] = [
      {
        id: 'warfare-001',
        name: 'Cryptocurrency Manipulation',
        type: 'currency',
        severity: 'High',
        actors: ['State Actor A', 'Financial Group B'],
        target: 'Global Markets',
        impact: 78.5,
        status: 'analyzing',
        timestamp: '2 hours ago',
        description: 'Coordinated cryptocurrency market manipulation targeting stablecoins',
        confidence: 89.2
      },
      {
        id: 'warfare-002',
        name: 'Supply Chain Disruption',
        type: 'trade',
        severity: 'Critical',
        actors: ['Nation State X'],
        target: 'Semiconductor Industry',
        impact: 92.3,
        status: 'confirmed',
        timestamp: '1 day ago',
        description: 'Strategic supply chain disruption in critical technology sectors',
        confidence: 94.7
      },
      {
        id: 'warfare-003',
        name: 'Cyber Financial Attack',
        type: 'cyber',
        severity: 'High',
        actors: ['Cyber Group Y'],
        target: 'Banking Infrastructure',
        impact: 67.8,
        status: 'detected',
        timestamp: '4 hours ago',
        description: 'Advanced persistent threat targeting financial institutions',
        confidence: 76.8
      },
      {
        id: 'warfare-004',
        name: 'Resource Weaponization',
        type: 'resource',
        severity: 'Medium',
        actors: ['Resource Cartel Z'],
        target: 'Energy Markets',
        impact: 54.2,
        status: 'mitigated',
        timestamp: '3 days ago',
        description: 'Strategic resource withholding to influence energy prices',
        confidence: 82.1
      }
    ]

    const initialMetrics: WarfareMetric[] = [
      {
        name: 'Detection Rate',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Response Time',
        value: 2.3,
        target: 4.0,
        trend: 'down',
        color: 'text-neon-blue'
      },
      {
        name: 'False Positive Rate',
        value: 3.2,
        target: 5,
        trend: 'down',
        color: 'text-neon-yellow'
      },
      {
        name: 'Coverage Rate',
        value: 94.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-purple'
      }
    ]

    setEvents(initialEvents)
    setMetrics(initialMetrics)
    setDetectionRate(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDetectionRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setEvents(prev => prev.map(event => ({
        ...event,
        timestamp: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getWarfareTypeIcon = (type: string) => {
    switch (type) {
      case 'sanctions': return <Shield className="h-4 w-4" />
      case 'trade': return <TrendingUp className="h-4 w-4" />
      case 'currency': return <DollarSign className="h-4 w-4" />
      case 'cyber': return <Zap className="h-4 w-4" />
      case 'resource': return <Globe className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getWarfareTypeColor = (type: string) => {
    switch (type) {
      case 'sanctions': return 'text-neon-red'
      case 'trade': return 'text-neon-blue'
      case 'currency': return 'text-neon-green'
      case 'cyber': return 'text-neon-purple'
      case 'resource': return 'text-neon-yellow'
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
      case 'detected': return <Target className="h-4 w-4" />
      case 'analyzing': return <Activity className="h-4 w-4" />
      case 'confirmed': return <AlertTriangle className="h-4 w-4" />
      case 'mitigated': return <Shield className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Economic Warfare Detection</h2>
            <p className="text-muted-foreground">Advanced detection and analysis of economic warfare activities</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-neon-red" />
            <span className="text-sm font-medium text-neon-red">
              {detectionRate.toFixed(1)}% Detection Rate
            </span>
          </div>
        </div>

        {/* Warfare Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Time') ? 'h' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Time') ? 'h' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Detected Events</h3>
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getWarfareTypeIcon(event.type)}
                  <div>
                    <div className="font-medium text-sm">{event.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.target} • {event.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(event.status)}
                  <div className={`text-sm font-bold ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-2">{event.description}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {event.actors.map((actor, actorIndex) => (
                    <span
                      key={actorIndex}
                      className="px-2 py-1 text-xs bg-neon-red/10 text-neon-red rounded-full border border-neon-red/20"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-red">{event.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{event.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(event.status)}`}>
                      {event.status}
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
