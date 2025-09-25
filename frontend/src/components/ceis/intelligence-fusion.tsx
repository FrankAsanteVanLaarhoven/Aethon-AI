'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Activity, TrendingUp, Users, Globe, CheckCircle } from 'lucide-react'

interface FusionProcess {
  id: string
  name: string
  sources: number
  status: 'processing' | 'completed' | 'failed' | 'queued'
  accuracy: number
  speed: number
  quality: number
  timestamp: string
  type: 'real-time' | 'batch' | 'streaming' | 'hybrid'
}

interface FusionMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function IntelligenceFusion() {
  const [processes, setProcesses] = useState<FusionProcess[]>([])
  const [metrics, setMetrics] = useState<FusionMetric[]>([])
  const [fusionRate, setFusionRate] = useState(0)

  useEffect(() => {
    const initialProcesses: FusionProcess[] = [
      {
        id: 'fusion-001',
        name: 'Market Intelligence Synthesis',
        sources: 12,
        status: 'processing',
        accuracy: 94.2,
        speed: 87.5,
        quality: 91.3,
        timestamp: '2 min ago',
        type: 'real-time'
      },
      {
        id: 'fusion-002',
        name: 'Competitive Analysis Fusion',
        sources: 8,
        status: 'completed',
        accuracy: 89.7,
        speed: 92.1,
        quality: 88.9,
        timestamp: '15 min ago',
        type: 'batch'
      },
      {
        id: 'fusion-003',
        name: 'Global Risk Assessment',
        sources: 15,
        status: 'processing',
        accuracy: 91.8,
        speed: 85.3,
        quality: 93.2,
        timestamp: '5 min ago',
        type: 'streaming'
      },
      {
        id: 'fusion-004',
        name: 'Supply Chain Intelligence',
        sources: 6,
        status: 'queued',
        accuracy: 0,
        speed: 0,
        quality: 0,
        timestamp: 'Pending',
        type: 'hybrid'
      }
    ]

    const initialMetrics: FusionMetric[] = [
      {
        name: 'Fusion Rate',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Processing Speed',
        value: 89.2,
        target: 85,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Data Quality',
        value: 92.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Source Coverage',
        value: 87.5,
        target: 85,
        trend: 'stable',
        color: 'text-neon-yellow'
      }
    ]

    setProcesses(initialProcesses)
    setMetrics(initialMetrics)
    setFusionRate(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setFusionRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setProcesses(prev => prev.map(process => {
        if (process.status === 'processing') {
          return {
            ...process,
            accuracy: Math.min(100, process.accuracy + Math.random() * 0.2),
            speed: Math.min(100, process.speed + Math.random() * 0.1),
            timestamp: 'Just now'
          }
        }
        return process
      }))
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return <Activity className="h-4 w-4 animate-pulse" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'failed': return <Target className="h-4 w-4" />
      case 'queued': return <Brain className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-neon-blue'
      case 'completed': return 'text-neon-green'
      case 'failed': return 'text-neon-red'
      case 'queued': return 'text-neon-yellow'
      default: return 'text-muted-foreground'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'real-time': return 'text-neon-green'
      case 'batch': return 'text-neon-blue'
      case 'streaming': return 'text-neon-purple'
      case 'hybrid': return 'text-neon-yellow'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-green" />
      case 'down': return <TrendingUp className="h-3 w-3 text-neon-red rotate-180" />
      case 'stable': return <div className="w-3 h-0.5 bg-neon-blue" />
      default: return <Activity className="h-3 w-3 text-muted-foreground" />
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
            <h2 className="text-xl font-bold mb-2">Intelligence Fusion</h2>
            <p className="text-muted-foreground">Multi-source intelligence fusion and synthesis</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-neon-purple" />
            <span className="text-sm font-medium text-neon-purple">
              {fusionRate.toFixed(1)}% Fusion Rate
            </span>
          </div>
        </div>

        {/* Fusion Metrics */}
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
                {getTrendIcon(metric.trend)}
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
        <h3 className="text-lg font-semibold mb-4">Fusion Processes</h3>
        <div className="space-y-3">
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
                  {getStatusIcon(process.status)}
                  <div>
                    <div className="font-medium text-sm">{process.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {process.sources} sources • {process.type} • {process.timestamp}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${getStatusColor(process.status)}`}>
                  {process.status}
                </div>
              </div>

              {process.status !== 'queued' && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{process.accuracy.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-blue">{process.speed.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-purple">{process.quality.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Quality</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
