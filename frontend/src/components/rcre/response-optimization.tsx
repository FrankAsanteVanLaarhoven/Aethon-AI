'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, TrendingUp, Activity, Clock, CheckCircle, Brain, Shield } from 'lucide-react'

interface OptimizationStrategy {
  id: string
  name: string
  type: 'speed' | 'accuracy' | 'efficiency' | 'cost'
  improvement: number
  implementation: number
  status: 'analyzing' | 'testing' | 'deploying' | 'active'
  lastUpdate: string
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  automation: number
}

interface OptimizationMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function ResponseOptimization() {
  const [strategies, setStrategies] = useState<OptimizationStrategy[]>([])
  const [metrics, setMetrics] = useState<OptimizationMetric[]>([])
  const [optimizationLevel, setOptimizationLevel] = useState(0)

  useEffect(() => {
    const initialStrategies: OptimizationStrategy[] = [
      {
        id: 'opt-001',
        name: 'Response Time Optimization',
        type: 'speed',
        improvement: 45.2,
        implementation: 89.7,
        status: 'active',
        lastUpdate: '2 hours ago',
        impact: 'High',
        automation: 96.8
      },
      {
        id: 'opt-002',
        name: 'Threat Classification AI',
        type: 'accuracy',
        improvement: 32.1,
        implementation: 76.3,
        status: 'deploying',
        lastUpdate: '4 hours ago',
        impact: 'Critical',
        automation: 94.2
      },
      {
        id: 'opt-003',
        name: 'Resource Allocation Engine',
        type: 'efficiency',
        improvement: 28.7,
        implementation: 65.8,
        status: 'testing',
        lastUpdate: '1 day ago',
        impact: 'Medium',
        automation: 87.5
      },
      {
        id: 'opt-004',
        name: 'Cost Reduction Algorithm',
        type: 'cost',
        improvement: 38.9,
        implementation: 82.4,
        status: 'analyzing',
        lastUpdate: '2 days ago',
        impact: 'High',
        automation: 91.3
      }
    ]

    const initialMetrics: OptimizationMetric[] = [
      {
        name: 'Overall Optimization',
        value: 87.3,
        target: 85,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Response Efficiency',
        value: 92.1,
        target: 90,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Resource Utilization',
        value: 89.7,
        target: 85,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Cost Optimization',
        value: 84.5,
        target: 80,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setStrategies(initialStrategies)
    setMetrics(initialMetrics)
    setOptimizationLevel(87.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOptimizationLevel(prev => Math.min(100, prev + Math.random() * 0.1))
      setStrategies(prev => prev.map(strategy => ({
        ...strategy,
        lastUpdate: 'Just now'
      })))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getStrategyTypeIcon = (type: string) => {
    switch (type) {
      case 'speed': return <Zap className="h-4 w-4" />
      case 'accuracy': return <Target className="h-4 w-4" />
      case 'efficiency': return <TrendingUp className="h-4 w-4" />
      case 'cost': return <Shield className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getStrategyTypeColor = (type: string) => {
    switch (type) {
      case 'speed': return 'text-neon-red'
      case 'accuracy': return 'text-neon-blue'
      case 'efficiency': return 'text-neon-green'
      case 'cost': return 'text-neon-yellow'
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
      case 'analyzing': return 'text-neon-yellow'
      case 'testing': return 'text-neon-blue'
      case 'deploying': return 'text-neon-purple'
      case 'active': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzing': return <Brain className="h-4 w-4" />
      case 'testing': return <Clock className="h-4 w-4" />
      case 'deploying': return <Activity className="h-4 w-4" />
      case 'active': return <CheckCircle className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Response Optimization</h2>
            <p className="text-muted-foreground">Continuous optimization of response strategies and performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-neon-purple" />
            <span className="text-sm font-medium text-neon-purple">
              {optimizationLevel.toFixed(1)}% Optimized
            </span>
          </div>
        </div>

        {/* Optimization Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Optimization Strategies</h3>
        <div className="space-y-4">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStrategyTypeIcon(strategy.type)}
                  <div>
                    <div className="font-medium text-sm">{strategy.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {strategy.type} • {strategy.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(strategy.status)}
                  <div className={`text-sm font-bold ${getImpactColor(strategy.impact)}`}>
                    {strategy.impact}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">{strategy.improvement.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{strategy.implementation.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Implementation</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-purple">{strategy.automation.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Automation</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(strategy.status)}`}>
                  Status: {strategy.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {strategy.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
