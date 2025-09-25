'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Network, 
  Activity, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: 'ARPE' | 'QESO' | 'ABME' | 'SNSE' | 'SCI' | 'CEIS' | 'PSCDO' | 'RCRE'
  status: 'active' | 'idle' | 'processing' | 'error'
  cpuUsage: number
  memoryUsage: number
  tasksCompleted: number
  currentTask?: string
  lastActivity: Date
  icon: React.ReactNode
  color: string
}

interface Task {
  id: string
  agentId: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'running' | 'completed' | 'failed'
  progress: number
  estimatedCompletion: Date
}

export function MultiAgentOrchestration() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isOrchestrating, setIsOrchestrating] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  useEffect(() => {
    // Initialize AI agents
    const initialAgents: Agent[] = [
      {
        id: 'arpe',
        name: 'ARPE',
        type: 'ARPE',
        status: 'active',
        cpuUsage: 85,
        memoryUsage: 72,
        tasksCompleted: 1247,
        currentTask: 'Regulatory compliance analysis for Q4',
        lastActivity: new Date(),
        icon: <Brain className="w-5 h-5" />,
        color: 'text-neon-blue'
      },
      {
        id: 'qeso',
        name: 'QESO',
        type: 'QESO',
        status: 'processing',
        cpuUsage: 92,
        memoryUsage: 88,
        tasksCompleted: 892,
        currentTask: 'Quantum optimization of supply chain',
        lastActivity: new Date(),
        icon: <Zap className="w-5 h-5" />,
        color: 'text-neon-purple'
      },
      {
        id: 'abme',
        name: 'ABME',
        type: 'ABME',
        status: 'active',
        cpuUsage: 67,
        memoryUsage: 54,
        tasksCompleted: 2156,
        currentTask: 'Autonomous business model execution',
        lastActivity: new Date(),
        icon: <Users className="w-5 h-5" />,
        color: 'text-neon-green'
      },
      {
        id: 'snse',
        name: 'SNSE',
        type: 'SNSE',
        status: 'idle',
        cpuUsage: 23,
        memoryUsage: 31,
        tasksCompleted: 445,
        lastActivity: new Date(),
        icon: <Shield className="w-5 h-5" />,
        color: 'text-neon-red'
      },
      {
        id: 'sci',
        name: 'SCI',
        type: 'SCI',
        status: 'active',
        cpuUsage: 78,
        memoryUsage: 65,
        tasksCompleted: 1789,
        currentTask: 'Competitive intelligence gathering',
        lastActivity: new Date(),
        icon: <Network className="w-5 h-5" />,
        color: 'text-neon-yellow'
      },
      {
        id: 'ceis',
        name: 'CEIS',
        type: 'CEIS',
        status: 'processing',
        cpuUsage: 89,
        memoryUsage: 76,
        tasksCompleted: 1123,
        currentTask: 'Cross-enterprise data synthesis',
        lastActivity: new Date(),
        icon: <Activity className="w-5 h-5" />,
        color: 'text-neon-pink'
      }
    ]

    setAgents(initialAgents)

    // Initialize tasks
    const initialTasks: Task[] = [
      {
        id: 'task-1',
        agentId: 'arpe',
        description: 'Analyze new GDPR regulations impact',
        priority: 'high',
        status: 'running',
        progress: 75,
        estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000)
      },
      {
        id: 'task-2',
        agentId: 'qeso',
        description: 'Optimize quantum algorithm for risk assessment',
        priority: 'critical',
        status: 'running',
        progress: 45,
        estimatedCompletion: new Date(Date.now() + 60 * 60 * 1000)
      },
      {
        id: 'task-3',
        agentId: 'abme',
        description: 'Execute autonomous business model adaptation',
        priority: 'medium',
        status: 'completed',
        progress: 100,
        estimatedCompletion: new Date()
      }
    ]

    setTasks(initialTasks)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        cpuUsage: Math.max(10, Math.min(100, agent.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(10, Math.min(100, agent.memoryUsage + (Math.random() - 0.5) * 5)),
        lastActivity: new Date()
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-neon-green" />
      case 'processing': return <Activity className="w-4 h-4 text-neon-blue animate-pulse" />
      case 'idle': return <Clock className="w-4 h-4 text-muted-foreground" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-neon-red" />
      default: return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-neon-red/20 text-neon-red border-neon-red'
      case 'high': return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow'
      case 'medium': return 'bg-neon-blue/20 text-neon-blue border-neon-blue'
      case 'low': return 'bg-muted/20 text-muted-foreground border-muted'
      default: return 'bg-muted/20 text-muted-foreground border-muted'
    }
  }

  const toggleOrchestration = () => {
    setIsOrchestrating(!isOrchestrating)
  }

  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="tesla-heading text-xl font-semibold">Multi-Agent Orchestration</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleOrchestration}
            className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
              isOrchestrating 
                ? 'bg-neon-green/20 text-neon-green border border-neon-green' 
                : 'bg-muted/20 text-muted-foreground border border-muted'
            }`}
          >
            {isOrchestrating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isOrchestrating ? 'Active' : 'Paused'}</span>
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Status Grid */}
        <div className="space-y-4">
          <h4 className="tesla-heading text-lg font-medium">AI Agent Status</h4>
          <div className="grid grid-cols-2 gap-3">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                className={`palantir-card p-4 cursor-pointer transition-all duration-200 ${
                  selectedAgent?.id === agent.id ? 'ring-2 ring-neon-blue' : ''
                }`}
                onClick={() => setSelectedAgent(agent)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={agent.color}>
                      {agent.icon}
                    </div>
                    <span className="font-medium text-sm">{agent.name}</span>
                  </div>
                  {getStatusIcon(agent.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-mono">{Math.round(agent.cpuUsage)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <motion.div
                      className="bg-neon-blue h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.cpuUsage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Memory</span>
                    <span className="font-mono">{Math.round(agent.memoryUsage)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <motion.div
                      className="bg-neon-green h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.memoryUsage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tasks</span>
                    <span className="font-mono">{agent.tasksCompleted}</span>
                  </div>
                </div>

                {agent.currentTask && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground truncate">
                      {agent.currentTask}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Task Queue & Agent Details */}
        <div className="space-y-4">
          {selectedAgent ? (
            <motion.div
              key={selectedAgent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="palantir-card p-4">
                <h4 className="tesla-heading text-lg font-medium mb-3">
                  {selectedAgent.name} Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="capitalize">{selectedAgent.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tasks Completed:</span>
                    <span className="font-mono">{selectedAgent.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="text-sm">{selectedAgent.lastActivity.toLocaleTimeString('en-US')}</span>
                  </div>
                </div>
              </div>

              <div className="palantir-card p-4">
                <h4 className="tesla-heading text-lg font-medium mb-3">Active Tasks</h4>
                <div className="space-y-3">
                  {tasks.filter(task => task.agentId === selectedAgent.id).map((task) => (
                    <motion.div
                      key={task.id}
                      className="border border-border rounded-lg p-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium">{task.description}</span>
                        <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Progress: {task.progress}%</span>
                        <span>ETA: {task.estimatedCompletion.toLocaleTimeString('en-US')}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-neon-blue h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="palantir-card p-8">
              <p className="text-muted-foreground text-center">
                Select an agent to view detailed information
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
