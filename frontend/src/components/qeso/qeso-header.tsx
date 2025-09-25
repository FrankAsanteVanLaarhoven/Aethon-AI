'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Atom, Zap, Target, Brain, Cpu, Sparkles } from 'lucide-react'

export function QESOHeader() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <Atom className="w-8 h-8 text-neon-blue" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            QESO Intelligence
          </h1>
          <Sparkles className="w-8 h-8 text-neon-purple" />
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Quantum-Enhanced Strategic Optimization Engine for exponential decision-making capabilities
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
          <Cpu className="w-12 h-12 text-neon-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Quantum Processing</h3>
          <p className="text-sm text-muted-foreground">
            Exponential computational power for complex strategic optimization
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
          <Brain className="w-12 h-12 text-neon-purple mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Strategic Intelligence</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered strategic analysis with quantum-enhanced decision trees
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
          <Target className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Precision Optimization</h3>
          <p className="text-sm text-muted-foreground">
            Multi-dimensional optimization with quantum advantage algorithms
          </p>
        </div>
      </motion.div>
    </div>
  )
}
