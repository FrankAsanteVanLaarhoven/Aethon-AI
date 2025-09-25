'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Layers, Zap, Shield, Brain, Star } from 'lucide-react'

export function Phase3Features() {
  const features = [
    {
      icon: Rocket,
      title: 'Autonomous Decision Engine',
      description: 'Self-learning AI that makes strategic decisions with minimal human intervention',
      status: 'Active',
      color: 'text-neon-blue'
    },
    {
      icon: Layers,
      title: 'Blockchain Integration',
      description: 'Immutable data verification and decentralized intelligence sharing',
      status: 'Active',
      color: 'text-neon-green'
    },
    {
      icon: Zap,
      title: 'Edge Computing Network',
      description: 'Distributed processing across global edge nodes for ultra-low latency',
      status: 'Active',
      color: 'text-neon-yellow'
    },
    {
      icon: Shield,
      title: 'Zero-Trust Security',
      description: 'Advanced security model with continuous verification and adaptive controls',
      status: 'Active',
      color: 'text-neon-purple'
    },
    {
      icon: Brain,
      title: 'Neural Network Optimization',
      description: 'Self-optimizing AI models that improve performance automatically',
      status: 'Active',
      color: 'text-neon-cyan'
    },
    {
      icon: Star,
      title: 'Quantum AI Integration',
      description: 'Next-generation quantum algorithms for exponential processing power',
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
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-yellow to-neon-purple bg-clip-text text-transparent">
          Phase 3: Next-Generation Intelligence
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revolutionary features that will redefine the future of strategic intelligence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-premium rounded-xl p-6 shadow-premium-purple hover:shadow-premium-glow transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <span className={`text-sm font-medium ${
                  feature.status === 'Active' ? 'text-neon-green' :
                  feature.status === 'In Development' ? 'text-neon-yellow' :
                  feature.status === 'Planned' ? 'text-neon-blue' :
                  'text-neon-purple'
                }`}>
                  {feature.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
