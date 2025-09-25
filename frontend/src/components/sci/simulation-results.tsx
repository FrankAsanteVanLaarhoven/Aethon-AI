'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, CheckCircle, AlertTriangle, Clock, Zap } from 'lucide-react'

interface SimulationResult {
  id: string
  name: string
  status: 'completed' | 'running' | 'failed'
  accuracy: number
  confidence: number
  duration: string
  participants: number
  keyFindings: string[]
  recommendations: string[]
  timestamp: string
}

interface PerformanceMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function SimulationResults() {
  const [results, setResults] = useState<SimulationResult[]>([])
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [overallAccuracy, setOverallAccuracy] = useState(0)

  useEffect(() => {
    const initialResults: SimulationResult[] = [
      {
        id: 'result-001',
        name: 'Market Entry Strategy',
        status: 'completed',
        accuracy: 94.2,
        confidence: 89.7,
        duration: '2h 34m',
        participants: 12,
        keyFindings: [
          'Market penetration achievable within 6 months',
          'Competitive advantage in pricing identified',
          'Customer acquisition cost 23% below industry average'
        ],
        recommendations: [
          'Proceed with aggressive market entry',
          'Focus on price-sensitive segments',
          'Establish partnerships with key distributors'
        ],
        timestamp: '1 hour ago'
      },
      {
        id: 'result-002',
        name: 'Pricing Competition',
        status: 'completed',
        accuracy: 89.7,
        confidence: 85.3,
        duration: '1h 12m',
        participants: 8,
        keyFindings: [
          'Price war scenario likely to reduce margins by 15%',
          'Customer loyalty programs show 40% retention rate',
          'Premium positioning maintains 8% market share'
        ],
        recommendations: [
          'Implement dynamic pricing strategy',
          'Launch customer loyalty program',
          'Consider premium product line expansion'
        ],
        timestamp: '3 hours ago'
      },
      {
        id: 'result-003',
        name: 'Product Launch',
        status: 'running',
        accuracy: 0,
        confidence: 0,
        duration: '45m',
        participants: 15,
        keyFindings: [],
        recommendations: [],
        timestamp: 'Just now'
      }
    ]

    const initialMetrics: PerformanceMetric[] = [
      {
        name: 'Prediction Accuracy',
        value: 91.8,
        target: 90,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Response Time',
        value: 2.3,
        target: 3.0,
        trend: 'down',
        color: 'text-neon-blue'
      },
      {
        name: 'Success Rate',
        value: 87.5,
        target: 85,
        trend: 'up',
        color: 'text-neon-yellow'
      },
      {
        name: 'User Satisfaction',
        value: 94.2,
        target: 90,
        trend: 'stable',
        color: 'text-neon-purple'
      }
    ]

    setResults(initialResults)
    setMetrics(initialMetrics)
    setOverallAccuracy(91.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.1
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'running': return <Clock className="h-4 w-4 animate-pulse" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-neon-green'
      case 'running': return 'text-neon-blue'
      case 'failed': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-green" />
      case 'down': return <TrendingUp className="h-3 w-3 text-neon-red rotate-180" />
      case 'stable': return <div className="w-3 h-0.5 bg-neon-blue" />
      default: return <Target className="h-3 w-3 text-muted-foreground" />
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
            <h2 className="text-xl font-bold mb-2">Simulation Results</h2>
            <p className="text-muted-foreground">AI simulation outcomes and analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">
              {overallAccuracy.toFixed(1)}% Accuracy
            </span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{metric.name}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value.toFixed(1)}{metric.name.includes('Time') ? 's' : '%'}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Time') ? 's' : '%'}
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
        <div className="space-y-4">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.status)}
                  <h4 className="font-medium text-sm">{result.name}</h4>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getStatusColor(result.status)}`}>
                    {result.accuracy > 0 ? `${result.accuracy.toFixed(1)}%` : 'Running...'}
                  </div>
                  <div className="text-xs text-muted-foreground">{result.timestamp}</div>
                </div>
              </div>

              {result.status === 'completed' && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-3 w-3 text-neon-blue" />
                      <span className="text-xs font-medium">Key Findings</span>
                    </div>
                    <div className="space-y-1">
                      {result.keyFindings.map((finding, findIndex) => (
                        <div key={findIndex} className="flex items-start space-x-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-neon-blue mt-1.5" />
                          <span className="text-muted-foreground">{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-3 w-3 text-neon-yellow" />
                      <span className="text-xs font-medium">Recommendations</span>
                    </div>
                    <div className="space-y-1">
                      {result.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-start space-x-2 text-xs">
                          <div className="w-1 h-1 rounded-full bg-neon-yellow mt-1.5" />
                          <span className="text-muted-foreground">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {result.status === 'running' && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 animate-pulse" />
                  <span>Simulation in progress... {result.duration} elapsed</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
