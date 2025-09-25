'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Target, Activity, CheckCircle, Globe, Zap, Brain, Users } from 'lucide-react'

export function MilitaryHeader() {
  const metrics = [
    { label: 'Active Operations', value: '47', icon: Target, color: 'text-blue-400' },
    { label: 'NATO Integration', value: '98.7%', icon: Shield, color: 'text-green-400' },
    { label: 'Readiness Level', value: '94.2%', icon: CheckCircle, color: 'text-blue-300' },
    { label: 'Threats Monitored', value: '1,247', icon: Activity, color: 'text-gray-300' }
  ]

  const globalCoverage = [
    { region: 'NATO Europe', operations: 342, readiness: 98.5, coverage: 100 },
    { region: 'NATO North America', operations: 267, readiness: 97.2, coverage: 100 },
    { region: 'Asia Pacific', operations: 156, readiness: 95.8, coverage: 85 },
    { region: 'Middle East', operations: 89, readiness: 94.1, coverage: 75 },
    { region: 'Africa', operations: 45, readiness: 92.7, coverage: 65 }
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
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-gray-300 bg-clip-text text-transparent"
          >
            Military AI Command & Control Integration
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Advanced AI-powered military command and control with NATO integration and operational readiness
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-400/10 rounded-lg border border-blue-400/20"
        >
          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-blue-400">System Active</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="text-center p-4 bg-background/50 rounded-lg border border-border hover:border-blue-400/30 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-blue-400/10 rounded-lg">
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
        className="bg-gradient-to-r from-blue-400/10 to-gray-300/10 rounded-lg border border-blue-400/20 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold">Global Military Coverage</h3>
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
              <div className="text-lg font-bold text-blue-400 mb-1">{region.operations}</div>
              <div className="text-xs text-muted-foreground mb-1">operations</div>
              <div className="text-sm font-bold text-green-400">{region.readiness}%</div>
              <div className="text-xs text-muted-foreground">readiness</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
