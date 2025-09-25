'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Brain, Activity, TrendingUp, Users, CheckCircle, Zap, Globe } from 'lucide-react'

interface StrategicPlan {
  id: string
  name: string
  company: string
  horizon: 'short' | 'medium' | 'long' | 'vision'
  priority: 'critical' | 'high' | 'medium' | 'low'
  progress: number
  impact: number
  status: 'active' | 'planning' | 'completed' | 'paused'
  lastUpdate: string
  strategist: string
  stakeholders: number
}

interface PlanningMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function StrategicPlanning() {
  const [plans, setPlans] = useState<StrategicPlan[]>([])
  const [metrics, setMetrics] = useState<PlanningMetric[]>([])
  const [planningAccuracy, setPlanningAccuracy] = useState(0)

  useEffect(() => {
    const initialPlans: StrategicPlan[] = [
      {
        id: 'plan-001',
        name: 'Digital Transformation Strategy',
        company: 'TechCorp Global',
        horizon: 'long',
        priority: 'critical',
        progress: 78.5,
        impact: 94.7,
        status: 'active',
        lastUpdate: '2 hours ago',
        strategist: 'Dr. Sarah Chen',
        stakeholders: 1247
      },
      {
        id: 'plan-002',
        name: 'Market Expansion Initiative',
        company: 'Manufacturing Plus',
        horizon: 'medium',
        priority: 'high',
        progress: 65.3,
        impact: 87.2,
        status: 'active',
        lastUpdate: '4 hours ago',
        strategist: 'Prof. Michael Rodriguez',
        stakeholders: 892
      },
      {
        id: 'plan-003',
        name: 'Sustainability Roadmap',
        company: 'Finance Dynamics',
        horizon: 'long',
        priority: 'high',
        progress: 45.7,
        impact: 76.8,
        status: 'planning',
        lastUpdate: '1 day ago',
        strategist: 'Dr. James Wilson',
        stakeholders: 567
      },
      {
        id: 'plan-004',
        name: 'Innovation Acceleration',
        company: 'Healthcare United',
        horizon: 'short',
        priority: 'medium',
        progress: 89.2,
        impact: 82.1,
        status: 'completed',
        lastUpdate: '3 days ago',
        strategist: 'Dr. Emma Thompson',
        stakeholders: 345
      }
    ]

    const initialMetrics: PlanningMetric[] = [
      {
        name: 'Planning Accuracy',
        value: 94.7,
        target: 85,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Strategy Success Rate',
        value: 89.2,
        target: 80,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Execution Efficiency',
        value: 87.3,
        target: 75,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Stakeholder Alignment',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setPlans(initialPlans)
    setMetrics(initialMetrics)
    setPlanningAccuracy(94.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPlanningAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setPlans(prev => prev.map(plan => ({
        ...plan,
        lastUpdate: 'Just now'
      })))
    }, 35000)

    return () => clearInterval(interval)
  }, [])

  const getHorizonIcon = (horizon: string) => {
    switch (horizon) {
      case 'short': return <Target className="h-4 w-4" />
      case 'medium': return <Activity className="h-4 w-4" />
      case 'long': return <TrendingUp className="h-4 w-4" />
      case 'vision': return <Brain className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  const getHorizonColor = (horizon: string) => {
    switch (horizon) {
      case 'short': return 'text-green-400'
      case 'medium': return 'text-blue-400'
      case 'long': return 'text-blue-300'
      case 'vision': return 'text-gray-300'
      default: return 'text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-gray-300'
      case 'high': return 'text-blue-400'
      case 'medium': return 'text-blue-300'
      case 'low': return 'text-gray-400'
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
            <h2 className="text-xl font-bold mb-2">Strategic Planning</h2>
            <p className="text-muted-foreground">AI-powered strategic planning and execution management</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {planningAccuracy.toFixed(1)}% Planning Accuracy
            </span>
          </div>
        </div>

        {/* Planning Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Strategic Plans</h3>
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getHorizonIcon(plan.horizon)}
                  <div>
                    <div className="font-medium text-sm">{plan.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {plan.company} • {plan.strategist} • {plan.stakeholders} stakeholders • {plan.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(plan.status)}
                  <div className={`text-sm font-bold ${getPriorityColor(plan.priority)}`}>
                    {plan.priority}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs text-muted-foreground">{plan.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      plan.progress > 80 ? 'bg-green-400' :
                      plan.progress > 60 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${plan.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{plan.progress.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{plan.impact.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getHorizonColor(plan.horizon)}`}>
                      {plan.horizon}
                    </div>
                    <div className="text-xs text-muted-foreground">Horizon</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(plan.status)}`}>
                  Status: {plan.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {plan.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
