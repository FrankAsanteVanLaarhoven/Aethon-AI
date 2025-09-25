'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Target, TrendingUp, Globe, Zap, Activity, Brain, Shield } from 'lucide-react'

interface ArbitrageOpportunity {
  id: string
  name: string
  type: 'tax' | 'regulatory' | 'jurisdictional' | 'compliance' | 'licensing'
  profit: number
  risk: 'Low' | 'Medium' | 'High' | 'Critical'
  timeframe: string
  status: 'discovered' | 'analyzing' | 'executing' | 'completed'
  jurisdiction: string
  lastUpdate: string
  confidence: number
}

interface ArbitrageMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function RegulatoryArbitrage() {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([])
  const [metrics, setMetrics] = useState<ArbitrageMetric[]>([])
  const [totalProfit, setTotalProfit] = useState(0)

  useEffect(() => {
    const initialOpportunities: ArbitrageOpportunity[] = [
      {
        id: 'arb-001',
        name: 'Cross-Border Tax Optimization',
        type: 'tax',
        profit: 2.4,
        risk: 'Medium',
        timeframe: '3-6 months',
        status: 'executing',
        jurisdiction: 'EU-US',
        lastUpdate: '2 hours ago',
        confidence: 89.2
      },
      {
        id: 'arb-002',
        name: 'Regulatory Compliance Arbitrage',
        type: 'regulatory',
        profit: 1.8,
        risk: 'Low',
        timeframe: '1-3 months',
        status: 'analyzing',
        jurisdiction: 'Singapore-UK',
        lastUpdate: '4 hours ago',
        confidence: 76.8
      },
      {
        id: 'arb-003',
        name: 'Jurisdictional Licensing',
        type: 'licensing',
        profit: 3.2,
        risk: 'High',
        timeframe: '6-12 months',
        status: 'discovered',
        jurisdiction: 'Cayman Islands',
        lastUpdate: '1 day ago',
        confidence: 94.5
      },
      {
        id: 'arb-004',
        name: 'Compliance Framework Shift',
        type: 'compliance',
        profit: 0.9,
        risk: 'Low',
        timeframe: '2-4 months',
        status: 'completed',
        jurisdiction: 'Switzerland',
        lastUpdate: '3 days ago',
        confidence: 87.3
      }
    ]

    const initialMetrics: ArbitrageMetric[] = [
      {
        name: 'Total Profit Generated',
        value: 89.2,
        target: 75,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Success Rate',
        value: 94.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Risk-Adjusted Returns',
        value: 87.3,
        target: 85,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Discovery Rate',
        value: 92.1,
        target: 88,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setOpportunities(initialOpportunities)
    setMetrics(initialMetrics)
    setTotalProfit(89.2)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalProfit(prev => prev + Math.random() * 0.5)
      setOpportunities(prev => prev.map(opp => ({
        ...opp,
        lastUpdate: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getArbitrageTypeIcon = (type: string) => {
    switch (type) {
      case 'tax': return <DollarSign className="h-4 w-4" />
      case 'regulatory': return <Shield className="h-4 w-4" />
      case 'jurisdictional': return <Globe className="h-4 w-4" />
      case 'compliance': return <Target className="h-4 w-4" />
      case 'licensing': return <Brain className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getArbitrageTypeColor = (type: string) => {
    switch (type) {
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
      case 'discovered': return 'text-neon-yellow'
      case 'analyzing': return 'text-neon-blue'
      case 'executing': return 'text-neon-red'
      case 'completed': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'discovered': return <Target className="h-4 w-4" />
      case 'analyzing': return <Brain className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Regulatory Arbitrage</h2>
            <p className="text-muted-foreground">Dynamic regulatory arbitrage opportunities discovery and execution</p>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-neon-green" />
            <span className="text-sm font-medium text-neon-green">
              ${totalProfit.toFixed(1)}M Total Profit
            </span>
          </div>
        </div>

        {/* Arbitrage Metrics */}
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
                  {metric.value.toFixed(1)}{metric.name.includes('Profit') ? 'M' : '%'}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Profit') ? 'M' : '%'}
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
        <h3 className="text-lg font-semibold mb-4">Active Opportunities</h3>
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
                  {getArbitrageTypeIcon(opportunity.type)}
                  <div>
                    <div className="font-medium text-sm">{opportunity.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {opportunity.jurisdiction} • {opportunity.timeframe} • {opportunity.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(opportunity.status)}
                  <div className={`text-sm font-bold ${getRiskColor(opportunity.risk)}`}>
                    {opportunity.risk}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">${opportunity.profit}M</div>
                  <div className="text-xs text-muted-foreground">Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{opportunity.confidence.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Confidence</div>
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
