'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity, RefreshCw } from 'lucide-react'

export function AnalyticsHeader() {
  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tesla-heading">
            Strategic Analytics
          </h1>
          <p className="text-muted-foreground tesla-text">
            Advanced data analysis and business intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-medium bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
          <div className="p-2 bg-neon-green/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-neon-green" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Metrics</p>
            <p className="text-2xl font-bold text-foreground">1,247</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
          <div className="p-2 bg-neon-blue/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-neon-blue" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Growth Rate</p>
            <p className="text-2xl font-bold text-foreground">+12.5%</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
          <div className="p-2 bg-neon-purple/20 rounded-lg">
            <Activity className="w-6 h-6 text-neon-purple" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Reports</p>
            <p className="text-2xl font-bold text-foreground">89</p>
          </div>
        </div>
      </div>
    </div>
  )
}
