'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Target, Brain, Clock, BarChart3, Activity, Gauge } from 'lucide-react'

export function PerformanceMetrics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [isClient, setIsClient] = useState(false)
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    throughput: 0,
    latency: 0,
    accuracy: 0,
    efficiency: 0
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const metrics = [
    {
      name: 'Processing Throughput',
      value: 1250000,
      unit: 'ops/sec',
      trend: 'up',
      change: 12.5,
      icon: Zap,
      color: 'text-neon-blue',
      target: 1000000
    },
    {
      name: 'Response Latency',
      value: 0.8,
      unit: 'ms',
      trend: 'down',
      change: -15.2,
      icon: Clock,
      color: 'text-neon-green',
      target: 1.0
    },
    {
      name: 'Solution Accuracy',
      value: 99.7,
      unit: '%',
      trend: 'up',
      change: 2.1,
      icon: Target,
      color: 'text-neon-purple',
      target: 99.0
    },
    {
      name: 'Energy Efficiency',
      value: 94.2,
      unit: '%',
      trend: 'up',
      change: 8.7,
      icon: Activity,
      color: 'text-neon-cyan',
      target: 90.0
    }
  ]

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ]

  const performanceHistory = [
    { time: '00:00', throughput: 1200000, latency: 0.9, accuracy: 99.5, efficiency: 92.1 },
    { time: '04:00', throughput: 1180000, latency: 0.8, accuracy: 99.6, efficiency: 93.2 },
    { time: '08:00', throughput: 1250000, latency: 0.7, accuracy: 99.7, efficiency: 94.1 },
    { time: '12:00', throughput: 1300000, latency: 0.8, accuracy: 99.8, efficiency: 94.5 },
    { time: '16:00', throughput: 1280000, latency: 0.8, accuracy: 99.7, efficiency: 94.2 },
    { time: '20:00', throughput: 1220000, latency: 0.9, accuracy: 99.6, efficiency: 93.8 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        throughput: Math.floor(Math.random() * 200000) + 1200000,
        latency: Math.random() * 0.4 + 0.6,
        accuracy: Math.random() * 0.5 + 99.5,
        efficiency: Math.random() * 5 + 92
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-neon-green' : 'text-red-500'
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingUp
  }

  const getPerformanceColor = (value: number, target: number) => {
    const ratio = value / target
    if (ratio >= 1.1) return 'text-neon-green'
    if (ratio >= 1.0) return 'text-neon-yellow'
    if (ratio >= 0.9) return 'text-neon-blue'
    return 'text-red-500'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
          Performance Metrics
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time monitoring of quantum-enhanced system performance and optimization metrics
        </p>
      </motion.div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                <div>
                  <h3 className="font-semibold text-lg">{metric.name}</h3>
                  <div className="flex items-center space-x-2">
                    {React.createElement(getTrendIcon(metric.trend), {
                      className: `w-4 h-4 ${getTrendColor(metric.trend)}`
                    })}
                    <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getPerformanceColor(metric.value, metric.target)}`}>
                  {metric.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{metric.unit}
                </div>
                <div className="text-xs text-muted-foreground">Target: {metric.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{metric.unit}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Performance vs Target</span>
                <span>{((metric.value / metric.target) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${
                    getPerformanceColor(metric.value, metric.target).replace('text-', 'bg-')
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              Last updated: {isClient ? new Date().toLocaleTimeString('en-US') : '--:--:--'}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Performance History</h3>
        <div className="space-y-4">
          {performanceHistory.map((entry, index) => (
            <motion.div
              key={entry.time}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="text-sm font-medium">{entry.time}</div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">
                    {(entry.throughput / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-muted-foreground">Throughput</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">
                    {entry.latency}ms
                  </div>
                  <div className="text-xs text-muted-foreground">Latency</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-purple">
                    {entry.accuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-cyan">
                    {entry.efficiency}%
                  </div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">System Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {Math.round(realTimeMetrics.throughput / 10000)}%
            </div>
            <div className="text-sm text-muted-foreground">Throughput Health</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {Math.round(realTimeMetrics.latency * 100)}%
            </div>
            <div className="text-sm text-muted-foreground">Latency Health</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple">
              {Math.round(realTimeMetrics.accuracy)}%
            </div>
            <div className="text-sm text-muted-foreground">Accuracy Health</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan">
              {Math.round(realTimeMetrics.efficiency)}%
            </div>
            <div className="text-sm text-muted-foreground">Efficiency Health</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
