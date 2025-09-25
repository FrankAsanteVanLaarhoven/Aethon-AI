'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface LogEntry {
  id: string
  timestamp: Date
  level: 'info' | 'warning' | 'error' | 'success'
  message: string
  agent: string
  details?: string
}

export function AgentLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [selectedAgent, setSelectedAgent] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Simulate real-time log generation
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 1000),
        level: 'info',
        message: 'ARPE completed regulatory analysis for Q4 compliance',
        agent: 'ARPE',
        details: 'Processed 1,247 regulatory documents in 2.3 seconds'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 5000),
        level: 'success',
        message: 'QESO quantum optimization completed successfully',
        agent: 'QESO',
        details: 'Optimized supply chain parameters with 23.7% efficiency improvement'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 10000),
        level: 'warning',
        message: 'SNSE detected potential security anomaly',
        agent: 'SNSE',
        details: 'Unusual network traffic pattern detected in sector 7'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 15000),
        level: 'info',
        message: 'ABME executed autonomous business model adaptation',
        agent: 'ABME',
        details: 'Successfully adapted to market conditions with 98.7% accuracy'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 20000),
        level: 'error',
        message: 'SCI failed to connect to external data source',
        agent: 'SCI',
        details: 'Connection timeout after 30 seconds to competitor API'
      }
    ]

    setLogs(mockLogs)

    // Simulate new log entries
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: ['info', 'success', 'warning'][Math.floor(Math.random() * 3)] as any,
        message: `Agent activity: ${['Data processing', 'Analysis complete', 'System check', 'Optimization running'][Math.floor(Math.random() * 4)]}`,
        agent: ['ARPE', 'QESO', 'ABME', 'SNSE', 'SCI'][Math.floor(Math.random() * 5)],
        details: 'Real-time system activity'
      }
      
      setLogs(prev => [newLog, ...prev.slice(0, 19)]) // Keep last 20 logs
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="w-4 h-4 text-neon-blue" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-neon-yellow" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-neon-red" />
      case 'success': return <CheckCircle className="w-4 h-4 text-neon-green" />
      default: return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'border-l-neon-blue bg-neon-blue/5'
      case 'warning': return 'border-l-neon-yellow bg-neon-yellow/5'
      case 'error': return 'border-l-neon-red bg-neon-red/5'
      case 'success': return 'border-l-neon-green bg-neon-green/5'
      default: return 'border-l-muted bg-muted/5'
    }
  }

  const filteredLogs = logs.filter(log => {
    const agentMatch = selectedAgent === 'all' || log.agent === selectedAgent
    const levelMatch = selectedLevel === 'all' || log.level === selectedLevel
    return agentMatch && levelMatch
  })

  const formatTime = (timestamp: Date) => {
    if (!isClient) return '--:--'
    
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    
    if (seconds < 60) return `${seconds}s ago`
    if (minutes < 60) return `${minutes}m ago`
    return timestamp.toLocaleTimeString('en-US')
  }

  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="tesla-heading text-xl font-semibold">Agent Logs</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Logs</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Agent:</span>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="palantir-select text-sm"
          >
            <option value="all">All Agents</option>
            <option value="ARPE">ARPE</option>
            <option value="QESO">QESO</option>
            <option value="ABME">ABME</option>
            <option value="SNSE">SNSE</option>
            <option value="SCI">SCI</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Level:</span>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="palantir-select text-sm"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      {/* Log Entries */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredLogs.map((log, index) => (
          <motion.div
            key={log.id}
            className={`border-l-4 ${getLevelColor(log.level)} bg-card border border-border rounded-lg p-3`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getLevelIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{log.agent}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{log.level.toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-foreground mb-1">{log.message}</p>
                  {log.details && (
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground ml-4">
                <Clock className="w-3 h-3" />
                <span>{formatTime(log.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No logs match your filters.</p>
        </div>
      )}
    </div>
  )
}
