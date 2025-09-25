'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Target, TrendingUp, Activity, Brain, CheckCircle, Clock, Globe } from 'lucide-react'

interface CrisisPrediction {
  id: string
  crisis: string
  region: string
  type: 'economic' | 'political' | 'social' | 'environmental' | 'military'
  probability: number
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  timeframe: string
  confidence: number
  status: 'predicted' | 'monitoring' | 'escalating' | 'resolved'
  lastUpdate: string
  description: string
  indicators: string[]
  mitigation: string
}

interface CrisisMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function CrisisPrediction() {
  const [crises, setCrises] = useState<CrisisPrediction[]>([])
  const [metrics, setMetrics] = useState<CrisisMetric[]>([])
  const [predictionAccuracy, setPredictionAccuracy] = useState(0)

  useEffect(() => {
    const initialCrises: CrisisPrediction[] = [
      {
        id: 'crisis-001',
        crisis: 'Economic Recession',
        region: 'Global',
        type: 'economic',
        probability: 78.5,
        severity: 'High',
        timeframe: '6-12 months',
        confidence: 89.2,
        status: 'monitoring',
        lastUpdate: '2 hours ago',
        description: 'Significant economic downturn with global implications',
        indicators: ['GDP Decline', 'Unemployment Rise', 'Market Volatility'],
        mitigation: 'Monetary policy adjustments and fiscal stimulus packages'
      },
      {
        id: 'crisis-002',
        crisis: 'Political Instability',
        region: 'Eastern Europe',
        type: 'political',
        probability: 65.3,
        severity: 'Critical',
        timeframe: '3-6 months',
        confidence: 76.8,
        status: 'escalating',
        lastUpdate: '4 hours ago',
        description: 'Government instability with potential for regime change',
        indicators: ['Public Protests', 'Government Resignations', 'Military Tensions'],
        mitigation: 'Diplomatic intervention and international mediation'
      },
      {
        id: 'crisis-003',
        crisis: 'Climate Migration',
        region: 'Global',
        type: 'environmental',
        probability: 89.2,
        severity: 'High',
        timeframe: '12-18 months',
        confidence: 94.7,
        status: 'predicted',
        lastUpdate: '1 day ago',
        description: 'Large-scale migration due to climate change impacts',
        indicators: ['Sea Level Rise', 'Extreme Weather', 'Crop Failures'],
        mitigation: 'Climate adaptation strategies and migration management'
      },
      {
        id: 'crisis-004',
        crisis: 'Social Unrest',
        region: 'Latin America',
        type: 'social',
        probability: 54.7,
        severity: 'Medium',
        timeframe: '2-4 months',
        confidence: 82.1,
        status: 'resolved',
        lastUpdate: '1 week ago',
        description: 'Social tensions resolved through policy changes',
        indicators: ['Public Demonstrations', 'Social Media Activity', 'Economic Disparity'],
        mitigation: 'Social policy reforms and economic redistribution'
      }
    ]

    const initialMetrics: CrisisMetric[] = [
      {
        name: 'Prediction Accuracy',
        value: 92.3,
        target: 90,
        trend: 'up',
        color: 'text-neon-green'
      },
      {
        name: 'Early Warning Time',
        value: 8.7,
        target: 6,
        trend: 'up',
        color: 'text-neon-blue'
      },
      {
        name: 'False Positive Rate',
        value: 7.8,
        target: 10,
        trend: 'down',
        color: 'text-neon-yellow'
      },
      {
        name: 'Mitigation Success',
        value: 87.5,
        target: 85,
        trend: 'up',
        color: 'text-neon-purple'
      }
    ]

    setCrises(initialCrises)
    setMetrics(initialMetrics)
    setPredictionAccuracy(92.3)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPredictionAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setCrises(prev => prev.map(crisis => ({
        ...crisis,
        lastUpdate: 'Just now'
      })))
    }, 28000)

    return () => clearInterval(interval)
  }, [])

  const getCrisisTypeIcon = (type: string) => {
    switch (type) {
      case 'economic': return <TrendingUp className="h-4 w-4" />
      case 'political': return <Target className="h-4 w-4" />
      case 'social': return <Activity className="h-4 w-4" />
      case 'environmental': return <Globe className="h-4 w-4" />
      case 'military': return <AlertTriangle className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getCrisisTypeColor = (type: string) => {
    switch (type) {
      case 'economic': return 'text-neon-green'
      case 'political': return 'text-neon-red'
      case 'social': return 'text-neon-blue'
      case 'environmental': return 'text-neon-yellow'
      case 'military': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
      case 'escalating': return 'text-neon-red'
      case 'resolved': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'predicted': return <Brain className="h-4 w-4" />
      case 'monitoring': return <Clock className="h-4 w-4" />
      case 'escalating': return <AlertTriangle className="h-4 w-4" />
      case 'resolved': return <CheckCircle className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Crisis Prediction</h2>
            <p className="text-muted-foreground">Advanced crisis prediction and early warning system</p>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-neon-red" />
            <span className="text-sm font-medium text-neon-red">
              {predictionAccuracy.toFixed(1)}% Accuracy
            </span>
          </div>
        </div>

        {/* Crisis Metrics */}
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
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-neon-green' :
                  metric.trend === 'down' ? 'bg-neon-red' : 'bg-neon-blue'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Accuracy') || metric.name.includes('Rate') || metric.name.includes('Success') ? '%' : metric.name.includes('Time') ? 'm' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Accuracy') || metric.name.includes('Rate') || metric.name.includes('Success') ? '%' : metric.name.includes('Time') ? 'm' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Crisis Predictions</h3>
        <div className="space-y-4">
          {crises.map((crisis, index) => (
            <motion.div
              key={crisis.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getCrisisTypeIcon(crisis.type)}
                  <div>
                    <div className="font-medium text-sm">{crisis.crisis}</div>
                    <div className="text-xs text-muted-foreground">
                      {crisis.region} • {crisis.timeframe} • {crisis.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(crisis.status)}
                  <div className={`text-sm font-bold ${getSeverityColor(crisis.severity)}`}>
                    {crisis.severity}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-muted-foreground mb-2">{crisis.description}</div>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Mitigation:</strong> {crisis.mitigation}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {crisis.indicators.map((indicator, indicatorIndex) => (
                    <span
                      key={indicatorIndex}
                      className="px-2 py-1 text-xs bg-neon-yellow/10 text-neon-yellow rounded-full border border-neon-yellow/20"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-red">{crisis.probability.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Probability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{crisis.confidence.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(crisis.status)}`}>
                      {crisis.status}
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
