'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Activity, CheckCircle, AlertTriangle, Users, Shield, Zap, Brain } from 'lucide-react'

interface CommandOperation {
  id: string
  name: string
  type: 'defensive' | 'offensive' | 'surveillance' | 'support' | 'training'
  status: 'active' | 'standby' | 'completed' | 'cancelled'
  personnel: number
  assets: number
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  lastUpdate: string
  location: string
  commander: string
}

interface CommandMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function CommandControl() {
  const [operations, setOperations] = useState<CommandOperation[]>([])
  const [metrics, setMetrics] = useState<CommandMetric[]>([])
  const [systemStatus, setSystemStatus] = useState(0)

  useEffect(() => {
    const initialOperations: CommandOperation[] = [
      {
        id: 'op-001',
        name: 'Operation Sentinel',
        type: 'defensive',
        status: 'active',
        personnel: 247,
        assets: 12,
        priority: 'High',
        lastUpdate: '2 min ago',
        location: 'Eastern Europe',
        commander: 'Col. Johnson'
      },
      {
        id: 'op-002',
        name: 'Operation Watchtower',
        type: 'surveillance',
        status: 'active',
        personnel: 89,
        assets: 8,
        priority: 'Medium',
        lastUpdate: '5 min ago',
        location: 'Mediterranean',
        commander: 'Lt. Col. Smith'
      },
      {
        id: 'op-003',
        name: 'Operation Shield',
        type: 'defensive',
        status: 'standby',
        personnel: 156,
        assets: 15,
        priority: 'Critical',
        lastUpdate: '1 hour ago',
        location: 'North Atlantic',
        commander: 'Gen. Williams'
      },
      {
        id: 'op-004',
        name: 'Operation Training',
        type: 'training',
        status: 'completed',
        personnel: 78,
        assets: 6,
        priority: 'Low',
        lastUpdate: '2 hours ago',
        location: 'Training Ground',
        commander: 'Maj. Brown'
      }
    ]

    const initialMetrics: CommandMetric[] = [
      {
        name: 'System Status',
        value: 98.7,
        target: 95,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Response Time',
        value: 0.8,
        target: 2.0,
        trend: 'down',
        color: 'text-blue-400'
      },
      {
        name: 'Mission Success',
        value: 94.2,
        target: 90,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Asset Utilization',
        value: 87.5,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setOperations(initialOperations)
    setMetrics(initialMetrics)
    setSystemStatus(98.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStatus(prev => Math.min(100, prev + Math.random() * 0.1))
      setOperations(prev => prev.map(op => ({
        ...op,
        lastUpdate: 'Just now'
      })))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getOperationTypeIcon = (type: string) => {
    switch (type) {
      case 'defensive': return <Shield className="h-4 w-4" />
      case 'offensive': return <Target className="h-4 w-4" />
      case 'surveillance': return <Activity className="h-4 w-4" />
      case 'support': return <Users className="h-4 w-4" />
      case 'training': return <Brain className="h-4 w-4" />
      default: return <Zap className="h-4 w-4" />
    }
  }

  const getOperationTypeColor = (type: string) => {
    switch (type) {
      case 'defensive': return 'text-blue-400'
      case 'offensive': return 'text-gray-300'
      case 'surveillance': return 'text-blue-300'
      case 'support': return 'text-green-400'
      case 'training': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-gray-300'
      case 'High': return 'text-blue-400'
      case 'Medium': return 'text-blue-300'
      case 'Low': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'standby': return 'text-blue-400'
      case 'completed': return 'text-gray-300'
      case 'cancelled': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'standby': return <AlertTriangle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <Target className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
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
            <h2 className="text-2xl font-bold mb-2">Command & Control</h2>
            <p className="text-muted-foreground">AI-powered military command and control operations</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {systemStatus.toFixed(1)}% System Status
            </span>
          </div>
        </div>

        {/* Command Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-400' :
                  metric.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Status') || metric.name.includes('Success') || metric.name.includes('Utilization') ? '%' : metric.name.includes('Time') ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Status') || metric.name.includes('Success') || metric.name.includes('Utilization') ? '%' : metric.name.includes('Time') ? 's' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Active Operations</h3>
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
                  <div className={`text-sm font-bold ${getPriorityColor(operation.priority)}`}>
                    {operation.priority}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-400">{operation.personnel}</div>
                  <div className="text-xs text-muted-foreground">Personnel</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-300">{operation.assets}</div>
                  <div className="text-xs text-muted-foreground">Assets</div>
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${getStatusColor(operation.status)}`}>
                    {operation.status}
                  </div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
