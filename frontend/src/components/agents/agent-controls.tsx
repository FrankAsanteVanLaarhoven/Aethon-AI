'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Settings, Power } from 'lucide-react'

export function AgentControls() {
  const [selectedAgent, setSelectedAgent] = useState('arpe')
  const [isRunning, setIsRunning] = useState(true)

  const agents = [
    { id: 'arpe', name: 'ARPE' },
    { id: 'qeso', name: 'QESO' },
    { id: 'abme', name: 'ABME' },
    { id: 'snse', name: 'SNSE' }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Agent Controls</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Select Agent</label>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="palantir-select"
          >
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isRunning 
                ? 'bg-neon-green/20 text-neon-green border border-neon-green' 
                : 'bg-muted/20 text-muted-foreground border border-muted'
            }`}
            onClick={() => setIsRunning(!isRunning)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium bg-muted/20 text-muted-foreground border border-muted hover:bg-muted/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4" />
            <span>Configure</span>
          </motion.button>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Agent Status</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-neon-green' : 'bg-muted'}`}></div>
              <span className="text-sm">{isRunning ? 'Running' : 'Stopped'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
