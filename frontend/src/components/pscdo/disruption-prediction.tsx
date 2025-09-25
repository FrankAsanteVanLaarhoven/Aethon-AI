'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Clock, Target, Activity, Zap, Globe, Shield } from 'lucide-react'

interface DisruptionPrediction {
  id: string
  supplyChain: string
  type: 'logistics' | 'supplier' | 'demand' | 'regulatory' | 'natural'
  probability: number
  impact: 'Low' | 'Medium' | 'High' | 'Critical'
  timeframe: string
  confidence: number
  status: 'predicted' | 'confirmed' | 'mitigated' | 'resolved'
  lastUpdate: string
}

interface PredictionMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function DisruptionPrediction() {
  const [predictions, setPredictions] = useState<DisruptionPrediction[]>([])
  const [metrics, setMetrics] = useState<PredictionMetric[]>([])
  const [predictionAccuracy, setPredictionAccuracy] = useState(0)

  useEffect(() => {
    const initialPredictions: DisruptionPrediction[] = [
      {
        id: 'pred-001',
        supplyChain: 'Electronics Manufacturing',
        type: 'supplier',
        probability: 78.5,
        impact: 'High',
        timeframe: '2-4 months',
        confidence: 89.2,
        status: 'predicted',
        lastUpdate: '2 hours ago'
      },
      {
        id: 'pred-002',
        supplyChain: 'Automotive Parts',
        type: 'logistics',
        probability: 65.3,
        impact: 'Medium',
        timeframe: '1-3 months',
        confidence: 84.7,
        status: 'predicted',
        lastUpdate: '4 hours ago'
      },
      {
        id: 'pred-003',
        supplyChain: 'Pharmaceutical',
        type: 'regulatory',
        probability: 45.8,
        impact: 'Critical',
        timeframe: '3-6 months',
        confidence: 92.1,
        status: 'confirmed',
        lastUpdate: '1 day ago'
      },
      {
        id: 'pred-004',
        supplyChain: 'Food & Beverage',
        type: 'natural',
        probability: 34.2,
        impact: 'Medium',
        timeframe: '1-2 months',
        confidence: 76.8,
        status: 'mitigated',
        lastUpdate: '3 days ago'
      }
    ]

    const initialMetrics: PredictionMetric[] = [
      {
        name: 'Prediction Accuracy',
        value: 89.7,
        target: 85,
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
        value: 12.3,
        target: 15,
        trend: 'down',
        color: 'text-neon-yellow'
      },
      {
        name: 'Coverage Rate',
        value: 94.2,
        target: 90,
        trend: 'up',
        color: 'text-neon-purple'
      }
    ]

    setPredictions(initialPredictions)
    setMetrics(initialMetrics)
    setPredictionAccuracy(89.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPredictionAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        lastUpdate: 'Just now'
      })))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getDisruptionTypeIcon = (type: string) => {
    switch (type) {
      case 'logistics': return <Globe className="h-4 w-4" />
      case 'supplier': return <Target className="h-4 w-4" />
      case 'demand': return <TrendingUp className="h-4 w-4" />
      case 'regulatory': return <Shield className="h-4 w-4" />
      case 'natural': return <Zap className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getDisruptionTypeColor = (type: string) => {
    switch (type) {
      case 'logistics': return 'text-neon-blue'
      case 'supplier': return 'text-neon-red'
      case 'demand': return 'text-neon-green'
      case 'regulatory': return 'text-neon-yellow'
      case 'natural': return 'text-neon-purple'
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
      case 'confirmed': return 'text-neon-red'
      case 'mitigated': return 'text-neon-blue'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-green" />
      case 'down': return <TrendingUp className="h-3 w-3 text-neon-red rotate-180" />
      case 'stable': return <div className="w-3 h-0.5 bg-neon-blue" />
      default: return <Activity className="h-3 w-3 text-muted-foreground" />
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
            <h2 className="text-2xl font-bold mb-2">Disruption Prediction</h2>
            <p className="text-muted-foreground">AI-powered supply chain disruption forecasting and analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-neon-yellow" />
            <span className="text-sm font-medium text-neon-yellow">
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
                {getTrendIcon(metric.trend)}
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
                  {getDisruptionTypeIcon(prediction.type)}
                  <div>
                    <div className="font-medium text-sm">{prediction.supplyChain}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {prediction.type} • {prediction.timeframe} • {prediction.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getImpactColor(prediction.impact)}`}>
                      {prediction.impact}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {prediction.probability.toFixed(1)}% probability
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    prediction.status === 'predicted' ? 'bg-neon-yellow' :
                    prediction.status === 'confirmed' ? 'bg-neon-red' :
                    prediction.status === 'mitigated' ? 'bg-neon-blue' : 'bg-neon-green'
                  }`} />
                </div>
              </div>

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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
