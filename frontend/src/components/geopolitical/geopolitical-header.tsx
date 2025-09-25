'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Target, AlertTriangle, TrendingUp, Activity, Brain, Shield, Zap } from 'lucide-react'

export function GeopoliticalHeader() {
  const metrics = [
    { label: 'Threats Monitored', value: '2,847', icon: Target, color: 'text-neon-red' },
    { label: 'Predictions Active', value: '156', icon: Brain, color: 'text-neon-blue' },
    { label: 'Accuracy Rate', value: '94.7%', icon: TrendingUp, color: 'text-neon-green' },
    { label: 'Crisis Averted', value: '89', icon: Shield, color: 'text-neon-purple' }
  ]

  const globalCoverage = [
    { region: 'North America', threats: 342, predictions: 67, coverage: 98.5 },
    { region: 'Europe', threats: 267, predictions: 45, coverage: 97.2 },
    { region: 'Asia Pacific', threats: 456, predictions: 28, coverage: 95.8 },
    { region: 'Middle East', threats: 189, predictions: 12, coverage: 94.1 },
    { region: 'Africa', threats: 123, predictions: 4, coverage: 92.7 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-red to-neon-yellow bg-clip-text text-transparent"
          >
            Geopolitical Prophecy & Economic Warfare Detection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Advanced AI system for 12+ month geopolitical intelligence and economic warfare detection with predictive crisis management
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-red/10 rounded-lg border border-neon-red/20"
        >
          <div className="w-3 h-3 rounded-full bg-neon-red animate-pulse" />
          <span className="text-sm font-medium text-neon-red">Prophet Active</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="text-center p-4 bg-background/50 rounded-lg border border-border hover:border-neon-red/30 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-neon-red/10 rounded-lg">
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="bg-gradient-to-r from-neon-red/10 to-neon-yellow/10 rounded-lg border border-neon-red/20 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-neon-red" />
          <h3 className="text-xl font-semibold">Global Threat Coverage</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {globalCoverage.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="text-center p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="text-sm font-medium mb-1">{region.region}</div>
              <div className="text-lg font-bold text-neon-red mb-1">{region.threats}</div>
              <div className="text-xs text-muted-foreground mb-1">threats</div>
              <div className="text-sm font-bold text-neon-blue">{region.predictions}</div>
              <div className="text-xs text-muted-foreground">predictions</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
