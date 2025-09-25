'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Target, Activity, TrendingUp, Users, CheckCircle, Zap, Brain } from 'lucide-react'

interface AllocationRegion {
  id: string
  name: string
  resources: number
  population: number
  efficiency: number
  sustainability: number
  status: 'optimal' | 'balanced' | 'stressed' | 'critical'
  lastUpdate: string
  coordinator: string
  priority: 'high' | 'medium' | 'low'
}

interface AllocationMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function GlobalAllocation() {
  const [regions, setRegions] = useState<AllocationRegion[]>([])
  const [metrics, setMetrics] = useState<AllocationMetric[]>([])
  const [allocationEfficiency, setAllocationEfficiency] = useState(0)

  useEffect(() => {
    const initialRegions: AllocationRegion[] = [
      {
        id: 'region-001',
        name: 'North America',
        resources: 1247,
        population: 579,
        efficiency: 89.2,
        sustainability: 94.7,
        status: 'optimal',
        lastUpdate: '2 hours ago',
        coordinator: 'Dr. Sarah Chen',
        priority: 'high'
      },
      {
        id: 'region-002',
        name: 'Europe',
        resources: 892,
        population: 447,
        efficiency: 76.8,
        sustainability: 87.3,
        status: 'balanced',
        lastUpdate: '4 hours ago',
        coordinator: 'Prof. Michael Rodriguez',
        priority: 'high'
      },
      {
        id: 'region-003',
        name: 'Asia Pacific',
        resources: 1567,
        population: 2341,
        efficiency: 65.3,
        sustainability: 82.1,
        status: 'stressed',
        lastUpdate: '1 day ago',
        coordinator: 'Dr. James Wilson',
        priority: 'high'
      },
      {
        id: 'region-004',
        name: 'Africa',
        resources: 234,
        population: 1340,
        efficiency: 45.7,
        sustainability: 67.8,
        status: 'critical',
        lastUpdate: '3 days ago',
        coordinator: 'Dr. Emma Thompson',
        priority: 'high'
      }
    ]

    const initialMetrics: AllocationMetric[] = [
      {
        name: 'Allocation Efficiency',
        value: 69.3,
        target: 70,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Global Balance',
        value: 78.5,
        target: 75,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Sustainability Index',
        value: 82.9,
        target: 80,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Resource Equity',
        value: 71.4,
        target: 70,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setRegions(initialRegions)
    setMetrics(initialMetrics)
    setAllocationEfficiency(69.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAllocationEfficiency(prev => Math.min(100, prev + Math.random() * 0.1))
      setRegions(prev => prev.map(region => ({
        ...region,
        lastUpdate: 'Just now'
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400'
      case 'balanced': return 'text-blue-400'
      case 'stressed': return 'text-blue-300'
      case 'critical': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="h-4 w-4" />
      case 'balanced': return <Target className="h-4 w-4" />
      case 'stressed': return <Activity className="h-4 w-4" />
      case 'critical': return <TrendingUp className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-gray-300'
      case 'medium': return 'text-blue-400'
      case 'low': return 'text-gray-400'
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
            <h2 className="text-xl font-bold mb-2">Global Allocation</h2>
            <p className="text-muted-foreground">AI-powered global resource allocation and distribution</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {allocationEfficiency.toFixed(1)}% Allocation Efficiency
            </span>
          </div>
        </div>

        {/* Allocation Metrics */}
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
                  metric.trend === 'up' ? 'bg-green-400' :
                  metric.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}%
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
        <h3 className="text-lg font-semibold mb-4">Regional Allocation</h3>
        <div className="space-y-4">
          {regions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <div>
                    <div className="font-medium text-sm">{region.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {region.coordinator} • {region.priority} priority • {region.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(region.status)}
                  <div className={`text-sm font-bold ${getStatusColor(region.status)}`}>
                    {region.status}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Resource-Population Ratio</span>
                  <span className="text-xs text-muted-foreground">
                    {region.resources.toLocaleString('en-US')} / {region.population.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      region.efficiency > 80 ? 'bg-green-400' :
                      region.efficiency > 60 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${region.efficiency}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{region.efficiency.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{region.sustainability.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Sustainability</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getPriorityColor(region.priority)}`}>
                      {region.priority}
                    </div>
                    <div className="text-xs text-muted-foreground">Priority</div>
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
