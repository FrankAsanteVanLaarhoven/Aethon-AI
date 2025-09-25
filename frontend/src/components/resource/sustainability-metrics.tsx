'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf, TrendingUp, Globe, Recycle, Droplets, Zap, Target } from 'lucide-react'

interface SustainabilityMetric {
  id: string
  name: string
  category: 'environmental' | 'social' | 'economic'
  currentValue: number
  targetValue: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  impact: 'high' | 'medium' | 'low'
  lastUpdate: string
}

export function SustainabilityMetrics() {
  const [metrics, setMetrics] = useState<SustainabilityMetric[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // Simulate sustainability metrics data
    const mockMetrics: SustainabilityMetric[] = [
      {
        id: '1',
        name: 'Carbon Footprint Reduction',
        category: 'environmental',
        currentValue: 78,
        targetValue: 90,
        unit: '%',
        trend: 'up',
        impact: 'high',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Renewable Energy Usage',
        category: 'environmental',
        currentValue: 85,
        targetValue: 95,
        unit: '%',
        trend: 'up',
        impact: 'high',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Water Conservation',
        category: 'environmental',
        currentValue: 72,
        targetValue: 80,
        unit: '%',
        trend: 'up',
        impact: 'medium',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Waste Reduction',
        category: 'environmental',
        currentValue: 68,
        targetValue: 75,
        unit: '%',
        trend: 'up',
        impact: 'medium',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Social Equity Index',
        category: 'social',
        currentValue: 82,
        targetValue: 90,
        unit: 'score',
        trend: 'up',
        impact: 'high',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Education Access',
        category: 'social',
        currentValue: 91,
        targetValue: 95,
        unit: '%',
        trend: 'up',
        impact: 'high',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Economic Growth Rate',
        category: 'economic',
        currentValue: 4.2,
        targetValue: 5.0,
        unit: '%',
        trend: 'up',
        impact: 'medium',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Resource Efficiency',
        category: 'economic',
        currentValue: 88,
        targetValue: 92,
        unit: '%',
        trend: 'up',
        impact: 'high',
        lastUpdate: new Date().toISOString()
      }
    ]

    setMetrics(mockMetrics)
    setOverallScore(78.5)

    // Update metrics every 10 seconds
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        currentValue: Math.max(0, metric.currentValue + (Math.random() - 0.5) * 0.5),
        lastUpdate: new Date().toISOString()
      })))
      setOverallScore(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.3)))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental': return Leaf
      case 'social': return Globe
      case 'economic': return TrendingUp
      default: return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'text-green-400'
      case 'social': return 'text-blue-400'
      case 'economic': return 'text-purple-400'
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
      case 'high': return 'bg-red-500/20 text-red-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'low': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.category === selectedCategory)

  const categoryStats = {
    environmental: metrics.filter(m => m.category === 'environmental').length,
    social: metrics.filter(m => m.category === 'social').length,
    economic: metrics.filter(m => m.category === 'economic').length
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
            <Leaf className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Sustainability Metrics</h3>
            <p className="text-gray-400">Planetary sustainability tracking & analysis</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{overallScore.toFixed(1)}</div>
          <div className="text-sm text-gray-400">Overall Score</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All ({metrics.length})
        </button>
        <button
          onClick={() => setSelectedCategory('environmental')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'environmental'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Environmental ({categoryStats.environmental})
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
          onClick={() => setSelectedCategory('economic')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === 'economic'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Economic ({categoryStats.economic})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metrics List */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Current Metrics</h4>
          {filteredMetrics.map((metric) => {
            const CategoryIcon = getCategoryIcon(metric.category)
            const TrendIcon = getTrendIcon(metric.trend)
            const progress = (metric.currentValue / metric.targetValue) * 100
            
            return (
              <motion.div
                key={metric.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <CategoryIcon className={`w-4 h-4 ${getCategoryColor(metric.category)}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{metric.name}</h5>
                      <p className="text-sm text-gray-400">{metric.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(metric.impact)}`}>
                      {metric.impact}
                    </span>
                    <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">
                      {metric.currentValue.toFixed(1)}{metric.unit} / {metric.targetValue}{metric.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress >= 90 ? 'bg-green-500' :
                        progress >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{progress.toFixed(1)}% of target</span>
                    <span>Updated {new Date(metric.lastUpdate).toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Analytics & Insights */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Analytics & Insights</h4>
          
          {/* Performance Overview */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Performance Overview</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {metrics.filter(m => (m.currentValue / m.targetValue) >= 0.9).length}
                </div>
                <div className="text-sm text-gray-400">On Target</div>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">
                  {metrics.filter(m => (m.currentValue / m.targetValue) >= 0.7 && (m.currentValue / m.targetValue) < 0.9).length}
                </div>
                <div className="text-sm text-gray-400">Near Target</div>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-red-400">
                  {metrics.filter(m => (m.currentValue / m.targetValue) < 0.7).length}
                </div>
                <div className="text-sm text-gray-400">Below Target</div>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {metrics.filter(m => m.trend === 'up').length}
                </div>
                <div className="text-sm text-gray-400">Improving</div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Category Breakdown</h5>
            <div className="space-y-4">
              {['environmental', 'social', 'economic'].map(category => {
                const categoryMetrics = metrics.filter(m => m.category === category)
                const avgProgress = categoryMetrics.length > 0 
                  ? categoryMetrics.reduce((sum, m) => sum + (m.currentValue / m.targetValue), 0) / categoryMetrics.length * 100
                  : 0
                const CategoryIcon = getCategoryIcon(category)
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CategoryIcon className={`w-5 h-5 ${getCategoryColor(category)}`} />
                      <span className="text-white capitalize">{category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            avgProgress >= 90 ? 'bg-green-500' :
                            avgProgress >= 70 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(avgProgress, 100)}%` }}
                        />
                      </div>
                      <span className="text-white text-sm w-12 text-right">
                        {avgProgress.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Key Insights */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Key Insights</h5>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-green-500/20 rounded">
                  <Leaf className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Environmental metrics showing strong improvement trends</p>
                  <p className="text-xs text-gray-400">Carbon footprint reduction leading the way</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-500/20 rounded">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Social equity metrics exceeding targets</p>
                  <p className="text-xs text-gray-400">Education access at 91% globally</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-purple-500/20 rounded">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Economic growth maintaining steady pace</p>
                  <p className="text-xs text-gray-400">Resource efficiency at 88%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}