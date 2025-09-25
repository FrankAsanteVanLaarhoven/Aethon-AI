'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Activity, Clock, CheckCircle, AlertTriangle, Zap, Shield } from 'lucide-react'

interface PerformanceMetric {
  id: string
  name: string
  category: 'speed' | 'accuracy' | 'efficiency' | 'reliability'
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  status: 'excellent' | 'good' | 'warning' | 'critical'
  lastUpdate: string
  improvement: number
}

interface SystemHealth {
  component: string
  status: 'healthy' | 'warning' | 'critical' | 'maintenance'
  uptime: number
  performance: number
  lastCheck: string
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([])
  const [overallPerformance, setOverallPerformance] = useState(0)

  useEffect(() => {
    const initialMetrics: PerformanceMetric[] = [
      {
        id: 'metric-001',
        name: 'Response Time',
        category: 'speed',
        value: 0.3,
        target: 1.0,
        trend: 'up',
        status: 'excellent',
        lastUpdate: '2 min ago',
        improvement: 15.2
      },
      {
        id: 'metric-002',
        name: 'Threat Detection Accuracy',
        category: 'accuracy',
        value: 94.7,
        target: 90,
        trend: 'up',
        status: 'excellent',
        lastUpdate: '5 min ago',
        improvement: 8.3
      },
      {
        id: 'metric-003',
        name: 'System Efficiency',
        category: 'efficiency',
        value: 89.2,
        target: 85,
        trend: 'up',
        status: 'good',
        lastUpdate: '3 min ago',
        improvement: 12.7
      },
      {
        id: 'metric-004',
        name: 'Uptime',
        category: 'reliability',
        value: 99.8,
        target: 99.5,
        trend: 'stable',
        status: 'excellent',
        lastUpdate: '1 min ago',
        improvement: 0.3
      }
    ]

    const initialSystemHealth: SystemHealth[] = [
      {
        component: 'Threat Detection Engine',
        status: 'healthy',
        uptime: 99.9,
        performance: 94.2,
        lastCheck: 'Just now'
      },
      {
        component: 'Response Automation',
        status: 'healthy',
        uptime: 99.7,
        performance: 91.8,
        lastCheck: 'Just now'
      },
      {
        component: 'Countermeasure Deployer',
        status: 'warning',
        uptime: 98.5,
        performance: 87.3,
        lastCheck: '2 min ago'
      },
      {
        component: 'Optimization Engine',
        status: 'healthy',
        uptime: 99.2,
        performance: 89.7,
        lastCheck: 'Just now'
      }
    ]

    setMetrics(initialMetrics)
    setSystemHealth(initialSystemHealth)
    setOverallPerformance(94.2)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallPerformance(prev => Math.min(100, prev + Math.random() * 0.1))
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        lastUpdate: 'Just now'
      })))
      setSystemHealth(prev => prev.map(health => ({
        ...health,
        lastCheck: 'Just now'
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'speed': return <Zap className="h-4 w-4" />
      case 'accuracy': return <Target className="h-4 w-4" />
      case 'efficiency': return <TrendingUp className="h-4 w-4" />
      case 'reliability': return <Shield className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'speed': return 'text-neon-red'
      case 'accuracy': return 'text-neon-blue'
      case 'efficiency': return 'text-neon-green'
      case 'reliability': return 'text-neon-purple'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-neon-green'
      case 'good': return 'text-neon-blue'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
      case 'maintenance': return 'text-neon-blue'
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
            <h2 className="text-xl font-bold mb-2">Performance Metrics</h2>
            <p className="text-muted-foreground">Real-time performance monitoring and system health</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-neon-green" />
            <span className="text-sm font-medium text-neon-green">
              {overallPerformance.toFixed(1)}% Overall Performance
            </span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(metric.category)}
                  <span className="text-xs text-muted-foreground">{metric.name}</span>
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center justify-between">
                <div className={`text-lg font-bold ${getCategoryColor(metric.category)}`}>
                  {metric.value}{metric.name.includes('Time') ? 's' : '%'}
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    Target: {metric.target}{metric.name.includes('Time') ? 's' : '%'}
                  </div>
                  <div className={`text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground">
                  +{metric.improvement}% improvement
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
        <h3 className="text-lg font-semibold mb-4">System Health</h3>
        <div className="space-y-3">
          {systemHealth.map((health, index) => (
            <motion.div
              key={health.component}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    health.status === 'healthy' ? 'bg-neon-green' :
                    health.status === 'warning' ? 'bg-neon-yellow' :
                    health.status === 'critical' ? 'bg-neon-red' : 'bg-neon-blue'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{health.component}</div>
                    <div className="text-xs text-muted-foreground">
                      Last check: {health.lastCheck}
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${getHealthStatusColor(health.status)}`}>
                  {health.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{health.uptime.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">{health.performance.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Performance</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
