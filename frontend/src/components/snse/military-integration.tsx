'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Target, Zap, Users, Activity, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

export function MilitaryIntegration() {
  const [integrationStatus, setIntegrationStatus] = useState('Active')
  const [militaryUnits, setMilitaryUnits] = useState(0)

  const militarySystems = [
    { name: 'Command & Control', status: 'operational', units: 12, readiness: 98, color: 'text-neon-green' },
    { name: 'Intelligence Systems', status: 'operational', units: 8, readiness: 95, color: 'text-neon-green' },
    { name: 'Communication Networks', status: 'operational', units: 15, readiness: 99, color: 'text-neon-green' },
    { name: 'Surveillance Systems', status: 'maintenance', units: 6, readiness: 87, color: 'text-neon-yellow' },
    { name: 'Defense Systems', status: 'operational', units: 10, readiness: 96, color: 'text-neon-green' }
  ]

  const operationalMetrics = [
    { name: 'System Readiness', value: 95.2, unit: '%', trend: 'up', color: 'text-neon-green' },
    { name: 'Response Time', value: 0.4, unit: 's', trend: 'down', color: 'text-neon-blue' },
    { name: 'Active Units', value: 51, unit: '', trend: 'stable', color: 'text-neon-purple' },
    { name: 'Mission Success Rate', value: 99.7, unit: '%', trend: 'up', color: 'text-neon-green' }
  ]

  const recentOperations = [
    { id: 1, operation: 'Threat Assessment', status: 'completed', duration: '2.3s', result: 'success', color: 'text-neon-green' },
    { id: 2, operation: 'Intelligence Gathering', status: 'active', duration: '5.1s', result: 'in_progress', color: 'text-neon-blue' },
    { id: 3, operation: 'Defense Coordination', status: 'completed', duration: '1.8s', result: 'success', color: 'text-neon-green' },
    { id: 4, operation: 'Surveillance Update', status: 'pending', duration: '0s', result: 'queued', color: 'text-neon-yellow' }
  ]

  const integrationFeatures = [
    { name: 'Real-time Data Sharing', status: 'active', coverage: 100, color: 'text-neon-green' },
    { name: 'Automated Threat Response', status: 'active', coverage: 95, color: 'text-neon-green' },
    { name: 'Cross-Platform Integration', status: 'active', coverage: 88, color: 'text-neon-blue' },
    { name: 'Secure Communication', status: 'active', coverage: 100, color: 'text-neon-green' },
    { name: 'Mission Planning Support', status: 'active', coverage: 92, color: 'text-neon-green' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMilitaryUnits(prev => Math.max(45, Math.min(55, prev + Math.floor(Math.random() * 3) - 1)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'completed':
      case 'success': return CheckCircle
      case 'maintenance':
      case 'pending': return Clock
      case 'active':
      case 'in_progress': return Activity
      default: return AlertTriangle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'completed':
      case 'success':
      case 'active': return 'text-neon-green'
      case 'maintenance':
      case 'pending':
      case 'queued': return 'text-neon-yellow'
      case 'in_progress': return 'text-neon-blue'
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
            <h2 className="text-xl font-bold mb-2">Military Integration</h2>
            <p className="text-muted-foreground">Defense system coordination and control</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">{integrationStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {operationalMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className={`text-lg font-bold ${metric.color} mb-1`}>
                {metric.name === 'Active Units' ? militaryUnits :
                 metric.value}{metric.unit}
              </div>
              <div className="text-xs text-muted-foreground">{metric.name}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Military Systems</h3>
          {militarySystems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <Shield className={`w-5 h-5 ${system.color}`} />
                <div>
                  <div className="font-medium text-sm">{system.name}</div>
                  <div className="text-xs text-muted-foreground">{system.units} units</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{system.readiness}%</div>
                <div className="text-xs text-muted-foreground">{system.status}</div>
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
        <h3 className="text-lg font-semibold mb-4">Recent Operations</h3>
        <div className="space-y-3">
          {recentOperations.map((operation, index) => (
            <motion.div
              key={operation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getStatusIcon(operation.status), {
                  className: `w-5 h-5 ${getStatusColor(operation.status)}`
                })}
                <div>
                  <div className="font-medium text-sm">{operation.operation}</div>
                  <div className="text-xs text-muted-foreground">Duration: {operation.duration}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${getStatusColor(operation.result)}`}>
                  {operation.result}
                </div>
                <div className="text-xs text-muted-foreground">{operation.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Integration Features</h3>
        <div className="space-y-3">
          {integrationFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getStatusIcon(feature.status), {
                  className: `w-5 h-5 ${getStatusColor(feature.status)}`
                })}
                <div>
                  <div className="font-medium text-sm">{feature.name}</div>
                  <div className="text-xs text-muted-foreground">{feature.coverage}% coverage</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${getStatusColor(feature.status)}`}>
                  {feature.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
