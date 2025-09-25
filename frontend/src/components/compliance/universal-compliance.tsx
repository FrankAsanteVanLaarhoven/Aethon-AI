'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Globe, Zap, Activity } from 'lucide-react'

interface ComplianceRule {
  id: string
  name: string
  jurisdiction: string
  status: 'compliant' | 'warning' | 'violation' | 'pending'
  lastCheck: string
  nextCheck: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
}

interface ComplianceMetric {
  name: string
  value: number
  target: number
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
}

export function UniversalCompliance() {
  const [rules, setRules] = useState<ComplianceRule[]>([])
  const [metrics, setMetrics] = useState<ComplianceMetric[]>([])
  const [overallCompliance, setOverallCompliance] = useState(0)

  useEffect(() => {
    const initialRules: ComplianceRule[] = [
      {
        id: 'rule-001',
        name: 'GDPR Data Protection',
        jurisdiction: 'EU',
        status: 'compliant',
        lastCheck: '2 min ago',
        nextCheck: '23h 58m',
        severity: 'High'
      },
      {
        id: 'rule-002',
        name: 'CCPA Privacy Rights',
        jurisdiction: 'California',
        status: 'compliant',
        lastCheck: '5 min ago',
        nextCheck: '23h 55m',
        severity: 'High'
      },
      {
        id: 'rule-003',
        name: 'SOX Financial Reporting',
        jurisdiction: 'US',
        status: 'warning',
        lastCheck: '1 hour ago',
        nextCheck: '23h 00m',
        severity: 'Critical'
      },
      {
        id: 'rule-004',
        name: 'HIPAA Health Data',
        jurisdiction: 'US',
        status: 'compliant',
        lastCheck: '3 min ago',
        nextCheck: '23h 57m',
        severity: 'High'
      },
      {
        id: 'rule-005',
        name: 'ISO 27001 Security',
        jurisdiction: 'Global',
        status: 'compliant',
        lastCheck: '1 min ago',
        nextCheck: '23h 59m',
        severity: 'Medium'
      },
      {
        id: 'rule-006',
        name: 'PCI DSS Payment',
        jurisdiction: 'Global',
        status: 'violation',
        lastCheck: '30 min ago',
        nextCheck: '23h 30m',
        severity: 'Critical'
      }
    ]

    const initialMetrics: ComplianceMetric[] = [
      {
        name: 'Overall Compliance',
        value: 99.9,
        target: 99.5,
        status: 'good',
        trend: 'up'
      },
      {
        name: 'Automation Rate',
        value: 98.5,
        target: 95.0,
        status: 'good',
        trend: 'up'
      },
      {
        name: 'Response Time',
        value: 0.3,
        target: 1.0,
        status: 'good',
        trend: 'down'
      },
      {
        name: 'False Positives',
        value: 0.1,
        target: 2.0,
        status: 'good',
        trend: 'down'
      }
    ]

    setRules(initialRules)
    setMetrics(initialMetrics)
    setOverallCompliance(99.9)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallCompliance(prev => Math.min(100, prev + Math.random() * 0.01))
      setRules(prev => prev.map(rule => ({
        ...rule,
        lastCheck: 'Just now'
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'violation': return <AlertTriangle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'violation': return 'text-neon-red'
      case 'pending': return 'text-neon-blue'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-neon-green/10'
      case 'warning': return 'bg-neon-yellow/10'
      case 'violation': return 'bg-neon-red/10'
      case 'pending': return 'bg-neon-blue/10'
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
            <h2 className="text-2xl font-bold mb-2">Universal Compliance</h2>
            <p className="text-muted-foreground">Global regulatory compliance monitoring and automation</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">
              {overallCompliance.toFixed(1)}% Compliant
            </span>
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  {metric.value}{metric.name.includes('Time') ? 's' : '%'}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Time') ? 's' : '%'}
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
        <h3 className="text-lg font-semibold mb-4">Compliance Rules</h3>
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getStatusBg(rule.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(rule.status)}
                  <div>
                    <div className="font-medium text-sm">{rule.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {rule.jurisdiction} • Last check: {rule.lastCheck}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getSeverityColor(rule.severity)}`}>
                      {rule.severity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Next: {rule.nextCheck}
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(rule.status).replace('text-', 'bg-')}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
