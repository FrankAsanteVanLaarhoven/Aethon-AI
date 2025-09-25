'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Leaf, Zap, TrendingUp, Activity, CheckCircle, Target, Users } from 'lucide-react'

interface PlanetaryResource {
  id: string
  name: string
  type: 'energy' | 'water' | 'materials' | 'land' | 'waste'
  current: number
  optimal: number
  efficiency: number
  status: 'optimized' | 'optimizing' | 'critical' | 'monitoring'
  lastUpdate: string
  region: string
  impact: number
}

interface PlanetaryMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function PlanetaryOptimization() {
  const [resources, setResources] = useState<PlanetaryResource[]>([])
  const [metrics, setMetrics] = useState<PlanetaryMetric[]>([])
  const [optimizationEfficiency, setOptimizationEfficiency] = useState(0)

  useEffect(() => {
    const initialResources: PlanetaryResource[] = [
      {
        id: 'planet-001',
        name: 'Solar Energy Grid',
        type: 'energy',
        current: 78.5,
        optimal: 95.0,
        efficiency: 89.2,
        status: 'optimizing',
        lastUpdate: '2 hours ago',
        region: 'Global',
        impact: 94.7
      },
      {
        id: 'planet-002',
        name: 'Water Management System',
        type: 'water',
        current: 65.3,
        optimal: 85.0,
        efficiency: 76.8,
        status: 'optimizing',
        lastUpdate: '4 hours ago',
        region: 'North America',
        impact: 87.3
      },
      {
        id: 'planet-003',
        name: 'Material Recycling Network',
        type: 'materials',
        current: 45.7,
        optimal: 80.0,
        efficiency: 67.8,
        status: 'critical',
        lastUpdate: '1 day ago',
        region: 'Europe',
        impact: 82.1
      },
      {
        id: 'planet-004',
        name: 'Land Use Optimization',
        type: 'land',
        current: 89.2,
        optimal: 90.0,
        efficiency: 94.7,
        status: 'optimized',
        lastUpdate: '3 days ago',
        region: 'Asia Pacific',
        impact: 91.3
      }
    ]

    const initialMetrics: PlanetaryMetric[] = [
      {
        name: 'Optimization Efficiency',
        value: 87.3,
        target: 80,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Resource Utilization',
        value: 82.1,
        target: 75,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Sustainability Index',
        value: 94.7,
        target: 85,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Global Impact',
        value: 89.5,
        target: 80,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setResources(initialResources)
    setMetrics(initialMetrics)
    setOptimizationEfficiency(87.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOptimizationEfficiency(prev => Math.min(100, prev + Math.random() * 0.1))
      setResources(prev => prev.map(resource => ({
        ...resource,
        lastUpdate: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'energy': return <Zap className="h-4 w-4" />
      case 'water': return <Globe className="h-4 w-4" />
      case 'materials': return <Target className="h-4 w-4" />
      case 'land': return <Leaf className="h-4 w-4" />
      case 'waste': return <Activity className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'energy': return 'text-blue-400'
      case 'water': return 'text-green-400'
      case 'materials': return 'text-blue-300'
      case 'land': return 'text-gray-300'
      case 'waste': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized': return 'text-green-400'
      case 'optimizing': return 'text-blue-400'
      case 'critical': return 'text-gray-400'
      case 'monitoring': return 'text-blue-300'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized': return <CheckCircle className="h-4 w-4" />
      case 'optimizing': return <TrendingUp className="h-4 w-4" />
      case 'critical': return <Target className="h-4 w-4" />
      case 'monitoring': return <Activity className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Planetary Optimization</h2>
            <p className="text-muted-foreground">AI-powered planetary resource optimization and sustainability</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {optimizationEfficiency.toFixed(1)}% Efficiency
            </span>
          </div>
        </div>

        {/* Planetary Metrics */}
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
                  metric.trend === 'up' ? 'bg-green-400' :
                  metric.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
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
        <h3 className="text-lg font-semibold mb-4">Resource Systems</h3>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getResourceTypeIcon(resource.type)}
                  <div>
                    <div className="font-medium text-sm">{resource.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {resource.region} • {resource.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(resource.status)}
                  <div className={`text-sm font-bold ${getResourceTypeColor(resource.type)}`}>
                    {resource.type}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Current vs Optimal</span>
                  <span className="text-xs text-muted-foreground">
                    {resource.current.toFixed(1)}% / {resource.optimal.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      resource.current > resource.optimal * 0.9 ? 'bg-green-400' :
                      resource.current > resource.optimal * 0.7 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${Math.min(100, (resource.current / resource.optimal) * 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{resource.current.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{resource.efficiency.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{resource.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(resource.status)}`}>
                  Status: {resource.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {resource.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
