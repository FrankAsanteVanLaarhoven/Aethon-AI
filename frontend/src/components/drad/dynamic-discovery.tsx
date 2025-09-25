'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Brain, Zap, Target, Activity, TrendingUp, Globe, Shield } from 'lucide-react'

interface DiscoveryProcess {
  id: string
  name: string
  type: 'automated' | 'ai-driven' | 'pattern-based' | 'predictive'
  status: 'scanning' | 'analyzing' | 'validating' | 'completed'
  opportunities: number
  accuracy: number
  speed: number
  lastRun: string
  coverage: string
  confidence: number
}

interface DiscoveryMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function DynamicDiscovery() {
  const [processes, setProcesses] = useState<DiscoveryProcess[]>([])
  const [metrics, setMetrics] = useState<DiscoveryMetric[]>([])
  const [discoveryRate, setDiscoveryRate] = useState(0)

  useEffect(() => {
    const initialProcesses: DiscoveryProcess[] = [
      {
        id: 'disc-001',
        name: 'Regulatory Pattern Scanner',
        type: 'pattern-based',
        status: 'scanning',
        opportunities: 47,
        accuracy: 94.2,
        speed: 89.7,
        lastRun: '2 min ago',
        coverage: 'Global',
        confidence: 91.3
      },
      {
        id: 'disc-002',
        name: 'AI Tax Optimization Engine',
        type: 'ai-driven',
        status: 'analyzing',
        opportunities: 23,
        accuracy: 87.5,
        speed: 92.1,
        lastRun: '5 min ago',
        coverage: 'EU-US',
        confidence: 88.9
      },
      {
        id: 'disc-003',
        name: 'Jurisdictional Arbitrage Finder',
        type: 'automated',
        status: 'validating',
        opportunities: 15,
        accuracy: 91.8,
        speed: 85.3,
        lastRun: '10 min ago',
        coverage: 'Offshore',
        confidence: 93.2
      },
      {
        id: 'disc-004',
        name: 'Predictive Compliance Analyzer',
        type: 'predictive',
        status: 'completed',
        opportunities: 8,
        accuracy: 89.7,
        speed: 78.5,
        lastRun: '1 hour ago',
        coverage: 'Regional',
        confidence: 86.4
      }
    ]

    const initialMetrics: DiscoveryMetric[] = [
      {
        name: 'Discovery Rate',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Accuracy Rate',
        value: 90.8,
        target: 88,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Processing Speed',
        value: 86.4,
        target: 85,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Coverage Rate',
        value: 94.2,
        target: 90,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setProcesses(initialProcesses)
    setMetrics(initialMetrics)
    setDiscoveryRate(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDiscoveryRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setProcesses(prev => prev.map(process => ({
        ...process,
        lastRun: 'Just now'
      })))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getProcessTypeIcon = (type: string) => {
    switch (type) {
      case 'automated': return <Zap className="h-4 w-4" />
      case 'ai-driven': return <Brain className="h-4 w-4" />
      case 'pattern-based': return <Search className="h-4 w-4" />
      case 'predictive': return <Target className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getProcessTypeColor = (type: string) => {
    switch (type) {
      case 'automated': return 'text-neon-red'
      case 'ai-driven': return 'text-neon-purple'
      case 'pattern-based': return 'text-neon-blue'
      case 'predictive': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scanning': return 'text-neon-blue'
      case 'analyzing': return 'text-neon-yellow'
      case 'validating': return 'text-neon-purple'
      case 'completed': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scanning': return <Search className="h-4 w-4" />
      case 'analyzing': return <Brain className="h-4 w-4" />
      case 'validating': return <Shield className="h-4 w-4" />
      case 'completed': return <TrendingUp className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Dynamic Discovery</h2>
            <p className="text-muted-foreground">AI-powered discovery processes for regulatory arbitrage opportunities</p>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {discoveryRate.toFixed(1)}% Discovery Rate
            </span>
          </div>
        </div>

        {/* Discovery Metrics */}
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
                  {metric.value.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}%
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
        <h3 className="text-lg font-semibold mb-4">Discovery Processes</h3>
        <div className="space-y-4">
          {processes.map((process, index) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getProcessTypeIcon(process.type)}
                  <div>
                    <div className="font-medium text-sm">{process.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {process.coverage} • {process.lastRun}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(process.status)}
                  <div className={`text-sm font-bold ${getStatusColor(process.status)}`}>
                    {process.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">{process.opportunities}</div>
                  <div className="text-xs text-muted-foreground">Opportunities</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{process.accuracy.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-purple">{process.speed.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-yellow">{process.confidence.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
