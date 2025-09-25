'use client'

import React from 'react'
import { Brain, Activity, Globe, Shield } from 'lucide-react'

export function IntelligenceHeader() {
  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="tesla-heading text-3xl font-bold mb-2">Strategic Intelligence</h1>
          <p className="text-muted-foreground">
            Real-time intelligence gathering and analysis across global markets
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live Intelligence</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-neon-blue" />
            <span className="text-sm font-mono">AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}
