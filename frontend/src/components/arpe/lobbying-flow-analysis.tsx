'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Users, Building, TrendingUp, Eye, Target } from 'lucide-react'

export function LobbyingFlowAnalysis() {
  const [selectedSector, setSelectedSector] = useState('All')

  const lobbyingData = [
    {
      organization: 'Tech Giants Coalition',
      sector: 'Technology',
      amount: 125000000,
      target: 'AI Regulation',
      influence: 95,
      status: 'Active',
      icon: Building,
      color: 'text-neon-blue'
    },
    {
      organization: 'Financial Services Alliance',
      sector: 'Finance',
      amount: 89000000,
      target: 'Digital Currency',
      influence: 87,
      status: 'Active',
      icon: DollarSign,
      color: 'text-neon-green'
    },
    {
      organization: 'Healthcare Innovation Group',
      sector: 'Healthcare',
      amount: 67000000,
      target: 'Data Privacy',
      influence: 78,
      status: 'Monitoring',
      icon: Users,
      color: 'text-neon-yellow'
    },
    {
      organization: 'Energy Transition Council',
      sector: 'Energy',
      amount: 145000000,
      target: 'Climate Policy',
      influence: 92,
      status: 'Active',
      icon: TrendingUp,
      color: 'text-neon-purple'
    },
    {
      organization: 'Automotive Future',
      sector: 'Automotive',
      amount: 52000000,
      target: 'EV Regulations',
      influence: 73,
      status: 'Active',
      icon: Target,
      color: 'text-neon-cyan'
    },
    {
      organization: 'Data Protection Consortium',
      sector: 'Technology',
      amount: 34000000,
      target: 'Privacy Laws',
      influence: 81,
      status: 'Monitoring',
      icon: Eye,
      color: 'text-neon-pink'
    }
  ]

  const sectors = ['All', 'Technology', 'Finance', 'Healthcare', 'Energy', 'Automotive']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-neon-green bg-neon-green/10'
      case 'Monitoring':
        return 'text-neon-yellow bg-neon-yellow/10'
      case 'Inactive':
        return 'text-muted-foreground bg-muted/10'
      default:
        return 'text-muted-foreground bg-muted/10'
    }
  }

  const getInfluenceColor = (influence: number) => {
    if (influence >= 90) return 'text-red-500'
    if (influence >= 80) return 'text-neon-yellow'
    if (influence >= 70) return 'text-neon-green'
    return 'text-muted-foreground'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-yellow to-neon-purple bg-clip-text text-transparent">
          Lobbying Flow Analysis
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive tracking of lobbying activities, expenditures, and influence patterns across key sectors
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSector === sector
                ? 'bg-neon-yellow text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lobbyingData
          .filter(org => selectedSector === 'All' || org.sector === selectedSector)
          .map((org, index) => (
            <motion.div
              key={org.organization}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <org.icon className={`w-8 h-8 ${org.color}`} />
                  <div>
                    <h3 className="font-semibold text-lg">{org.organization}</h3>
                    <p className="text-sm text-muted-foreground">{org.sector}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(org.status)}`}>
                  {org.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Lobbying Expenditure</span>
                  <span className="text-2xl font-bold text-neon-blue">{formatCurrency(org.amount)}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-neon-blue h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((org.amount / 150000000) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Target Policy</span>
                  <span className="text-sm font-medium">{org.target}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Influence Score</span>
                  <span className={`text-lg font-bold ${getInfluenceColor(org.influence)}`}>
                    {org.influence}/100
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      org.influence >= 90 ? 'bg-red-500' :
                      org.influence >= 80 ? 'bg-neon-yellow' :
                      org.influence >= 70 ? 'bg-neon-green' : 'bg-muted-foreground'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${org.influence}%` }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                  />
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Last activity: {new Date().toLocaleDateString('en-US')}
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
        <h3 className="text-xl font-semibold mb-4">Sector Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {formatCurrency(lobbyingData.reduce((acc, org) => acc + org.amount, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Total Expenditure</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {lobbyingData.filter(org => org.status === 'Active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Campaigns</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow">
              {Math.round(lobbyingData.reduce((acc, org) => acc + org.influence, 0) / lobbyingData.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Influence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-purple">
              {new Set(lobbyingData.map(org => org.sector)).size}
            </div>
            <div className="text-sm text-muted-foreground">Sectors</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
