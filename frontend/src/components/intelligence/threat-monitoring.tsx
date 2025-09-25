'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react'

export function ThreatMonitoring() {
  const threats = [
    {
      id: 1,
      type: 'APT',
      severity: 'high',
      status: 'monitoring',
      description: 'Advanced Persistent Threat detected in network'
    },
    {
      id: 2,
      type: 'Malware',
      severity: 'medium',
      status: 'contained',
      description: 'Malware signature identified and contained'
    },
    {
      id: 3,
      type: 'DDoS',
      severity: 'low',
      status: 'resolved',
      description: 'DDoS attack mitigated successfully'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Threat Monitoring</h3>
      <div className="space-y-4">
        {threats.map((threat, index) => (
          <motion.div
            key={threat.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-neon-blue" />
              <div>
                <span className="font-medium text-sm">{threat.type}</span>
                <p className="text-xs text-muted-foreground">{threat.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded ${
                threat.severity === 'high' ? 'bg-neon-red/20 text-neon-red' :
                threat.severity === 'medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                'bg-neon-green/20 text-neon-green'
              }`}>
                {threat.severity}
              </span>
              <span className="text-xs text-muted-foreground">{threat.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
