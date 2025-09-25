'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Globe, FileText, CheckCircle, AlertTriangle, Clock, Zap } from 'lucide-react'

export function ComplianceHeader() {
  const metrics = [
    { label: 'Jurisdictions Covered', value: '247', icon: Globe, color: 'text-neon-blue' },
    { label: 'Compliance Rate', value: '99.9%', icon: CheckCircle, color: 'text-neon-green' },
    { label: 'Active Regulations', value: '1,847', icon: FileText, color: 'text-neon-yellow' },
    { label: 'Automation Level', value: '98.5%', icon: Zap, color: 'text-neon-purple' }
  ]

  const complianceStatus = [
    { region: 'North America', status: 'compliant', coverage: 100, regulations: 342 },
    { region: 'Europe', status: 'compliant', coverage: 100, regulations: 567 },
    { region: 'Asia Pacific', status: 'compliant', coverage: 99.8, regulations: 423 },
    { region: 'Latin America', status: 'compliant', coverage: 98.7, regulations: 234 },
    { region: 'Middle East & Africa', status: 'compliant', coverage: 97.2, regulations: 281 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent"
          >
            Universal Compliance Automation Network
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            All-jurisdiction compliance automation with 99.9% automated compliance management across global regulatory frameworks
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center space-x-2 px-4 py-2 bg-neon-green/10 rounded-lg border border-neon-green/20"
        >
          <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
          <span className="text-sm font-medium text-neon-green">Fully Automated</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            className="text-center p-4 bg-background/50 rounded-lg border border-border hover:border-neon-green/30 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-neon-green/10 rounded-lg">
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="bg-gradient-to-r from-neon-green/10 to-neon-blue/10 rounded-lg border border-neon-green/20 p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-neon-green" />
          <h3 className="text-xl font-semibold">Global Compliance Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {complianceStatus.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="text-center p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="text-sm font-medium mb-1">{region.region}</div>
              <div className="text-lg font-bold text-neon-green mb-1">{region.coverage}%</div>
              <div className="text-xs text-muted-foreground">{region.regulations} regulations</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
