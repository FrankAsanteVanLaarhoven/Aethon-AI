'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Target, Activity, Clock, CheckCircle, AlertTriangle, Brain } from 'lucide-react'

interface Countermeasure {
  id: string
  name: string
  type: 'defensive' | 'offensive' | 'adaptive' | 'preventive'
  speed: number
  effectiveness: number
  status: 'active' | 'standby' | 'deploying' | 'maintenance'
  lastDeployed: string
  successRate: number
  automation: number
}

interface CountermeasureMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function MachineSpeedCountermeasures() {
  const [countermeasures, setCountermeasures] = useState<Countermeasure[]>([])
  const [metrics, setMetrics] = useState<CountermeasureMetric[]>([])
  const [deploymentSpeed, setDeploymentSpeed] = useState(0)

  useEffect(() => {
    const initialCountermeasures: Countermeasure[] = [
      {
        id: 'cm-001',
        name: 'Dynamic Pricing Shield',
        type: 'defensive',
        speed: 0.2,
        effectiveness: 94.2,
        status: 'active',
        lastDeployed: '2 min ago',
        successRate: 89.7,
        automation: 98.5
      },
      {
        id: 'cm-002',
        name: 'Product Launch Counter',
        type: 'offensive',
        speed: 0.5,
        effectiveness: 87.3,
        status: 'deploying',
        lastDeployed: '5 min ago',
        successRate: 92.1,
        automation: 95.8
      },
      {
        id: 'cm-003',
        name: 'Market Position Defender',
        type: 'adaptive',
        speed: 0.3,
        effectiveness: 91.8,
        status: 'active',
        lastDeployed: '1 min ago',
        successRate: 88.9,
        automation: 97.2
      },
      {
        id: 'cm-004',
        name: 'Partnership Blocker',
        type: 'preventive',
        speed: 0.8,
        effectiveness: 85.6,
        status: 'standby',
        lastDeployed: '1 hour ago',
        successRate: 86.4,
        automation: 93.7
      }
    ]

    const initialMetrics: CountermeasureMetric[] = [
      {
        name: 'Deployment Speed',
        value: 0.3,
        target: 1.0,
        trend: 'down',
        color: 'text-neon-green'
      },
      {
        name: 'Success Rate',
        value: 89.2,
        target: 85,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Automation Level',
        value: 96.3,
        target: 95,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Active Measures',
        value: 47,
        target: 40,
        trend: 'up',
        color: 'text-neon-yellow'
      }
    ]

    setCountermeasures(initialCountermeasures)
    setMetrics(initialMetrics)
    setDeploymentSpeed(0.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDeploymentSpeed(prev => Math.max(0.1, prev + (Math.random() - 0.5) * 0.05))
      setCountermeasures(prev => prev.map(cm => ({
        ...cm,
        lastDeployed: 'Just now'
      })))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getCountermeasureTypeIcon = (type: string) => {
    switch (type) {
      case 'defensive': return <Shield className="h-4 w-4" />
      case 'offensive': return <Target className="h-4 w-4" />
      case 'adaptive': return <Brain className="h-4 w-4" />
      case 'preventive': return <AlertTriangle className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getCountermeasureTypeColor = (type: string) => {
    switch (type) {
      case 'defensive': return 'text-neon-blue'
      case 'offensive': return 'text-neon-red'
      case 'adaptive': return 'text-neon-purple'
      case 'preventive': return 'text-neon-yellow'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-green'
      case 'standby': return 'text-neon-yellow'
      case 'deploying': return 'text-neon-blue'
      case 'maintenance': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'standby': return <Clock className="h-4 w-4" />
      case 'deploying': return <Activity className="h-4 w-4" />
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Machine Speed Countermeasures</h2>
            <p className="text-muted-foreground">Automated countermeasures deployed at machine speed</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {deploymentSpeed.toFixed(1)}s Deployment
            </span>
          </div>
        </div>

        {/* Countermeasure Metrics */}
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
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Level') || metric.name.includes('Measures') ? (metric.name.includes('Measures') ? '' : '%') : metric.name.includes('Speed') ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Level') || metric.name.includes('Measures') ? (metric.name.includes('Measures') ? '' : '%') : metric.name.includes('Speed') ? 's' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Countermeasures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countermeasures.map((countermeasure, index) => (
            <motion.div
              key={countermeasure.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCountermeasureTypeIcon(countermeasure.type)}
                  <div>
                    <div className="font-medium text-sm">{countermeasure.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {countermeasure.type} • {countermeasure.lastDeployed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(countermeasure.status)}
                  <div className={`text-sm font-bold ${getStatusColor(countermeasure.status)}`}>
                    {countermeasure.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-green">{countermeasure.speed.toFixed(1)}s</div>
                  <div className="text-xs text-muted-foreground">Speed</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-blue">{countermeasure.effectiveness.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Effectiveness</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-purple">{countermeasure.successRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-neon-yellow">{countermeasure.automation.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Automation</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
