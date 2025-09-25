'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Globe, Target, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'

interface SupplyChain {
  id: string
  name: string
  industry: string
  status: 'healthy' | 'warning' | 'critical' | 'disrupted'
  nodes: number
  resilience: number
  lastUpdate: string
  region: string
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
}

interface MonitoringMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function SupplyChainMonitoring() {
  const [chains, setChains] = useState<SupplyChain[]>([])
  const [metrics, setMetrics] = useState<MonitoringMetric[]>([])
  const [totalChains, setTotalChains] = useState(0)

  useEffect(() => {
    const initialChains: SupplyChain[] = [
      {
        id: 'chain-001',
        name: 'Electronics Manufacturing',
        industry: 'Technology',
        status: 'warning',
        nodes: 47,
        resilience: 78.5,
        lastUpdate: '2 min ago',
        region: 'Global',
        riskLevel: 'High'
      },
      {
        id: 'chain-002',
        name: 'Automotive Parts',
        industry: 'Automotive',
        status: 'healthy',
        nodes: 23,
        resilience: 89.2,
        lastUpdate: '5 min ago',
        region: 'North America',
        riskLevel: 'Medium'
      },
      {
        id: 'chain-003',
        name: 'Pharmaceutical',
        industry: 'Healthcare',
        status: 'critical',
        nodes: 34,
        resilience: 45.8,
        lastUpdate: '1 min ago',
        region: 'Global',
        riskLevel: 'Critical'
      },
      {
        id: 'chain-004',
        name: 'Food & Beverage',
        industry: 'Consumer',
        status: 'healthy',
        nodes: 56,
        resilience: 92.1,
        lastUpdate: '3 min ago',
        region: 'Europe',
        riskLevel: 'Low'
      },
      {
        id: 'chain-005',
        name: 'Textile Manufacturing',
        industry: 'Fashion',
        status: 'warning',
        nodes: 28,
        resilience: 67.3,
        lastUpdate: '4 min ago',
        region: 'Asia Pacific',
        riskLevel: 'Medium'
      }
    ]

    const initialMetrics: MonitoringMetric[] = [
      {
        name: 'Total Chains',
        value: 1247,
        change: 12.5,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Healthy Chains',
        value: 89.2,
        change: 5.3,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Average Resilience',
        value: 84.7,
        change: 2.1,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Risk Coverage',
        value: 96.8,
        change: 1.8,
        trend: 'stable',
        color: 'text-neon-yellow'
      }
    ]

    setChains(initialChains)
    setMetrics(initialMetrics)
    setTotalChains(1247)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalChains(prev => prev + Math.floor(Math.random() * 2))
      setChains(prev => prev.map(chain => ({
        ...chain,
        lastUpdate: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'critical': return <AlertTriangle className="h-4 w-4" />
      case 'disrupted': return <Zap className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
      case 'disrupted': return 'text-neon-red'
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-green" />
      case 'down': return <TrendingUp className="h-3 w-3 text-neon-red rotate-180" />
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
            <h2 className="text-2xl font-bold mb-2">Supply Chain Monitoring</h2>
            <p className="text-muted-foreground">Real-time supply chain health monitoring and risk assessment</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {totalChains} Chains Monitored
            </span>
          </div>
        </div>

        {/* Monitoring Metrics */}
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
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Chains') ? '' : '%'}
                </div>
                <div className="text-xs text-muted-foreground">
                  +{metric.change}%
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
        <h3 className="text-lg font-semibold mb-4">Supply Chain Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chains.map((chain, index) => (
            <motion.div
              key={chain.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(chain.status)}
                  <div>
                    <div className="font-medium text-sm">{chain.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {chain.industry} • {chain.region}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getRiskColor(chain.riskLevel)}`}>
                    {chain.riskLevel}
                  </div>
                  <div className="text-xs text-muted-foreground">{chain.lastUpdate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-blue">{chain.nodes}</div>
                  <div className="text-xs text-muted-foreground">Nodes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-green">{chain.resilience.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Resilience</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Resilience</span>
                  <span className="text-xs text-muted-foreground">{chain.resilience.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      chain.resilience > 80 ? 'bg-neon-green' :
                      chain.resilience > 60 ? 'bg-neon-yellow' : 'bg-neon-red'
                    }`}
                    style={{ width: `${chain.resilience}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
