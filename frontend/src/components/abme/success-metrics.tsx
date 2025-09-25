'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, DollarSign, Users, BarChart3, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

export function SuccessMetrics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    revenue: 0,
    customers: 0,
    efficiency: 0,
    satisfaction: 0
  })

  const successMetrics = [
    {
      name: 'Revenue Growth',
      value: 1250000,
      unit: '$',
      trend: 'up',
      change: 23.5,
      target: 1000000,
      icon: DollarSign,
      color: 'text-neon-green'
    },
    {
      name: 'Customer Acquisition',
      value: 2847,
      unit: '',
      trend: 'up',
      change: 18.2,
      target: 2500,
      icon: Users,
      color: 'text-neon-blue'
    },
    {
      name: 'Operational Efficiency',
      value: 94.2,
      unit: '%',
      trend: 'up',
      change: 12.8,
      target: 90.0,
      icon: Activity,
      color: 'text-neon-purple'
    },
    {
      name: 'Customer Satisfaction',
      value: 98.7,
      unit: '%',
      trend: 'up',
      change: 5.3,
      target: 95.0,
      icon: Target,
      color: 'text-neon-cyan'
    }
  ]

  const kpis = [
    { name: 'ROI', value: '340%', target: '250%', status: 'exceeded', color: 'text-neon-green' },
    { name: 'Cost Reduction', value: '28%', target: '20%', status: 'exceeded', color: 'text-neon-green' },
    { name: 'Time to Market', value: '45%', target: '30%', status: 'exceeded', color: 'text-neon-green' },
    { name: 'Error Rate', value: '0.1%', target: '1%', status: 'exceeded', color: 'text-neon-green' }
  ]

  const achievements = [
    { name: 'Revenue Target Achieved', date: '2025-01-15', impact: 'high', status: 'completed' },
    { name: 'Customer Satisfaction Goal Met', date: '2025-01-12', impact: 'high', status: 'completed' },
    { name: 'Operational Efficiency Milestone', date: '2025-01-10', impact: 'medium', status: 'completed' },
    { name: 'Cost Reduction Target', date: '2025-01-08', impact: 'high', status: 'completed' }
  ]

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        revenue: Math.floor(Math.random() * 100000) + 1200000,
        customers: Math.floor(Math.random() * 100) + 2800,
        efficiency: Math.random() * 5 + 92,
        satisfaction: Math.random() * 2 + 97
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-neon-green' : 'text-red-500'
  }

  const getPerformanceColor = (value: number, target: number) => {
    const ratio = value / target
    if (ratio >= 1.1) return 'text-neon-green'
    if (ratio >= 1.0) return 'text-neon-yellow'
    if (ratio >= 0.9) return 'text-neon-blue'
    return 'text-red-500'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded': return CheckCircle
      case 'met': return Target
      case 'below': return AlertTriangle
      default: return Target
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
            <h2 className="text-xl font-bold mb-2">Success Metrics</h2>
            <p className="text-muted-foreground">Key performance indicators and achievements</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">Live</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe.value}
              onClick={() => setSelectedTimeframe(timeframe.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe.value
                  ? 'bg-neon-blue text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {timeframe.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {successMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <div>
                    <h3 className="font-semibold text-sm">{metric.name}</h3>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-3 h-3 text-neon-green" />
                      <span className="text-xs text-neon-green">+{metric.change}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getPerformanceColor(metric.value, metric.target)}`}>
                    {metric.name === 'Revenue Growth' ? realTimeMetrics.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
                     metric.name === 'Customer Acquisition' ? realTimeMetrics.customers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
                     metric.name === 'Operational Efficiency' ? realTimeMetrics.efficiency.toFixed(1) :
                     realTimeMetrics.satisfaction.toFixed(1)}{metric.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">Target: {metric.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{metric.unit}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Performance vs Target</span>
                  <span>{((metric.value / metric.target) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      getPerformanceColor(metric.value, metric.target).replace('text-', 'bg-')
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
          <div className="space-y-3">
            {kpis.map((kpi, index) => (
              <motion.div
                key={kpi.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  {React.createElement(getStatusIcon(kpi.status), {
                    className: `w-5 h-5 ${kpi.color}`
                  })}
                  <div>
                    <div className="font-medium text-sm">{kpi.name}</div>
                    <div className="text-xs text-muted-foreground">Target: {kpi.target}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-xs text-muted-foreground">{kpi.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border"
              >
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{achievement.name}</div>
                  <div className="text-xs text-muted-foreground">{achievement.date}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  achievement.impact === 'high' ? 'bg-neon-green/20 text-neon-green' :
                  achievement.impact === 'medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                  'bg-neon-blue/20 text-neon-blue'
                }`}>
                  {achievement.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
