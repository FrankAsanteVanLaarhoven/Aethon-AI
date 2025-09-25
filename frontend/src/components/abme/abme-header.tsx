'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Brain, Target, TrendingUp, Activity, Shield } from 'lucide-react'

export function ABMEHeader() {
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
          className="inline-flex items-center space-x-2 bg-neon-blue/10 px-4 py-2 rounded-full border border-neon-blue/20"
        >
          <Zap className="w-5 h-5 text-neon-blue" />
          <span className="text-sm font-medium text-neon-blue">ABME System</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
          Autonomous Business Model Execution
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Revolutionary AI system for 24/7 autonomous strategy execution with real-time adaptation, 
          optimization, and self-healing capabilities that transform business operations.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Brain className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-blue">24/7</div>
          <div className="text-sm text-muted-foreground">Autonomous Operation</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Target className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-green">99.9%</div>
          <div className="text-sm text-muted-foreground">Execution Accuracy</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <TrendingUp className="w-8 h-8 text-neon-purple mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-purple">300%</div>
          <div className="text-sm text-muted-foreground">Efficiency Gain</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
        >
          <Shield className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-cyan">Zero</div>
          <div className="text-sm text-muted-foreground">Downtime</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <div className="flex items-center space-x-2 bg-neon-green/10 px-3 py-1 rounded-full border border-neon-green/20">
          <Activity className="w-4 h-4 text-neon-green" />
          <span className="text-sm text-neon-green">Real-time Adaptation</span>
        </div>
        <div className="flex items-center space-x-2 bg-neon-purple/10 px-3 py-1 rounded-full border border-neon-purple/20">
          <Brain className="w-4 h-4 text-neon-purple" />
          <span className="text-sm text-neon-purple">Self-Healing</span>
        </div>
        <div className="flex items-center space-x-2 bg-neon-blue/10 px-3 py-1 rounded-full border border-neon-blue/20">
          <Zap className="w-4 h-4 text-neon-blue" />
          <span className="text-sm text-neon-blue">Instant Optimization</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
