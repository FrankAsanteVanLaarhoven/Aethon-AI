'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, TrendingUp, Users, Target, Activity, CheckCircle, Globe, Zap } from 'lucide-react'

export function CorporateHeader() {
  const metrics = [
    { label: 'Companies Transformed', value: '1,247', icon: Building2, color: 'text-blue-400' },
    { label: 'Revenue Growth', value: '+34.7%', icon: TrendingUp, color: 'text-green-400' },
    { label: 'McKinsey+ Score', value: '98.2', icon: Target, color: 'text-blue-300' },
    { label: 'Global Reach', value: '89', icon: Globe, color: 'text-gray-300' }
  ]

  const transformationCoverage = [
    { sector: 'Technology', companies: 456, growth: 42.3, coverage: 98.5 },
    { sector: 'Finance', companies: 234, growth: 38.7, coverage: 97.2 },
    { sector: 'Healthcare', companies: 189, growth: 35.2, coverage: 95.8 },
    { sector: 'Manufacturing', companies: 156, growth: 31.8, coverage: 94.1 },
    { sector: 'Retail', companies: 123, growth: 28.9, coverage: 92.7 }
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
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
          >
            Corporate Transformation & McKinsey+ Surpassing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            Advanced AI-powered corporate transformation with McKinsey+ surpassing capabilities
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-green-400/10 rounded-lg border border-green-400/20"
        >
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-green-400">Transformation Active</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="text-center p-4 bg-background/50 rounded-lg border border-border hover:border-green-400/30 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-green-400/10 rounded-lg">
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
        className="bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-lg border border-green-400/20 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-6 w-6 text-green-400" />
          <h3 className="text-xl font-semibold">Transformation Coverage</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {transformationCoverage.map((sector, index) => (
            <motion.div
              key={sector.sector}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="text-center p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="text-sm font-medium mb-1">{sector.sector}</div>
              <div className="text-lg font-bold text-green-400 mb-1">{sector.companies}</div>
              <div className="text-xs text-muted-foreground mb-1">companies</div>
              <div className="text-sm font-bold text-blue-400">+{sector.growth}%</div>
              <div className="text-xs text-muted-foreground">growth</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
