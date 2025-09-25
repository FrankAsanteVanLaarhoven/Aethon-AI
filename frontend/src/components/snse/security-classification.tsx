'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Clock, Users, Database } from 'lucide-react'

export function SecurityClassification() {
  const [classificationLevel, setClassificationLevel] = useState('Top Secret')
  const [accessAttempts, setAccessAttempts] = useState(0)

  const classificationLevels = [
    { name: 'Unclassified', level: 0, color: 'text-neon-green', bgColor: 'bg-neon-green/10', users: 1250 },
    { name: 'Confidential', level: 1, color: 'text-neon-blue', bgColor: 'bg-neon-blue/10', users: 450 },
    { name: 'Secret', level: 2, color: 'text-neon-yellow', bgColor: 'bg-neon-yellow/10', users: 180 },
    { name: 'Top Secret', level: 3, color: 'text-neon-red', bgColor: 'bg-neon-red/10', users: 45 },
    { name: 'Compartmented', level: 4, color: 'text-neon-purple', bgColor: 'bg-neon-purple/10', users: 12 }
  ]

  const accessControls = [
    { name: 'Multi-Factor Authentication', status: 'active', coverage: 100, color: 'text-neon-green' },
    { name: 'Biometric Verification', status: 'active', coverage: 95, color: 'text-neon-green' },
    { name: 'Role-Based Access', status: 'active', coverage: 100, color: 'text-neon-green' },
    { name: 'Time-Based Restrictions', status: 'active', coverage: 88, color: 'text-neon-blue' },
    { name: 'Location-Based Access', status: 'active', coverage: 92, color: 'text-neon-blue' }
  ]

  const recentAccess = [
    { user: 'Agent Smith', level: 'Top Secret', action: 'Data Access', time: '2 min ago', status: 'approved', color: 'text-neon-green' },
    { user: 'Dr. Johnson', level: 'Secret', action: 'File Download', time: '5 min ago', status: 'approved', color: 'text-neon-green' },
    { user: 'Unknown User', level: 'Confidential', action: 'Login Attempt', time: '8 min ago', status: 'blocked', color: 'text-neon-red' },
    { user: 'Col. Williams', level: 'Compartmented', action: 'System Access', time: '12 min ago', status: 'approved', color: 'text-neon-green' }
  ]

  const securityMetrics = [
    { name: 'Access Success Rate', value: 99.2, unit: '%', trend: 'up', color: 'text-neon-green' },
    { name: 'Failed Attempts', value: 12, unit: '', trend: 'down', color: 'text-neon-blue' },
    { name: 'Average Response Time', value: 0.3, unit: 's', trend: 'down', color: 'text-neon-purple' },
    { name: 'Active Sessions', value: 247, unit: '', trend: 'stable', color: 'text-neon-yellow' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAccessAttempts(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active': return CheckCircle
      case 'blocked': return AlertTriangle
      case 'pending': return Clock
      default: return Shield
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active': return 'text-neon-green'
      case 'blocked': return 'text-neon-red'
      case 'pending': return 'text-neon-yellow'
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
            <h2 className="text-xl font-bold mb-2">Security Classification</h2>
            <p className="text-muted-foreground">Multi-level security access control</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-red animate-pulse" />
            <span className="text-sm font-medium text-neon-red">{classificationLevel}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Classification Levels</h3>
          <div className="space-y-2">
            {classificationLevels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg border border-border ${level.bgColor}`}
              >
                <div className="flex items-center space-x-3">
                  <Shield className={`w-5 h-5 ${level.color}`} />
                  <div>
                    <div className="font-medium text-sm">{level.name}</div>
                    <div className="text-xs text-muted-foreground">Level {level.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{level.users}</div>
                  <div className="text-xs text-muted-foreground">users</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className={`text-lg font-bold ${metric.color} mb-1`}>
                {metric.value}{metric.unit}
              </div>
              <div className="text-xs text-muted-foreground">{metric.name}</div>
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
        <h3 className="text-lg font-semibold mb-4">Access Controls</h3>
        <div className="space-y-3">
          {accessControls.map((control, index) => (
            <motion.div
              key={control.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getStatusIcon(control.status), {
                  className: `w-5 h-5 ${getStatusColor(control.status)}`
                })}
                <div>
                  <div className="font-medium text-sm">{control.name}</div>
                  <div className="text-xs text-muted-foreground">{control.coverage}% coverage</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${getStatusColor(control.status)}`}>
                  {control.status}
                </div>
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
        <h3 className="text-lg font-semibold mb-4">Recent Access Activity</h3>
        <div className="space-y-3">
          {recentAccess.map((access, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-neon-blue" />
                <div>
                  <div className="font-medium text-sm">{access.user}</div>
                  <div className="text-xs text-muted-foreground">
                    {access.level} • {access.action} • {access.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${access.color}`}>
                  {access.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
