'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, Target, TrendingUp } from 'lucide-react'

export function StrategicInsights() {
  const insights = [
    {
      title: 'Market Opportunity',
      description: 'Emerging markets show 15% growth potential in Q2',
      impact: 'high',
      confidence: '87%',
      icon: Lightbulb,
      color: 'neon-green'
    },
    {
      title: 'Risk Assessment',
      description: 'Regulatory changes may affect 3 core products',
      impact: 'medium',
      confidence: '92%',
      icon: Target,
      color: 'neon-yellow'
    },
    {
      title: 'Competitive Advantage',
      description: 'AI capabilities provide 2-year lead over competitors',
      impact: 'high',
      confidence: '78%',
      icon: Brain,
      color: 'neon-blue'
    },
    {
      title: 'Growth Strategy',
      description: 'Expansion into European markets shows 25% ROI potential',
      impact: 'high',
      confidence: '85%',
      icon: TrendingUp,
      color: 'neon-purple'
    }
  ]

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-6">Strategic Insights</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <motion.div
              key={insight.title}
              className="p-4 border border-border rounded-lg hover:border-neon-blue/50 transition-all duration-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 bg-${insight.color}/20 rounded-lg flex-shrink-0`}>
                  <Icon className={`w-5 h-5 text-${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{insight.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.impact === 'high' ? 'bg-neon-green/20 text-neon-green' :
                      insight.impact === 'medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                      'bg-neon-red/20 text-neon-red'
                    }`}>
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <span className="text-sm font-semibold text-foreground">{insight.confidence}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
