'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, DollarSign, Users, Building } from 'lucide-react'

export function ImpactAssessment() {
  const [selectedMetric, setSelectedMetric] = useState('Financial')

  const impactData = [
    {
      regulation: 'EU AI Act',
      sector: 'Technology',
      financialImpact: 2500000000,
      complianceCost: 450000000,
      timeline: '12 months',
      risk: 'High',
      icon: Building,
      color: 'text-neon-blue'
    },
    {
      regulation: 'US Data Privacy Law',
      sector: 'Technology',
      financialImpact: 1800000000,
      complianceCost: 320000000,
      timeline: '18 months',
      risk: 'Medium',
      icon: Users,
      color: 'text-neon-green'
    },
    {
      regulation: 'China Cybersecurity Review',
      sector: 'Technology',
      financialImpact: 3200000000,
      complianceCost: 680000000,
      timeline: '6 months',
      risk: 'High',
      icon: AlertTriangle,
      color: 'text-neon-yellow'
    },
    {
      regulation: 'UK Digital Markets Act',
      sector: 'Technology',
      financialImpact: 1200000000,
      complianceCost: 280000000,
      timeline: '24 months',
      risk: 'Medium',
      icon: CheckCircle,
      color: 'text-neon-purple'
    }
  ]

  const metrics = [
    { value: 'Financial', label: 'Financial Impact' },
    { value: 'Compliance', label: 'Compliance Cost' },
    { value: 'Timeline', label: 'Implementation' },
    { value: 'Risk', label: 'Risk Level' }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-500 bg-red-500/10'
      case 'Medium':
        return 'text-neon-yellow bg-neon-yellow/10'
      case 'Low':
        return 'text-neon-green bg-neon-green/10'
      default:
        return 'text-muted-foreground bg-muted/10'
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`
    }
    return `$${amount.toLocaleString()}`
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 2000000000) return 'text-red-500'
    if (impact >= 1000000000) return 'text-neon-yellow'
    return 'text-neon-green'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
          Impact Assessment
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis of regulatory impact on business operations and financial performance
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <button
            key={metric.value}
            onClick={() => setSelectedMetric(metric.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === metric.value
                ? 'bg-neon-cyan text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {impactData.map((impact, index) => (
          <motion.div
            key={impact.regulation}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <impact.icon className={`w-8 h-8 ${impact.color}`} />
                <div>
                  <h3 className="font-semibold text-lg">{impact.regulation}</h3>
                  <p className="text-sm text-muted-foreground">{impact.sector}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(impact.risk)}`}>
                {impact.risk} Risk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getImpactColor(impact.financialImpact)}`}>
                  {formatCurrency(impact.financialImpact)}
                </div>
                <div className="text-xs text-muted-foreground">Financial Impact</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">
                  {formatCurrency(impact.complianceCost)}
                </div>
                <div className="text-xs text-muted-foreground">Compliance Cost</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Implementation Timeline</span>
                <span>{impact.timeline}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-neon-cyan h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((parseInt(impact.timeline) / 24) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                ROI Impact: <span className="font-medium text-neon-green">
                  {((impact.financialImpact - impact.complianceCost) / impact.complianceCost * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString('en-US')}
              </div>
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
        <h3 className="text-xl font-semibold mb-4">Impact Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">
              {formatCurrency(impactData.reduce((acc, impact) => acc + impact.financialImpact, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Impact</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {formatCurrency(impactData.reduce((acc, impact) => acc + impact.complianceCost, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Compliance Cost</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow">
              {impactData.filter(impact => impact.risk === 'High').length}
            </div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {Math.round(impactData.reduce((acc, impact) => 
                acc + ((impact.financialImpact - impact.complianceCost) / impact.complianceCost * 100), 0
              ) / impactData.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg ROI</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
