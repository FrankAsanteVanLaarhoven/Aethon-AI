'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Target, Shield, AlertTriangle } from 'lucide-react'

export function CompetitiveIntelligence() {
  const competitors = [
    {
      name: 'Competitor A',
      marketShare: '23.5%',
      threat: 'high',
      status: 'active',
      icon: AlertTriangle,
      color: 'neon-red'
    },
    {
      name: 'Competitor B',
      marketShare: '18.2%',
      threat: 'medium',
      status: 'monitoring',
      icon: Target,
      color: 'neon-yellow'
    },
    {
      name: 'Competitor C',
      marketShare: '12.8%',
      threat: 'low',
      status: 'stable',
      icon: Shield,
      color: 'neon-green'
    },
    {
      name: 'Emerging Threat',
      marketShare: '5.1%',
      threat: 'rising',
      status: 'watching',
      icon: Eye,
      color: 'neon-blue'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-6">Competitive Intelligence</h3>
      
      <div className="space-y-4">
        {competitors.map((competitor, index) => {
          const Icon = competitor.icon
          return (
            <motion.div
              key={competitor.name}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-${competitor.color}/20 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${competitor.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{competitor.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{competitor.status}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">{competitor.marketShare}</p>
                <p className={`text-sm capitalize ${
                  competitor.threat === 'high' ? 'text-neon-red' :
                  competitor.threat === 'medium' ? 'text-neon-yellow' :
                  competitor.threat === 'low' ? 'text-neon-green' :
                  'text-neon-blue'
                }`}>
                  {competitor.threat} threat
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
