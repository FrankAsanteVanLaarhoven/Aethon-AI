'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Globe, Activity, Target, Zap } from 'lucide-react'

interface EconomicMetric {
  id: string
  name: string
  value: number
  change: number
  unit: string
  trend: 'up' | 'down' | 'stable'
}

interface PolicyStatus {
  id: string
  name: string
  status: 'active' | 'pending' | 'implemented' | 'monitoring'
  impact: number
  region: string
}

export function EconomicHeader() {
  const [metrics, setMetrics] = useState<EconomicMetric[]>([])
  const [policies, setPolicies] = useState<PolicyStatus[]>([])
  const [globalGDP, setGlobalGDP] = useState(0)
  const [policyEffectiveness, setPolicyEffectiveness] = useState(0)

  useEffect(() => {
    // Simulate economic metrics data
    const mockMetrics: EconomicMetric[] = [
      {
        id: '1',
        name: 'Global GDP Growth',
        value: 3.8,
        change: 0.4,
        unit: '%',
        trend: 'up'
      },
      {
        id: '2',
        name: 'Inflation Rate',
        value: 2.1,
        change: -0.2,
        unit: '%',
        trend: 'down'
      },
      {
        id: '3',
        name: 'Unemployment',
        value: 4.2,
        change: -0.3,
        unit: '%',
        trend: 'down'
      },
      {
        id: '4',
        name: 'Trade Balance',
        value: 1.2,
        change: 0.1,
        unit: 'T$',
        trend: 'up'
      }
    ]

    const mockPolicies: PolicyStatus[] = [
      {
        id: '1',
        name: 'Digital Currency Integration',
        status: 'active',
        impact: 85,
        region: 'Global'
      },
      {
        id: '2',
        name: 'Green Energy Transition',
        status: 'implemented',
        impact: 92,
        region: 'EU'
      },
      {
        id: '3',
        name: 'AI Workforce Integration',
        status: 'monitoring',
        impact: 78,
        region: 'North America'
      },
      {
        id: '4',
        name: 'Supply Chain Optimization',
        status: 'pending',
        impact: 67,
        region: 'Asia-Pacific'
      },
      {
        id: '5',
        name: 'Post-Brexit Trade Framework',
        status: 'active',
        impact: 85,
        region: 'UK'
      },
      {
        id: '6',
        name: 'Neutrality-Based Financial Policy',
        status: 'implemented',
        impact: 88,
        region: 'Switzerland'
      },
      {
        id: '7',
        name: 'Arctic Resource Management',
        status: 'monitoring',
        impact: 72,
        region: 'Greenland/Alaska'
      }
    ]

    setMetrics(mockMetrics)
    setPolicies(mockPolicies)
    setGlobalGDP(98.5)
    setPolicyEffectiveness(82.3)

    // Update data every 6 seconds
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 0.1),
        change: Math.max(-1, Math.min(1, metric.change + (Math.random() - 0.5) * 0.05))
      })))
      setGlobalGDP(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.2)))
      setPolicyEffectiveness(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.3)))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    return TrendingUp
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      case 'stable': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'implemented': return 'bg-blue-500/20 text-blue-400'
      case 'monitoring': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Autonomous Economic Policy Engine</h3>
            <p className="text-gray-400">Real-time economic analysis & policy optimization</p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{globalGDP.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Global GDP Health</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{policyEffectiveness.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Policy Effectiveness</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Economic Metrics */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Key Economic Indicators</h4>
          {metrics.map((metric) => {
            const TrendIcon = getTrendIcon(metric.trend)
            
            return (
              <motion.div
                key={metric.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <Activity className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{metric.name}</h5>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                    <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}{metric.unit}
                    </span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-white">
                  {metric.value.toFixed(1)}{metric.unit}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Policy Status */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Active Policy Status</h4>
          {policies.map((policy) => (
            <motion.div
              key={policy.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Target className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{policy.name}</h5>
                    <p className="text-sm text-gray-400">{policy.region}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(policy.status)}`}>
                  {policy.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Impact Score</span>
                  <span className="text-white">{policy.impact}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      policy.impact >= 90 ? 'bg-green-500' :
                      policy.impact >= 80 ? 'bg-blue-500' :
                      policy.impact >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${policy.impact}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Economic Overview */}
      <div className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Global Economic Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">198</div>
            <div className="text-sm text-gray-400">Countries/Regions Monitored</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">47</div>
            <div className="text-sm text-gray-400">Active Policies</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">$127T</div>
            <div className="text-sm text-gray-400">Global GDP</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">2.3B</div>
            <div className="text-sm text-gray-400">People Impacted</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
