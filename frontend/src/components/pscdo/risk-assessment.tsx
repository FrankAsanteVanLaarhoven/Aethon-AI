'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, TrendingUp, Target, Activity, CheckCircle, Clock, Zap } from 'lucide-react'

interface RiskFactor {
  id: string
  name: string
  category: 'supplier' | 'logistics' | 'demand' | 'regulatory' | 'environmental'
  probability: number
  impact: number
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'monitored' | 'mitigated' | 'escalated' | 'resolved'
  lastAssessment: string
  trend: 'up' | 'down' | 'stable'
}

interface RiskMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function RiskAssessment() {
  const [risks, setRisks] = useState<RiskFactor[]>([])
  const [metrics, setMetrics] = useState<RiskMetric[]>([])
  const [overallRisk, setOverallRisk] = useState(0)

  useEffect(() => {
    const initialRisks: RiskFactor[] = [
      {
        id: 'risk-001',
        name: 'Supplier Dependency',
        category: 'supplier',
        probability: 65,
        impact: 80,
        severity: 'High',
        status: 'monitored',
        lastAssessment: '2 hours ago',
        trend: 'up'
      },
      {
        id: 'risk-002',
        name: 'Transportation Disruption',
        category: 'logistics',
        probability: 45,
        impact: 70,
        severity: 'Medium',
        status: 'mitigated',
        lastAssessment: '1 day ago',
        trend: 'down'
      },
      {
        id: 'risk-003',
        name: 'Demand Volatility',
        category: 'demand',
        probability: 78,
        impact: 60,
        severity: 'High',
        status: 'monitored',
        lastAssessment: '4 hours ago',
        trend: 'stable'
      },
      {
        id: 'risk-004',
        name: 'Regulatory Changes',
        category: 'regulatory',
        probability: 35,
        impact: 90,
        severity: 'Critical',
        status: 'escalated',
        lastAssessment: '6 hours ago',
        trend: 'up'
      },
      {
        id: 'risk-005',
        name: 'Natural Disasters',
        category: 'environmental',
        probability: 25,
        impact: 85,
        severity: 'High',
        status: 'monitored',
        lastAssessment: '1 day ago',
        trend: 'stable'
      }
    ]

    const initialMetrics: RiskMetric[] = [
      {
        name: 'Overall Risk Score',
        value: 23.4,
        target: 30,
        trend: 'down',
        color: 'text-neon-green'
      },
      {
        name: 'Critical Risks',
        value: 1,
        target: 2,
        trend: 'down',
        color: 'text-neon-yellow'
      },
      {
        name: 'Mitigation Rate',
        value: 87.5,
        target: 85,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Response Time',
        value: 2.3,
        target: 4.0,
        trend: 'down',
        color: 'text-neon-purple'
      }
    ]

    setRisks(initialRisks)
    setMetrics(initialMetrics)
    setOverallRisk(23.4)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallRisk(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
      setRisks(prev => prev.map(risk => ({
        ...risk,
        lastAssessment: 'Just now'
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'supplier': return <Target className="h-4 w-4" />
      case 'logistics': return <Activity className="h-4 w-4" />
      case 'demand': return <TrendingUp className="h-4 w-4" />
      case 'regulatory': return <Shield className="h-4 w-4" />
      case 'environmental': return <Zap className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'supplier': return 'text-neon-blue'
      case 'logistics': return 'text-neon-green'
      case 'demand': return 'text-neon-yellow'
      case 'regulatory': return 'text-neon-red'
      case 'environmental': return 'text-neon-purple'
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
      case 'monitored': return 'text-neon-blue'
      case 'mitigated': return 'text-neon-green'
      case 'escalated': return 'text-neon-red'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-red" />
      case 'down': return <TrendingUp className="h-3 w-3 text-neon-green rotate-180" />
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
            <h2 className="text-xl font-bold mb-2">Risk Assessment</h2>
            <p className="text-muted-foreground">Supply chain risk analysis and mitigation tracking</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              overallRisk > 50 ? 'bg-neon-red' :
              overallRisk > 25 ? 'bg-neon-yellow' : 'bg-neon-green'
            } animate-pulse`} />
            <span className="text-sm font-medium">
              Risk Score: {overallRisk.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Risk Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : metric.name.includes('Time') ? 'h' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : metric.name.includes('Time') ? 'h' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Risk Factors</h3>
        <div className="space-y-3">
          {risks.map((risk, index) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(risk.category)}
                  <div>
                    <div className="font-medium text-sm">{risk.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {risk.category} • {risk.lastAssessment}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(risk.trend)}
                  <div className={`text-sm font-bold ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-red">{risk.probability}%</div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-yellow">{risk.impact}%</div>
                  <div className="text-xs text-muted-foreground">Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">
                    {Math.round(risk.probability * risk.impact / 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(risk.status)}`}>
                  Status: {risk.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last assessed: {risk.lastAssessment}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
