'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Target, CheckCircle, Clock, Zap, Activity, TrendingUp, AlertTriangle } from 'lucide-react'

interface MitigationStrategy {
  id: string
  name: string
  type: 'preventive' | 'reactive' | 'adaptive' | 'transformative'
  effectiveness: number
  cost: 'Low' | 'Medium' | 'High' | 'Critical'
  timeframe: string
  status: 'planned' | 'implementing' | 'active' | 'completed'
  supplyChains: string[]
  lastUpdate: string
}

interface StrategyMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function MitigationStrategies() {
  const [strategies, setStrategies] = useState<MitigationStrategy[]>([])
  const [metrics, setMetrics] = useState<StrategyMetric[]>([])
  const [totalStrategies, setTotalStrategies] = useState(0)

  useEffect(() => {
    const initialStrategies: MitigationStrategy[] = [
      {
        id: 'strategy-001',
        name: 'Supplier Diversification',
        type: 'preventive',
        effectiveness: 89.2,
        cost: 'Medium',
        timeframe: '3-6 months',
        status: 'implementing',
        supplyChains: ['Electronics', 'Automotive'],
        lastUpdate: '2 hours ago'
      },
      {
        id: 'strategy-002',
        name: 'Inventory Buffer Management',
        type: 'reactive',
        effectiveness: 76.8,
        cost: 'High',
        timeframe: '1-2 months',
        status: 'active',
        supplyChains: ['Pharmaceutical', 'Food & Beverage'],
        lastUpdate: '1 day ago'
      },
      {
        id: 'strategy-003',
        name: 'Alternative Transportation Routes',
        type: 'adaptive',
        effectiveness: 82.3,
        cost: 'Low',
        timeframe: '2-4 weeks',
        status: 'completed',
        supplyChains: ['Textile', 'Electronics'],
        lastUpdate: '3 days ago'
      },
      {
        id: 'strategy-004',
        name: 'AI-Powered Demand Forecasting',
        type: 'transformative',
        effectiveness: 94.5,
        cost: 'High',
        timeframe: '6-12 months',
        status: 'planned',
        supplyChains: ['All Chains'],
        lastUpdate: '1 week ago'
      }
    ]

    const initialMetrics: StrategyMetric[] = [
      {
        name: 'Total Strategies',
        value: 47,
        target: 40,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Success Rate',
        value: 87.3,
        target: 85,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Average Effectiveness',
        value: 84.7,
        target: 80,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Implementation Speed',
        value: 78.2,
        target: 75,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setStrategies(initialStrategies)
    setMetrics(initialMetrics)
    setTotalStrategies(47)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalStrategies(prev => prev + Math.floor(Math.random() * 2))
      setStrategies(prev => prev.map(strategy => ({
        ...strategy,
        lastUpdate: 'Just now'
      })))
    }, 35000)

    return () => clearInterval(interval)
  }, [])

  const getStrategyTypeIcon = (type: string) => {
    switch (type) {
      case 'preventive': return <Shield className="h-4 w-4" />
      case 'reactive': return <Target className="h-4 w-4" />
      case 'adaptive': return <Zap className="h-4 w-4" />
      case 'transformative': return <TrendingUp className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getStrategyTypeColor = (type: string) => {
    switch (type) {
      case 'preventive': return 'text-neon-green'
      case 'reactive': return 'text-neon-yellow'
      case 'adaptive': return 'text-neon-blue'
      case 'transformative': return 'text-neon-purple'
      default: return 'text-muted-foreground'
    }
  }

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'text-neon-yellow'
      case 'implementing': return 'text-neon-blue'
      case 'active': return 'text-neon-green'
      case 'completed': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planned': return <Clock className="h-4 w-4" />
      case 'implementing': return <Activity className="h-4 w-4" />
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Mitigation Strategies</h2>
            <p className="text-muted-foreground">Supply chain disruption mitigation and resilience strategies</p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-neon-green" />
            <span className="text-sm font-medium text-neon-green">
              {totalStrategies} Strategies
            </span>
          </div>
        </div>

        {/* Strategy Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Effectiveness') || metric.name.includes('Speed') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Effectiveness') || metric.name.includes('Speed') ? '%' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Strategies</h3>
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
                      {strategy.type} • {strategy.timeframe} • {strategy.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(strategy.status)}
                  <div className={`text-sm font-bold ${getStatusColor(strategy.status)}`}>
                    {strategy.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">{strategy.effectiveness.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Effectiveness</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${getCostColor(strategy.cost)}`}>
                    {strategy.cost}
                  </div>
                  <div className="text-xs text-muted-foreground">Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{strategy.supplyChains.length}</div>
                  <div className="text-xs text-muted-foreground">Chains</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {strategy.supplyChains.map((chain, chainIndex) => (
                  <span
                    key={chainIndex}
                    className="px-2 py-1 text-xs bg-neon-blue/10 text-neon-blue rounded-full border border-neon-blue/20"
                  >
                    {chain}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
