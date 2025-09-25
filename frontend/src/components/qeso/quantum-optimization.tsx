'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Cpu, Target, Brain, Sparkles } from 'lucide-react'

export function QuantumOptimization() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [quantumState, setQuantumState] = useState('idle')

  const optimizationTasks = [
    {
      id: 1,
      name: 'Portfolio Optimization',
      complexity: 95,
      quantumSpeedup: 1000,
      status: 'completed',
      icon: TrendingUp,
      color: 'text-neon-green'
    },
    {
      id: 2,
      name: 'Risk Assessment',
      complexity: 87,
      quantumSpeedup: 500,
      status: 'running',
      icon: Target,
      color: 'text-neon-blue'
    },
    {
      id: 3,
      name: 'Market Analysis',
      complexity: 92,
      quantumSpeedup: 750,
      status: 'pending',
      icon: Brain,
      color: 'text-neon-purple'
    },
    {
      id: 4,
      name: 'Strategic Planning',
      complexity: 98,
      quantumSpeedup: 2000,
      status: 'pending',
      icon: Sparkles,
      color: 'text-neon-cyan'
    }
  ]

  const quantumMetrics = [
    {
      name: 'Qubit Count',
      value: 1024,
      unit: 'qubits',
      icon: Cpu,
      color: 'text-neon-blue'
    },
    {
      name: 'Coherence Time',
      value: 150,
      unit: 'μs',
      icon: Zap,
      color: 'text-neon-green'
    },
    {
      name: 'Gate Fidelity',
      value: 99.9,
      unit: '%',
      icon: Target,
      color: 'text-neon-purple'
    },
    {
      name: 'Processing Speed',
      value: 1000,
      unit: 'x faster',
      icon: TrendingUp,
      color: 'text-neon-cyan'
    }
  ]

  const startOptimization = () => {
    setIsOptimizing(true)
    setQuantumState('initializing')
    setOptimizationProgress(0)

    // Simulate quantum optimization process
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsOptimizing(false)
          setQuantumState('completed')
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)

    // Simulate quantum state changes
    setTimeout(() => setQuantumState('entangled'), 1000)
    setTimeout(() => setQuantumState('superposition'), 2000)
    setTimeout(() => setQuantumState('measurement'), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-neon-green bg-neon-green/10'
      case 'running':
        return 'text-neon-blue bg-neon-blue/10'
      case 'pending':
        return 'text-muted-foreground bg-muted/10'
      default:
        return 'text-muted-foreground bg-muted/10'
    }
  }

  const getQuantumStateColor = (state: string) => {
    switch (state) {
      case 'idle':
        return 'text-muted-foreground'
      case 'initializing':
        return 'text-neon-blue'
      case 'entangled':
        return 'text-neon-purple'
      case 'superposition':
        return 'text-neon-cyan'
      case 'measurement':
        return 'text-neon-yellow'
      case 'completed':
        return 'text-neon-green'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Quantum Optimization Engine
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revolutionary quantum computing algorithms for exponential strategic optimization
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quantum Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Quantum System Status</h3>
          <div className="space-y-4">
            {quantumMetrics.map((metric, index) => (
              <div key={metric.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <span className="font-medium">{metric.name}</span>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}{metric.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Optimization Control */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Optimization Control</h3>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Quantum State</span>
              <span className={`text-sm font-medium ${getQuantumStateColor(quantumState)}`}>
                {quantumState.toUpperCase()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${
                  quantumState === 'completed' ? 'bg-neon-green' :
                  quantumState === 'measurement' ? 'bg-neon-yellow' :
                  quantumState === 'superposition' ? 'bg-neon-cyan' :
                  quantumState === 'entangled' ? 'bg-neon-purple' :
                  'bg-neon-blue'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${optimizationProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <button
            onClick={startOptimization}
            disabled={isOptimizing}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Zap className="w-5 h-5" />
            <span>{isOptimizing ? 'Optimizing...' : 'Start Quantum Optimization'}</span>
          </button>

          {isOptimizing && (
            <div className="mt-4 text-center">
              <div className="text-sm text-muted-foreground">
                Progress: {Math.round(optimizationProgress)}%
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Optimization Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Optimization Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {optimizationTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <task.icon className={`w-6 h-6 ${task.color}`} />
                <div>
                  <h4 className="font-medium">{task.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Complexity: {task.complexity}% | Speedup: {task.quantumSpeedup}x
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
