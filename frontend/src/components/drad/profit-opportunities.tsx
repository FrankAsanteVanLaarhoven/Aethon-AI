'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Target, Zap, Activity, Brain, Globe, Shield } from 'lucide-react'

interface ProfitOpportunity {
  id: string
  name: string
  category: 'tax' | 'regulatory' | 'jurisdictional' | 'compliance' | 'licensing'
  potentialProfit: number
  investment: number
  roi: number
  timeframe: string
  status: 'identified' | 'evaluating' | 'approved' | 'executing' | 'completed'
  jurisdiction: string
  lastUpdate: string
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
}

interface ProfitMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function ProfitOpportunities() {
  const [opportunities, setOpportunities] = useState<ProfitOpportunity[]>([])
  const [metrics, setMetrics] = useState<ProfitMetric[]>([])
  const [totalROI, setTotalROI] = useState(0)

  useEffect(() => {
    const initialOpportunities: ProfitOpportunity[] = [
      {
        id: 'profit-001',
        name: 'EU Tax Optimization Strategy',
        category: 'tax',
        potentialProfit: 5.2,
        investment: 0.8,
        roi: 650,
        timeframe: '6 months',
        status: 'executing',
        jurisdiction: 'European Union',
        lastUpdate: '2 hours ago',
        riskLevel: 'Medium'
      },
      {
        id: 'profit-002',
        name: 'Singapore Regulatory Arbitrage',
        category: 'regulatory',
        potentialProfit: 3.7,
        investment: 1.2,
        roi: 308,
        timeframe: '4 months',
        status: 'approved',
        jurisdiction: 'Singapore',
        lastUpdate: '1 day ago',
        riskLevel: 'Low'
      },
      {
        id: 'profit-003',
        name: 'Cayman Islands Licensing',
        category: 'licensing',
        potentialProfit: 8.9,
        investment: 2.1,
        roi: 424,
        timeframe: '12 months',
        status: 'evaluating',
        jurisdiction: 'Cayman Islands',
        lastUpdate: '3 days ago',
        riskLevel: 'High'
      },
      {
        id: 'profit-004',
        name: 'Swiss Compliance Framework',
        category: 'compliance',
        potentialProfit: 2.1,
        investment: 0.5,
        roi: 420,
        timeframe: '3 months',
        status: 'completed',
        jurisdiction: 'Switzerland',
        lastUpdate: '1 week ago',
        riskLevel: 'Low'
      }
    ]

    const initialMetrics: ProfitMetric[] = [
      {
        name: 'Total ROI',
        value: 450,
        target: 300,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Active Opportunities',
        value: 24,
        target: 20,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Success Rate',
        value: 89.7,
        target: 85,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Risk-Adjusted Returns',
        value: 92.3,
        target: 90,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setOpportunities(initialOpportunities)
    setMetrics(initialMetrics)
    setTotalROI(450)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalROI(prev => prev + Math.random() * 2)
      setOpportunities(prev => prev.map(opp => ({
        ...opp,
        lastUpdate: 'Just now'
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tax': return <DollarSign className="h-4 w-4" />
      case 'regulatory': return <Shield className="h-4 w-4" />
      case 'jurisdictional': return <Globe className="h-4 w-4" />
      case 'compliance': return <Target className="h-4 w-4" />
      case 'licensing': return <Brain className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tax': return 'text-neon-green'
      case 'regulatory': return 'text-neon-blue'
      case 'jurisdictional': return 'text-neon-purple'
      case 'compliance': return 'text-neon-yellow'
      case 'licensing': return 'text-neon-red'
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
      case 'identified': return 'text-neon-yellow'
      case 'evaluating': return 'text-neon-blue'
      case 'approved': return 'text-neon-purple'
      case 'executing': return 'text-neon-red'
      case 'completed': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'identified': return <Target className="h-4 w-4" />
      case 'evaluating': return <Brain className="h-4 w-4" />
      case 'approved': return <Shield className="h-4 w-4" />
      case 'executing': return <Activity className="h-4 w-4" />
      case 'completed': return <TrendingUp className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Profit Opportunities</h2>
            <p className="text-muted-foreground">High-value profit opportunities through regulatory arbitrage</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-neon-green" />
            <span className="text-sm font-medium text-neon-green">
              {totalROI.toFixed(0)}% Total ROI
            </span>
          </div>
        </div>

        {/* Profit Metrics */}
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
                  metric.trend === 'up' ? 'bg-neon-green' :
                  metric.trend === 'down' ? 'bg-neon-red' : 'bg-neon-blue'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('ROI') || metric.name.includes('Rate') || metric.name.includes('Returns') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('ROI') || metric.name.includes('Rate') || metric.name.includes('Returns') ? '%' : ''}
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
        <h3 className="text-lg font-semibold mb-4">High-Value Opportunities</h3>
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(opportunity.category)}
                  <div>
                    <div className="font-medium text-sm">{opportunity.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {opportunity.jurisdiction} • {opportunity.timeframe} • {opportunity.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(opportunity.status)}
                  <div className={`text-sm font-bold ${getRiskColor(opportunity.riskLevel)}`}>
                    {opportunity.riskLevel}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">${opportunity.potentialProfit}M</div>
                  <div className="text-xs text-muted-foreground">Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">${opportunity.investment}M</div>
                  <div className="text-xs text-muted-foreground">Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-purple">{opportunity.roi}%</div>
                  <div className="text-xs text-muted-foreground">ROI</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${getStatusColor(opportunity.status)}`}>
                    {opportunity.status}
                  </div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
