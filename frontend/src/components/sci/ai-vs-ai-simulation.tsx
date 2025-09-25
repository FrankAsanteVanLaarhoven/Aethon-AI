'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Play, Pause, RotateCcw, Target, Zap, Activity, CheckCircle, AlertTriangle } from 'lucide-react'

interface Simulation {
  id: string
  name: string
  status: 'running' | 'paused' | 'completed' | 'error'
  progress: number
  participants: number
  duration: string
  accuracy: number
}

interface AIAgent {
  id: string
  name: string
  type: string
  performance: number
  strategy: string
  status: 'active' | 'analyzing' | 'responding'
}

export function AIvsAISimulation() {
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [agents, setAgents] = useState<AIAgent[]>([])
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    // Initialize with sample data
    const initialSimulations: Simulation[] = [
      {
        id: 'sim-001',
        name: 'Market Entry Strategy',
        status: 'running',
        progress: 67,
        participants: 12,
        duration: '2h 34m',
        accuracy: 94.2
      },
      {
        id: 'sim-002',
        name: 'Pricing Competition',
        status: 'completed',
        progress: 100,
        participants: 8,
        duration: '1h 12m',
        accuracy: 89.7
      },
      {
        id: 'sim-003',
        name: 'Product Launch',
        status: 'paused',
        progress: 23,
        participants: 15,
        duration: '45m',
        accuracy: 91.3
      }
    ]

    const initialAgents: AIAgent[] = [
      {
        id: 'agent-001',
        name: 'Strategic Alpha',
        type: 'Market Leader',
        performance: 96.8,
        strategy: 'Aggressive Expansion',
        status: 'active'
      },
      {
        id: 'agent-002',
        name: 'Competitive Beta',
        type: 'Challenger',
        performance: 89.2,
        strategy: 'Cost Leadership',
        status: 'analyzing'
      },
      {
        id: 'agent-003',
        name: 'Innovation Gamma',
        type: 'Innovator',
        performance: 92.5,
        strategy: 'Differentiation',
        status: 'responding'
      }
    ]

    setSimulations(initialSimulations)
    setAgents(initialAgents)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSimulations(prev => prev.map(sim => {
        if (sim.status === 'running') {
          const newProgress = Math.min(100, sim.progress + Math.random() * 2)
          return {
            ...sim,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : sim.status
          }
        }
        return sim
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSimulationControl = (action: 'start' | 'pause' | 'reset') => {
    setIsRunning(action === 'start')
    // Add simulation control logic here
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-4 w-4 animate-pulse" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'paused': return <Pause className="h-4 w-4" />
      case 'error': return <AlertTriangle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-neon-green'
      case 'completed': return 'text-neon-blue'
      case 'paused': return 'text-neon-yellow'
      case 'error': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-neon-green'
      case 'analyzing': return 'bg-neon-yellow'
      case 'responding': return 'bg-neon-blue'
      default: return 'bg-muted'
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
            <h2 className="text-2xl font-bold mb-2">AI vs AI Simulation</h2>
            <p className="text-muted-foreground">Real-time competitive intelligence through artificial intelligence</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleSimulationControl('start')}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-green/10 text-neon-green rounded-lg border border-neon-green/20 hover:bg-neon-green/20 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span className="text-sm">Start</span>
            </button>
            <button
              onClick={() => handleSimulationControl('pause')}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-yellow/10 text-neon-yellow rounded-lg border border-neon-yellow/20 hover:bg-neon-yellow/20 transition-colors"
            >
              <Pause className="h-4 w-4" />
              <span className="text-sm">Pause</span>
            </button>
            <button
              onClick={() => handleSimulationControl('reset')}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-red/10 text-neon-red rounded-lg border border-neon-red/20 hover:bg-neon-red/20 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm">Reset</span>
            </button>
          </div>
        </div>

        {/* Active Simulations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Simulations</h3>
          {simulations.map((sim, index) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(sim.status)}
                  <div>
                    <div className="font-medium text-sm">{sim.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {sim.participants} participants • {sim.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getStatusColor(sim.status)}`}>
                    {sim.accuracy.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">accuracy</div>
                </div>
              </div>
              <div className="w-full bg-background/50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    sim.status === 'running' ? 'bg-neon-green' :
                    sim.status === 'completed' ? 'bg-neon-blue' :
                    sim.status === 'paused' ? 'bg-neon-yellow' : 'bg-neon-red'
                  }`}
                  style={{ width: `${sim.progress}%` }}
                />
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
        <h3 className="text-lg font-semibold mb-4">AI Agents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.status)}`} />
                  <Brain className="h-4 w-4 text-neon-blue" />
                </div>
                <div className={`text-sm font-bold ${getStatusColor(agent.status)}`}>
                  {agent.performance.toFixed(1)}%
                </div>
              </div>
              <div className="mb-2">
                <div className="font-medium text-sm">{agent.name}</div>
                <div className="text-xs text-muted-foreground">{agent.type}</div>
              </div>
              <div className="text-xs text-muted-foreground">
                Strategy: {agent.strategy}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
