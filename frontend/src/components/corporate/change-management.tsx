'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Activity, TrendingUp, CheckCircle, Brain, Zap, Globe } from 'lucide-react'

interface ChangeInitiative {
  id: string
  name: string
  company: string
  type: 'cultural' | 'process' | 'technology' | 'organizational' | 'strategic'
  adoption: number
  resistance: number
  success: number
  status: 'implementing' | 'planning' | 'completed' | 'stalled'
  lastUpdate: string
  changeManager: string
  stakeholders: number
}

interface ChangeMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function ChangeManagement() {
  const [initiatives, setInitiatives] = useState<ChangeInitiative[]>([])
  const [metrics, setMetrics] = useState<ChangeMetric[]>([])
  const [changeSuccessRate, setChangeSuccessRate] = useState(0)

  useEffect(() => {
    const initialInitiatives: ChangeInitiative[] = [
      {
        id: 'change-001',
        name: 'Digital Culture Transformation',
        company: 'TechCorp Global',
        type: 'cultural',
        adoption: 78.5,
        resistance: 12.3,
        success: 89.2,
        status: 'implementing',
        lastUpdate: '2 hours ago',
        changeManager: 'Dr. Sarah Chen',
        stakeholders: 1247
      },
      {
        id: 'change-002',
        name: 'Process Automation Initiative',
        company: 'Manufacturing Plus',
        type: 'process',
        adoption: 65.3,
        resistance: 18.7,
        success: 76.8,
        status: 'implementing',
        lastUpdate: '4 hours ago',
        changeManager: 'Prof. Michael Rodriguez',
        stakeholders: 892
      },
      {
        id: 'change-003',
        name: 'Organizational Restructuring',
        company: 'Finance Dynamics',
        type: 'organizational',
        adoption: 45.7,
        resistance: 25.4,
        success: 67.8,
        status: 'planning',
        lastUpdate: '1 day ago',
        changeManager: 'Dr. James Wilson',
        stakeholders: 567
      },
      {
        id: 'change-004',
        name: 'Technology Modernization',
        company: 'Healthcare United',
        type: 'technology',
        adoption: 89.2,
        resistance: 8.9,
        success: 94.7,
        status: 'completed',
        lastUpdate: '3 days ago',
        changeManager: 'Dr. Emma Thompson',
        stakeholders: 345
      }
    ]

    const initialMetrics: ChangeMetric[] = [
      {
        name: 'Change Success Rate',
        value: 87.3,
        target: 75,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Adoption Rate',
        value: 69.7,
        target: 60,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Resistance Reduction',
        value: 16.3,
        target: 20,
        trend: 'down',
        color: 'text-blue-300'
      },
      {
        name: 'Stakeholder Engagement',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setInitiatives(initialInitiatives)
    setMetrics(initialMetrics)
    setChangeSuccessRate(87.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setChangeSuccessRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setInitiatives(prev => prev.map(initiative => ({
        ...initiative,
        lastUpdate: 'Just now'
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural': return <Users className="h-4 w-4" />
      case 'process': return <Activity className="h-4 w-4" />
      case 'technology': return <Zap className="h-4 w-4" />
      case 'organizational': return <Target className="h-4 w-4" />
      case 'strategic': return <Brain className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'text-blue-400'
      case 'process': return 'text-green-400'
      case 'technology': return 'text-blue-300'
      case 'organizational': return 'text-gray-300'
      case 'strategic': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implementing': return 'text-green-400'
      case 'planning': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'stalled': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implementing': return <CheckCircle className="h-4 w-4" />
      case 'planning': return <Target className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'stalled': return <Activity className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Change Management</h2>
            <p className="text-muted-foreground">AI-powered change management and organizational transformation</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {changeSuccessRate.toFixed(1)}% Success Rate
            </span>
          </div>
        </div>

        {/* Change Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Change Initiatives</h3>
        <div className="space-y-4">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getChangeTypeIcon(initiative.type)}
                  <div>
                    <div className="font-medium text-sm">{initiative.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {initiative.company} • {initiative.changeManager} • {initiative.stakeholders} stakeholders • {initiative.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(initiative.status)}
                  <div className={`text-sm font-bold ${getChangeTypeColor(initiative.type)}`}>
                    {initiative.type}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Adoption vs Resistance</span>
                  <span className="text-xs text-muted-foreground">
                    {initiative.adoption.toFixed(1)}% / {initiative.resistance.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      initiative.adoption > 70 ? 'bg-green-400' :
                      initiative.adoption > 50 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${initiative.adoption}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{initiative.adoption.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Adoption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{initiative.success.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{initiative.resistance.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Resistance</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(initiative.status)}`}>
                  Status: {initiative.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {initiative.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
