'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Shield, Database, Network } from 'lucide-react'

export function Phase1Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence Engine',
      description: 'Advanced machine learning algorithms for real-time data analysis and strategic insights',
      status: 'Active',
      color: 'text-neon-blue'
    },
    {
      icon: Zap,
      title: 'Real-time Data Processing',
      description: 'Sub-second response times for critical business intelligence and market analysis',
      status: 'Active',
      color: 'text-neon-green'
    },
    {
      icon: Target,
      title: 'Predictive Analytics',
      description: 'Forecast market trends and business outcomes with 95% accuracy',
      status: 'Active',
      color: 'text-neon-yellow'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption and security protocols for maximum data protection',
      status: 'Active',
      color: 'text-neon-purple'
    },
    {
      icon: Database,
      title: 'Multi-Source Data Integration',
      description: 'Seamlessly connect and analyze data from 100+ sources simultaneously',
      status: 'Active',
      color: 'text-neon-cyan'
    },
    {
      icon: Network,
      title: 'Distributed Computing',
      description: 'Scalable architecture supporting millions of concurrent operations',
      status: 'Active',
      color: 'text-neon-pink'
    }
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
          Phase 1: Core Intelligence Platform
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Foundation features that power the entire Strategic AI Platform ecosystem
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-premium rounded-xl p-6 shadow-premium-blue hover:shadow-premium-glow transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <span className="text-sm text-neon-green font-medium">{feature.status}</span>
              </div>
            </div>
            <p className="text-sm text-slate-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
