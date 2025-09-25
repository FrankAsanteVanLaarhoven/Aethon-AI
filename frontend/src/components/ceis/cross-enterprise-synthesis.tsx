'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, TrendingUp, Target, Users, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

interface SynthesisProject {
  id: string
  name: string
  participants: number
  status: 'active' | 'completed' | 'pending' | 'paused'
  progress: number
  insights: number
  lastUpdate: string
  complexity: 'Low' | 'Medium' | 'High' | 'Critical'
}

interface SynthesisMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function CrossEnterpriseSynthesis() {
  const [projects, setProjects] = useState<SynthesisProject[]>([])
  const [metrics, setMetrics] = useState<SynthesisMetric[]>([])
  const [synthesisRate, setSynthesisRate] = useState(0)

  useEffect(() => {
    const initialProjects: SynthesisProject[] = [
      {
        id: 'project-001',
        name: 'Global Supply Chain Intelligence',
        participants: 12,
        status: 'active',
        progress: 78,
        insights: 47,
        lastUpdate: '2 hours ago',
        complexity: 'High'
      },
      {
        id: 'project-002',
        name: 'Market Disruption Prediction',
        participants: 8,
        status: 'completed',
        progress: 100,
        insights: 23,
        lastUpdate: '1 day ago',
        complexity: 'Medium'
      },
      {
        id: 'project-003',
        name: 'Regulatory Impact Analysis',
        participants: 15,
        status: 'active',
        progress: 45,
        insights: 12,
        lastUpdate: '4 hours ago',
        complexity: 'Critical'
      },
      {
        id: 'project-004',
        name: 'Technology Convergence Study',
        participants: 6,
        status: 'pending',
        progress: 0,
        insights: 0,
        lastUpdate: 'Never',
        complexity: 'Low'
      }
    ]

    const initialMetrics: SynthesisMetric[] = [
      {
        name: 'Synthesis Rate',
        value: 94.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Insight Generation',
        value: 87.3,
        target: 85,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'Collaboration Efficiency',
        value: 92.1,
        target: 88,
        trend: 'up',
        color: 'text-neon-purple'
      },
      {
        name: 'Cross-Enterprise Coverage',
        value: 89.5,
        target: 85,
        trend: 'stable',
        color: 'text-neon-yellow'
      }
    ]

    setProjects(initialProjects)
    setMetrics(initialMetrics)
    setSynthesisRate(94.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSynthesisRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setProjects(prev => prev.map(project => {
        if (project.status === 'active') {
          return {
            ...project,
            progress: Math.min(100, project.progress + Math.random() * 0.5),
            lastUpdate: 'Just now'
          }
        }
        return project
      }))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Target className="h-4 w-4" />
      case 'paused': return <AlertTriangle className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-green'
      case 'completed': return 'text-neon-blue'
      case 'pending': return 'text-neon-yellow'
      case 'paused': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
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
            <h2 className="text-2xl font-bold mb-2">Cross-Enterprise Synthesis</h2>
            <p className="text-muted-foreground">Collaborative intelligence synthesis across enterprise networks</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-neon-purple" />
            <span className="text-sm font-medium text-neon-purple">
              {synthesisRate.toFixed(1)}% Synthesis Rate
            </span>
          </div>
        </div>

        {/* Synthesis Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Active Synthesis Projects</h3>
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
                  {getStatusIcon(project.status)}
                  <div>
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {project.participants} participants • {project.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getComplexityColor(project.complexity)}`}>
                      {project.complexity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.insights} insights
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status).replace('text-', 'bg-')}`} />
                </div>
              </div>

              <div className="w-full bg-background/50 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    project.status === 'active' ? 'bg-neon-green' :
                    project.status === 'completed' ? 'bg-neon-blue' :
                    project.status === 'pending' ? 'bg-neon-yellow' : 'bg-neon-red'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Progress: {project.progress.toFixed(1)}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
