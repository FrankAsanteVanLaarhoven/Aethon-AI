'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react'

export function PerformanceMetrics() {
  const metrics = [
    {
      title: 'System Performance',
      value: '99.8%',
      change: '+0.2%',
      trend: 'up',
      icon: Zap,
      color: 'neon-green'
    },
    {
      title: 'Response Time',
      value: '2.3ms',
      change: '-0.1ms',
      trend: 'up',
      icon: Target,
      color: 'neon-blue'
    },
    {
      title: 'Throughput',
      value: '1.2M req/s',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'neon-purple'
    },
    {
      title: 'Error Rate',
      value: '0.02%',
      change: '-0.01%',
      trend: 'up',
      icon: TrendingDown,
      color: 'neon-red'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              className="p-4 border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-${metric.color}/20 rounded-lg`}>
                  <Icon className={`w-5 h-5 text-${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-neon-green' : 'text-neon-red'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
