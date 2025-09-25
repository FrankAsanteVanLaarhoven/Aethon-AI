'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Infinity, Atom, Sparkles, Globe2, Cpu, Lightbulb } from 'lucide-react'

export function Phase4Features() {
  const features = [
    {
      icon: Infinity,
      title: 'Infinite Scalability',
      description: 'Unlimited processing power through quantum-classical hybrid computing',
      status: 'Research',
      color: 'text-neon-blue'
    },
    {
      icon: Atom,
      title: 'Molecular Intelligence',
      description: 'DNA-based data storage and processing for unprecedented density',
      status: 'Research',
      color: 'text-neon-green'
    },
    {
      icon: Sparkles,
      title: 'Consciousness Simulation',
      description: 'Advanced AI consciousness for intuitive decision making',
      status: 'Research',
      color: 'text-neon-yellow'
    },
    {
      icon: Globe2,
      title: 'Planetary Intelligence',
      description: 'Global-scale AI network monitoring entire planet systems',
      status: 'Research',
      color: 'text-neon-purple'
    },
    {
      icon: Cpu,
      title: 'Neural-Quantum Fusion',
      description: 'Hybrid quantum-neural processing for exponential capabilities',
      status: 'Research',
      color: 'text-neon-cyan'
    },
    {
      icon: Lightbulb,
      title: 'Creative Intelligence',
      description: 'AI that generates novel solutions and breakthrough innovations',
      status: 'Research',
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
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          Phase 4: Future Vision
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revolutionary concepts that will shape the next century of artificial intelligence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-neon-purple/50 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <feature.icon className={`w-8 h-8 ${feature.color}`} />
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <span className="text-sm text-neon-purple font-medium">{feature.status}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
