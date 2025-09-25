'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Clock, AlertTriangle, Zap, Brain, Target, Activity, TrendingUp } from 'lucide-react'

export function ExecutionPipeline() {
  const [activeStep, setActiveStep] = useState(2)
  const [pipelineStatus, setPipelineStatus] = useState('running')

  const pipelineSteps = [
    {
      id: 1,
      name: 'Data Ingestion',
      description: 'Collecting real-time market data',
      status: 'completed',
      icon: Activity,
      color: 'text-neon-green',
      bgColor: 'bg-neon-green/10',
      borderColor: 'border-neon-green/20'
    },
    {
      id: 2,
      name: 'Analysis & Processing',
      description: 'AI-powered market analysis',
      status: 'active',
      icon: Brain,
      color: 'text-neon-blue',
      bgColor: 'bg-neon-blue/10',
      borderColor: 'border-neon-blue/20'
    },
    {
      id: 3,
      name: 'Strategy Generation',
      description: 'Creating optimized strategies',
      status: 'pending',
      icon: Target,
      color: 'text-neon-purple',
      bgColor: 'bg-neon-purple/10',
      borderColor: 'border-neon-purple/20'
    },
    {
      id: 4,
      name: 'Execution',
      description: 'Implementing strategies',
      status: 'pending',
      icon: Zap,
      color: 'text-neon-pink',
      bgColor: 'bg-neon-pink/10',
      borderColor: 'border-neon-pink/20'
    },
    {
      id: 5,
      name: 'Monitoring',
      description: 'Real-time performance tracking',
      status: 'pending',
      icon: Activity,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan/10',
      borderColor: 'border-neon-cyan/20'
    }
  ]

  const pipelineMetrics = [
    { name: 'Throughput', value: '2.4M', unit: 'ops/sec', trend: 'up' },
    { name: 'Latency', value: '0.8', unit: 'ms', trend: 'down' },
    { name: 'Success Rate', value: '99.7', unit: '%', trend: 'up' },
    { name: 'Active Tasks', value: '1,247', unit: '', trend: 'stable' }
  ]

  const recentActivities = [
    { time: '14:32:15', action: 'Strategy optimization completed', type: 'success' },
    { time: '14:31:42', action: 'Market data updated', type: 'info' },
    { time: '14:30:18', action: 'Risk assessment passed', type: 'success' },
    { time: '14:29:55', action: 'New opportunity detected', type: 'warning' },
    { time: '14:28:33', action: 'Execution pipeline started', type: 'info' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev >= pipelineSteps.length ? 1 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'active': return Clock
      case 'pending': return AlertTriangle
      default: return Clock
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertTriangle
      case 'info': return Activity
      default: return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'info': return 'text-neon-blue'
      default: return 'text-muted-foreground'
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
            <h2 className="text-2xl font-bold mb-2">Execution Pipeline</h2>
            <p className="text-muted-foreground">Real-time strategy execution workflow</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              pipelineStatus === 'running' ? 'bg-neon-green' : 'bg-muted'
            }`} />
            <span className="text-sm font-medium capitalize">{pipelineStatus}</span>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            {pipelineSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    step.status === 'active' 
                      ? `${step.bgColor} ${step.borderColor} border-2` 
                      : step.status === 'completed'
                      ? 'bg-neon-green/10 border-neon-green/20'
                      : 'bg-muted/10 border-muted/20'
                  }`}
                >
                  <div className={`p-3 rounded-full mb-3 ${
                    step.status === 'active' 
                      ? step.bgColor 
                      : step.status === 'completed'
                      ? 'bg-neon-green/20'
                      : 'bg-muted/20'
                  }`}>
                    {React.createElement(step.icon, {
                      className: `w-6 h-6 ${
                        step.status === 'active' 
                          ? step.color 
                          : step.status === 'completed'
                          ? 'text-neon-green'
                          : 'text-muted-foreground'
                      }`
                    })}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{step.name}</h3>
                  <p className="text-xs text-muted-foreground text-center">{step.description}</p>
                  <div className="mt-2">
                    {React.createElement(getStatusIcon(step.status), {
                      className: `w-4 h-4 ${
                        step.status === 'completed' 
                          ? 'text-neon-green' 
                          : step.status === 'active'
                          ? step.color
                          : 'text-muted-foreground'
                      }`
                    })}
                  </div>
                </motion.div>
                {index < pipelineSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    className="flex-1 mx-4"
                  >
                    <div className="h-0.5 bg-muted relative">
                      <motion.div
                        className="h-0.5 bg-neon-blue"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: step.status === 'completed' ? '100%' : 
                                 step.status === 'active' ? '50%' : '0%'
                        }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Pipeline Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {pipelineMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 bg-background/50 rounded-lg border border-border"
              >
                <div className="text-2xl font-bold text-neon-blue mb-1">
                  {metric.value}{metric.unit}
                </div>
                <div className="text-sm text-muted-foreground mb-2">{metric.name}</div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className={`w-3 h-3 ${
                    metric.trend === 'up' ? 'text-neon-green' : 
                    metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                  }`} />
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-neon-green' : 
                    metric.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border"
              >
                {React.createElement(getActivityIcon(activity.type), {
                  className: `w-4 h-4 ${getActivityColor(activity.type)}`
                })}
                <div className="flex-1">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
