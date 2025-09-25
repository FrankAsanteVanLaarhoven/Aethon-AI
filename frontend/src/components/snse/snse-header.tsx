'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Target, Zap, Globe, AlertTriangle, CheckCircle } from 'lucide-react'

export function SNSEHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-6"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-neon-red/10 px-4 py-2 rounded-full border border-neon-red/20"
        >
          <Shield className="w-5 h-5 text-neon-red" />
          <span className="text-sm font-medium text-neon-red">SNSE System</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-red via-neon-yellow to-neon-blue bg-clip-text text-transparent">
          Sovereign National Security Engine
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          World's first AI system providing complete national security infrastructure with 
          sovereign data control, military-grade encryption, and autonomous threat detection.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Shield className="w-8 h-8 text-neon-red mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-red">99.99%</div>
          <div className="text-sm text-muted-foreground">Security Coverage</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Lock className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-yellow">256-bit</div>
          <div className="text-sm text-muted-foreground">Quantum Encryption</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Eye className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-blue">24/7</div>
          <div className="text-sm text-muted-foreground">Threat Monitoring</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Globe className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-green">100%</div>
          <div className="text-sm text-muted-foreground">Data Sovereignty</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <div className="flex items-center space-x-2 bg-neon-red/10 px-3 py-1 rounded-full border border-neon-red/20">
          <Shield className="w-4 h-4 text-neon-red" />
          <span className="text-sm text-neon-red">Military-Grade Security</span>
        </div>
        <div className="flex items-center space-x-2 bg-neon-yellow/10 px-3 py-1 rounded-full border border-neon-yellow/20">
          <Lock className="w-4 h-4 text-neon-yellow" />
          <span className="text-sm text-neon-yellow">Quantum Encryption</span>
        </div>
        <div className="flex items-center space-x-2 bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/20">
          <Target className="w-4 h-4 text-neon-blue" />
          <span className="text-sm text-neon-blue">Autonomous Defense</span>
        </div>
        <div className="flex items-center space-x-2 bg-neon-green/10 px-3 py-1 rounded-full border border-neon-green/20">
          <Globe className="w-4 h-4 text-neon-green" />
          <span className="text-sm text-neon-green">Sovereign Control</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
