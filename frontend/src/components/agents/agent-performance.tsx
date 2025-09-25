'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Activity, Zap, Brain } from 'lucide-react'

export function AgentPerformance() {
  const performanceData = [
    { agent: 'ARPE', efficiency: 95, tasks: 1247, uptime: 99.8 },
    { agent: 'QESO', efficiency: 92, tasks: 892, uptime: 98.5 },
    { agent: 'ABME', efficiency: 88, tasks: 2156, uptime: 99.2 },
    { agent: 'SNSE', efficiency: 85, tasks: 445, uptime: 97.8 }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Agent Performance</h3>
      <div className="space-y-4">
        {performanceData.map((agent, index) => (
          <motion.div
            key={agent.agent}
            className="border border-border rounded-lg p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">{agent.agent}</span>
              <span className="text-sm text-muted-foreground">{agent.efficiency}% efficiency</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Efficiency</span>
                <span>{agent.efficiency}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className="bg-neon-blue h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.efficiency}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Tasks: {agent.tasks}</span>
                <span>Uptime: {agent.uptime}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
