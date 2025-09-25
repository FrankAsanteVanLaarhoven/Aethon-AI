'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react'

export function RegulatoryPredictions() {
  const [selectedRegion, setSelectedRegion] = useState('Global')

  const predictions = [
    {
      id: 1,
      title: 'EU AI Act Implementation',
      region: 'Europe',
      impact: 'High',
      probability: 85,
      timeline: 'Q2 2025',
      status: 'Pending',
      description: 'Comprehensive AI regulation framework affecting all AI systems',
      icon: AlertCircle,
      color: 'text-neon-yellow'
    },
    {
      id: 2,
      title: 'US Data Privacy Legislation',
      region: 'North America',
      impact: 'Medium',
      probability: 72,
      timeline: 'Q3 2025',
      status: 'In Review',
      description: 'Federal data protection standards for consumer privacy',
      icon: FileText,
      color: 'text-neon-blue'
    },
    {
      id: 3,
      title: 'China Cybersecurity Review',
      region: 'Asia',
      impact: 'High',
      probability: 90,
      timeline: 'Q1 2025',
      status: 'Active',
      description: 'Enhanced cybersecurity requirements for foreign technology',
      icon: CheckCircle,
      color: 'text-neon-green'
    },
    {
      id: 4,
      title: 'UK Digital Markets Act',
      region: 'Europe',
      impact: 'Medium',
      probability: 68,
      timeline: 'Q4 2025',
      status: 'Draft',
      description: 'Competition rules for digital platforms and services',
      icon: Clock,
      color: 'text-neon-purple'
    }
  ]

  const regions = ['Global', 'Europe', 'North America', 'Asia', 'Latin America']

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-red-500 bg-red-500/10'
      case 'Medium':
        return 'text-neon-yellow bg-neon-yellow/10'
      case 'Low':
        return 'text-neon-green bg-neon-green/10'
      default:
        return 'text-muted-foreground bg-muted/10'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-neon-green'
      case 'Pending':
        return 'text-neon-yellow'
      case 'In Review':
        return 'text-neon-blue'
      case 'Draft':
        return 'text-neon-purple'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
          Regulatory Predictions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-powered forecasting of regulatory changes and their potential business impact
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRegion === region
                ? 'bg-neon-blue text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions
          .filter(pred => selectedRegion === 'Global' || pred.region === selectedRegion)
          .map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <prediction.icon className={`w-6 h-6 ${prediction.color}`} />
                  <div>
                    <h3 className="font-semibold text-lg">{prediction.title}</h3>
                    <p className="text-sm text-muted-foreground">{prediction.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neon-blue">{prediction.probability}%</div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{prediction.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(prediction.impact)}`}>
                    {prediction.impact} Impact
                  </span>
                  <span className={`text-sm font-medium ${getStatusColor(prediction.status)}`}>
                    {prediction.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {prediction.timeline}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Implementation Probability</span>
                  <span>{prediction.probability}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-neon-blue h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${prediction.probability}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}
