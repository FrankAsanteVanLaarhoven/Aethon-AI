'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, Target, Activity, CheckCircle, Globe, Zap, Brain } from 'lucide-react'

interface NATOOperation {
  id: string
  name: string
  alliance: string
  type: 'collective' | 'defense' | 'training' | 'intelligence' | 'support'
  status: 'active' | 'planned' | 'completed' | 'suspended'
  participants: number
  readiness: number
  lastUpdate: string
  location: string
  commander: string
}

interface NATOMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function NATOIntegration() {
  const [operations, setOperations] = useState<NATOOperation[]>([])
  const [metrics, setMetrics] = useState<NATOMetric[]>([])
  const [integrationLevel, setIntegrationLevel] = useState(0)

  useEffect(() => {
    const initialOperations: NATOOperation[] = [
      {
        id: 'nato-001',
        name: 'Operation Atlantic Shield',
        alliance: 'NATO',
        type: 'collective',
        status: 'active',
        participants: 28,
        readiness: 98.5,
        lastUpdate: '2 hours ago',
        location: 'North Atlantic',
        commander: 'Gen. NATO Command'
      },
      {
        id: 'nato-002',
        name: 'Enhanced Forward Presence',
        alliance: 'NATO',
        type: 'defense',
        status: 'active',
        participants: 12,
        readiness: 96.8,
        lastUpdate: '4 hours ago',
        location: 'Eastern Europe',
        commander: 'Lt. Gen. European Command'
      },
      {
        id: 'nato-003',
        name: 'Joint Training Exercise',
        alliance: 'NATO',
        type: 'training',
        status: 'planned',
        participants: 18,
        readiness: 94.2,
        lastUpdate: '1 day ago',
        location: 'Training Grounds',
        commander: 'Brig. Gen. Training Command'
      },
      {
        id: 'nato-004',
        name: 'Intelligence Sharing',
        alliance: 'NATO',
        type: 'intelligence',
        status: 'completed',
        participants: 30,
        readiness: 99.1,
        lastUpdate: '3 days ago',
        location: 'Intelligence Centers',
        commander: 'Maj. Gen. Intelligence'
      }
    ]

    const initialMetrics: NATOMetric[] = [
      {
        name: 'Integration Level',
        value: 98.7,
        target: 95,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Alliance Readiness',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Interoperability',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Command Integration',
        value: 97.5,
        target: 90,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setOperations(initialOperations)
    setMetrics(initialMetrics)
    setIntegrationLevel(98.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setIntegrationLevel(prev => Math.min(100, prev + Math.random() * 0.1))
      setOperations(prev => prev.map(op => ({
        ...op,
        lastUpdate: 'Just now'
      })))
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const getOperationTypeIcon = (type: string) => {
    switch (type) {
      case 'collective': return <Shield className="h-4 w-4" />
      case 'defense': return <Target className="h-4 w-4" />
      case 'training': return <Brain className="h-4 w-4" />
      case 'intelligence': return <Activity className="h-4 w-4" />
      case 'support': return <Users className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getOperationTypeColor = (type: string) => {
    switch (type) {
      case 'collective': return 'text-blue-400'
      case 'defense': return 'text-gray-300'
      case 'training': return 'text-blue-300'
      case 'intelligence': return 'text-green-400'
      case 'support': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'planned': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'suspended': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'planned': return <Target className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'suspended': return <Activity className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">NATO Integration</h2>
            <p className="text-muted-foreground">NATO alliance operations and interoperability</p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {integrationLevel.toFixed(1)}% Integration
            </span>
          </div>
        </div>

        {/* NATO Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-400' :
                  metric.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}%
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
        <h3 className="text-lg font-semibold mb-4">NATO Operations</h3>
        <div className="space-y-4">
          {operations.map((operation, index) => (
            <motion.div
              key={operation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getOperationTypeIcon(operation.type)}
                  <div>
                    <div className="font-medium text-sm">{operation.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {operation.location} • {operation.commander} • {operation.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(operation.status)}
                  <div className={`text-sm font-bold ${getStatusColor(operation.status)}`}>
                    {operation.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-400">{operation.participants}</div>
                  <div className="text-xs text-muted-foreground">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-400">{operation.readiness.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Readiness</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${getOperationTypeColor(operation.type)}`}>
                    {operation.type}
                  </div>
                  <div className="text-xs text-muted-foreground">Type</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
