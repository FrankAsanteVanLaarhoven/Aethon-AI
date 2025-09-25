'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Users, Activity, TrendingUp, CheckCircle, Brain, Zap, Globe } from 'lucide-react'

interface AlignmentInitiative {
  id: string
  name: string
  company: string
  type: 'vision' | 'mission' | 'values' | 'goals' | 'culture'
  alignment: number
  engagement: number
  execution: number
  status: 'aligned' | 'aligning' | 'misaligned' | 'reviewing'
  lastUpdate: string
  leader: string
  stakeholders: number
}

interface AlignmentMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function StrategicAlignment() {
  const [initiatives, setInitiatives] = useState<AlignmentInitiative[]>([])
  const [metrics, setMetrics] = useState<AlignmentMetric[]>([])
  const [overallAlignment, setOverallAlignment] = useState(0)

  useEffect(() => {
    const initialInitiatives: AlignmentInitiative[] = [
      {
        id: 'align-001',
        name: 'Digital Vision Alignment',
        company: 'TechCorp Global',
        type: 'vision',
        alignment: 94.7,
        engagement: 89.2,
        execution: 87.3,
        status: 'aligned',
        lastUpdate: '2 hours ago',
        leader: 'Dr. Sarah Chen',
        stakeholders: 1247
      },
      {
        id: 'align-002',
        name: 'Mission Statement Refresh',
        company: 'Manufacturing Plus',
        type: 'mission',
        alignment: 78.5,
        engagement: 76.8,
        execution: 82.1,
        status: 'aligning',
        lastUpdate: '4 hours ago',
        leader: 'Prof. Michael Rodriguez',
        stakeholders: 892
      },
      {
        id: 'align-003',
        name: 'Core Values Integration',
        company: 'Finance Dynamics',
        type: 'values',
        alignment: 65.3,
        engagement: 71.4,
        execution: 68.9,
        status: 'aligning',
        lastUpdate: '1 day ago',
        leader: 'Dr. James Wilson',
        stakeholders: 567
      },
      {
        id: 'align-004',
        name: 'Cultural Transformation',
        company: 'Healthcare United',
        type: 'culture',
        alignment: 89.2,
        engagement: 85.7,
        execution: 91.3,
        status: 'aligned',
        lastUpdate: '3 days ago',
        leader: 'Dr. Emma Thompson',
        stakeholders: 345
      }
    ]

    const initialMetrics: AlignmentMetric[] = [
      {
        name: 'Overall Alignment',
        value: 81.9,
        target: 75,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Stakeholder Engagement',
        value: 80.8,
        target: 70,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Execution Readiness',
        value: 82.4,
        target: 75,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Cultural Coherence',
        value: 87.3,
        target: 80,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setInitiatives(initialInitiatives)
    setMetrics(initialMetrics)
    setOverallAlignment(81.9)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallAlignment(prev => Math.min(100, prev + Math.random() * 0.1))
      setInitiatives(prev => prev.map(initiative => ({
        ...initiative,
        lastUpdate: 'Just now'
      })))
    }, 45000)

    return () => clearInterval(interval)
  }, [])

  const getAlignmentTypeIcon = (type: string) => {
    switch (type) {
      case 'vision': return <Target className="h-4 w-4" />
      case 'mission': return <Brain className="h-4 w-4" />
      case 'values': return <Users className="h-4 w-4" />
      case 'goals': return <TrendingUp className="h-4 w-4" />
      case 'culture': return <Activity className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const getAlignmentTypeColor = (type: string) => {
    switch (type) {
      case 'vision': return 'text-blue-400'
      case 'mission': return 'text-green-400'
      case 'values': return 'text-blue-300'
      case 'goals': return 'text-gray-300'
      case 'culture': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aligned': return 'text-green-400'
      case 'aligning': return 'text-blue-400'
      case 'misaligned': return 'text-gray-400'
      case 'reviewing': return 'text-blue-300'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aligned': return <CheckCircle className="h-4 w-4" />
      case 'aligning': return <Activity className="h-4 w-4" />
      case 'misaligned': return <Target className="h-4 w-4" />
      case 'reviewing': return <Brain className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Strategic Alignment</h2>
            <p className="text-muted-foreground">AI-powered strategic alignment and organizational coherence</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {overallAlignment.toFixed(1)}% Overall Alignment
            </span>
          </div>
        </div>

        {/* Alignment Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Alignment Initiatives</h3>
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
                  {getAlignmentTypeIcon(initiative.type)}
                  <div>
                    <div className="font-medium text-sm">{initiative.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {initiative.company} • {initiative.leader} • {initiative.stakeholders} stakeholders • {initiative.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(initiative.status)}
                  <div className={`text-sm font-bold ${getAlignmentTypeColor(initiative.type)}`}>
                    {initiative.type}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Alignment Score</span>
                  <span className="text-xs text-muted-foreground">{initiative.alignment.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      initiative.alignment > 85 ? 'bg-green-400' :
                      initiative.alignment > 70 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${initiative.alignment}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{initiative.alignment.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Alignment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{initiative.engagement.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{initiative.execution.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Execution</div>
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
