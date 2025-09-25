'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Shield, Brain, Rocket, Star } from 'lucide-react'

export function RevolutionaryFeaturesHeader() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <Rocket className="w-8 h-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Revolutionary Features
          </h1>
          <Star className="w-8 h-8 text-emerald-400" />
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the cutting-edge capabilities that set our Strategic AI Platform apart from the competition
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-premium rounded-xl p-6 text-center shadow-premium-blue hover:shadow-premium-glow transition-all duration-300">
          <Zap className="w-12 h-12 text-neon-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">Real-time Intelligence</h3>
          <p className="text-sm text-slate-300">
            Instant data processing and analysis for immediate strategic insights
          </p>
        </div>

        <div className="glass-premium rounded-xl p-6 text-center shadow-premium-green hover:shadow-premium-glow transition-all duration-300">
          <Target className="w-12 h-12 text-neon-green mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">Precision Targeting</h3>
          <p className="text-sm text-slate-300">
            Advanced algorithms for pinpoint accuracy in market analysis
          </p>
        </div>

        <div className="glass-premium rounded-xl p-6 text-center shadow-premium-purple hover:shadow-premium-glow transition-all duration-300">
          <Shield className="w-12 h-12 text-neon-purple mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">Enterprise Security</h3>
          <p className="text-sm text-slate-300">
            Military-grade security protocols for maximum data protection
          </p>
        </div>
      </motion.div>
    </div>
  )
}
