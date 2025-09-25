'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'

export function PerformanceMonitoring() {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    cpu: 0,
    memory: 0,
    throughput: 0,
    latency: 0
  })

  const performanceMetrics = [
    { name: 'CPU Usage', value: 68, unit: '%', color: 'text-neon-blue', trend: 'stable' },
    { name: 'Memory Usage', value: 72, unit: '%', color: 'text-neon-green', trend: 'up' },
    { name: 'Throughput', value: 2.4, unit: 'M ops/s', color: 'text-neon-purple', trend: 'up' },
    { name: 'Latency', value: 0.8, unit: 'ms', color: 'text-neon-pink', trend: 'down' }
  ]

  const systemHealth = [
    { name: 'Data Pipeline', status: 'healthy', uptime: '99.9%', color: 'text-neon-green' },
    { name: 'AI Engine', status: 'healthy', uptime: '99.8%', color: 'text-neon-green' },
    { name: 'Execution Layer', status: 'warning', uptime: '98.5%', color: 'text-neon-yellow' },
    { name: 'Monitoring System', status: 'healthy', uptime: '99.9%', color: 'text-neon-green' }
  ]

  const alerts = [
    { type: 'warning', message: 'High memory usage detected', time: '2 min ago', severity: 'medium' },
    { type: 'info', message: 'New optimization strategy deployed', time: '5 min ago', severity: 'low' },
    { type: 'success', message: 'Performance target achieved', time: '8 min ago', severity: 'low' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        cpu: Math.floor(Math.random() * 20) + 60,
        memory: Math.floor(Math.random() * 15) + 65,
        throughput: Math.random() * 0.5 + 2.0,
        latency: Math.random() * 0.3 + 0.6
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle
      case 'warning': return AlertTriangle
      case 'error': return AlertTriangle
      default: return Clock
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertTriangle
      case 'info': return Activity
      default: return Activity
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'info': return 'text-neon-blue'
      default: return 'text-muted-foreground'
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
            <h2 className="text-xl font-bold mb-2">Performance Monitoring</h2>
            <p className="text-muted-foreground">Real-time system health</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.name === 'Throughput' ? realTimeMetrics.throughput.toFixed(1) :
                 metric.name === 'Latency' ? realTimeMetrics.latency.toFixed(1) :
                 metric.name === 'CPU Usage' ? realTimeMetrics.cpu :
                 realTimeMetrics.memory}{metric.unit}
              </div>
              <div className="text-sm text-muted-foreground mb-2">{metric.name}</div>
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className={`w-3 h-3 ${
                  metric.trend === 'up' ? 'text-neon-green' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                }`} />
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-neon-green' : 
                  metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {metric.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">System Health</h3>
          {systemHealth.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getStatusIcon(system.status), {
                  className: `w-5 h-5 ${system.color}`
                })}
                <div>
                  <div className="font-medium text-sm">{system.name}</div>
                  <div className="text-xs text-muted-foreground">{system.status}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{system.uptime}</div>
                <div className="text-xs text-muted-foreground">uptime</div>
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
        <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border"
            >
              {React.createElement(getAlertIcon(alert.type), {
                className: `w-4 h-4 ${getAlertColor(alert.type)}`
              })}
              <div className="flex-1">
                <div className="text-sm font-medium">{alert.message}</div>
                <div className="text-xs text-muted-foreground">{alert.time}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                alert.severity === 'medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                'bg-neon-blue/20 text-neon-blue'
              }`}>
                {alert.severity}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
