'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, TrendingUp, TrendingDown, Target, Activity, CheckCircle, Clock } from 'lucide-react'

interface RiskItem {
  id: string
  name: string
  category: 'regulatory' | 'operational' | 'financial' | 'reputational'
  level: 'Low' | 'Medium' | 'High' | 'Critical'
  probability: number
  impact: number
  status: 'monitored' | 'mitigated' | 'resolved' | 'escalated'
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
  const [risks, setRisks] = useState<RiskItem[]>([])
  const [metrics, setMetrics] = useState<RiskMetric[]>([])
  const [overallRisk, setOverallRisk] = useState(0)

  useEffect(() => {
    const initialRisks: RiskItem[] = [
      {
        id: 'risk-001',
        name: 'GDPR Data Breach',
        category: 'regulatory',
        level: 'High',
        probability: 15,
        impact: 85,
        status: 'monitored',
        lastAssessment: '2 hours ago',
        trend: 'down'
      },
      {
        id: 'risk-002',
        name: 'SOX Compliance Failure',
        category: 'regulatory',
        level: 'Critical',
        probability: 5,
        impact: 95,
        status: 'mitigated',
        lastAssessment: '1 hour ago',
        trend: 'stable'
      },
      {
        id: 'risk-003',
        name: 'System Downtime',
        category: 'operational',
        level: 'Medium',
        probability: 25,
        impact: 60,
        status: 'monitored',
        lastAssessment: '3 hours ago',
        trend: 'up'
      },
      {
        id: 'risk-004',
        name: 'Financial Penalty',
        category: 'financial',
        level: 'High',
        probability: 10,
        impact: 80,
        status: 'monitored',
        lastAssessment: '4 hours ago',
        trend: 'down'
      },
      {
        id: 'risk-005',
        name: 'Reputation Damage',
        category: 'reputational',
        level: 'Medium',
        probability: 20,
        impact: 70,
        status: 'resolved',
        lastAssessment: '1 day ago',
        trend: 'down'
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
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getRiskLevelBg = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-neon-red/10'
      case 'High': return 'bg-neon-yellow/10'
      case 'Medium': return 'bg-neon-blue/10'
      case 'Low': return 'bg-neon-green/10'
      default: return 'bg-muted/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monitored': return <Activity className="h-4 w-4" />
      case 'mitigated': return <Shield className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
      case 'escalated': return <AlertTriangle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'monitored': return 'text-neon-blue'
      case 'mitigated': return 'text-neon-green'
      case 'resolved': return 'text-neon-green'
      case 'escalated': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-red" />
      case 'down': return <TrendingDown className="h-3 w-3 text-neon-green" />
      case 'stable': return <div className="w-3 h-0.5 bg-neon-blue" />
      default: return <Clock className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'regulatory': return <Shield className="h-4 w-4" />
      case 'operational': return <Activity className="h-4 w-4" />
      case 'financial': return <TrendingUp className="h-4 w-4" />
      case 'reputational': return <Target className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
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
            <p className="text-muted-foreground">Compliance risk monitoring and mitigation</p>
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
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Score') ? '%' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Risks</h3>
        <div className="space-y-3">
          {risks.map((risk, index) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getRiskLevelBg(risk.level)}`}
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
                  <div className={`text-sm font-bold ${getRiskLevelColor(risk.level)}`}>
                    {risk.level}
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
                <div className="flex items-center space-x-2">
                  {getStatusIcon(risk.status)}
                  <span className={`text-xs font-medium ${getStatusColor(risk.status)}`}>
                    {risk.status}
                  </span>
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
