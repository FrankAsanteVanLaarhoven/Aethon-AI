'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Settings, Target } from 'lucide-react'

export function SimulationControls() {
  const [isRunning, setIsRunning] = useState(false)
  const [simulationType, setSimulationType] = useState('monte-carlo')
  const [iterations, setIterations] = useState(10000)

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Simulation Controls</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Simulation Type</label>
          <select
            value={simulationType}
            onChange={(e) => setSimulationType(e.target.value)}
            className="palantir-select"
          >
            <option value="monte-carlo">Monte Carlo</option>
            <option value="scenario">Scenario Analysis</option>
            <option value="stress-test">Stress Testing</option>
            <option value="optimization">Portfolio Optimization</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Iterations: {iterations.toLocaleString('en-US')}</label>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isRunning 
                ? 'bg-neon-red/20 text-neon-red border border-neon-red' 
                : 'bg-neon-green/20 text-neon-green border border-neon-green'
            }`}
            onClick={() => setIsRunning(!isRunning)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Stop' : 'Start'}</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
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
            <span className="text-sm text-muted-foreground">Simulation Status</span>
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
