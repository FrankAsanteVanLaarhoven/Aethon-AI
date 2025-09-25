'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Lock, Shield, Database, Server, Cloud, CheckCircle, AlertTriangle } from 'lucide-react'

export function DataSovereignty() {
  const [sovereigntyLevel, setSovereigntyLevel] = useState(100)
  const [dataLocations, setDataLocations] = useState([
    { country: 'United States', percentage: 45, status: 'secure', servers: 12 },
    { country: 'European Union', percentage: 30, status: 'secure', servers: 8 },
    { country: 'United Kingdom', percentage: 15, status: 'secure', servers: 4 },
    { country: 'Canada', percentage: 10, status: 'secure', servers: 3 }
  ])

  const sovereigntyMetrics = [
    { name: 'Data Residency', value: 100, unit: '%', status: 'compliant', color: 'text-neon-green' },
    { name: 'Encryption Coverage', value: 100, unit: '%', status: 'compliant', color: 'text-neon-green' },
    { name: 'Access Control', value: 99.8, unit: '%', status: 'compliant', color: 'text-neon-green' },
    { name: 'Audit Compliance', value: 100, unit: '%', status: 'compliant', color: 'text-neon-green' }
  ]

  const dataCategories = [
    { name: 'Classified Information', size: '2.4TB', encryption: 'AES-256', status: 'secure', color: 'text-neon-red' },
    { name: 'Sensitive Data', size: '15.7TB', encryption: 'AES-256', status: 'secure', color: 'text-neon-yellow' },
    { name: 'Public Records', size: '89.2TB', encryption: 'AES-128', status: 'secure', color: 'text-neon-blue' },
    { name: 'Operational Data', size: '45.1TB', encryption: 'AES-256', status: 'secure', color: 'text-neon-green' }
  ]

  const complianceStandards = [
    { name: 'GDPR', status: 'compliant', coverage: 100, color: 'text-neon-green' },
    { name: 'CCPA', status: 'compliant', coverage: 100, color: 'text-neon-green' },
    { name: 'SOX', status: 'compliant', coverage: 100, color: 'text-neon-green' },
    { name: 'HIPAA', status: 'compliant', coverage: 100, color: 'text-neon-green' },
    { name: 'ISO 27001', status: 'compliant', coverage: 100, color: 'text-neon-green' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSovereigntyLevel(prev => Math.min(100, prev + Math.random() * 0.1))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'secure': return CheckCircle
      case 'warning': return AlertTriangle
      default: return Shield
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'secure': return 'text-neon-green'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
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
            <h2 className="text-2xl font-bold mb-2">Data Sovereignty</h2>
            <p className="text-muted-foreground">Complete control over data location, access, and governance</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">100% Sovereign</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Distribution</h3>
            <div className="space-y-3">
              {dataLocations.map((location, index) => (
                <motion.div
                  key={location.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-neon-blue" />
                    <div>
                      <div className="font-medium text-sm">{location.country}</div>
                      <div className="text-xs text-muted-foreground">{location.servers} servers</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-neon-blue">{location.percentage}%</div>
                    <div className="text-xs text-muted-foreground">{location.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sovereignty Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              {sovereigntyMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-3 bg-background/50 rounded-lg border border-border"
                >
                  <div className={`text-xl font-bold ${metric.color} mb-1`}>
                    {metric.value}{metric.unit}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{metric.name}</div>
                  <div className="text-xs text-neon-green">{metric.status}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Data Categories</h3>
          <div className="space-y-3">
            {dataCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <Database className={`w-5 h-5 ${category.color}`} />
                  <div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.encryption}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{category.size}</div>
                  <div className="text-xs text-muted-foreground">{category.status}</div>
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
          <h3 className="text-lg font-semibold mb-4">Compliance Standards</h3>
          <div className="space-y-3">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  {React.createElement(getStatusIcon(standard.status), {
                    className: `w-5 h-5 ${getStatusColor(standard.status)}`
                  })}
                  <div>
                    <div className="font-medium text-sm">{standard.name}</div>
                    <div className="text-xs text-muted-foreground">Coverage: {standard.coverage}%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getStatusColor(standard.status)}`}>
                    {standard.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
