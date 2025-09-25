'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Globe, AlertTriangle, Users, FileText } from 'lucide-react'

export function ARPEHeader() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <Shield className="w-8 h-8 text-neon-blue" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
            ARPE Intelligence
          </h1>
          <Globe className="w-8 h-8 text-neon-green" />
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Advanced Regulatory & Political Intelligence Engine for comprehensive policy analysis and risk assessment
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
          <TrendingUp className="w-12 h-12 text-neon-blue mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Regulatory Forecasting</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered predictions of regulatory changes and policy impacts
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
          <Users className="w-12 h-12 text-neon-green mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Political Sentiment</h3>
          <p className="text-sm text-muted-foreground">
            Real-time analysis of political climate and stakeholder positions
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-neon-yellow mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive risk analysis for regulatory and political exposure
          </p>
        </div>
      </motion.div>
    </div>
  )
}
