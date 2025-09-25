'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Network, TrendingUp, Users, Zap, Activity, Target, Brain, Globe } from 'lucide-react'

interface NetworkEffect {
  id: string
  name: string
  type: 'viral' | 'exponential' | 'compound' | 'synergistic'
  magnitude: number
  velocity: number
  reach: number
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'growing' | 'stable' | 'declining' | 'peaked'
}

interface EffectMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function NetworkEffects() {
  const [effects, setEffects] = useState<NetworkEffect[]>([])
  const [metrics, setMetrics] = useState<EffectMetric[]>([])
  const [totalEffects, setTotalEffects] = useState(0)

  useEffect(() => {
    const initialEffects: NetworkEffect[] = [
      {
        id: 'effect-001',
        name: 'AI Adoption Cascade',
        type: 'viral',
        magnitude: 87.3,
        velocity: 94.2,
        reach: 1247,
        impact: 'High',
        status: 'growing'
      },
      {
        id: 'effect-002',
        name: 'Supply Chain Optimization',
        type: 'exponential',
        magnitude: 92.1,
        velocity: 78.5,
        reach: 892,
        impact: 'Critical',
        status: 'stable'
      },
      {
        id: 'effect-003',
        name: 'Data Intelligence Sharing',
        type: 'compound',
        magnitude: 76.8,
        velocity: 89.7,
        reach: 567,
        impact: 'Medium',
        status: 'growing'
      },
      {
        id: 'effect-004',
        name: 'Cross-Platform Integration',
        type: 'synergistic',
        magnitude: 84.5,
        velocity: 82.3,
        reach: 423,
        impact: 'High',
        status: 'growing'
      }
    ]

    const initialMetrics: EffectMetric[] = [
      {
        name: 'Total Effects',
        value: 47,
        change: 12.5,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Average Magnitude',
        value: 85.2,
        change: 8.3,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Network Velocity',
        value: 86.1,
        change: 5.7,
        trend: 'up',
        color: 'text-neon-yellow'
      },
      {
        name: 'Global Reach',
        value: 3129,
        change: 15.2,
        trend: 'up',
        color: 'text-neon-purple'
      }
    ]

    setEffects(initialEffects)
    setMetrics(initialMetrics)
    setTotalEffects(47)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalEffects(prev => prev + Math.floor(Math.random() * 2))
      setEffects(prev => prev.map(effect => ({
        ...effect,
        magnitude: Math.min(100, effect.magnitude + Math.random() * 0.2),
        velocity: Math.min(100, effect.velocity + Math.random() * 0.1)
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getEffectTypeIcon = (type: string) => {
    switch (type) {
      case 'viral': return <Zap className="h-4 w-4" />
      case 'exponential': return <TrendingUp className="h-4 w-4" />
      case 'compound': return <Brain className="h-4 w-4" />
      case 'synergistic': return <Network className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getEffectTypeColor = (type: string) => {
    switch (type) {
      case 'viral': return 'text-neon-red'
      case 'exponential': return 'text-neon-yellow'
      case 'compound': return 'text-neon-blue'
      case 'synergistic': return 'text-neon-purple'
      default: return 'text-muted-foreground'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'growing': return 'bg-neon-green'
      case 'stable': return 'bg-neon-blue'
      case 'declining': return 'bg-neon-yellow'
      case 'peaked': return 'bg-neon-red'
      default: return 'bg-muted'
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
            <h2 className="text-xl font-bold mb-2">Network Effects</h2>
            <p className="text-muted-foreground">Network effect analysis and impact measurement</p>
          </div>
          <div className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {totalEffects} Active Effects
            </span>
          </div>
        </div>

        {/* Effect Metrics */}
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
                  {metric.value}{metric.name.includes('Reach') ? '' : metric.name.includes('Magnitude') || metric.name.includes('Velocity') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  +{metric.change}%
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
        <h3 className="text-lg font-semibold mb-4">Active Network Effects</h3>
        <div className="space-y-3">
          {effects.map((effect, index) => (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getEffectTypeIcon(effect.type)}
                  <div>
                    <div className="font-medium text-sm">{effect.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {effect.type} • {effect.reach} reach
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(effect.status)}`} />
                  <div className={`text-sm font-bold ${getImpactColor(effect.impact)}`}>
                    {effect.impact}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{effect.magnitude.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Magnitude</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">{effect.velocity.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-purple">{effect.reach}</div>
                  <div className="text-xs text-muted-foreground">Reach</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
