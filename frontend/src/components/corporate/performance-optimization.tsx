'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Activity, Brain, Users, CheckCircle, Zap, Globe } from 'lucide-react'

interface OptimizationProject {
  id: string
  name: string
  company: string
  type: 'operational' | 'financial' | 'digital' | 'process' | 'resource'
  improvement: number
  efficiency: number
  roi: number
  status: 'active' | 'planning' | 'completed' | 'monitoring'
  lastUpdate: string
  optimizer: string
  duration: string
}

interface OptimizationMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function PerformanceOptimization() {
  const [projects, setProjects] = useState<OptimizationProject[]>([])
  const [metrics, setMetrics] = useState<OptimizationMetric[]>([])
  const [optimizationRate, setOptimizationRate] = useState(0)

  useEffect(() => {
    const initialProjects: OptimizationProject[] = [
      {
        id: 'opt-001',
        name: 'Supply Chain Optimization',
        company: 'TechCorp Global',
        type: 'operational',
        improvement: 34.7,
        efficiency: 89.2,
        roi: 245.6,
        status: 'active',
        lastUpdate: '2 hours ago',
        optimizer: 'Dr. Sarah Chen',
        duration: '6 months'
      },
      {
        id: 'opt-002',
        name: 'Financial Process Automation',
        company: 'Manufacturing Plus',
        type: 'financial',
        improvement: 28.9,
        efficiency: 76.8,
        roi: 189.3,
        status: 'active',
        lastUpdate: '4 hours ago',
        optimizer: 'Prof. Michael Rodriguez',
        duration: '4 months'
      },
      {
        id: 'opt-003',
        name: 'Digital Infrastructure Upgrade',
        company: 'Finance Dynamics',
        type: 'digital',
        improvement: 42.1,
        efficiency: 94.7,
        roi: 312.8,
        status: 'monitoring',
        lastUpdate: '1 day ago',
        optimizer: 'Dr. James Wilson',
        duration: '8 months'
      },
      {
        id: 'opt-004',
        name: 'Resource Allocation Optimization',
        company: 'Healthcare United',
        type: 'resource',
        improvement: 31.5,
        efficiency: 87.3,
        roi: 198.7,
        status: 'completed',
        lastUpdate: '3 days ago',
        optimizer: 'Dr. Emma Thompson',
        duration: '3 months'
      }
    ]

    const initialMetrics: OptimizationMetric[] = [
      {
        name: 'Optimization Rate',
        value: 89.7,
        target: 80,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Average Improvement',
        value: 34.3,
        target: 25,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'ROI Achievement',
        value: 236.6,
        target: 200,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Efficiency Gain',
        value: 87.0,
        target: 75,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setProjects(initialProjects)
    setMetrics(initialMetrics)
    setOptimizationRate(89.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOptimizationRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setProjects(prev => prev.map(project => ({
        ...project,
        lastUpdate: 'Just now'
      })))
    }, 40000)

    return () => clearInterval(interval)
  }, [])

  const getOptimizationTypeIcon = (type: string) => {
    switch (type) {
      case 'operational': return <Activity className="h-4 w-4" />
      case 'financial': return <TrendingUp className="h-4 w-4" />
      case 'digital': return <Zap className="h-4 w-4" />
      case 'process': return <Target className="h-4 w-4" />
      case 'resource': return <Users className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getOptimizationTypeColor = (type: string) => {
    switch (type) {
      case 'operational': return 'text-blue-400'
      case 'financial': return 'text-green-400'
      case 'digital': return 'text-blue-300'
      case 'process': return 'text-gray-300'
      case 'resource': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'planning': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'monitoring': return 'text-blue-300'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'planning': return <Target className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Performance Optimization</h2>
            <p className="text-muted-foreground">AI-powered performance optimization and efficiency enhancement</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {optimizationRate.toFixed(1)}% Optimization Rate
            </span>
          </div>
        </div>

        {/* Optimization Metrics */}
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
                  {metric.value.toFixed(1)}{metric.name.includes('Rate') || metric.name.includes('Improvement') || metric.name.includes('Gain') ? '%' : metric.name.includes('ROI') ? '%' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Improvement') || metric.name.includes('Gain') ? '%' : metric.name.includes('ROI') ? '%' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Optimization Projects</h3>
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
                  {getOptimizationTypeIcon(project.type)}
                  <div>
                    <div className="font-medium text-sm">{project.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {project.company} • {project.optimizer} • {project.duration} • {project.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(project.status)}
                  <div className={`text-sm font-bold ${getOptimizationTypeColor(project.type)}`}>
                    {project.type}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Improvement</span>
                  <span className="text-xs text-muted-foreground">+{project.improvement.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      project.improvement > 35 ? 'bg-green-400' :
                      project.improvement > 25 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${Math.min(100, project.improvement)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">+{project.improvement.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{project.efficiency.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{project.roi.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">ROI</div>
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
