'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Globe, BarChart3, TrendingUp, Eye, Cpu } from 'lucide-react'

export function Phase2Features() {
  const features = [
    {
      icon: Users,
      title: 'Multi-Agent Orchestration',
      description: 'Intelligent agent coordination for complex task execution and decision making',
      status: 'Active',
      color: 'text-neon-blue'
    },
    {
      icon: Globe,
      title: 'Global Market Intelligence',
      description: 'Real-time monitoring of 200+ global markets with instant threat detection',
      status: 'Active',
      color: 'text-neon-green'
    },
    {
      icon: BarChart3,
      title: 'Advanced Visualization',
      description: 'Interactive 3D data visualization with immersive analytics experience',
      status: 'Active',
      color: 'text-neon-yellow'
    },
    {
      icon: TrendingUp,
      title: 'Dynamic Risk Assessment',
      description: 'Continuous risk monitoring with automated mitigation strategies',
      status: 'Active',
      color: 'text-neon-purple'
    },
    {
      icon: Eye,
      title: 'Predictive Threat Detection',
      description: 'AI-powered early warning system for market disruptions and opportunities',
      status: 'Active',
      color: 'text-neon-cyan'
    },
    {
      icon: Cpu,
      title: 'Quantum-Ready Architecture',
      description: 'Future-proof infrastructure designed for quantum computing integration',
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
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">
          Phase 2: Advanced Analytics & Automation
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enhanced capabilities for sophisticated analysis and automated decision making
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass-premium rounded-xl p-6 shadow-premium-green hover:shadow-premium-glow transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <span className={`text-sm font-medium ${
                  feature.status === 'Active' ? 'text-neon-green' :
                  feature.status === 'In Development' ? 'text-neon-yellow' :
                  'text-neon-blue'
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
