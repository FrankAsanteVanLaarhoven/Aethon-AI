'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react'

export function MonteCarloVisualization() {
  const [simulationData, setSimulationData] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)

  useEffect(() => {
    // Simulate Monte Carlo data generation
    const generateData = () => {
      const data: number[] = []
      for (let i = 0; i < 1000; i++) {
        // Simulate portfolio returns with normal distribution
        const return_ = (Math.random() - 0.5) * 40 + 12.5 // Mean 12.5%, std dev ~20%
        data.push(return_)
      }
      setSimulationData(data)
    }

    generateData()
  }, [])

  const runSimulation = () => {
    setIsRunning(true)
    setCurrentIteration(0)
    
    const interval = setInterval(() => {
      setCurrentIteration(prev => {
        if (prev >= 10000) {
          setIsRunning(false)
          clearInterval(interval)
          return 10000
        }
        return prev + 100
      })
    }, 50)

    return () => clearInterval(interval)
  }

  const getHistogramData = () => {
    if (simulationData.length === 0) return []
    
    const bins = 20
    const min = Math.min(...simulationData)
    const max = Math.max(...simulationData)
    const binSize = (max - min) / bins
    
    const histogram = Array(bins).fill(0)
    
    simulationData.forEach(value => {
      const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1)
      histogram[binIndex]++
    })
    
    return histogram.map((count, index) => ({
      value: min + (index + 0.5) * binSize,
      count,
      height: (count / Math.max(...histogram)) * 100
    }))
  }

  const histogramData = getHistogramData()

  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="tesla-heading text-xl font-semibold">Monte Carlo Visualization</h3>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isRunning 
                ? 'bg-muted/20 text-muted-foreground border border-muted cursor-not-allowed' 
                : 'bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30'
            }`}
            whileHover={!isRunning ? { scale: 1.05 } : {}}
            whileTap={!isRunning ? { scale: 0.95 } : {}}
          >
            <Activity className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
          </motion.button>
          {isRunning && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                {currentIteration.toLocaleString('en-US')} / 10,000
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histogram */}
        <div className="space-y-4">
          <h4 className="font-medium">Return Distribution</h4>
          <div className="h-64 flex items-end justify-between space-x-1 bg-muted/20 rounded-lg p-4">
            {histogramData.length > 0 ? histogramData.map((bin, index) => (
              <motion.div
                key={index}
                className="bg-neon-blue rounded-t flex-1 min-h-[2px]"
                style={{ height: `${Math.max(0, bin.height)}%` }}
                initial={{ height: '0%' }}
                animate={{ height: `${Math.max(0, bin.height)}%` }}
                transition={{ duration: 0.5, delay: index * 0.01 }}
              />
            )) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{simulationData.length > 0 ? Math.min(...simulationData).toFixed(1) : '0.0'}%</span>
            <span>Return %</span>
            <span>{simulationData.length > 0 ? Math.max(...simulationData).toFixed(1) : '0.0'}%</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h4 className="font-medium">Simulation Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">Mean Return</span>
              <span className="font-mono text-neon-green">
                {simulationData.length > 0 ? (simulationData.reduce((a, b) => a + b, 0) / simulationData.length).toFixed(2) : '0.00'}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">Standard Deviation</span>
              <span className="font-mono text-neon-yellow">
                {simulationData.length > 0 ? Math.sqrt(
                  simulationData.reduce((acc, val) => acc + Math.pow(val - (simulationData.reduce((a, b) => a + b, 0) / simulationData.length), 2), 0) / simulationData.length
                ).toFixed(2) : '0.00'}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">95th Percentile</span>
              <span className="font-mono text-neon-blue">
                {simulationData.length > 0 ? simulationData.sort((a, b) => a - b)[Math.floor(simulationData.length * 0.95)]?.toFixed(2) || '0.00' : '0.00'}%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">5th Percentile</span>
              <span className="font-mono text-neon-red">
                {simulationData.length > 0 ? simulationData.sort((a, b) => a - b)[Math.floor(simulationData.length * 0.05)]?.toFixed(2) || '0.00' : '0.00'}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Simulation Progress</span>
            <span>{Math.round((currentIteration / 10000) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-neon-blue h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.max(0, Math.min(100, (currentIteration / 10000) * 100))}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
