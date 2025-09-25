'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Target, TrendingUp, Activity, Brain, CheckCircle, AlertTriangle, Globe } from 'lucide-react'

interface PolicyImpact {
  id: string
  policy: string
  region: string
  type: 'economic' | 'social' | 'environmental' | 'security' | 'trade'
  impact: number
  timeframe: string
  confidence: number
  status: 'analyzing' | 'projected' | 'confirmed' | 'implemented'
  lastUpdate: string
  description: string
  stakeholders: string[]
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
}

interface ImpactMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function PolicyImpactAnalysis() {
  const [impacts, setImpacts] = useState<PolicyImpact[]>([])
  const [metrics, setMetrics] = useState<ImpactMetric[]>([])
  const [analysisAccuracy, setAnalysisAccuracy] = useState(0)

  useEffect(() => {
    const initialImpacts: PolicyImpact[] = [
      {
        id: 'impact-001',
        policy: 'Digital Services Act',
        region: 'European Union',
        type: 'economic',
        impact: 78.5,
        timeframe: '12-18 months',
        confidence: 89.2,
        status: 'projected',
        lastUpdate: '2 hours ago',
        description: 'Comprehensive digital regulation affecting tech companies',
        stakeholders: ['Tech Companies', 'EU Commission', 'Consumers'],
        riskLevel: 'Medium'
      },
      {
        id: 'impact-002',
        policy: 'Climate Change Accord',
        region: 'Global',
        type: 'environmental',
        impact: 92.3,
        timeframe: '5-10 years',
        confidence: 94.7,
        status: 'confirmed',
        lastUpdate: '1 day ago',
        description: 'Global climate policy framework with economic implications',
        stakeholders: ['Governments', 'Corporations', 'NGOs'],
        riskLevel: 'High'
      },
      {
        id: 'impact-003',
        policy: 'Trade Agreement Revision',
        region: 'Asia-Pacific',
        type: 'trade',
        impact: 65.7,
        timeframe: '6-12 months',
        confidence: 76.8,
        status: 'analyzing',
        lastUpdate: '4 hours ago',
        description: 'Revised trade terms affecting regional commerce',
        stakeholders: ['Trade Partners', 'Local Businesses', 'Consumers'],
        riskLevel: 'Medium'
      },
      {
        id: 'impact-004',
        policy: 'Cybersecurity Framework',
        region: 'North America',
        type: 'security',
        impact: 54.2,
        timeframe: '2-4 years',
        confidence: 82.1,
        status: 'implemented',
        lastUpdate: '1 week ago',
        description: 'Enhanced cybersecurity requirements for critical infrastructure',
        stakeholders: ['Government', 'Infrastructure Providers', 'Security Firms'],
        riskLevel: 'Low'
      }
    ]

    const initialMetrics: ImpactMetric[] = [
      {
        name: 'Analysis Accuracy',
        value: 91.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Coverage Rate',
        value: 94.2,
        target: 90,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Prediction Horizon',
        value: 18.5,
        target: 12,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Stakeholder Coverage',
        value: 87.3,
        target: 85,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setImpacts(initialImpacts)
    setMetrics(initialMetrics)
    setAnalysisAccuracy(91.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnalysisAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setImpacts(prev => prev.map(impact => ({
        ...impact,
        lastUpdate: 'Just now'
      })))
    }, 22000)

    return () => clearInterval(interval)
  }, [])

  const getPolicyTypeIcon = (type: string) => {
    switch (type) {
      case 'economic': return <TrendingUp className="h-4 w-4" />
      case 'social': return <Activity className="h-4 w-4" />
      case 'environmental': return <Globe className="h-4 w-4" />
      case 'security': return <Target className="h-4 w-4" />
      case 'trade': return <FileText className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getPolicyTypeColor = (type: string) => {
    switch (type) {
      case 'economic': return 'text-neon-green'
      case 'social': return 'text-neon-blue'
      case 'environmental': return 'text-neon-yellow'
      case 'security': return 'text-neon-red'
      case 'trade': return 'text-neon-purple'
      default: return 'text-muted-foreground'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing': return 'text-neon-yellow'
      case 'projected': return 'text-neon-blue'
      case 'confirmed': return 'text-neon-red'
      case 'implemented': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzing': return <Brain className="h-4 w-4" />
      case 'projected': return <Target className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'implemented': return <Activity className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Policy Impact Analysis</h2>
            <p className="text-muted-foreground">Comprehensive analysis of policy impacts and implications</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {analysisAccuracy.toFixed(1)}% Accuracy
            </span>
          </div>
        </div>

        {/* Impact Metrics */}
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
                  {metric.value}{metric.name.includes('Accuracy') || metric.name.includes('Rate') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Horizon') ? 'm' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Accuracy') || metric.name.includes('Rate') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Horizon') ? 'm' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Policy Impact Analysis</h3>
        <div className="space-y-4">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getPolicyTypeIcon(impact.type)}
                  <div>
                    <div className="font-medium text-sm">{impact.policy}</div>
                    <div className="text-xs text-muted-foreground">
                      {impact.region} • {impact.timeframe} • {impact.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(impact.status)}
                  <div className={`text-sm font-bold ${getRiskColor(impact.riskLevel)}`}>
                    {impact.riskLevel}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-2">{impact.description}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {impact.stakeholders.map((stakeholder, stakeholderIndex) => (
                    <span
                      key={stakeholderIndex}
                      className="px-2 py-1 text-xs bg-neon-blue/10 text-neon-blue rounded-full border border-neon-blue/20"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{impact.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-blue">{impact.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(impact.status)}`}>
                      {impact.status}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
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
