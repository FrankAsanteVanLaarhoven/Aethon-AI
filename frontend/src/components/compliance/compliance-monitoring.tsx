'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, Activity, CheckCircle, AlertTriangle, Clock, Shield, Zap, Target } from 'lucide-react'

interface ComplianceEvent {
  id: string
  type: 'violation' | 'warning' | 'success' | 'audit'
  description: string
  jurisdiction: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  timestamp: string
  status: 'resolved' | 'investigating' | 'escalated' | 'new'
}

interface MonitoringMetric {
  name: string
  value: number
  target: number
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
}

export function ComplianceMonitoring() {
  const [events, setEvents] = useState<ComplianceEvent[]>([])
  const [metrics, setMetrics] = useState<MonitoringMetric[]>([])
  const [monitoringStatus, setMonitoringStatus] = useState('active')

  useEffect(() => {
    const initialEvents: ComplianceEvent[] = [
      {
        id: 'event-001',
        type: 'success',
        description: 'GDPR compliance check passed',
        jurisdiction: 'EU',
        severity: 'Low',
        timestamp: '2 min ago',
        status: 'resolved'
      },
      {
        id: 'event-002',
        type: 'warning',
        description: 'SOX reporting deadline approaching',
        jurisdiction: 'US',
        severity: 'Medium',
        timestamp: '15 min ago',
        status: 'investigating'
      },
      {
        id: 'event-003',
        type: 'violation',
        description: 'Data retention policy violation detected',
        jurisdiction: 'Global',
        severity: 'High',
        timestamp: '1 hour ago',
        status: 'escalated'
      },
      {
        id: 'event-004',
        type: 'audit',
        description: 'HIPAA security audit completed',
        jurisdiction: 'US',
        severity: 'Low',
        timestamp: '3 hours ago',
        status: 'resolved'
      },
      {
        id: 'event-005',
        type: 'success',
        description: 'ISO 27001 certification renewed',
        jurisdiction: 'Global',
        severity: 'Low',
        timestamp: '1 day ago',
        status: 'resolved'
      }
    ]

    const initialMetrics: MonitoringMetric[] = [
      {
        name: 'Monitoring Uptime',
        value: 99.9,
        target: 99.5,
        status: 'good',
        trend: 'up'
      },
      {
        name: 'Event Response Time',
        value: 0.8,
        target: 2.0,
        status: 'good',
        trend: 'down'
      },
      {
        name: 'False Positive Rate',
        value: 0.2,
        target: 1.0,
        status: 'good',
        trend: 'down'
      },
      {
        name: 'Coverage Rate',
        value: 98.7,
        target: 95.0,
        status: 'good',
        trend: 'up'
      }
    ]

    setEvents(initialEvents)
    setMetrics(initialMetrics)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setEvents(prev => prev.map(event => ({
        ...event,
        timestamp: 'Just now'
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'violation': return AlertTriangle
      case 'warning': return Clock
      case 'success': return CheckCircle
      case 'audit': return Shield
      default: return Activity
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'violation': return 'text-neon-red'
      case 'warning': return 'text-neon-yellow'
      case 'success': return 'text-neon-green'
      case 'audit': return 'text-neon-blue'
      default: return 'text-muted-foreground'
    }
  }

  const getEventBg = (type: string) => {
    switch (type) {
      case 'violation': return 'bg-neon-red/10'
      case 'warning': return 'bg-neon-yellow/10'
      case 'success': return 'bg-neon-green/10'
      case 'audit': return 'bg-neon-blue/10'
      default: return 'bg-muted/10'
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
      case 'resolved': return 'text-neon-green'
      case 'investigating': return 'text-neon-blue'
      case 'escalated': return 'text-neon-red'
      case 'new': return 'text-neon-yellow'
      default: return 'text-muted-foreground'
    }
  }

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
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
            <h2 className="text-xl font-bold mb-2">Compliance Monitoring</h2>
            <p className="text-muted-foreground">Real-time compliance event monitoring and response</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">Monitoring Active</span>
          </div>
        </div>

        {/* Monitoring Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'good' ? 'bg-neon-green' :
                  metric.status === 'warning' ? 'bg-neon-yellow' : 'bg-neon-red'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${getMetricColor(metric.status)}`}>
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Uptime') ? '%' : 
                   metric.name.includes('Time') ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Uptime') ? '%' : 
                   metric.name.includes('Time') ? 's' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getEventBg(event.type)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {React.createElement(getEventIcon(event.type), {
                    className: `h-4 w-4 ${getEventColor(event.type)}`
                  })}
                  <div>
                    <div className="font-medium text-sm">{event.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.jurisdiction} • {event.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </div>
                    <div className={`text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    event.status === 'resolved' ? 'bg-neon-green' :
                    event.status === 'investigating' ? 'bg-neon-blue' :
                    event.status === 'escalated' ? 'bg-neon-red' : 'bg-neon-yellow'
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
