'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Activity, TrendingUp, Users, CheckCircle, Brain, Globe } from 'lucide-react'

interface TransformationProject {
  id: string
  name: string
  company: string
  type: 'digital' | 'operational' | 'strategic' | 'cultural' | 'financial'
  progress: number
  impact: number
  duration: string
  status: 'active' | 'planning' | 'completed' | 'paused'
  lastUpdate: string
  consultant: string
  sector: string
}

interface TransformationMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function TransformationEngine() {
  const [projects, setProjects] = useState<TransformationProject[]>([])
  const [metrics, setMetrics] = useState<TransformationMetric[]>([])
  const [transformationEfficiency, setTransformationEfficiency] = useState(0)

  useEffect(() => {
    const initialProjects: TransformationProject[] = [
      {
        id: 'trans-001',
        name: 'Digital Transformation Initiative',
        company: 'TechCorp Global',
        type: 'digital',
        progress: 78.5,
        impact: 89.2,
        duration: '12 months',
        status: 'active',
        lastUpdate: '2 hours ago',
        consultant: 'Dr. Sarah Chen',
        sector: 'Technology'
      },
      {
        id: 'trans-002',
        name: 'Operational Excellence Program',
        company: 'Manufacturing Plus',
        type: 'operational',
        progress: 65.3,
        impact: 76.8,
        duration: '18 months',
        status: 'active',
        lastUpdate: '4 hours ago',
        consultant: 'Prof. Michael Rodriguez',
        sector: 'Manufacturing'
      },
      {
        id: 'trans-003',
        name: 'Strategic Restructuring',
        company: 'Finance Dynamics',
        type: 'strategic',
        progress: 45.7,
        impact: 92.1,
        duration: '24 months',
        status: 'planning',
        lastUpdate: '1 day ago',
        consultant: 'Dr. James Wilson',
        sector: 'Finance'
      },
      {
        id: 'trans-004',
        name: 'Cultural Transformation',
        company: 'Healthcare United',
        type: 'cultural',
        progress: 89.2,
        impact: 67.8,
        duration: '6 months',
        status: 'completed',
        lastUpdate: '3 days ago',
        consultant: 'Dr. Emma Thompson',
        sector: 'Healthcare'
      }
    ]

    const initialMetrics: TransformationMetric[] = [
      {
        name: 'Transformation Efficiency',
        value: 94.7,
        target: 85,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Success Rate',
        value: 89.2,
        target: 80,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Time to Value',
        value: 6.8,
        target: 12,
        trend: 'down',
        color: 'text-blue-300'
      },
      {
        name: 'Client Satisfaction',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setProjects(initialProjects)
    setMetrics(initialMetrics)
    setTransformationEfficiency(94.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTransformationEfficiency(prev => Math.min(100, prev + Math.random() * 0.1))
      setProjects(prev => prev.map(project => ({
        ...project,
        lastUpdate: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getTransformationTypeIcon = (type: string) => {
    switch (type) {
      case 'digital': return <Zap className="h-4 w-4" />
      case 'operational': return <Activity className="h-4 w-4" />
      case 'strategic': return <Target className="h-4 w-4" />
      case 'cultural': return <Users className="h-4 w-4" />
      case 'financial': return <TrendingUp className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getTransformationTypeColor = (type: string) => {
    switch (type) {
      case 'digital': return 'text-blue-400'
      case 'operational': return 'text-green-400'
      case 'strategic': return 'text-blue-300'
      case 'cultural': return 'text-gray-300'
      case 'financial': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'planning': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'paused': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'planning': return <Target className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'paused': return <Activity className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Transformation Engine</h2>
            <p className="text-muted-foreground">AI-powered corporate transformation and change management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {transformationEfficiency.toFixed(1)}% Efficiency
            </span>
          </div>
        </div>

        {/* Transformation Metrics */}
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
                  {metric.value}{metric.name.includes('Efficiency') || metric.name.includes('Rate') || metric.name.includes('Satisfaction') ? '%' : metric.name.includes('Time') ? 'm' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Efficiency') || metric.name.includes('Rate') || metric.name.includes('Satisfaction') ? '%' : metric.name.includes('Time') ? 'm' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Transformations</h3>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getTransformationTypeIcon(project.type)}
                  <div>
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {project.company} • {project.sector} • {project.consultant} • {project.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(project.status)}
                  <div className={`text-sm font-bold ${getTransformationTypeColor(project.type)}`}>
                    {project.type}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs text-muted-foreground">{project.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      project.progress > 80 ? 'bg-green-400' :
                      project.progress > 60 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{project.progress.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{project.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{project.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(project.status)}`}>
                  Status: {project.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {project.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
