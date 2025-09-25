'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Brain, TrendingUp, Activity, CheckCircle, Globe, Zap, Target } from 'lucide-react'

interface EducationProgram {
  id: string
  name: string
  type: 'academic' | 'vocational' | 'professional' | 'lifelong' | 'specialized'
  enrollment: number
  completion: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  status: 'active' | 'pilot' | 'completed' | 'suspended'
  lastUpdate: string
  region: string
  instructor: string
}

interface EducationMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function PopulationScaleEducation() {
  const [programs, setPrograms] = useState<EducationProgram[]>([])
  const [metrics, setMetrics] = useState<EducationMetric[]>([])
  const [overallEngagement, setOverallEngagement] = useState(0)

  useEffect(() => {
    const initialPrograms: EducationProgram[] = [
      {
        id: 'prog-001',
        name: 'AI Fundamentals for All',
        type: 'academic',
        enrollment: 456789,
        completion: 89.2,
        duration: '12 weeks',
        level: 'beginner',
        status: 'active',
        lastUpdate: '2 hours ago',
        region: 'Global',
        instructor: 'Dr. Sarah Chen'
      },
      {
        id: 'prog-002',
        name: 'Digital Skills Bootcamp',
        type: 'vocational',
        enrollment: 234567,
        completion: 94.7,
        duration: '8 weeks',
        level: 'intermediate',
        status: 'active',
        lastUpdate: '4 hours ago',
        region: 'North America',
        instructor: 'Prof. Michael Rodriguez'
      },
      {
        id: 'prog-003',
        name: 'Leadership in Tech',
        type: 'professional',
        enrollment: 123456,
        completion: 76.8,
        duration: '16 weeks',
        level: 'advanced',
        status: 'pilot',
        lastUpdate: '1 day ago',
        region: 'Europe',
        instructor: 'Dr. Emma Thompson'
      },
      {
        id: 'prog-004',
        name: 'Sustainable Development',
        type: 'lifelong',
        enrollment: 345678,
        completion: 82.1,
        duration: '6 weeks',
        level: 'intermediate',
        status: 'completed',
        lastUpdate: '3 days ago',
        region: 'Asia Pacific',
        instructor: 'Dr. James Wilson'
      }
    ]

    const initialMetrics: EducationMetric[] = [
      {
        name: 'Overall Engagement',
        value: 87.3,
        target: 80,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Completion Rate',
        value: 94.7,
        target: 85,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Learning Velocity',
        value: 2.8,
        target: 2.0,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Global Reach',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setPrograms(initialPrograms)
    setMetrics(initialMetrics)
    setOverallEngagement(87.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallEngagement(prev => Math.min(100, prev + Math.random() * 0.1))
      setPrograms(prev => prev.map(program => ({
        ...program,
        lastUpdate: 'Just now'
      })))
    }, 18000)

    return () => clearInterval(interval)
  }, [])

  const getProgramTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return <Brain className="h-4 w-4" />
      case 'vocational': return <Target className="h-4 w-4" />
      case 'professional': return <TrendingUp className="h-4 w-4" />
      case 'lifelong': return <Activity className="h-4 w-4" />
      case 'specialized': return <Zap className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'text-blue-400'
      case 'vocational': return 'text-green-400'
      case 'professional': return 'text-blue-300'
      case 'lifelong': return 'text-gray-300'
      case 'specialized': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-gray-300'
      case 'advanced': return 'text-blue-400'
      case 'intermediate': return 'text-blue-300'
      case 'beginner': return 'text-green-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'pilot': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'suspended': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'pilot': return <Target className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'suspended': return <Activity className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Population-Scale Education</h2>
            <p className="text-muted-foreground">AI-powered education programs for global populations</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {overallEngagement.toFixed(1)}% Engagement
            </span>
          </div>
        </div>

        {/* Education Metrics */}
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
                  {metric.value}{metric.name.includes('Engagement') || metric.name.includes('Rate') || metric.name.includes('Reach') ? '%' : metric.name.includes('Velocity') ? 'x' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Engagement') || metric.name.includes('Rate') || metric.name.includes('Reach') ? '%' : metric.name.includes('Velocity') ? 'x' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Programs</h3>
        <div className="space-y-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getProgramTypeIcon(program.type)}
                  <div>
                    <div className="font-medium text-sm">{program.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {program.region} • {program.instructor} • {program.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(program.status)}
                  <div className={`text-sm font-bold ${getLevelColor(program.level)}`}>
                    {program.level}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Completion Rate</span>
                  <span className="text-xs text-muted-foreground">{program.completion.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      program.completion > 90 ? 'bg-green-400' :
                      program.completion > 75 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${program.completion}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{program.enrollment.toLocaleString('en-US')}</div>
                    <div className="text-xs text-muted-foreground">Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{program.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(program.status)}`}>
                      {program.status}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
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
