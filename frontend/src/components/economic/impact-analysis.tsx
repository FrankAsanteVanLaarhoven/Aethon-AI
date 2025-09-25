'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Globe, Activity, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react'

interface ImpactMetric {
  id: string
  name: string
  category: 'economic' | 'social' | 'environmental' | 'political'
  currentValue: number
  previousValue: number
  change: number
  trend: 'up' | 'down' | 'stable'
  impact: 'positive' | 'negative' | 'neutral'
  region: string
  timestamp: string
}

interface PolicyImpact {
  id: string
  policyName: string
  implementationDate: string
  expectedImpact: number
  actualImpact: number
  accuracy: number
  region: string
  category: string
  status: 'completed' | 'ongoing' | 'monitoring'
}

export function ImpactAnalysis() {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([])
  const [policyImpacts, setPolicyImpacts] = useState<PolicyImpact[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [overallImpact, setOverallImpact] = useState(0)

  useEffect(() => {
    // Simulate impact analysis data
    const mockMetrics: ImpactMetric[] = [
      {
        id: '1',
        name: 'GDP Growth Rate',
        category: 'economic',
        currentValue: 3.8,
        previousValue: 3.4,
        change: 0.4,
        trend: 'up',
        impact: 'positive',
        region: 'Global',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Unemployment Rate',
        category: 'social',
        currentValue: 4.2,
        previousValue: 4.5,
        change: -0.3,
        trend: 'down',
        impact: 'positive',
        region: 'Global',
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Carbon Emissions',
        category: 'environmental',
        currentValue: 2.1,
        previousValue: 2.3,
        change: -0.2,
        trend: 'down',
        impact: 'positive',
        region: 'Global',
        timestamp: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Political Stability Index',
        category: 'political',
        currentValue: 78.5,
        previousValue: 76.2,
        change: 2.3,
        trend: 'up',
        impact: 'positive',
        region: 'Global',
        timestamp: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Income Inequality',
        category: 'social',
        currentValue: 0.42,
        previousValue: 0.45,
        change: -0.03,
        trend: 'down',
        impact: 'positive',
        region: 'Global',
        timestamp: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Trade Volume',
        category: 'economic',
        currentValue: 127.3,
        previousValue: 124.8,
        change: 2.5,
        trend: 'up',
        impact: 'positive',
        region: 'Global',
        timestamp: new Date().toISOString()
      }
    ]

    const mockPolicyImpacts: PolicyImpact[] = [
      {
        id: '1',
        policyName: 'Digital Currency Integration',
        implementationDate: '2025-01-15',
        expectedImpact: 85,
        actualImpact: 87,
        accuracy: 102,
        region: 'Global',
        category: 'economic',
        status: 'completed'
      },
      {
        id: '2',
        policyName: 'Green Energy Transition',
        implementationDate: '2025-02-01',
        expectedImpact: 78,
        actualImpact: 82,
        accuracy: 105,
        region: 'EU',
        category: 'environmental',
        status: 'ongoing'
      },
      {
        id: '3',
        policyName: 'AI Workforce Integration',
        implementationDate: '2025-01-30',
        expectedImpact: 72,
        actualImpact: 69,
        accuracy: 96,
        region: 'North America',
        category: 'social',
        status: 'monitoring'
      },
      {
        id: '4',
        policyName: 'Supply Chain Optimization',
        implementationDate: '2025-02-10',
        expectedImpact: 65,
        actualImpact: 71,
        accuracy: 109,
        region: 'Asia-Pacific',
        category: 'economic',
        status: 'ongoing'
      },
      {
        id: '5',
        policyName: 'Post-Brexit Trade Framework',
        implementationDate: '2025-01-20',
        expectedImpact: 78,
        actualImpact: 82,
        accuracy: 105,
        region: 'UK',
        category: 'economic',
        status: 'completed'
      },
      {
        id: '6',
        policyName: 'Swiss Neutrality Financial Policy',
        implementationDate: '2025-01-05',
        expectedImpact: 85,
        actualImpact: 88,
        accuracy: 104,
        region: 'Switzerland',
        category: 'economic',
        status: 'completed'
      },
      {
        id: '7',
        policyName: 'Arctic Resource Management',
        implementationDate: '2025-02-15',
        expectedImpact: 70,
        actualImpact: 68,
        accuracy: 97,
        region: 'Greenland/Alaska',
        category: 'environmental',
        status: 'ongoing'
      }
    ]

    setMetrics(mockMetrics)
    setPolicyImpacts(mockPolicyImpacts)
    setOverallImpact(82.5)

    // Update data every 8 seconds
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        currentValue: Math.max(0, metric.currentValue + (Math.random() - 0.5) * 0.1),
        change: Math.max(-1, Math.min(1, metric.change + (Math.random() - 0.5) * 0.05)),
        timestamp: new Date().toISOString()
      })))
      setOverallImpact(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.2)))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economic': return 'text-green-400'
      case 'social': return 'text-blue-400'
      case 'environmental': return 'text-emerald-400'
      case 'political': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-400'
      case 'negative': return 'text-red-400'
      case 'neutral': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return CheckCircle
      case 'negative': return AlertTriangle
      case 'neutral': return Activity
      default: return Activity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'ongoing': return 'bg-blue-500/20 text-blue-400'
      case 'monitoring': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.category === selectedCategory)

  const categoryStats = {
    economic: metrics.filter(m => m.category === 'economic').length,
    social: metrics.filter(m => m.category === 'social').length,
    environmental: metrics.filter(m => m.category === 'environmental').length,
    political: metrics.filter(m => m.category === 'political').length
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
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Impact Analysis</h3>
            <p className="text-gray-400">Comprehensive policy impact assessment & monitoring</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-orange-400">{overallImpact.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Overall Impact Score</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All ({metrics.length})
        </button>
        <button
          onClick={() => setSelectedCategory('economic')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'economic'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Economic ({categoryStats.economic})
        </button>
        <button
          onClick={() => setSelectedCategory('social')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'social'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Social ({categoryStats.social})
        </button>
        <button
          onClick={() => setSelectedCategory('environmental')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'environmental'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Environmental ({categoryStats.environmental})
        </button>
        <button
          onClick={() => setSelectedCategory('political')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'political'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Political ({categoryStats.political})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Metrics */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Impact Metrics</h4>
          {filteredMetrics.map((metric) => {
            const TrendIcon = getTrendIcon(metric.trend)
            const ImpactIcon = getImpactIcon(metric.impact)
            
            return (
              <motion.div
                key={metric.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <BarChart3 className={`w-4 h-4 ${getCategoryColor(metric.category)}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{metric.name}</h5>
                      <p className="text-sm text-gray-400">{metric.region} • {metric.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ImpactIcon className={`w-4 h-4 ${getImpactColor(metric.impact)}`} />
                    <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Value</span>
                    <span className="text-white">{metric.currentValue.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Change</span>
                    <span className={`${getTrendColor(metric.trend)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Previous Value</span>
                    <span className="text-gray-300">{metric.previousValue.toFixed(1)}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Policy Impact Analysis */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Policy Impact Analysis</h4>
          {policyImpacts.map((policy) => (
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
                    <h5 className="font-semibold text-white">{policy.policyName}</h5>
                    <p className="text-sm text-gray-400">{policy.region} • {policy.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(policy.status)}`}>
                  {policy.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Expected Impact</span>
                  <span className="text-white">{policy.expectedImpact}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Actual Impact</span>
                  <span className="text-green-400">{policy.actualImpact}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Accuracy</span>
                  <span className={`${
                    policy.accuracy >= 100 ? 'text-green-400' :
                    policy.accuracy >= 95 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {policy.accuracy}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Implemented: {new Date(policy.implementationDate).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Impact Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {metrics.filter(m => m.impact === 'positive').length}
            </div>
            <div className="text-sm text-gray-400">Positive Impacts</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {metrics.filter(m => m.impact === 'negative').length}
            </div>
            <div className="text-sm text-gray-400">Negative Impacts</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Activity className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {metrics.filter(m => m.impact === 'neutral').length}
            </div>
            <div className="text-sm text-gray-400">Neutral Impacts</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {policyImpacts.length}
            </div>
            <div className="text-sm text-gray-400">Policies Analyzed</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
