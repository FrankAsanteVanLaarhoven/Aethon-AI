'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Eye, Target, Zap, Activity, Clock, CheckCircle } from 'lucide-react'

export function ThreatDetection() {
  const [threatLevel, setThreatLevel] = useState('Medium')
  const [activeThreats, setActiveThreats] = useState(3)
  const [detectionAccuracy, setDetectionAccuracy] = useState(99.7)

  const threatTypes = [
    { name: 'Cyber Attacks', level: 'High', count: 12, trend: 'up', color: 'text-neon-red' },
    { name: 'Data Breaches', level: 'Medium', count: 5, trend: 'down', color: 'text-neon-yellow' },
    { name: 'Insider Threats', level: 'Low', count: 2, trend: 'stable', color: 'text-neon-green' },
    { name: 'Physical Intrusions', level: 'Medium', count: 3, trend: 'up', color: 'text-neon-blue' },
    { name: 'Social Engineering', level: 'High', count: 8, trend: 'up', color: 'text-neon-purple' }
  ]

  const recentThreats = [
    { 
      id: 1, 
      type: 'Advanced Persistent Threat', 
      severity: 'Critical', 
      source: 'Unknown', 
      time: '2 min ago',
      status: 'Blocked',
      color: 'text-neon-red'
    },
    { 
      id: 2, 
      type: 'Data Exfiltration Attempt', 
      severity: 'High', 
      source: 'External', 
      time: '5 min ago',
      status: 'Monitored',
      color: 'text-neon-yellow'
    },
    { 
      id: 3, 
      type: 'Unauthorized Access', 
      severity: 'Medium', 
      source: 'Internal', 
      time: '8 min ago',
      status: 'Investigated',
      color: 'text-neon-blue'
    },
    { 
      id: 4, 
      type: 'Malware Detection', 
      severity: 'High', 
      source: 'Email', 
      time: '12 min ago',
      status: 'Quarantined',
      color: 'text-neon-purple'
    }
  ]

  const detectionMetrics = [
    { name: 'Detection Rate', value: 99.7, unit: '%', trend: 'up', color: 'text-neon-green' },
    { name: 'False Positives', value: 0.3, unit: '%', trend: 'down', color: 'text-neon-blue' },
    { name: 'Response Time', value: 0.8, unit: 's', trend: 'down', color: 'text-neon-purple' },
    { name: 'Threats Blocked', value: 1247, unit: '', trend: 'up', color: 'text-neon-red' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDetectionAccuracy(prev => Math.min(99.9, prev + Math.random() * 0.1))
      setActiveThreats(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getThreatLevelBg = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-neon-red/10'
      case 'High': return 'bg-neon-yellow/10'
      case 'Medium': return 'bg-neon-blue/10'
      case 'Low': return 'bg-neon-green/10'
      default: return 'bg-muted/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Blocked': return Shield
      case 'Monitored': return Eye
      case 'Investigated': return Target
      case 'Quarantined': return Zap
      default: return Activity
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
            <h2 className="text-2xl font-bold mb-2">Threat Detection</h2>
            <p className="text-muted-foreground">Real-time security monitoring and threat analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              threatLevel === 'High' ? 'bg-neon-red' : 
              threatLevel === 'Medium' ? 'bg-neon-yellow' : 'bg-neon-green'
            } animate-pulse`} />
            <span className="text-sm font-medium capitalize">{threatLevel} Threat Level</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Threat Categories</h3>
            <div className="space-y-3">
              {threatTypes.map((threat, index) => (
                <motion.div
                  key={threat.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-5 h-5 ${threat.color}`} />
                    <div>
                      <div className="font-medium text-sm">{threat.name}</div>
                      <div className="text-xs text-muted-foreground">{threat.level} Risk</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{threat.count}</div>
                    <div className="text-xs text-muted-foreground">{threat.trend}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Detection Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              {detectionMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className={`text-xl font-bold ${metric.color} mb-1`}>
                    {metric.name === 'Threats Blocked' ? metric.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
                     metric.value}{metric.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">{metric.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Recent Threat Activity</h3>
        <div className="space-y-3">
          {recentThreats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getStatusIcon(threat.status), {
                  className: `w-5 h-5 ${threat.color}`
                })}
                <div>
                  <div className="font-medium text-sm">{threat.type}</div>
                  <div className="text-xs text-muted-foreground">
                    Source: {threat.source} • {threat.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${getThreatLevelColor(threat.severity)}`}>
                  {threat.severity}
                </div>
                <div className="text-xs text-muted-foreground">{threat.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
