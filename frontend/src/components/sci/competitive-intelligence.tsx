'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, TrendingUp, TrendingDown, Target, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface Competitor {
  id: string
  name: string
  marketShare: number
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  recentActivity: string
  trend: 'up' | 'down' | 'stable'
  lastUpdate: string
}

interface IntelligenceAlert {
  id: string
  type: 'threat' | 'opportunity' | 'movement'
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  description: string
  competitor: string
  timestamp: string
}

export function CompetitiveIntelligence() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [alerts, setAlerts] = useState<IntelligenceAlert[]>([])
  const [totalThreats, setTotalThreats] = useState(0)

  useEffect(() => {
    const initialCompetitors: Competitor[] = [
      {
        id: 'comp-001',
        name: 'TechCorp Industries',
        marketShare: 23.4,
        threatLevel: 'High',
        recentActivity: 'New product launch',
        trend: 'up',
        lastUpdate: '2 min ago'
      },
      {
        id: 'comp-002',
        name: 'InnovateLabs',
        marketShare: 18.7,
        threatLevel: 'Medium',
        recentActivity: 'Partnership announcement',
        trend: 'stable',
        lastUpdate: '15 min ago'
      },
      {
        id: 'comp-003',
        name: 'FutureTech Solutions',
        marketShare: 12.3,
        threatLevel: 'Critical',
        recentActivity: 'Acquisition news',
        trend: 'up',
        lastUpdate: '1 hour ago'
      },
      {
        id: 'comp-004',
        name: 'Digital Dynamics',
        marketShare: 8.9,
        threatLevel: 'Low',
        recentActivity: 'Funding round',
        trend: 'down',
        lastUpdate: '3 hours ago'
      }
    ]

    const initialAlerts: IntelligenceAlert[] = [
      {
        id: 'alert-001',
        type: 'threat',
        severity: 'High',
        description: 'TechCorp launched competing product',
        competitor: 'TechCorp Industries',
        timestamp: '5 min ago'
      },
      {
        id: 'alert-002',
        type: 'opportunity',
        severity: 'Medium',
        description: 'Market gap identified in sector',
        competitor: 'Multiple',
        timestamp: '1 hour ago'
      },
      {
        id: 'alert-003',
        type: 'movement',
        severity: 'Critical',
        description: 'FutureTech acquired key supplier',
        competitor: 'FutureTech Solutions',
        timestamp: '2 hours ago'
      }
    ]

    setCompetitors(initialCompetitors)
    setAlerts(initialAlerts)
    setTotalThreats(initialCompetitors.filter(c => c.threatLevel === 'High' || c.threatLevel === 'Critical').length)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setCompetitors(prev => prev.map(comp => ({
        ...comp,
        lastUpdate: 'Just now'
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getThreatLevelBg = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-neon-red/10'
      case 'High': return 'bg-neon-yellow/10'
      case 'Medium': return 'bg-neon-blue/10'
      case 'Low': return 'bg-neon-green/10'
      default: return 'bg-muted/10'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'threat': return AlertTriangle
      case 'opportunity': return TrendingUp
      case 'movement': return Target
      default: return Eye
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-neon-red'
      case 'High': return 'text-neon-yellow'
      case 'Medium': return 'text-neon-blue'
      case 'Low': return 'text-neon-green'
      default: return 'text-muted-foreground'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-neon-red" />
      case 'down': return <TrendingDown className="h-3 w-3 text-neon-green" />
      case 'stable': return <div className="w-3 h-0.5 bg-neon-blue" />
      default: return <Clock className="h-3 w-3 text-muted-foreground" />
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
            <h2 className="text-xl font-bold mb-2">Competitive Intelligence</h2>
            <p className="text-muted-foreground">Real-time competitor monitoring</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-red animate-pulse" />
            <span className="text-sm font-medium text-neon-red">{totalThreats} Active Threats</span>
          </div>
        </div>

        {/* Competitor Overview */}
        <div className="space-y-3">
          {competitors.map((competitor, index) => (
            <motion.div
              key={competitor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-3 rounded-lg border border-border ${getThreatLevelBg(competitor.threatLevel)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="h-4 w-4 text-neon-blue" />
                  <div>
                    <div className="font-medium text-sm">{competitor.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {competitor.recentActivity} • {competitor.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(competitor.trend)}
                  <div className="text-right">
                    <div className="text-sm font-bold">{competitor.marketShare}%</div>
                    <div className={`text-xs font-medium ${getThreatLevelColor(competitor.threatLevel)}`}>
                      {competitor.threatLevel}
                    </div>
                  </div>
                </div>
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
        <h3 className="text-lg font-semibold mb-4">Intelligence Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getAlertIcon(alert.type), {
                  className: `h-4 w-4 ${getAlertColor(alert.severity)}`
                })}
                <div>
                  <div className="font-medium text-sm">{alert.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {alert.competitor} • {alert.timestamp}
                  </div>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full border ${
                alert.severity === 'Critical' ? 'bg-neon-red/10 text-neon-red border-neon-red/20' :
                alert.severity === 'High' ? 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20' :
                alert.severity === 'Medium' ? 'bg-neon-blue/10 text-neon-blue border-neon-blue/20' :
                'bg-neon-green/10 text-neon-green border-neon-green/20'
              }`}>
                {alert.severity}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
