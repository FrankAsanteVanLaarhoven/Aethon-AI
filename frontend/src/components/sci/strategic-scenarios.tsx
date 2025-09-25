'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Target, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface Scenario {
  id: string
  name: string
  description: string
  status: 'draft' | 'running' | 'completed' | 'paused'
  probability: number
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  duration: string
  participants: number
  lastRun: string
}

interface ScenarioResult {
  id: string
  scenarioId: string
  outcome: string
  confidence: number
  recommendations: string[]
  timestamp: string
}

export function StrategicScenarios() {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [results, setResults] = useState<ScenarioResult[]>([])
  const [activeScenario, setActiveScenario] = useState<string | null>(null)

  useEffect(() => {
    const initialScenarios: Scenario[] = [
      {
        id: 'scenario-001',
        name: 'Market Disruption',
        description: 'Simulate impact of new technology breakthrough',
        status: 'running',
        probability: 78,
        impact: 'High',
        duration: '2h 15m',
        participants: 8,
        lastRun: '1 hour ago'
      },
      {
        id: 'scenario-002',
        name: 'Competitor Merger',
        description: 'Analyze effects of major competitor consolidation',
        status: 'completed',
        probability: 45,
        impact: 'Critical',
        duration: '3h 42m',
        participants: 12,
        lastRun: '2 hours ago'
      },
      {
        id: 'scenario-003',
        name: 'Economic Downturn',
        description: 'Model market behavior during recession',
        status: 'draft',
        probability: 23,
        impact: 'Medium',
        duration: '1h 30m',
        participants: 6,
        lastRun: 'Never'
      },
      {
        id: 'scenario-004',
        name: 'Regulatory Changes',
        description: 'Assess impact of new industry regulations',
        status: 'paused',
        probability: 67,
        impact: 'High',
        duration: '2h 00m',
        participants: 10,
        lastRun: '30 min ago'
      }
    ]

    const initialResults: ScenarioResult[] = [
      {
        id: 'result-001',
        scenarioId: 'scenario-002',
        outcome: 'Market share reduction of 15-20%',
        confidence: 89.3,
        recommendations: ['Diversify product portfolio', 'Strengthen partnerships', 'Accelerate innovation'],
        timestamp: '2 hours ago'
      },
      {
        id: 'result-002',
        scenarioId: 'scenario-001',
        outcome: 'Opportunity for 25% market expansion',
        confidence: 76.8,
        recommendations: ['Increase R&D investment', 'Expand team capacity', 'Fast-track product development'],
        timestamp: '1 hour ago'
      }
    ]

    setScenarios(initialScenarios)
    setResults(initialResults)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setScenarios(prev => prev.map(scenario => {
        if (scenario.status === 'running') {
          return {
            ...scenario,
            lastRun: 'Just now'
          }
        }
        return scenario
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleScenarioControl = (scenarioId: string, action: 'start' | 'pause' | 'reset') => {
    setActiveScenario(scenarioId)
    setScenarios(prev => prev.map(scenario => {
      if (scenario.id === scenarioId) {
        return {
          ...scenario,
          status: action === 'start' ? 'running' : action === 'pause' ? 'paused' : 'draft'
        }
      }
      return scenario
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4 animate-pulse" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'paused': return <Pause className="h-4 w-4" />
      case 'draft': return <Clock className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-neon-green'
      case 'completed': return 'text-neon-blue'
      case 'paused': return 'text-neon-yellow'
      case 'draft': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-neon-red/10'
      case 'High': return 'bg-neon-yellow/10'
      case 'Medium': return 'bg-neon-blue/10'
      case 'Low': return 'bg-neon-green/10'
      default: return 'bg-muted/10'
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
            <h2 className="text-2xl font-bold mb-2">Strategic Scenarios</h2>
            <p className="text-muted-foreground">AI-powered scenario planning and analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-sm font-medium text-neon-blue">Scenario Engine Active</span>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getImpactBg(scenario.impact)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(scenario.status)}
                  <h3 className="font-semibold text-sm">{scenario.name}</h3>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full border ${
                  scenario.impact === 'Critical' ? 'bg-neon-red/10 text-neon-red border-neon-red/20' :
                  scenario.impact === 'High' ? 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20' :
                  scenario.impact === 'Medium' ? 'bg-neon-blue/10 text-neon-blue border-neon-blue/20' :
                  'bg-neon-green/10 text-neon-green border-neon-green/20'
                }`}>
                  {scenario.impact}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-blue">{scenario.probability}%</div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-green">{scenario.participants}</div>
                  <div className="text-xs text-muted-foreground">Participants</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Last run: {scenario.lastRun}
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleScenarioControl(scenario.id, 'start')}
                    className="p-1 hover:bg-neon-green/10 rounded transition-colors"
                    title="Start"
                  >
                    <Play className="h-3 w-3 text-neon-green" />
                  </button>
                  <button
                    onClick={() => handleScenarioControl(scenario.id, 'pause')}
                    className="p-1 hover:bg-neon-yellow/10 rounded transition-colors"
                    title="Pause"
                  >
                    <Pause className="h-3 w-3 text-neon-yellow" />
                  </button>
                  <button
                    onClick={() => handleScenarioControl(scenario.id, 'reset')}
                    className="p-1 hover:bg-neon-red/10 rounded transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="h-3 w-3 text-neon-red" />
                  </button>
                </div>
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
        <h3 className="text-lg font-semibold mb-4">Recent Results</h3>
        <div className="space-y-3">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-neon-blue" />
                  <span className="font-medium text-sm">{result.outcome}</span>
                </div>
                <div className="text-sm font-bold text-neon-green">
                  {result.confidence.toFixed(1)}%
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                {result.timestamp}
              </div>
              <div className="space-y-1">
                {result.recommendations.map((rec, recIndex) => (
                  <div key={recIndex} className="flex items-center space-x-2 text-xs">
                    <div className="w-1 h-1 rounded-full bg-neon-blue" />
                    <span className="text-muted-foreground">{rec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
