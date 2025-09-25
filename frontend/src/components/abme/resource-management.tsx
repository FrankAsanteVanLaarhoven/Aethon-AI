'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, Zap, Target, TrendingUp, BarChart3, Activity, Settings } from 'lucide-react'

export function ResourceManagement() {
  const [selectedResource, setSelectedResource] = useState('All')
  const [resourceUtilization, setResourceUtilization] = useState({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0
  })

  const resources = [
    {
      name: 'Computing Resources',
      type: 'Compute',
      allocated: 85,
      utilized: 78,
      efficiency: 92,
      capacity: 1024,
      icon: Cpu,
      color: 'text-neon-blue',
      status: 'optimal'
    },
    {
      name: 'Storage Systems',
      type: 'Storage',
      allocated: 65,
      utilized: 58,
      efficiency: 89,
      capacity: 2048,
      icon: HardDrive,
      color: 'text-neon-green',
      status: 'optimal'
    },
    {
      name: 'Processing Power',
      type: 'Processing',
      allocated: 72,
      utilized: 68,
      efficiency: 94,
      capacity: 512,
      icon: Zap,
      color: 'text-neon-purple',
      status: 'optimal'
    },
    {
      name: 'AI Engines',
      type: 'AI',
      allocated: 90,
      utilized: 85,
      efficiency: 96,
      capacity: 256,
      icon: Target,
      color: 'text-neon-cyan',
      status: 'optimal'
    }
  ]

  const resourceTypes = ['All', 'Compute', 'Storage', 'Processing', 'AI']

  const optimizationStrategies = [
    { name: 'Auto-scaling', status: 'active', impact: 'high', savings: '23%' },
    { name: 'Load Balancing', status: 'active', impact: 'medium', savings: '15%' },
    { name: 'Resource Pooling', status: 'active', impact: 'high', savings: '31%' },
    { name: 'Predictive Allocation', status: 'pending', impact: 'high', savings: '28%' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setResourceUtilization(prev => ({
        cpu: Math.floor(Math.random() * 20) + 60,
        memory: Math.floor(Math.random() * 15) + 65,
        storage: Math.floor(Math.random() * 10) + 70,
        network: Math.floor(Math.random() * 25) + 55
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-red-500'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Resource Management</h2>
            <p className="text-muted-foreground">Intelligent resource allocation and optimization</p>
          </div>
          <button className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {resourceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedResource(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedResource === type
                  ? 'bg-neon-blue text-white'
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
                className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <resource.icon className={`w-6 h-6 ${resource.color}`} />
                    <div>
                      <h3 className="font-semibold">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Capacity: {resource.capacity} units | Type: {resource.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${getEfficiencyColor(resource.efficiency)}`}>
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
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    resource.status === 'optimal' ? 'bg-neon-green/20 text-neon-green' :
                    resource.status === 'warning' ? 'bg-neon-yellow/20 text-neon-yellow' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {resource.status}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Optimization Strategies</h3>
        <div className="space-y-3">
          {optimizationStrategies.map((strategy, index) => (
            <motion.div
              key={strategy.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  strategy.status === 'active' ? 'bg-neon-green' : 'bg-muted'
                }`} />
                <div>
                  <div className="font-medium text-sm">{strategy.name}</div>
                  <div className="text-xs text-muted-foreground">{strategy.status}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-neon-green">{strategy.savings}</div>
                <div className="text-xs text-muted-foreground">savings</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
