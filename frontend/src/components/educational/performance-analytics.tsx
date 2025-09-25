'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Activity, Brain, Users, CheckCircle, Zap, Globe } from 'lucide-react'

interface PerformanceMetric {
  id: string
  name: string
  category: 'academic' | 'engagement' | 'retention' | 'satisfaction' | 'outcome'
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  change: number
  lastUpdate: string
  region: string
  program: string
}

interface AnalyticsData {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function PerformanceAnalytics() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [overallPerformance, setOverallPerformance] = useState(0)

  useEffect(() => {
    const initialMetrics: PerformanceMetric[] = [
      {
        id: 'perf-001',
        name: 'Course Completion Rate',
        category: 'academic',
        value: 94.7,
        target: 85,
        trend: 'up',
        change: 2.3,
        lastUpdate: '2 hours ago',
        region: 'Global',
        program: 'AI Fundamentals'
      },
      {
        id: 'perf-002',
        name: 'Student Engagement',
        category: 'engagement',
        value: 87.3,
        target: 80,
        trend: 'up',
        change: 1.8,
        lastUpdate: '4 hours ago',
        region: 'North America',
        program: 'Data Science Bootcamp'
      },
      {
        id: 'perf-003',
        name: 'Retention Rate',
        category: 'retention',
        value: 89.2,
        target: 75,
        trend: 'up',
        change: 3.1,
        lastUpdate: '1 day ago',
        region: 'Europe',
        program: 'Leadership in Tech'
      },
      {
        id: 'perf-004',
        name: 'Student Satisfaction',
        category: 'satisfaction',
        value: 92.1,
        target: 85,
        trend: 'up',
        change: 1.5,
        lastUpdate: '3 days ago',
        region: 'Asia Pacific',
        program: 'Sustainable Development'
      }
    ]

    const initialAnalytics: AnalyticsData[] = [
      {
        name: 'Overall Performance',
        value: 90.8,
        target: 80,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Learning Velocity',
        value: 2.8,
        target: 2.0,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Skill Acquisition',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Career Impact',
        value: 87.5,
        target: 75,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setMetrics(initialMetrics)
    setAnalytics(initialAnalytics)
    setOverallPerformance(90.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallPerformance(prev => Math.min(100, prev + Math.random() * 0.1))
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        lastUpdate: 'Just now'
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <Brain className="h-4 w-4" />
      case 'engagement': return <Activity className="h-4 w-4" />
      case 'retention': return <Users className="h-4 w-4" />
      case 'satisfaction': return <CheckCircle className="h-4 w-4" />
      case 'outcome': return <Target className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'text-blue-400'
      case 'engagement': return 'text-green-400'
      case 'retention': return 'text-blue-300'
      case 'satisfaction': return 'text-gray-300'
      case 'outcome': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-gray-400'
      case 'stable': return 'text-blue-400'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />
      case 'down': return <Activity className="h-4 w-4" />
      case 'stable': return <CheckCircle className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Performance Analytics</h2>
            <p className="text-muted-foreground">Comprehensive learning performance analysis and insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {overallPerformance.toFixed(1)}% Overall Performance
            </span>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {analytics.map((analytic, index) => (
            <motion.div
              key={analytic.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{analytic.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  analytic.trend === 'up' ? 'bg-green-400' :
                  analytic.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${analytic.color}`}>
                  {analytic.value}{analytic.name.includes('Performance') || analytic.name.includes('Acquisition') || analytic.name.includes('Impact') ? '%' : analytic.name.includes('Velocity') ? 'x' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {analytic.target}{analytic.name.includes('Performance') || analytic.name.includes('Acquisition') || analytic.name.includes('Impact') ? '%' : analytic.name.includes('Velocity') ? 'x' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(metric.category)}
                  <div>
                    <div className="font-medium text-sm">{metric.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {metric.region} • {metric.program} • {metric.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(metric.trend)}
                  <div className={`text-sm font-bold ${getTrendColor(metric.trend)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Current vs Target</span>
                  <span className="text-xs text-muted-foreground">{metric.value.toFixed(1)}% / {metric.target}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      metric.value > metric.target ? 'bg-green-400' :
                      metric.value > metric.target * 0.9 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{metric.value.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{metric.target}%</div>
                    <div className="text-xs text-muted-foreground">Target</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getTrendColor(metric.trend)}`}>
                      {metric.trend}
                    </div>
                    <div className="text-xs text-muted-foreground">Trend</div>
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
