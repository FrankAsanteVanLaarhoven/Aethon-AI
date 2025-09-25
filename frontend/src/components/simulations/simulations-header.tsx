'use client'

import React from 'react'
import { Brain, Zap, Target, Activity } from 'lucide-react'

export function SimulationsHeader() {
  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="tesla-heading text-3xl font-bold mb-2">Strategic Simulations</h1>
          <p className="text-muted-foreground">
            Advanced scenario modeling and Monte Carlo simulations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">AI-Powered</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-neon-blue" />
            <span className="text-sm font-mono">Monte Carlo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
