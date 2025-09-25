'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Network, Activity, Users, Zap, TrendingUp, Target, Brain, Globe } from 'lucide-react'

interface NetworkNode {
  id: string
  name: string
  type: 'enterprise' | 'government' | 'academic' | 'ngo'
  status: 'active' | 'idle' | 'maintenance' | 'offline'
  connections: number
  intelligence: number
  lastActivity: string
  region: string
}

interface IntelligenceFlow {
  id: string
  source: string
  target: string
  type: 'data' | 'insights' | 'alerts' | 'analysis'
  volume: number
  speed: number
  quality: number
  timestamp: string
}

export function NetworkIntelligence() {
  const [nodes, setNodes] = useState<NetworkNode[]>([])
  const [flows, setFlows] = useState<IntelligenceFlow[]>([])
  const [networkHealth, setNetworkHealth] = useState(0)

  useEffect(() => {
    const initialNodes: NetworkNode[] = [
      {
        id: 'node-001',
        name: 'TechCorp Global',
        type: 'enterprise',
        status: 'active',
        connections: 47,
        intelligence: 94.2,
        lastActivity: '2 min ago',
        region: 'North America'
      },
      {
        id: 'node-002',
        name: 'EU Commission',
        type: 'government',
        status: 'active',
        connections: 23,
        intelligence: 89.7,
        lastActivity: '5 min ago',
        region: 'Europe'
      },
      {
        id: 'node-003',
        name: 'MIT Research',
        type: 'academic',
        status: 'active',
        connections: 15,
        intelligence: 92.1,
        lastActivity: '1 min ago',
        region: 'North America'
      },
      {
        id: 'node-004',
        name: 'World Bank',
        type: 'ngo',
        status: 'active',
        connections: 34,
        intelligence: 87.5,
        lastActivity: '3 min ago',
        region: 'Global'
      },
      {
        id: 'node-005',
        name: 'Singapore Gov',
        type: 'government',
        status: 'idle',
        connections: 12,
        intelligence: 85.3,
        lastActivity: '15 min ago',
        region: 'Asia Pacific'
      }
    ]

    const initialFlows: IntelligenceFlow[] = [
      {
        id: 'flow-001',
        source: 'TechCorp Global',
        target: 'EU Commission',
        type: 'data',
        volume: 2.4,
        speed: 94.2,
        quality: 89.7,
        timestamp: 'Just now'
      },
      {
        id: 'flow-002',
        source: 'MIT Research',
        target: 'World Bank',
        type: 'insights',
        volume: 1.8,
        speed: 87.5,
        quality: 92.1,
        timestamp: '2 min ago'
      },
      {
        id: 'flow-003',
        source: 'EU Commission',
        target: 'Singapore Gov',
        type: 'alerts',
        volume: 0.3,
        speed: 99.1,
        quality: 95.4,
        timestamp: '5 min ago'
      }
    ]

    setNodes(initialNodes)
    setFlows(initialFlows)
    setNetworkHealth(94.2)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNetworkHealth(prev => Math.min(100, prev + Math.random() * 0.1))
      setNodes(prev => prev.map(node => ({
        ...node,
        lastActivity: 'Just now'
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getNodeTypeIcon = (type: string) => {
    switch (type) {
      case 'enterprise': return <Users className="h-4 w-4" />
      case 'government': return <Target className="h-4 w-4" />
      case 'academic': return <Brain className="h-4 w-4" />
      case 'ngo': return <Globe className="h-4 w-4" />
      default: return <Network className="h-4 w-4" />
    }
  }

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case 'enterprise': return 'text-neon-blue'
      case 'government': return 'text-neon-red'
      case 'academic': return 'text-neon-green'
      case 'ngo': return 'text-neon-purple'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-neon-green'
      case 'idle': return 'bg-neon-yellow'
      case 'maintenance': return 'bg-neon-blue'
      case 'offline': return 'bg-neon-red'
      default: return 'bg-muted'
    }
  }

  const getFlowTypeColor = (type: string) => {
    switch (type) {
      case 'data': return 'text-neon-blue'
      case 'insights': return 'text-neon-green'
      case 'alerts': return 'text-neon-red'
      case 'analysis': return 'text-neon-purple'
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
            <h2 className="text-2xl font-bold mb-2">Network Intelligence</h2>
            <p className="text-muted-foreground">Real-time network node monitoring and intelligence flows</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
            <span className="text-sm font-medium text-neon-green">
              {networkHealth.toFixed(1)}% Network Health
            </span>
          </div>
        </div>

        {/* Network Nodes */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Network Nodes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status)}`} />
                    {getNodeTypeIcon(node.type)}
                    <div>
                      <div className="font-medium text-sm">{node.name}</div>
                      <div className="text-xs text-muted-foreground">{node.region}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-neon-green">
                      {node.intelligence.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">intelligence</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-neon-blue">{node.connections}</div>
                    <div className="text-xs text-muted-foreground">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-neon-yellow">
                      {node.lastActivity}
                    </div>
                    <div className="text-xs text-muted-foreground">Last Activity</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Intelligence Flows</h3>
        <div className="space-y-3">
          {flows.map((flow, index) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 text-neon-blue" />
                  <div>
                    <div className="font-medium text-sm">
                      {flow.source} → {flow.target}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {flow.type} • {flow.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-blue">{flow.volume}GB</div>
                    <div className="text-xs text-muted-foreground">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-green">{flow.speed.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-neon-purple">{flow.quality.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">Quality</div>
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
