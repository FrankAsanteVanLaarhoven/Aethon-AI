'use client'

import React from 'react'
import { Brain, Activity, Users, Zap } from 'lucide-react'

export function AgentsHeader() {
  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="tesla-heading text-3xl font-bold mb-2">AI Agents</h1>
          <p className="text-muted-foreground">
            Multi-agent orchestration and autonomous AI systems
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">8 Active Agents</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-neon-purple" />
            <span className="text-sm font-mono">AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}
