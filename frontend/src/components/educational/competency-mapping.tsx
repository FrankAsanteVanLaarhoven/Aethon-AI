'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Brain, Activity, TrendingUp, Users, CheckCircle, Zap, Globe } from 'lucide-react'

interface Competency {
  id: string
  name: string
  category: 'technical' | 'soft' | 'leadership' | 'creative' | 'analytical'
  level: 'foundational' | 'intermediate' | 'advanced' | 'expert'
  demand: number
  supply: number
  gap: number
  status: 'growing' | 'stable' | 'declining' | 'emerging'
  lastUpdate: string
  region: string
  industry: string
}

interface CompetencyMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function CompetencyMapping() {
  const [competencies, setCompetencies] = useState<Competency[]>([])
  const [metrics, setMetrics] = useState<CompetencyMetric[]>([])
  const [mappingAccuracy, setMappingAccuracy] = useState(0)

  useEffect(() => {
    const initialCompetencies: Competency[] = [
      {
        id: 'comp-001',
        name: 'Machine Learning Engineering',
        category: 'technical',
        level: 'advanced',
        demand: 94.7,
        supply: 67.8,
        gap: 26.9,
        status: 'growing',
        lastUpdate: '2 hours ago',
        region: 'Global',
        industry: 'Technology'
      },
      {
        id: 'comp-002',
        name: 'Data Analysis & Visualization',
        category: 'analytical',
        level: 'intermediate',
        demand: 89.2,
        supply: 78.5,
        gap: 10.7,
        status: 'stable',
        lastUpdate: '4 hours ago',
        region: 'North America',
        industry: 'Finance'
      },
      {
        id: 'comp-003',
        name: 'Digital Leadership',
        category: 'leadership',
        level: 'advanced',
        demand: 76.8,
        supply: 45.3,
        gap: 31.5,
        status: 'growing',
        lastUpdate: '1 day ago',
        region: 'Europe',
        industry: 'Management'
      },
      {
        id: 'comp-004',
        name: 'Creative Problem Solving',
        category: 'creative',
        level: 'intermediate',
        demand: 82.1,
        supply: 71.4,
        gap: 10.7,
        status: 'emerging',
        lastUpdate: '3 days ago',
        region: 'Asia Pacific',
        industry: 'Design'
      }
    ]

    const initialMetrics: CompetencyMetric[] = [
      {
        name: 'Mapping Accuracy',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Gap Detection',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Demand Prediction',
        value: 89.7,
        target: 80,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Supply Analysis',
        value: 92.3,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setCompetencies(initialCompetencies)
    setMetrics(initialMetrics)
    setMappingAccuracy(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMappingAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setCompetencies(prev => prev.map(comp => ({
        ...comp,
        lastUpdate: 'Just now'
      })))
    }, 22000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Zap className="h-4 w-4" />
      case 'soft': return <Users className="h-4 w-4" />
      case 'leadership': return <Target className="h-4 w-4" />
      case 'creative': return <Brain className="h-4 w-4" />
      case 'analytical': return <TrendingUp className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'text-blue-400'
      case 'soft': return 'text-green-400'
      case 'leadership': return 'text-gray-300'
      case 'creative': return 'text-blue-300'
      case 'analytical': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-gray-300'
      case 'advanced': return 'text-blue-400'
      case 'intermediate': return 'text-blue-300'
      case 'foundational': return 'text-green-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'growing': return 'text-green-400'
      case 'stable': return 'text-blue-400'
      case 'declining': return 'text-gray-400'
      case 'emerging': return 'text-blue-300'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'growing': return <TrendingUp className="h-4 w-4" />
      case 'stable': return <CheckCircle className="h-4 w-4" />
      case 'declining': return <Activity className="h-4 w-4" />
      case 'emerging': return <Target className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Competency Mapping</h2>
            <p className="text-muted-foreground">Skills demand and supply analysis with gap identification</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {mappingAccuracy.toFixed(1)}% Mapping Accuracy
            </span>
          </div>
        </div>

        {/* Competency Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Competency Analysis</h3>
        <div className="space-y-4">
          {competencies.map((competency, index) => (
            <motion.div
              key={competency.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(competency.category)}
                  <div>
                    <div className="font-medium text-sm">{competency.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {competency.region} • {competency.industry} • {competency.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(competency.status)}
                  <div className={`text-sm font-bold ${getLevelColor(competency.level)}`}>
                    {competency.level}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Demand vs Supply Gap</span>
                  <span className="text-xs text-muted-foreground">{competency.gap.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      competency.gap > 25 ? 'bg-gray-300' :
                      competency.gap > 15 ? 'bg-blue-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${competency.gap}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{competency.demand.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Demand</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{competency.supply.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Supply</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{competency.gap.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Gap</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(competency.status)}`}>
                  Status: {competency.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {competency.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
