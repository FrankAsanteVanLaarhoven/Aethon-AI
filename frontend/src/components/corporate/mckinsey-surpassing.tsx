'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, Activity, Brain, Users, CheckCircle, Zap, Globe } from 'lucide-react'

interface McKinseyCapability {
  id: string
  name: string
  category: 'strategy' | 'operations' | 'digital' | 'organization' | 'analytics'
  mckinseyScore: number
  ourScore: number
  advantage: number
  status: 'surpassing' | 'matching' | 'catching' | 'behind'
  lastUpdate: string
  benchmark: string
  methodology: string
}

interface McKinseyMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function McKinseySurpassing() {
  const [capabilities, setCapabilities] = useState<McKinseyCapability[]>([])
  const [metrics, setMetrics] = useState<McKinseyMetric[]>([])
  const [surpassingRate, setSurpassingRate] = useState(0)

  useEffect(() => {
    const initialCapabilities: McKinseyCapability[] = [
      {
        id: 'mck-001',
        name: 'Strategic Planning',
        category: 'strategy',
        mckinseyScore: 87.3,
        ourScore: 94.7,
        advantage: 7.4,
        status: 'surpassing',
        lastUpdate: '2 hours ago',
        benchmark: 'Fortune 500',
        methodology: 'AI-Enhanced Strategy'
      },
      {
        id: 'mck-002',
        name: 'Operational Excellence',
        category: 'operations',
        mckinseyScore: 82.1,
        ourScore: 89.2,
        advantage: 7.1,
        status: 'surpassing',
        lastUpdate: '4 hours ago',
        benchmark: 'Industry Leaders',
        methodology: 'Quantum Operations'
      },
      {
        id: 'mck-003',
        name: 'Digital Transformation',
        category: 'digital',
        mckinseyScore: 78.5,
        ourScore: 76.8,
        advantage: -1.7,
        status: 'catching',
        lastUpdate: '1 day ago',
        benchmark: 'Tech Giants',
        methodology: 'Neural Networks'
      },
      {
        id: 'mck-004',
        name: 'Organizational Design',
        category: 'organization',
        mckinseyScore: 85.7,
        ourScore: 92.1,
        advantage: 6.4,
        status: 'surpassing',
        lastUpdate: '3 days ago',
        benchmark: 'Best Practices',
        methodology: 'AI-Driven Design'
      }
    ]

    const initialMetrics: McKinseyMetric[] = [
      {
        name: 'Surpassing Rate',
        value: 78.5,
        target: 70,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Average Advantage',
        value: 4.8,
        target: 3.0,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Benchmark Coverage',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Methodology Innovation',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setCapabilities(initialCapabilities)
    setMetrics(initialMetrics)
    setSurpassingRate(78.5)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSurpassingRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setCapabilities(prev => prev.map(cap => ({
        ...cap,
        lastUpdate: 'Just now'
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strategy': return <Target className="h-4 w-4" />
      case 'operations': return <Activity className="h-4 w-4" />
      case 'digital': return <Zap className="h-4 w-4" />
      case 'organization': return <Users className="h-4 w-4" />
      case 'analytics': return <Brain className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategy': return 'text-blue-400'
      case 'operations': return 'text-green-400'
      case 'digital': return 'text-blue-300'
      case 'organization': return 'text-gray-300'
      case 'analytics': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'surpassing': return 'text-green-400'
      case 'matching': return 'text-blue-400'
      case 'catching': return 'text-blue-300'
      case 'behind': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'surpassing': return <TrendingUp className="h-4 w-4" />
      case 'matching': return <CheckCircle className="h-4 w-4" />
      case 'catching': return <Activity className="h-4 w-4" />
      case 'behind': return <Target className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">McKinsey+ Surpassing</h2>
            <p className="text-muted-foreground">Advanced capabilities surpassing traditional McKinsey methodologies</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {surpassingRate.toFixed(1)}% Surpassing Rate
            </span>
          </div>
        </div>

        {/* McKinsey Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Coverage') || metric.name.includes('Innovation') ? '%' : metric.name.includes('Advantage') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Coverage') || metric.name.includes('Innovation') ? '%' : metric.name.includes('Advantage') ? '%' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Capability Comparison</h3>
        <div className="space-y-4">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(capability.category)}
                  <div>
                    <div className="font-medium text-sm">{capability.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {capability.benchmark} • {capability.methodology} • {capability.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(capability.status)}
                  <div className={`text-sm font-bold ${getStatusColor(capability.status)}`}>
                    {capability.status}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Our Score vs McKinsey</span>
                  <span className="text-xs text-muted-foreground">
                    {capability.ourScore.toFixed(1)}% vs {capability.mckinseyScore.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      capability.advantage > 0 ? 'bg-green-400' :
                      capability.advantage > -2 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${Math.min(100, (capability.ourScore / 100) * 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{capability.ourScore.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Our Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{capability.mckinseyScore.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">McKinsey</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${capability.advantage > 0 ? 'text-green-400' : 'text-blue-300'}`}>
                      {capability.advantage > 0 ? '+' : ''}{capability.advantage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Advantage</div>
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
