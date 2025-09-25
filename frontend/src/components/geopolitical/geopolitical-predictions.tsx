'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, TrendingUp, Globe, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface GeopoliticalPrediction {
  id: string
  event: string
  region: string
  type: 'conflict' | 'economic' | 'political' | 'social' | 'environmental'
  probability: number
  timeframe: string
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  confidence: number
  status: 'predicted' | 'monitoring' | 'confirmed' | 'resolved'
  lastUpdate: string
  description: string
}

interface PredictionMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function GeopoliticalPredictions() {
  const [predictions, setPredictions] = useState<GeopoliticalPrediction[]>([])
  const [metrics, setMetrics] = useState<PredictionMetric[]>([])
  const [predictionAccuracy, setPredictionAccuracy] = useState(0)

  useEffect(() => {
    const initialPredictions: GeopoliticalPrediction[] = [
      {
        id: 'pred-001',
        event: 'Trade War Escalation',
        region: 'US-China',
        type: 'economic',
        probability: 78.5,
        timeframe: '3-6 months',
        impact: 'High',
        confidence: 89.2,
        status: 'monitoring',
        lastUpdate: '2 hours ago',
        description: 'Escalating trade tensions with potential tariff increases'
      },
      {
        id: 'pred-002',
        event: 'Regional Conflict',
        region: 'Middle East',
        type: 'conflict',
        probability: 45.3,
        timeframe: '6-12 months',
        impact: 'Critical',
        confidence: 76.8,
        status: 'predicted',
        lastUpdate: '4 hours ago',
        description: 'Heightened tensions in regional power dynamics'
      },
      {
        id: 'pred-003',
        event: 'Political Instability',
        region: 'Eastern Europe',
        type: 'political',
        probability: 65.7,
        timeframe: '2-4 months',
        impact: 'Medium',
        confidence: 84.7,
        status: 'confirmed',
        lastUpdate: '1 day ago',
        description: 'Government transition with potential policy shifts'
      },
      {
        id: 'pred-004',
        event: 'Climate Migration Crisis',
        region: 'Global',
        type: 'environmental',
        probability: 89.2,
        timeframe: '12-18 months',
        impact: 'High',
        confidence: 92.1,
        status: 'monitoring',
        lastUpdate: '6 hours ago',
        description: 'Large-scale migration due to climate change impacts'
      }
    ]

    const initialMetrics: PredictionMetric[] = [
      {
        name: 'Prediction Accuracy',
        value: 94.7,
        target: 90,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Early Warning Time',
        value: 8.2,
        target: 6,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'False Positive Rate',
        value: 5.3,
        target: 8,
        trend: 'down',
        color: 'text-neon-yellow'
      },
      {
        name: 'Coverage Rate',
        value: 96.8,
        target: 95,
        trend: 'up',
        color: 'text-neon-purple'
      }
    ]

    setPredictions(initialPredictions)
    setMetrics(initialMetrics)
    setPredictionAccuracy(94.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPredictionAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        lastUpdate: 'Just now'
      })))
    }, 18000)

    return () => clearInterval(interval)
  }, [])

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'conflict': return <AlertTriangle className="h-4 w-4" />
      case 'economic': return <TrendingUp className="h-4 w-4" />
      case 'political': return <Target className="h-4 w-4" />
      case 'social': return <Activity className="h-4 w-4" />
      case 'environmental': return <Globe className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'conflict': return 'text-neon-red'
      case 'economic': return 'text-neon-green'
      case 'political': return 'text-neon-blue'
      case 'social': return 'text-neon-purple'
      case 'environmental': return 'text-neon-yellow'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'predicted': return 'text-neon-yellow'
      case 'monitoring': return 'text-neon-blue'
      case 'confirmed': return 'text-neon-red'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'predicted': return <Brain className="h-4 w-4" />
      case 'monitoring': return <Clock className="h-4 w-4" />
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'resolved': return <Target className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Geopolitical Predictions</h2>
            <p className="text-muted-foreground">AI-powered geopolitical event prediction and analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {predictionAccuracy.toFixed(1)}% Accuracy
            </span>
          </div>
        </div>

        {/* Prediction Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-neon-green' :
                  metric.trend === 'down' ? 'bg-neon-red' : 'bg-neon-blue'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Rate') || metric.name.includes('Accuracy') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Time') ? 'm' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Rate') || metric.name.includes('Accuracy') || metric.name.includes('Coverage') ? '%' : metric.name.includes('Time') ? 'm' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Predictions</h3>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getEventTypeIcon(prediction.type)}
                  <div>
                    <div className="font-medium text-sm">{prediction.event}</div>
                    <div className="text-xs text-muted-foreground">
                      {prediction.region} • {prediction.timeframe} • {prediction.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(prediction.status)}
                  <div className={`text-sm font-bold ${getImpactColor(prediction.impact)}`}>
                    {prediction.impact}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-2">{prediction.description}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-red">{prediction.probability.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{prediction.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(prediction.status)}`}>
                      {prediction.status}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
