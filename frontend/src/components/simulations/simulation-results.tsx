'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, BarChart3 } from 'lucide-react'

export function SimulationResults() {
  const [results, setResults] = useState({
    totalScenarios: 0,
    completedRuns: 0,
    averageReturn: 0,
    volatility: 0,
    sharpeRatio: 0,
    maxDrawdown: 0,
    confidence95: { lower: 0, upper: 0 },
    confidence99: { lower: 0, upper: 0 }
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading simulation results
    setTimeout(() => {
      setResults({
        totalScenarios: 15,
        completedRuns: 10000,
        averageReturn: 12.5,
        volatility: 18.3,
        sharpeRatio: 0.68,
        maxDrawdown: -8.7,
        confidence95: { lower: -15.2, upper: 42.1 },
        confidence99: { lower: -25.8, upper: 58.3 }
      })
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
    return (
      <div className="palantir-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Running simulations...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Simulation Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <motion.div
          className="border border-border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Average Return</span>
            <TrendingUp className="w-4 h-4 text-neon-green" />
          </div>
          <p className="text-2xl font-bold font-mono text-neon-green">
            {results.averageReturn.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          className="border border-border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Volatility</span>
            <BarChart3 className="w-4 h-4 text-neon-yellow" />
          </div>
          <p className="text-2xl font-bold font-mono text-neon-yellow">
            {results.volatility.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          className="border border-border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
            <Target className="w-4 h-4 text-neon-blue" />
          </div>
          <p className="text-2xl font-bold font-mono text-neon-blue">
            {results.sharpeRatio.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          className="border border-border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Max Drawdown</span>
            <TrendingDown className="w-4 h-4 text-neon-red" />
          </div>
          <p className="text-2xl font-bold font-mono text-neon-red">
            {results.maxDrawdown.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          className="border border-border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">95% Confidence</span>
            <span className="text-xs text-muted-foreground">Range</span>
          </div>
          <p className="text-sm font-mono">
            {results.confidence95.lower.toFixed(1)}% to {results.confidence95.upper.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          className="border border-border rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">99% Confidence</span>
            <span className="text-xs text-muted-foreground">Range</span>
          </div>
          <p className="text-sm font-mono">
            {results.confidence99.lower.toFixed(1)}% to {results.confidence99.upper.toFixed(1)}%
          </p>
        </motion.div>
      </div>

      <div className="border border-border rounded-lg p-4">
        <h4 className="font-medium mb-3">Simulation Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Scenarios:</span>
            <span className="font-mono">{results.totalScenarios}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed Runs:</span>
            <span className='font-mono'>{results.completedRuns.toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
