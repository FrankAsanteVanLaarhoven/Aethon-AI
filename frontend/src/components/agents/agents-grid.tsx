'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Shield, Users, Network, Activity, Target, Crown } from 'lucide-react'

export function AgentsGrid() {
  const agents = [
    {
      id: 'arpe',
      name: 'ARPE',
      description: 'Autonomous Regulatory Prophecy Engine',
      status: 'active',
      icon: <Brain className="w-6 h-6" />,
      color: 'text-neon-blue'
    },
    {
      id: 'qeso',
      name: 'QESO',
      description: 'Quantum-Enhanced Strategic Optimization',
      status: 'processing',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-neon-purple'
    },
    {
      id: 'abme',
      name: 'ABME',
      description: 'Autonomous Business Model Execution',
      status: 'active',
      icon: <Users className="w-6 h-6" />,
      color: 'text-neon-green'
    },
    {
      id: 'snse',
      name: 'SNSE',
      description: 'Sovereign National Security Engine',
      status: 'idle',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-neon-red'
    },
    {
      id: 'sci',
      name: 'SCI',
      description: 'Synthetic Competition Intelligence',
      status: 'active',
      icon: <Network className="w-6 h-6" />,
      color: 'text-neon-yellow'
    },
    {
      id: 'ceis',
      name: 'CEIS',
      description: 'Cross-Enterprise Intelligence Synthesis',
      status: 'processing',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-neon-pink'
    },
    {
      id: 'pscdo',
      name: 'PSCDO',
      description: 'Predictive Supply Chain Disruption Oracle',
      status: 'active',
      icon: <Target className="w-6 h-6" />,
      color: 'text-neon-blue'
    },
    {
      id: 'rcre',
      name: 'RCRE',
      description: 'Real-Time Competitive Response Engine',
      status: 'active',
      icon: <Crown className="w-6 h-6" />,
      color: 'text-neon-green'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">AI Agent Grid</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${agent.color}`}>
                {agent.icon}
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                agent.status === 'active' ? 'bg-neon-green/20 text-neon-green' :
                agent.status === 'processing' ? 'bg-neon-blue/20 text-neon-blue' :
                'bg-muted/20 text-muted-foreground'
              }`}>
                {agent.status}
              </span>
            </div>
            <h4 className="font-medium text-sm mb-1">{agent.name}</h4>
            <p className="text-xs text-muted-foreground">{agent.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
