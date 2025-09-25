'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Brain, Activity, Users, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react'

interface IntelligenceNode {
  id: string
  name: string
  type: 'research' | 'academic' | 'industry' | 'government' | 'nonprofit'
  region: string
  connections: number
  dataFlow: number
  collaboration: number
  status: 'active' | 'standby' | 'maintenance' | 'offline'
  lastUpdate: string
  director: string
  focus: string
}

interface NetworkMetric {
  name: string
  value: number
  target: number
  trend: 'up' | 'down' | 'stable'
  color: string
}

export function GlobalIntelligenceNetwork() {
  const [nodes, setNodes] = useState<IntelligenceNode[]>([])
  const [metrics, setMetrics] = useState<NetworkMetric[]>([])
  const [networkEfficiency, setNetworkEfficiency] = useState(0)

  useEffect(() => {
    const initialNodes: IntelligenceNode[] = [
      {
        id: 'node-001',
        name: 'MIT AI Research Center',
        type: 'academic',
        region: 'North America',
        connections: 1247,
        dataFlow: 98.5,
        collaboration: 94.2,
        status: 'active',
        lastUpdate: '2 minutes ago',
        director: 'Dr. Sarah Chen',
        focus: 'Machine Learning'
      },
      {
        id: 'node-002',
        name: 'European AI Institute',
        type: 'research',
        region: 'Europe',
        connections: 892,
        dataFlow: 96.8,
        collaboration: 89.7,
        status: 'active',
        lastUpdate: '5 minutes ago',
        director: 'Prof. Michael Rodriguez',
        focus: 'Ethical AI'
      },
      {
        id: 'node-003',
        name: 'Asia Pacific Tech Hub',
        type: 'industry',
        region: 'Asia Pacific',
        connections: 1567,
        dataFlow: 94.3,
        collaboration: 92.1,
        status: 'active',
        lastUpdate: '10 minutes ago',
        director: 'Dr. James Wilson',
        focus: 'Applied AI'
      },
      {
        id: 'node-004',
        name: 'Global Education Foundation',
        type: 'nonprofit',
        region: 'Global',
        connections: 234,
        dataFlow: 87.6,
        collaboration: 95.8,
        status: 'standby',
        lastUpdate: '1 hour ago',
        director: 'Dr. Emma Thompson',
        focus: 'Educational AI'
      }
    ]

    const initialMetrics: NetworkMetric[] = [
      {
        name: 'Network Efficiency',
        value: 96.8,
        target: 90,
        trend: 'up',
        color: 'text-green-400'
      },
      {
        name: 'Data Flow Rate',
        value: 94.2,
        target: 85,
        trend: 'up',
        color: 'text-blue-400'
      },
      {
        name: 'Collaboration Index',
        value: 92.7,
        target: 80,
        trend: 'up',
        color: 'text-blue-300'
      },
      {
        name: 'Global Coverage',
        value: 89.5,
        target: 85,
        trend: 'up',
        color: 'text-gray-300'
      }
    ]

    setNodes(initialNodes)
    setMetrics(initialMetrics)
    setNetworkEfficiency(96.8)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNetworkEfficiency(prev => Math.min(100, prev + Math.random() * 0.1))
      setNodes(prev => prev.map(node => ({
        ...node,
        lastUpdate: 'Just now'
      })))
    }, 25000)

    return () => clearInterval(interval)
  }, [])

  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case 'research': return <Brain className="h-4 w-4" />
      case 'academic': return <Users className="h-4 w-4" />
      case 'industry': return <TrendingUp className="h-4 w-4" />
      case 'government': return <Target className="h-4 w-4" />
      case 'nonprofit': return <Globe className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case 'research': return 'text-blue-400'
      case 'academic': return 'text-green-400'
      case 'industry': return 'text-blue-300'
      case 'government': return 'text-gray-300'
      case 'nonprofit': return 'text-gray-400'
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
      case 'offline': return <Zap className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
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
            <h2 className="text-xl font-bold mb-2">Global Intelligence Network</h2>
            <p className="text-muted-foreground">Worldwide educational intelligence and collaboration network</p>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {networkEfficiency.toFixed(1)}% Network Efficiency
            </span>
          </div>
        </div>

        {/* Network Metrics */}
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
        <h3 className="text-lg font-semibold mb-4">Network Nodes</h3>
        <div className="space-y-4">
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getNodeTypeIcon(node.type)}
                  <div>
                    <div className="font-medium text-sm">{node.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {node.region} • {node.director} • {node.focus} • {node.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(node.status)}
                  <div className={`text-sm font-bold ${getNodeTypeColor(node.type)}`}>
                    {node.type}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Data Flow</span>
                  <span className="text-xs text-muted-foreground">{node.dataFlow.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      node.dataFlow > 95 ? 'bg-green-400' :
                      node.dataFlow > 85 ? 'bg-blue-400' : 'bg-blue-300'
                    }`}
                    style={{ width: `${node.dataFlow}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-400">{node.connections}</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{node.dataFlow.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Data Flow</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">{node.collaboration.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Collaboration</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`text-xs font-medium ${getStatusColor(node.status)}`}>
                  Status: {node.status}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last update: {node.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
