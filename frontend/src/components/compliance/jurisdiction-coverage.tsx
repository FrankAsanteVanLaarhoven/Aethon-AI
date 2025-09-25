'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, MapPin, CheckCircle, AlertTriangle, Clock, FileText, Shield, Zap } from 'lucide-react'

interface Jurisdiction {
  id: string
  name: string
  region: string
  coverage: number
  regulations: number
  status: 'active' | 'pending' | 'maintenance' | 'error'
  lastUpdate: string
  complianceRate: number
}

interface RegionalStats {
  region: string
  jurisdictions: number
  totalRegulations: number
  avgCompliance: number
  status: 'excellent' | 'good' | 'warning' | 'critical'
}

export function JurisdictionCoverage() {
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([])
  const [regionalStats, setRegionalStats] = useState<RegionalStats[]>([])

  useEffect(() => {
    const initialJurisdictions: Jurisdiction[] = [
      {
        id: 'jur-001',
        name: 'United States',
        region: 'North America',
        coverage: 100,
        regulations: 342,
        status: 'active',
        lastUpdate: '2 min ago',
        complianceRate: 99.8
      },
      {
        id: 'jur-002',
        name: 'European Union',
        region: 'Europe',
        coverage: 100,
        regulations: 567,
        status: 'active',
        lastUpdate: '1 min ago',
        complianceRate: 99.9
      },
      {
        id: 'jur-003',
        name: 'United Kingdom',
        region: 'Europe',
        coverage: 100,
        regulations: 234,
        status: 'active',
        lastUpdate: '3 min ago',
        complianceRate: 99.7
      },
      {
        id: 'jur-004',
        name: 'Canada',
        region: 'North America',
        coverage: 98.5,
        regulations: 189,
        status: 'active',
        lastUpdate: '5 min ago',
        complianceRate: 99.5
      },
      {
        id: 'jur-005',
        name: 'Australia',
        region: 'Asia Pacific',
        coverage: 100,
        regulations: 156,
        status: 'active',
        lastUpdate: '4 min ago',
        complianceRate: 99.6
      },
      {
        id: 'jur-006',
        name: 'Japan',
        region: 'Asia Pacific',
        coverage: 97.2,
        regulations: 198,
        status: 'maintenance',
        lastUpdate: '1 hour ago',
        complianceRate: 98.9
      },
      {
        id: 'jur-007',
        name: 'Brazil',
        region: 'Latin America',
        coverage: 95.8,
        regulations: 123,
        status: 'active',
        lastUpdate: '6 min ago',
        complianceRate: 99.2
      },
      {
        id: 'jur-008',
        name: 'Singapore',
        region: 'Asia Pacific',
        coverage: 100,
        regulations: 87,
        status: 'active',
        lastUpdate: '2 min ago',
        complianceRate: 99.9
      }
    ]

    const initialRegionalStats: RegionalStats[] = [
      {
        region: 'North America',
        jurisdictions: 3,
        totalRegulations: 721,
        avgCompliance: 99.6,
        status: 'excellent'
      },
      {
        region: 'Europe',
        jurisdictions: 8,
        totalRegulations: 1245,
        avgCompliance: 99.7,
        status: 'excellent'
      },
      {
        region: 'Asia Pacific',
        jurisdictions: 12,
        totalRegulations: 892,
        avgCompliance: 99.4,
        status: 'excellent'
      },
      {
        region: 'Latin America',
        jurisdictions: 7,
        totalRegulations: 456,
        avgCompliance: 99.1,
        status: 'good'
      },
      {
        region: 'Middle East & Africa',
        jurisdictions: 9,
        totalRegulations: 334,
        avgCompliance: 98.8,
        status: 'good'
      }
    ]

    setJurisdictions(initialJurisdictions)
    setRegionalStats(initialRegionalStats)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setJurisdictions(prev => prev.map(jur => ({
        ...jur,
        lastUpdate: 'Just now'
      })))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />
      case 'error': return <AlertTriangle className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-green'
      case 'pending': return 'text-neon-blue'
      case 'maintenance': return 'text-neon-yellow'
      case 'error': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-neon-green/10'
      case 'pending': return 'bg-neon-blue/10'
      case 'maintenance': return 'bg-neon-yellow/10'
      case 'error': return 'bg-neon-red/10'
      default: return 'bg-muted/10'
    }
  }

  const getRegionalStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-neon-green'
      case 'good': return 'text-neon-blue'
      case 'warning': return 'text-neon-yellow'
      case 'critical': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Jurisdiction Coverage</h2>
            <p className="text-muted-foreground">Global regulatory coverage and compliance status</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {jurisdictions.length} Jurisdictions
            </span>
          </div>
        </div>

        {/* Regional Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {regionalStats.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="text-center">
                <div className="text-sm font-medium mb-2">{region.region}</div>
                <div className="text-2xl font-bold text-neon-blue mb-1">{region.jurisdictions}</div>
                <div className="text-xs text-muted-foreground mb-2">jurisdictions</div>
                <div className={`text-sm font-bold ${getRegionalStatusColor(region.status)}`}>
                  {region.avgCompliance}%
                </div>
                <div className="text-xs text-muted-foreground">{region.totalRegulations} regulations</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Jurisdiction Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jurisdictions.map((jurisdiction, index) => (
            <motion.div
              key={jurisdiction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getStatusBg(jurisdiction.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(jurisdiction.status)}
                  <div>
                    <div className="font-medium text-sm">{jurisdiction.name}</div>
                    <div className="text-xs text-muted-foreground">{jurisdiction.region}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-neon-green">
                    {jurisdiction.complianceRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">compliance</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-blue">{jurisdiction.coverage}%</div>
                  <div className="text-xs text-muted-foreground">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neon-yellow">{jurisdiction.regulations}</div>
                  <div className="text-xs text-muted-foreground">Regulations</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                Last update: {jurisdiction.lastUpdate}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
