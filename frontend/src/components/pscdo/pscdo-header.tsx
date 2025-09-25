'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Target, TrendingUp, Clock, Globe, Zap, Activity, Shield } from 'lucide-react'

export function PSCDOHeader() {
  const metrics = [
    { label: 'Supply Chains Monitored', value: '1,247', icon: Target, color: 'text-neon-blue' },
    { label: 'Disruption Predictions', value: '89.7%', icon: AlertTriangle, color: 'text-neon-yellow' },
    { label: 'Early Warning Time', value: '3-12m', icon: Clock, color: 'text-neon-green' },
    { label: 'Mitigation Success', value: '94.2%', icon: Shield, color: 'text-neon-purple' }
  ]

  const globalCoverage = [
    { region: 'North America', chains: 342, disruptions: 12, coverage: 98.5 },
    { region: 'Europe', chains: 267, disruptions: 8, coverage: 97.2 },
    { region: 'Asia Pacific', chains: 456, disruptions: 23, coverage: 95.8 },
    { region: 'Latin America', chains: 123, disruptions: 5, coverage: 94.1 },
    { region: 'Middle East & Africa', chains: 89, disruptions: 3, coverage: 92.7 }
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
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-yellow to-neon-red bg-clip-text text-transparent"
          >
            Predictive Supply Chain Disruption Oracle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            AI system for supply chain disruption prediction with 3-12 month early warning capabilities and mitigation strategies
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-yellow/10 rounded-lg border border-neon-yellow/20"
        >
          <div className="w-3 h-3 rounded-full bg-neon-yellow animate-pulse" />
          <span className="text-sm font-medium text-neon-yellow">Oracle Active</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="text-center p-4 bg-background/50 rounded-lg border border-border hover:border-neon-yellow/30 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-neon-yellow/10 rounded-lg">
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
        className="bg-gradient-to-r from-neon-yellow/10 to-neon-red/10 rounded-lg border border-neon-yellow/20 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-neon-yellow" />
          <h3 className="text-xl font-semibold">Global Supply Chain Coverage</h3>
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
              <div className="text-lg font-bold text-neon-blue mb-1">{region.chains}</div>
              <div className="text-xs text-muted-foreground mb-1">chains</div>
              <div className="text-sm font-bold text-neon-red">{region.disruptions}</div>
              <div className="text-xs text-muted-foreground">disruptions</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
