'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Network, Users, Zap, TrendingUp, Globe, Brain, Target, Activity } from 'lucide-react'

export function CEISHeader() {
  const metrics = [
    { label: 'Network Nodes', value: '2,847', icon: Network, color: 'text-neon-blue' },
    { label: 'Active Enterprises', value: '156', icon: Users, color: 'text-neon-green' },
    { label: 'Intelligence Flows', value: '89.2K', icon: Zap, color: 'text-neon-yellow' },
    { label: 'Synthesis Rate', value: '94.7%', icon: TrendingUp, color: 'text-neon-purple' }
  ]

  const networkStats = [
    { region: 'North America', nodes: 1247, enterprises: 67, intelligence: 45.2 },
    { region: 'Europe', nodes: 892, enterprises: 45, intelligence: 32.1 },
    { region: 'Asia Pacific', nodes: 567, enterprises: 28, intelligence: 18.7 },
    { region: 'Latin America', nodes: 234, enterprises: 12, intelligence: 8.9 },
    { region: 'Middle East & Africa', nodes: 156, enterprises: 4, intelligence: 3.1 }
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
            Cross-Enterprise Intelligence Synthesis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Network effects intelligence with cross-enterprise synthesis for compound intelligence and collaborative insights
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/10 rounded-lg border border-neon-blue/20"
        >
          <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse" />
          <span className="text-sm font-medium text-neon-blue">Network Active</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg border border-neon-blue/20 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-neon-blue" />
          <h3 className="text-xl font-semibold">Global Network Distribution</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {networkStats.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="text-center p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="text-sm font-medium mb-1">{region.region}</div>
              <div className="text-lg font-bold text-neon-blue mb-1">{region.nodes}</div>
              <div className="text-xs text-muted-foreground mb-1">nodes</div>
              <div className="text-sm font-bold text-neon-green">{region.enterprises}</div>
              <div className="text-xs text-muted-foreground">enterprises</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
