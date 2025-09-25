'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, MapPin, Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

export function JurisdictionCoverage() {
  const [selectedRegion, setSelectedRegion] = useState('Global')

  const jurisdictions = [
    {
      name: 'United States',
      region: 'North America',
      coverage: 95,
      regulations: 1247,
      pending: 89,
      risk: 'Medium',
      icon: Shield,
      color: 'text-neon-blue'
    },
    {
      name: 'European Union',
      region: 'Europe',
      coverage: 98,
      regulations: 2156,
      pending: 156,
      risk: 'High',
      icon: CheckCircle,
      color: 'text-neon-green'
    },
    {
      name: 'China',
      region: 'Asia',
      coverage: 87,
      regulations: 892,
      pending: 67,
      risk: 'High',
      icon: AlertTriangle,
      color: 'text-neon-yellow'
    },
    {
      name: 'United Kingdom',
      region: 'Europe',
      coverage: 92,
      regulations: 743,
      pending: 45,
      risk: 'Medium',
      icon: Clock,
      color: 'text-neon-purple'
    },
    {
      name: 'Japan',
      region: 'Asia',
      coverage: 89,
      regulations: 567,
      pending: 34,
      risk: 'Low',
      icon: MapPin,
      color: 'text-neon-cyan'
    },
    {
      name: 'Canada',
      region: 'North America',
      coverage: 91,
      regulations: 445,
      pending: 23,
      risk: 'Low',
      icon: Globe,
      color: 'text-neon-pink'
    }
  ]

  const regions = ['Global', 'North America', 'Europe', 'Asia', 'Latin America', 'Africa']

  const getRiskColor = (risk: string) => {
    switch (risk) {
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

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 95) return 'text-neon-green'
    if (coverage >= 90) return 'text-neon-yellow'
    if (coverage >= 85) return 'text-neon-blue'
    return 'text-red-500'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Jurisdiction Coverage
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive regulatory monitoring across global jurisdictions with real-time updates
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedRegion === region
                ? 'bg-neon-purple text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {jurisdictions
          .filter(jur => selectedRegion === 'Global' || jur.region === selectedRegion)
          .map((jurisdiction, index) => (
            <motion.div
              key={jurisdiction.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <jurisdiction.icon className={`w-8 h-8 ${jurisdiction.color}`} />
                  <div>
                    <h3 className="font-semibold text-lg">{jurisdiction.name}</h3>
                    <p className="text-sm text-muted-foreground">{jurisdiction.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getCoverageColor(jurisdiction.coverage)}`}>
                    {jurisdiction.coverage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Coverage</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-neon-blue">{jurisdiction.regulations}</div>
                  <div className="text-xs text-muted-foreground">Active Regulations</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-neon-yellow">{jurisdiction.pending}</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(jurisdiction.risk)}`}>
                    {jurisdiction.risk} Risk
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Regulatory Coverage</span>
                  <span>{jurisdiction.coverage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      jurisdiction.coverage >= 95 ? 'bg-neon-green' :
                      jurisdiction.coverage >= 90 ? 'bg-neon-yellow' :
                      jurisdiction.coverage >= 85 ? 'bg-neon-blue' : 'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${jurisdiction.coverage}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString('en-US')}
              </div>
            </motion.div>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Coverage Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {jurisdictions.filter(j => j.coverage >= 95).length}
            </div>
            <div className="text-sm text-muted-foreground">Excellent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow">
              {jurisdictions.filter(j => j.coverage >= 90 && j.coverage < 95).length}
            </div>
            <div className="text-sm text-muted-foreground">Good</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {jurisdictions.filter(j => j.coverage >= 85 && j.coverage < 90).length}
            </div>
            <div className="text-sm text-muted-foreground">Fair</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">
              {jurisdictions.filter(j => j.coverage < 85).length}
            </div>
            <div className="text-sm text-muted-foreground">Needs Attention</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
