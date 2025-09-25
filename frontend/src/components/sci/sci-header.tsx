'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, Zap, TrendingUp, Users, Globe } from 'lucide-react'

export function SCIHeader() {
  const metrics = [
    { label: 'Active Simulations', value: '47', icon: Brain, color: 'text-neon-blue' },
    { label: 'Competitors Tracked', value: '1,247', icon: Target, color: 'text-neon-red' },
    { label: 'Market Scenarios', value: '89', icon: TrendingUp, color: 'text-neon-green' },
    { label: 'AI Models', value: '156', icon: Zap, color: 'text-neon-yellow' }
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
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
          >
            Synthetic Competition Intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Revolutionary AI vs AI strategic simulation system for predicting competitive responses and market dynamics
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/10 rounded-lg border border-neon-blue/20"
        >
          <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse" />
          <span className="text-sm font-medium text-neon-blue">AI Simulation Active</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="text-center p-4 bg-background/50 rounded-lg border border-border hover:border-neon-blue/30 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-neon-blue/10 rounded-lg">
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
        className="mt-8 p-6 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg border border-neon-blue/20"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-neon-blue" />
          <h3 className="text-xl font-semibold">Global Competitive Landscape</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">89%</div>
            <div className="text-sm text-muted-foreground">Market Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-yellow mb-1">156</div>
            <div className="text-sm text-muted-foreground">AI Models Deployed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-red mb-1">2.3s</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
