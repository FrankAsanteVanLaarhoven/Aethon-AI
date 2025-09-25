'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Globe, Building } from 'lucide-react'

export function MarketAnalysis() {
  const marketData = [
    {
      sector: 'Technology',
      value: '$2.4T',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'neon-green'
    },
    {
      sector: 'Finance',
      value: '$1.8T',
      change: '+2.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'neon-blue'
    },
    {
      sector: 'Healthcare',
      value: '$1.2T',
      change: '-0.8%',
      trend: 'down',
      icon: Building,
      color: 'neon-red'
    },
    {
      sector: 'Global Markets',
      value: '$8.9T',
      change: '+3.4%',
      trend: 'up',
      icon: Globe,
      color: 'neon-purple'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-6">Market Analysis</h3>
      
      <div className="space-y-4">
        {marketData.map((market, index) => {
          const Icon = market.icon
          return (
            <motion.div
              key={market.sector}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-${market.color}/20 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${market.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{market.sector}</p>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">{market.value}</p>
                <div className={`flex items-center space-x-1 text-sm ${
                  market.trend === 'up' ? 'text-neon-green' : 'text-neon-red'
                }`}>
                  {market.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{market.change}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
