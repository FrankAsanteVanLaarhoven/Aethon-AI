'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Zap, Brain, CheckCircle } from 'lucide-react'

export function StrategyComparison() {
  const [selectedMetric, setSelectedMetric] = useState('ROI')

  const strategies = [
    {
      name: 'Quantum-Enhanced Strategy',
      type: 'Quantum',
      roi: 245,
      risk: 12,
      timeframe: '6 months',
      confidence: 98,
      complexity: 95,
      icon: Zap,
      color: 'text-neon-blue',
      advantages: ['Exponential optimization', 'Multi-dimensional analysis', 'Real-time adaptation']
    },
    {
      name: 'Traditional AI Strategy',
      type: 'Classical',
      roi: 156,
      risk: 18,
      timeframe: '12 months',
      confidence: 87,
      complexity: 78,
      icon: Brain,
      color: 'text-neon-green',
      advantages: ['Proven methodology', 'Lower computational cost', 'Wide compatibility']
    },
    {
      name: 'Hybrid Quantum-Classical',
      type: 'Hybrid',
      roi: 198,
      risk: 15,
      timeframe: '9 months',
      confidence: 92,
      complexity: 86,
      icon: Target,
      color: 'text-neon-purple',
      advantages: ['Balanced approach', 'Reduced risk', 'Scalable implementation']
    }
  ]

  const metrics = [
    { value: 'ROI', label: 'Return on Investment' },
    { value: 'Risk', label: 'Risk Assessment' },
    { value: 'Timeframe', label: 'Implementation Time' },
    { value: 'Confidence', label: 'Success Confidence' }
  ]

  const getMetricValue = (strategy: any, metric: string) => {
    switch (metric) {
      case 'ROI':
        return strategy.roi
      case 'Risk':
        return strategy.risk
      case 'Timeframe':
        return parseInt(strategy.timeframe)
      case 'Confidence':
        return strategy.confidence
      default:
        return 0
    }
  }

  const getMetricColor = (value: number, metric: string) => {
    switch (metric) {
      case 'ROI':
        return value >= 200 ? 'text-neon-green' : value >= 150 ? 'text-neon-yellow' : 'text-red-500'
      case 'Risk':
        return value <= 15 ? 'text-neon-green' : value <= 20 ? 'text-neon-yellow' : 'text-red-500'
      case 'Timeframe':
        return value <= 6 ? 'text-neon-green' : value <= 9 ? 'text-neon-yellow' : 'text-red-500'
      case 'Confidence':
        return value >= 95 ? 'text-neon-green' : value >= 85 ? 'text-neon-yellow' : 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'ROI':
        return '%'
      case 'Risk':
        return '%'
      case 'Timeframe':
        return ' months'
      case 'Confidence':
        return '%'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Strategy Comparison
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis comparing quantum-enhanced strategies with traditional approaches
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <button
            key={metric.value}
            onClick={() => setSelectedMetric(metric.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === metric.value
                ? 'bg-neon-purple text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <strategy.icon className={`w-8 h-8 ${strategy.color}`} />
                <div>
                  <h3 className="font-semibold text-lg">{strategy.name}</h3>
                  <p className="text-sm text-muted-foreground">{strategy.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                strategy.type === 'Quantum' ? 'bg-neon-blue/10 text-neon-blue' :
                strategy.type === 'Hybrid' ? 'bg-neon-purple/10 text-neon-purple' :
                'bg-neon-green/10 text-neon-green'
              }`}>
                {strategy.type}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{selectedMetric}</span>
                <span className={`text-2xl font-bold ${getMetricColor(getMetricValue(strategy, selectedMetric), selectedMetric)}`}>
                  {getMetricValue(strategy, selectedMetric)}{getMetricUnit(selectedMetric)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    getMetricColor(getMetricValue(strategy, selectedMetric), selectedMetric).replace('text-', 'bg-')
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((getMetricValue(strategy, selectedMetric) / 300) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Key Advantages</h4>
              <ul className="space-y-1">
                {strategy.advantages.map((advantage, advIndex) => (
                  <li key={advIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-neon-green" />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-neon-blue">{strategy.roi}%</div>
                <div className="text-xs text-muted-foreground">ROI</div>
              </div>
              <div>
                <div className="text-lg font-bold text-neon-yellow">{strategy.risk}%</div>
                <div className="text-xs text-muted-foreground">Risk</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {Math.max(...strategies.map(s => s.roi))}%
            </div>
            <div className="text-sm text-muted-foreground">Best ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {Math.min(...strategies.map(s => s.risk))}%
            </div>
            <div className="text-sm text-muted-foreground">Lowest Risk</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple">
              {Math.max(...strategies.map(s => s.confidence))}%
            </div>
            <div className="text-sm text-muted-foreground">Highest Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan">
              {Math.min(...strategies.map(s => parseInt(s.timeframe)))}m
            </div>
            <div className="text-sm text-muted-foreground">Fastest Implementation</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
