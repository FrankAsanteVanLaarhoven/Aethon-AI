'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, Activity, TrendingUp, Users, CheckCircle, Zap, Globe } from 'lucide-react'

interface LearningPath {
  id: string
  name: string
  subject: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  progress: number
  completion: number
  students: number
  effectiveness: number
  status: 'active' | 'optimizing' | 'completed' | 'paused'
  lastUpdate: string
  instructor: string
  region: string
}

interface LearningMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function AdaptiveLearning() {
  const [paths, setPaths] = useState<LearningPath[]>([])
  const [metrics, setMetrics] = useState<LearningMetric[]>([])
  const [adaptationRate, setAdaptationRate] = useState(0)

  useEffect(() => {
    const initialPaths: LearningPath[] = [
      {
        id: 'path-001',
        name: 'Machine Learning Fundamentals',
        subject: 'Computer Science',
        difficulty: 'intermediate',
        progress: 78.5,
        completion: 89.2,
        students: 12345,
        effectiveness: 94.7,
        status: 'active',
        lastUpdate: '2 hours ago',
        instructor: 'Dr. Alex Chen',
        region: 'Global'
      },
      {
        id: 'path-002',
        name: 'Data Science Bootcamp',
        subject: 'Data Science',
        difficulty: 'beginner',
        progress: 65.3,
        completion: 76.8,
        students: 8765,
        effectiveness: 87.3,
        status: 'optimizing',
        lastUpdate: '4 hours ago',
        instructor: 'Prof. Maria Rodriguez',
        region: 'North America'
      },
      {
        id: 'path-003',
        name: 'Advanced AI Research',
        subject: 'Artificial Intelligence',
        difficulty: 'expert',
        progress: 45.7,
        completion: 67.8,
        students: 2345,
        effectiveness: 92.1,
        status: 'active',
        lastUpdate: '1 day ago',
        instructor: 'Dr. James Wilson',
        region: 'Europe'
      },
      {
        id: 'path-004',
        name: 'Quantum Computing Basics',
        subject: 'Physics',
        difficulty: 'advanced',
        progress: 89.2,
        completion: 82.1,
        students: 4567,
        effectiveness: 88.9,
        status: 'completed',
        lastUpdate: '3 days ago',
        instructor: 'Dr. Sarah Thompson',
        region: 'Asia Pacific'
      }
    ]

    const initialMetrics: LearningMetric[] = [
      {
        name: 'Adaptation Rate',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Learning Effectiveness',
        value: 89.7,
        target: 80,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Personalization Level',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Retention Rate',
        value: 87.5,
        target: 75,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setPaths(initialPaths)
    setMetrics(initialMetrics)
    setAdaptationRate(94.2)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAdaptationRate(prev => Math.min(100, prev + Math.random() * 0.1))
      setPaths(prev => prev.map(path => ({
        ...path,
        lastUpdate: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <Target className="h-4 w-4" />
      case 'intermediate': return <Activity className="h-4 w-4" />
      case 'advanced': return <TrendingUp className="h-4 w-4" />
      case 'expert': return <Brain className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400'
      case 'intermediate': return 'text-blue-400'
      case 'advanced': return 'text-blue-300'
      case 'expert': return 'text-gray-300'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'optimizing': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'paused': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'optimizing': return <Zap className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Adaptive Learning</h2>
            <p className="text-muted-foreground">AI-powered personalized learning paths and optimization</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {adaptationRate.toFixed(1)}% Adaptation Rate
            </span>
          </div>
        </div>

        {/* Learning Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Learning Paths</h3>
        <div className="space-y-4">
          {paths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getDifficultyIcon(path.difficulty)}
                  <div>
                    <div className="font-medium text-sm">{path.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {path.subject} • {path.region} • {path.instructor} • {path.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(path.status)}
                  <div className={`text-sm font-bold ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs text-muted-foreground">{path.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      path.progress > 80 ? 'bg-green-400' :
                      path.progress > 60 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{path.students.toLocaleString('en-US')}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{path.completion.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{path.effectiveness.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Effectiveness</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(path.status)}`}>
                  Status: {path.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {path.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
