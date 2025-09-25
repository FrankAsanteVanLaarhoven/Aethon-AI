'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, Activity, Shield, Globe, Zap, Users, CheckCircle } from 'lucide-react'

interface IntelligenceSource {
  id: string
  name: string
  type: 'satellite' | 'human' | 'signals' | 'cyber' | 'open'
  classification: 'Top Secret' | 'Secret' | 'Confidential' | 'Unclassified'
  reliability: number
  coverage: number
  lastUpdate: string
  status: 'active' | 'standby' | 'maintenance' | 'offline'
  location: string
  operator: string
}

interface IntelligenceMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function IntelligenceFusion() {
  const [sources, setSources] = useState<IntelligenceSource[]>([])
  const [metrics, setMetrics] = useState<IntelligenceMetric[]>([])
  const [fusionAccuracy, setFusionAccuracy] = useState(0)

  useEffect(() => {
    const initialSources: IntelligenceSource[] = [
      {
        id: 'intel-001',
        name: 'Satellite Constellation Alpha',
        type: 'satellite',
        classification: 'Top Secret',
        reliability: 98.5,
        coverage: 96.8,
        lastUpdate: '2 minutes ago',
        status: 'active',
        location: 'Low Earth Orbit',
        operator: 'Space Command'
      },
      {
        id: 'intel-002',
        name: 'Human Intelligence Network',
        type: 'human',
        classification: 'Secret',
        reliability: 94.2,
        coverage: 78.9,
        lastUpdate: '15 minutes ago',
        status: 'active',
        location: 'Multiple Regions',
        operator: 'Intelligence Division'
      },
      {
        id: 'intel-003',
        name: 'Signals Intelligence Array',
        type: 'signals',
        classification: 'Top Secret',
        reliability: 96.7,
        coverage: 89.3,
        lastUpdate: '5 minutes ago',
        status: 'active',
        location: 'Strategic Locations',
        operator: 'Signals Command'
      },
      {
        id: 'intel-004',
        name: 'Cyber Intelligence Platform',
        type: 'cyber',
        classification: 'Secret',
        reliability: 92.1,
        coverage: 85.6,
        lastUpdate: '10 minutes ago',
        status: 'standby',
        location: 'Cyber Operations Center',
        operator: 'Cyber Command'
      }
    ]

    const initialMetrics: IntelligenceMetric[] = [
      {
        name: 'Fusion Accuracy',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Source Coverage',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Processing Speed',
        value: 2.3,
        target: 5.0,
        trend: 'down',
        color: 'text-blue-300'
      },
      {
        name: 'Intelligence Quality',
        value: 95.7,
        target: 90,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setSources(initialSources)
    setMetrics(initialMetrics)
    setFusionAccuracy(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setFusionAccuracy(prev => Math.min(100, prev + Math.random() * 0.1))
      setSources(prev => prev.map(source => ({
        ...source,
        lastUpdate: 'Just now'
      })))
    }, 35000)

    return () => clearInterval(interval)
  }, [])

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'satellite': return <Globe className="h-4 w-4" />
      case 'human': return <Users className="h-4 w-4" />
      case 'signals': return <Zap className="h-4 w-4" />
      case 'cyber': return <Brain className="h-4 w-4" />
      case 'open': return <Activity className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'satellite': return 'text-blue-400'
      case 'human': return 'text-green-400'
      case 'signals': return 'text-blue-300'
      case 'cyber': return 'text-gray-300'
      case 'open': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Top Secret': return 'text-gray-300'
      case 'Secret': return 'text-blue-400'
      case 'Confidential': return 'text-blue-300'
      case 'Unclassified': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'standby': return 'text-blue-400'
      case 'maintenance': return 'text-blue-300'
      case 'offline': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'standby': return <Target className="h-4 w-4" />
      case 'maintenance': return <Activity className="h-4 w-4" />
      case 'offline': return <Shield className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Intelligence Fusion</h2>
            <p className="text-muted-foreground">Multi-source intelligence collection and analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {fusionAccuracy.toFixed(1)}% Fusion Accuracy
            </span>
          </div>
        </div>

        {/* Intelligence Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{metric.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-400' :
                  metric.trend === 'down' ? 'bg-gray-300' : 'bg-blue-400'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-lg font-bold ${metric.color}`}>
                  {metric.value}{metric.name.includes('Accuracy') || metric.name.includes('Coverage') || metric.name.includes('Quality') ? '%' : metric.name.includes('Speed') ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}{metric.name.includes('Accuracy') || metric.name.includes('Coverage') || metric.name.includes('Quality') ? '%' : metric.name.includes('Speed') ? 's' : ''}
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
        <h3 className="text-lg font-semibold mb-4">Intelligence Sources</h3>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getSourceTypeIcon(source.type)}
                  <div>
                    <div className="font-medium text-sm">{source.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {source.location} • {source.operator} • {source.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(source.status)}
                  <div className={`text-sm font-bold ${getClassificationColor(source.classification)}`}>
                    {source.classification}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Reliability</span>
                  <span className="text-xs text-muted-foreground">{source.reliability.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      source.reliability > 95 ? 'bg-green-400' :
                      source.reliability > 85 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${source.reliability}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{source.reliability.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{source.coverage.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${getStatusColor(source.status)}`}>
                      {source.status}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
