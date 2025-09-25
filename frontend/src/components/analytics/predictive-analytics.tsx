'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Eye, TrendingUp, Calendar, Target } from 'lucide-react'

export function PredictiveAnalytics() {
  const predictions = [
    {
      metric: 'Revenue Growth',
      current: '$2.4M',
      predicted: '$2.8M',
      timeframe: 'Q2 2025',
      confidence: '89%',
      icon: TrendingUp,
      color: 'neon-green'
    },
    {
      metric: 'Market Share',
      current: '12.5%',
      predicted: '15.2%',
      timeframe: 'Q3 2025',
      confidence: '76%',
      icon: Target,
      color: 'neon-blue'
    },
    {
      metric: 'Customer Acquisition',
      current: '1,247',
      predicted: '1,580',
      timeframe: 'Q2 2025',
      confidence: '82%',
      icon: Calendar,
      color: 'neon-purple'
    },
    {
      metric: 'Risk Score',
      current: 'Low',
      predicted: 'Medium',
      timeframe: 'Q4 2025',
      confidence: '71%',
      icon: Eye,
      color: 'neon-yellow'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-6">Predictive Analytics</h3>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => {
          const Icon = prediction.icon
          return (
            <motion.div
              key={prediction.metric}
              className="p-4 border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-${prediction.color}/20 rounded-lg`}>
                    <Icon className={`w-5 h-5 text-${prediction.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{prediction.metric}</h4>
                    <p className="text-sm text-muted-foreground">{prediction.timeframe}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">{prediction.confidence}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-lg font-bold text-foreground">{prediction.current}</p>
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-${prediction.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Predicted</p>
                  <p className="text-lg font-bold text-foreground">{prediction.predicted}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
