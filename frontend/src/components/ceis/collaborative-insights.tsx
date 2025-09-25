'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Lightbulb, TrendingUp, Target, Brain, Zap, CheckCircle, Activity } from 'lucide-react'

interface CollaborativeInsight {
  id: string
  title: string
  contributors: number
  confidence: number
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  category: 'strategic' | 'operational' | 'tactical' | 'research'
  status: 'validated' | 'pending' | 'disputed' | 'archived'
  timestamp: string
  tags: string[]
}

interface InsightMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function CollaborativeInsights() {
  const [insights, setInsights] = useState<CollaborativeInsight[]>([])
  const [metrics, setMetrics] = useState<InsightMetric[]>([])
  const [totalInsights, setTotalInsights] = useState(0)

  useEffect(() => {
    const initialInsights: CollaborativeInsight[] = [
      {
        id: 'insight-001',
        title: 'AI-Driven Supply Chain Optimization',
        contributors: 12,
        confidence: 94.2,
        impact: 'High',
        category: 'strategic',
        status: 'validated',
        timestamp: '2 hours ago',
        tags: ['AI', 'Supply Chain', 'Optimization']
      },
      {
        id: 'insight-002',
        title: 'Market Disruption Prediction Model',
        contributors: 8,
        confidence: 89.7,
        impact: 'Critical',
        category: 'research',
        status: 'pending',
        timestamp: '4 hours ago',
        tags: ['Market', 'Prediction', 'Disruption']
      },
      {
        id: 'insight-003',
        title: 'Cross-Platform Integration Strategy',
        contributors: 15,
        confidence: 91.3,
        impact: 'Medium',
        category: 'operational',
        status: 'validated',
        timestamp: '1 day ago',
        tags: ['Integration', 'Platform', 'Strategy']
      },
      {
        id: 'insight-004',
        title: 'Regulatory Compliance Automation',
        contributors: 6,
        confidence: 87.5,
        impact: 'High',
        category: 'tactical',
        status: 'disputed',
        timestamp: '2 days ago',
        tags: ['Compliance', 'Automation', 'Regulatory']
      }
    ]

    const initialMetrics: InsightMetric[] = [
      {
        name: 'Total Insights',
        value: 247,
        change: 15.2,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Validation Rate',
        value: 87.3,
        change: 8.7,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Collaboration Index',
        value: 92.1,
        change: 5.4,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Impact Score',
        value: 89.5,
        change: 3.2,
        trend: 'stable',
        color: 'text-neon-yellow'
      }
    ]

    setInsights(initialInsights)
    setMetrics(initialMetrics)
    setTotalInsights(247)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalInsights(prev => prev + Math.floor(Math.random() * 3))
      setInsights(prev => prev.map(insight => ({
        ...insight,
        confidence: Math.min(100, insight.confidence + Math.random() * 0.1)
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strategic': return <Target className="h-4 w-4" />
      case 'operational': return <Activity className="h-4 w-4" />
      case 'tactical': return <Zap className="h-4 w-4" />
      case 'research': return <Brain className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategic': return 'text-neon-red'
      case 'operational': return 'text-neon-blue'
      case 'tactical': return 'text-neon-yellow'
      case 'research': return 'text-neon-purple'
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
      case 'validated': return 'text-neon-green'
      case 'pending': return 'text-neon-yellow'
      case 'disputed': return 'text-neon-red'
      case 'archived': return 'text-muted-foreground'
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
            <h2 className="text-xl font-bold mb-2">Collaborative Insights</h2>
            <p className="text-muted-foreground">Cross-enterprise collaborative intelligence and insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {totalInsights} Insights
            </span>
          </div>
        </div>

        {/* Insight Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Index') || metric.name.includes('Score') ? '%' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Recent Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(insight.category)}
                  <div>
                    <div className="font-medium text-sm">{insight.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {insight.contributors} contributors • {insight.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-sm font-bold ${getImpactColor(insight.impact)}`}>
                    {insight.impact}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    insight.status === 'validated' ? 'bg-neon-green' :
                    insight.status === 'pending' ? 'bg-neon-yellow' :
                    insight.status === 'disputed' ? 'bg-neon-red' : 'bg-muted'
                  }`} />
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{insight.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-blue">{insight.contributors}</div>
                    <div className="text-xs text-muted-foreground">Contributors</div>
                  </div>
                </div>
                <div className={`text-xs font-medium ${getStatusColor(insight.status)}`}>
                  {insight.status}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {insight.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-neon-blue/10 text-neon-blue rounded-full border border-neon-blue/20"
                  >
                    {tag}
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
