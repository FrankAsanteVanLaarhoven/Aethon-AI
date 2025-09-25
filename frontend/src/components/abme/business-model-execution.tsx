'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Settings, BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export function BusinessModelExecution() {
  const [isExecuting, setIsExecuting] = useState(true)
  const [executionPhase, setExecutionPhase] = useState('Optimization')
  const [executionProgress, setExecutionProgress] = useState(78)

  const executionPhases = [
    { name: 'Analysis', status: 'completed', progress: 100 },
    { name: 'Planning', status: 'completed', progress: 100 },
    { name: 'Optimization', status: 'active', progress: 78 },
    { name: 'Execution', status: 'pending', progress: 0 },
    { name: 'Monitoring', status: 'pending', progress: 0 }
  ]

  const businessMetrics = [
    { name: 'Revenue Optimization', value: 94.2, trend: 'up', change: 12.5 },
    { name: 'Cost Reduction', value: 87.8, trend: 'up', change: 8.3 },
    { name: 'Market Penetration', value: 76.4, trend: 'up', change: 15.2 },
    { name: 'Customer Acquisition', value: 91.6, trend: 'up', change: 22.1 },
    { name: 'Operational Efficiency', value: 88.9, trend: 'up', change: 18.7 }
  ]

  const activeStrategies = [
    { name: 'Dynamic Pricing Optimization', status: 'active', impact: 'high', progress: 85 },
    { name: 'Supply Chain Automation', status: 'active', impact: 'medium', progress: 72 },
    { name: 'Customer Experience Enhancement', status: 'active', impact: 'high', progress: 91 },
    { name: 'Market Expansion Strategy', status: 'pending', impact: 'high', progress: 0 },
    { name: 'Risk Mitigation Protocol', status: 'active', impact: 'medium', progress: 68 }
  ]

  useEffect(() => {
    if (isExecuting) {
      const interval = setInterval(() => {
        setExecutionProgress(prev => {
          if (prev >= 100) return 0
          return prev + Math.random() * 2
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isExecuting])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-neon-green'
      case 'active': return 'text-neon-blue'
      case 'pending': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'active': return Play
      case 'pending': return Pause
      default: return Pause
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
            <h2 className="text-2xl font-bold mb-2">Business Model Execution</h2>
            <p className="text-muted-foreground">Autonomous strategy execution and optimization</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsExecuting(!isExecuting)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isExecuting 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                  : 'bg-neon-green/20 text-neon-green hover:bg-neon-green/30'
              }`}
            >
              {isExecuting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isExecuting ? 'Pause' : 'Resume'}
            </button>
            <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Execution Phases</h3>
            <div className="space-y-3">
              {executionPhases.map((phase, index) => (
                <motion.div
                  key={phase.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
                    {React.createElement(getStatusIcon(phase.status), {
                      className: `w-5 h-5 ${getStatusColor(phase.status)}`
                    })}
                    <span className="font-medium">{phase.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{phase.progress}%</div>
                    <div className="w-16 bg-muted rounded-full h-1">
                      <motion.div
                        className="bg-neon-blue h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${phase.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Business Metrics</h3>
            <div className="space-y-3">
              {businessMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div>
                    <div className="font-medium text-sm">{metric.name}</div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-3 h-3 text-neon-green" />
                      <span className="text-xs text-neon-green">+{metric.change}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-neon-blue">{metric.value}%</div>
                    <div className="w-16 bg-muted rounded-full h-1">
                      <motion.div
                        className="bg-neon-green h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Active Strategies</h3>
        <div className="space-y-3">
          {activeStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  strategy.status === 'active' ? 'bg-neon-green' : 'bg-muted'
                }`} />
                <div>
                  <div className="font-medium">{strategy.name}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      strategy.impact === 'high' 
                        ? 'bg-neon-red/20 text-neon-red' 
                        : 'bg-neon-yellow/20 text-neon-yellow'
                    }`}>
                      {strategy.impact} impact
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {strategy.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{strategy.progress}%</div>
                <div className="w-20 bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-neon-blue h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${strategy.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
