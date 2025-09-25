'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, Zap, Target, TrendingUp, BarChart3 } from 'lucide-react'

export function ResourceAllocation() {
  const [selectedResource, setSelectedResource] = useState('Quantum')

  const resources = [
    {
      name: 'Quantum Processing Units',
      type: 'Quantum',
      allocated: 85,
      utilized: 78,
      efficiency: 92,
      capacity: 1024,
      icon: Cpu,
      color: 'text-neon-blue'
    },
    {
      name: 'Classical Computing',
      type: 'Classical',
      allocated: 65,
      utilized: 58,
      efficiency: 89,
      capacity: 2048,
      icon: HardDrive,
      color: 'text-neon-green'
    },
    {
      name: 'Quantum Memory',
      type: 'Quantum',
      allocated: 72,
      utilized: 68,
      efficiency: 94,
      capacity: 512,
      icon: Zap,
      color: 'text-neon-purple'
    },
    {
      name: 'Optimization Engines',
      type: 'Hybrid',
      allocated: 90,
      utilized: 85,
      efficiency: 96,
      capacity: 256,
      icon: Target,
      color: 'text-neon-cyan'
    }
  ]

  const resourceTypes = ['All', 'Quantum', 'Classical', 'Hybrid']

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-neon-green'
    if (efficiency >= 90) return 'text-neon-yellow'
    if (efficiency >= 85) return 'text-neon-blue'
    return 'text-red-500'
  }

  const getEfficiencyBgColor = (efficiency: number) => {
    if (efficiency >= 95) return 'bg-neon-green/10'
    if (efficiency >= 90) return 'bg-neon-yellow/10'
    if (efficiency >= 85) return 'bg-neon-blue/10'
    return 'bg-red-500/10'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
          Resource Allocation
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Intelligent allocation and optimization of quantum and classical computing resources
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {resourceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedResource(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedResource === type
                ? 'bg-neon-pink text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {resources
          .filter(resource => selectedResource === 'All' || resource.type === selectedResource)
          .map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <resource.icon className={`w-8 h-8 ${resource.color}`} />
                  <div>
                    <h3 className="font-semibold text-lg">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Capacity: {resource.capacity} units | Type: {resource.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getEfficiencyColor(resource.efficiency)}`}>
                    {resource.efficiency}%
                  </div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Allocated</span>
                    <span>{resource.allocated}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-neon-blue h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${resource.allocated}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Utilized</span>
                    <span>{resource.utilized}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-neon-green h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${resource.utilized}%` }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Utilization Rate: <span className="font-medium text-neon-blue">
                    {((resource.utilized / resource.allocated) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString('en-US')}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Allocation Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {Math.round(resources.reduce((acc, r) => acc + r.allocated, 0) / resources.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Allocation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {Math.round(resources.reduce((acc, r) => acc + r.utilized, 0) / resources.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Utilization</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple">
              {Math.round(resources.reduce((acc, r) => acc + r.efficiency, 0) / resources.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-cyan">
              {resources.reduce((acc, r) => acc + r.capacity, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Capacity</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
