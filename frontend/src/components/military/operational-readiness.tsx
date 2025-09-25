'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Target, Activity, Shield, Users, Zap, Brain, AlertTriangle } from 'lucide-react'

interface ReadinessUnit {
  id: string
  name: string
  type: 'combat' | 'support' | 'logistics' | 'intelligence' | 'medical'
  readiness: number
  personnel: number
  equipment: number
  training: number
  status: 'ready' | 'standby' | 'maintenance' | 'deployed'
  lastUpdate: string
  location: string
  commander: string
}

interface ReadinessMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function OperationalReadiness() {
  const [units, setUnits] = useState<ReadinessUnit[]>([])
  const [metrics, setMetrics] = useState<ReadinessMetric[]>([])
  const [overallReadiness, setOverallReadiness] = useState(0)

  useEffect(() => {
    const initialUnits: ReadinessUnit[] = [
      {
        id: 'unit-001',
        name: '1st Armored Division',
        type: 'combat',
        readiness: 98.5,
        personnel: 1247,
        equipment: 96.8,
        training: 94.2,
        status: 'ready',
        lastUpdate: '2 hours ago',
        location: 'Fort Carson',
        commander: 'Maj. Gen. Smith'
      },
      {
        id: 'unit-002',
        name: 'Air Support Squadron',
        type: 'support',
        readiness: 96.2,
        personnel: 456,
        equipment: 98.1,
        training: 92.7,
        status: 'ready',
        lastUpdate: '4 hours ago',
        location: 'Air Base Alpha',
        commander: 'Col. Johnson'
      },
      {
        id: 'unit-003',
        name: 'Logistics Battalion',
        type: 'logistics',
        readiness: 94.7,
        personnel: 234,
        equipment: 89.3,
        training: 96.8,
        status: 'standby',
        lastUpdate: '1 day ago',
        location: 'Supply Depot',
        commander: 'Lt. Col. Williams'
      },
      {
        id: 'unit-004',
        name: 'Intelligence Unit',
        type: 'intelligence',
        readiness: 97.3,
        personnel: 89,
        equipment: 95.6,
        training: 98.9,
        status: 'deployed',
        lastUpdate: '6 hours ago',
        location: 'Field Operations',
        commander: 'Maj. Brown'
      }
    ]

    const initialMetrics: ReadinessMetric[] = [
      {
        name: 'Overall Readiness',
        value: 96.7,
        target: 90,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Personnel Readiness',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Equipment Readiness',
        value: 95.8,
        target: 90,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Training Readiness',
        value: 95.7,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setUnits(initialUnits)
    setMetrics(initialMetrics)
    setOverallReadiness(96.7)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOverallReadiness(prev => Math.min(100, prev + Math.random() * 0.1))
      setUnits(prev => prev.map(unit => ({
        ...unit,
        lastUpdate: 'Just now'
      })))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getUnitTypeIcon = (type: string) => {
    switch (type) {
      case 'combat': return <Target className="h-4 w-4" />
      case 'support': return <Shield className="h-4 w-4" />
      case 'logistics': return <Activity className="h-4 w-4" />
      case 'intelligence': return <Brain className="h-4 w-4" />
      case 'medical': return <CheckCircle className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getUnitTypeColor = (type: string) => {
    switch (type) {
      case 'combat': return 'text-blue-400'
      case 'support': return 'text-green-400'
      case 'logistics': return 'text-blue-300'
      case 'intelligence': return 'text-gray-300'
      case 'medical': return 'text-gray-400'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-400'
      case 'standby': return 'text-blue-400'
      case 'maintenance': return 'text-blue-300'
      case 'deployed': return 'text-gray-300'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4" />
      case 'standby': return <AlertTriangle className="h-4 w-4" />
      case 'maintenance': return <Activity className="h-4 w-4" />
      case 'deployed': return <Target className="h-4 w-4" />
      default: return <Shield className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Operational Readiness</h2>
            <p className="text-muted-foreground">Military unit readiness monitoring and assessment</p>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {overallReadiness.toFixed(1)}% Overall Readiness
            </span>
          </div>
        </div>

        {/* Readiness Metrics */}
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
                  {metric.value.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {metric.target}%
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
        <h3 className="text-lg font-semibold mb-4">Unit Readiness Status</h3>
        <div className="space-y-4">
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getUnitTypeIcon(unit.type)}
                  <div>
                    <div className="font-medium text-sm">{unit.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {unit.location} • {unit.commander} • {unit.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(unit.status)}
                  <div className={`text-sm font-bold ${getStatusColor(unit.status)}`}>
                    {unit.status}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Overall Readiness</span>
                  <span className="text-xs text-muted-foreground">{unit.readiness.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      unit.readiness > 95 ? 'bg-green-400' :
                      unit.readiness > 85 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${unit.readiness}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{unit.personnel}</div>
                    <div className="text-xs text-muted-foreground">Personnel</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{unit.equipment.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Equipment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-300">{unit.training.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Training</div>
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
