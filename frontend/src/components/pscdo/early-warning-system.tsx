'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Bell, Target, Activity, CheckCircle, Zap, Shield } from 'lucide-react'

interface WarningAlert {
  id: string
  supplyChain: string
  type: 'disruption' | 'delay' | 'shortage' | 'quality' | 'regulatory'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  timeframe: string
  confidence: number
  status: 'active' | 'acknowledged' | 'investigating' | 'resolved'
  timestamp: string
  description: string
}

interface WarningMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function EarlyWarningSystem() {
  const [alerts, setAlerts] = useState<WarningAlert[]>([])
  const [metrics, setMetrics] = useState<WarningMetric[]>([])
  const [activeAlerts, setActiveAlerts] = useState(0)

  useEffect(() => {
    const initialAlerts: WarningAlert[] = [
      {
        id: 'alert-001',
        supplyChain: 'Electronics Manufacturing',
        type: 'disruption',
        severity: 'High',
        timeframe: '2-4 weeks',
        confidence: 89.2,
        status: 'active',
        timestamp: '5 min ago',
        description: 'Potential supplier disruption in semiconductor components'
      },
      {
        id: 'alert-002',
        supplyChain: 'Automotive Parts',
        type: 'delay',
        severity: 'Medium',
        timeframe: '1-2 weeks',
        confidence: 76.8,
        status: 'acknowledged',
        timestamp: '15 min ago',
        description: 'Transportation delays affecting component delivery'
      },
      {
        id: 'alert-003',
        supplyChain: 'Pharmaceutical',
        type: 'regulatory',
        severity: 'Critical',
        timeframe: '3-6 months',
        confidence: 94.5,
        status: 'investigating',
        timestamp: '1 hour ago',
        description: 'New regulatory requirements may impact production'
      },
      {
        id: 'alert-004',
        supplyChain: 'Food & Beverage',
        type: 'shortage',
        severity: 'Low',
        timeframe: '1-3 weeks',
        confidence: 68.3,
        status: 'resolved',
        timestamp: '2 hours ago',
        description: 'Temporary ingredient shortage resolved'
      }
    ]

    const initialMetrics: WarningMetric[] = [
      {
        name: 'Active Alerts',
        value: 12,
        target: 10,
        trend: 'up',
        color: 'text-neon-yellow'
      },
      {
        name: 'Warning Accuracy',
        value: 87.3,
        target: 85,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Response Time',
        value: 2.4,
        target: 4.0,
        trend: 'down',
        color: 'text-neon-blue'
      },
      {
        name: 'False Positive Rate',
        value: 8.7,
        target: 12,
        trend: 'down',
        color: 'text-neon-purple'
      }
    ]

    setAlerts(initialAlerts)
    setMetrics(initialMetrics)
    setActiveAlerts(12)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveAlerts(prev => prev + Math.floor(Math.random() * 2) - 1)
      setAlerts(prev => prev.map(alert => ({
        ...alert,
        timestamp: 'Just now'
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'disruption': return <AlertTriangle className="h-4 w-4" />
      case 'delay': return <Clock className="h-4 w-4" />
      case 'shortage': return <Target className="h-4 w-4" />
      case 'quality': return <Shield className="h-4 w-4" />
      case 'regulatory': return <Zap className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'disruption': return 'text-neon-red'
      case 'delay': return 'text-neon-yellow'
      case 'shortage': return 'text-neon-blue'
      case 'quality': return 'text-neon-green'
      case 'regulatory': return 'text-neon-purple'
      default: return 'text-muted-foreground'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-red'
      case 'acknowledged': return 'text-neon-yellow'
      case 'investigating': return 'text-neon-blue'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-neon-red/10'
      case 'acknowledged': return 'bg-neon-yellow/10'
      case 'investigating': return 'bg-neon-blue/10'
      case 'resolved': return 'bg-neon-green/10'
      default: return 'bg-muted/10'
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
            <h2 className="text-xl font-bold mb-2">Early Warning System</h2>
            <p className="text-muted-foreground">Proactive supply chain disruption alerts and notifications</p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-neon-yellow" />
            <span className="text-sm font-medium text-neon-yellow">
              {activeAlerts} Active Alerts
            </span>
          </div>
        </div>

        {/* Warning Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Accuracy') ? '%' : metric.name.includes('Time') ? 'h' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Accuracy') ? '%' : metric.name.includes('Time') ? 'h' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Warning Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getStatusBg(alert.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getAlertTypeIcon(alert.type)}
                  <div>
                    <div className="font-medium text-sm">{alert.supplyChain}</div>
                    <div className="text-xs text-muted-foreground">
                      {alert.type} • {alert.timeframe} • {alert.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`text-sm font-bold ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    alert.status === 'active' ? 'bg-neon-red' :
                    alert.status === 'acknowledged' ? 'bg-neon-yellow' :
                    alert.status === 'investigating' ? 'bg-neon-blue' : 'bg-neon-green'
                  }`} />
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-2">{alert.description}</div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{alert.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
                    Status: {alert.status}
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
