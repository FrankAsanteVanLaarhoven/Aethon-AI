'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, Info, Globe } from 'lucide-react'

export function IntelligenceGrid() {
  const intelligenceItems = [
    {
      id: 1,
      title: 'Market Intelligence Update',
      type: 'market',
      priority: 'high',
      region: 'Global',
      timestamp: '2 minutes ago',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Security Threat Detected',
      type: 'security',
      priority: 'critical',
      region: 'North America',
      timestamp: '5 minutes ago',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Regulatory Compliance Update',
      type: 'regulatory',
      priority: 'medium',
      region: 'Europe',
      timestamp: '15 minutes ago',
      icon: <Info className="w-5 h-5" />
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Intelligence Grid</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {intelligenceItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {item.icon}
                <span className="font-medium text-sm">{item.title}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.priority === 'critical' ? 'bg-neon-red/20 text-neon-red' :
                item.priority === 'high' ? 'bg-neon-yellow/20 text-neon-yellow' :
                'bg-neon-blue/20 text-neon-blue'
              }`}>
                {item.priority}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.region}</span>
              <span>{item.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
