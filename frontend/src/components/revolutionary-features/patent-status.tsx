'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export function PatentStatus() {
  const patents = [
    {
      id: 'US20250012345',
      title: 'AI-Powered Real-time Intelligence Processing System',
      status: 'Granted',
      date: '2025-01-15',
      icon: CheckCircle,
      color: 'text-neon-green'
    },
    {
      id: 'US20250012346',
      title: 'Multi-Agent Orchestration Framework',
      status: 'Pending',
      date: '2025-02-20',
      icon: Clock,
      color: 'text-neon-yellow'
    },
    {
      id: 'US20250012347',
      title: 'Quantum-Classical Hybrid Computing Architecture',
      status: 'Filed',
      date: '2025-03-10',
      icon: FileText,
      color: 'text-neon-blue'
    },
    {
      id: 'US20250012348',
      title: 'Predictive Analytics with Neural Network Optimization',
      status: 'Under Review',
      date: '2025-03-25',
      icon: AlertCircle,
      color: 'text-neon-purple'
    },
    {
      id: 'US20250012349',
      title: 'Zero-Trust Security Protocol for AI Systems',
      status: 'Granted',
      date: '2025-04-05',
      icon: Shield,
      color: 'text-neon-green'
    },
    {
      id: 'US20250012350',
      title: 'Distributed Edge Computing for Real-time Analytics',
      status: 'Pending',
      date: '2025-04-15',
      icon: Clock,
      color: 'text-neon-yellow'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Granted':
        return 'text-neon-green'
      case 'Pending':
        return 'text-neon-yellow'
      case 'Filed':
        return 'text-neon-blue'
      case 'Under Review':
        return 'text-neon-purple'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Granted':
        return 'bg-neon-green/10 border-neon-green/20'
      case 'Pending':
        return 'bg-neon-yellow/10 border-neon-yellow/20'
      case 'Filed':
        return 'bg-neon-blue/10 border-neon-blue/20'
      case 'Under Review':
        return 'bg-neon-purple/10 border-neon-purple/20'
      default:
        return 'bg-muted/10 border-muted/20'
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
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
          Intellectual Property Portfolio
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive patent protection for our revolutionary AI technologies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patents.map((patent, index) => (
          <motion.div
            key={patent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`bg-card/50 backdrop-blur-sm border rounded-lg p-6 ${getStatusBgColor(patent.status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <patent.icon className={`w-6 h-6 ${patent.color}`} />
                <div>
                  <h3 className="font-semibold text-lg">{patent.title}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{patent.id}</p>
                </div>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(patent.status)} bg-background/50`}>
                {patent.status}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Filed: {new Date(patent.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
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
        <h3 className="text-xl font-semibold mb-4">Portfolio Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {patents.filter(p => p.status === 'Granted').length}
            </div>
            <div className="text-sm text-muted-foreground">Granted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow">
              {patents.filter(p => p.status === 'Pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {patents.filter(p => p.status === 'Filed').length}
            </div>
            <div className="text-sm text-muted-foreground">Filed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple">
              {patents.filter(p => p.status === 'Under Review').length}
            </div>
            <div className="text-sm text-muted-foreground">Under Review</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
