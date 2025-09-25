'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, Zap, Activity, AlertTriangle, CheckCircle } from 'lucide-react'

interface EfficiencyData {
  id: string
  system: string
  category: 'energy' | 'resource' | 'process' | 'logistics'
  currentEfficiency: number
  targetEfficiency: number
  improvement: number
  status: 'optimal' | 'good' | 'needs_improvement' | 'critical'
  lastOptimized: string
  recommendations: string[]
}

export function EfficiencyAnalysis() {
  const [efficiencyData, setEfficiencyData] = useState<EfficiencyData[]>([])
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)
  const [overallEfficiency, setOverallEfficiency] = useState(0)
  const [optimizationScore, setOptimizationScore] = useState(0)

  useEffect(() => {
    // Simulate efficiency analysis data
    const mockData: EfficiencyData[] = [
      {
        id: '1',
        system: 'Solar Energy Grid',
        category: 'energy',
        currentEfficiency: 92.5,
        targetEfficiency: 95.0,
        improvement: 2.5,
        status: 'optimal',
        lastOptimized: new Date().toISOString(),
        recommendations: ['Implement advanced tracking algorithms', 'Optimize panel angles seasonally']
      },
      {
        id: '2',
        system: 'Water Purification Network',
        category: 'process',
        currentEfficiency: 88.2,
        targetEfficiency: 92.0,
        improvement: 3.8,
        status: 'good',
        lastOptimized: new Date().toISOString(),
        recommendations: ['Upgrade filtration membranes', 'Implement predictive maintenance']
      },
      {
        id: '3',
        system: 'Mining Operations',
        category: 'resource',
        currentEfficiency: 76.8,
        targetEfficiency: 85.0,
        improvement: 8.2,
        status: 'needs_improvement',
        lastOptimized: new Date().toISOString(),
        recommendations: ['Automate extraction processes', 'Implement AI-driven resource mapping']
      },
      {
        id: '4',
        system: 'Global Logistics Network',
        category: 'logistics',
        currentEfficiency: 84.1,
        targetEfficiency: 90.0,
        improvement: 5.9,
        status: 'good',
        lastOptimized: new Date().toISOString(),
        recommendations: ['Optimize routing algorithms', 'Implement real-time tracking']
      },
      {
        id: '5',
        system: 'Waste Management',
        category: 'process',
        currentEfficiency: 71.3,
        targetEfficiency: 80.0,
        improvement: 8.7,
        status: 'needs_improvement',
        lastOptimized: new Date().toISOString(),
        recommendations: ['Increase recycling automation', 'Implement waste-to-energy systems']
      },
      {
        id: '6',
        system: 'Manufacturing Lines',
        category: 'process',
        currentEfficiency: 89.7,
        targetEfficiency: 93.0,
        improvement: 3.3,
        status: 'good',
        lastOptimized: new Date().toISOString(),
        recommendations: ['Implement predictive quality control', 'Optimize production scheduling']
      }
    ]

    setEfficiencyData(mockData)
    setOverallEfficiency(83.8)
    setOptimizationScore(78.5)

    // Update data every 8 seconds
    const interval = setInterval(() => {
      setEfficiencyData(prev => prev.map(system => ({
        ...system,
        currentEfficiency: Math.max(0, Math.min(100, system.currentEfficiency + (Math.random() - 0.5) * 0.5)),
        lastOptimized: new Date().toISOString()
      })))
      setOverallEfficiency(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.2)))
      setOptimizationScore(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.3)))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500'
      case 'good': return 'bg-blue-500'
      case 'needs_improvement': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return CheckCircle
      case 'good': return CheckCircle
      case 'needs_improvement': return AlertTriangle
      case 'critical': return AlertTriangle
      default: return Activity
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy': return Zap
      case 'resource': return Target
      case 'process': return Activity
      case 'logistics': return BarChart3
      default: return Activity
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy': return 'text-yellow-400'
      case 'resource': return 'text-green-400'
      case 'process': return 'text-blue-400'
      case 'logistics': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const selectedSystemData = selectedSystem 
    ? efficiencyData.find(system => system.id === selectedSystem)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Efficiency Analysis</h3>
            <p className="text-gray-400">System optimization & performance analytics</p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{overallEfficiency.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Overall Efficiency</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{optimizationScore.toFixed(1)}</div>
            <div className="text-sm text-gray-400">Optimization Score</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Systems Overview */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">System Performance</h4>
          {efficiencyData.map((system) => {
            const StatusIcon = getStatusIcon(system.status)
            const CategoryIcon = getCategoryIcon(system.category)
            const efficiencyGap = system.targetEfficiency - system.currentEfficiency
            
            return (
              <motion.div
                key={system.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedSystem === system.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
                onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <CategoryIcon className={`w-4 h-4 ${getCategoryColor(system.category)}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{system.system}</h5>
                      <p className="text-sm text-gray-400">{system.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded-full ${getStatusColor(system.status)}`}>
                      <StatusIcon className="w-3 h-3 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Efficiency</span>
                    <span className="text-white">{system.currentEfficiency.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        system.currentEfficiency >= 90 ? 'bg-green-500' :
                        system.currentEfficiency >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${system.currentEfficiency}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Gap to Target</span>
                    <span className="text-yellow-400">{efficiencyGap.toFixed(1)}%</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>+{system.improvement.toFixed(1)}% improvement</span>
                    <span>Updated {new Date(system.lastOptimized).toLocaleTimeString()}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed Analysis */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Detailed Analysis</h4>
          
          {selectedSystemData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* System Details */}
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(selectedSystemData.category)
                      return <CategoryIcon className={`w-6 h-6 ${getCategoryColor(selectedSystemData.category)}`} />
                    })()}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">{selectedSystemData.system}</h5>
                    <p className="text-gray-400">{selectedSystemData.category} system</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{selectedSystemData.currentEfficiency.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">Current Efficiency</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{selectedSystemData.targetEfficiency.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">Target Efficiency</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Improvement Potential</span>
                    <span className="text-yellow-400">+{selectedSystemData.improvement.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedSystemData.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                      selectedSystemData.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                      selectedSystemData.status === 'needs_improvement' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {selectedSystemData.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Optimized</span>
                    <span className="text-white">{new Date(selectedSystemData.lastOptimized).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h5 className="text-lg font-semibold text-white mb-4">Optimization Recommendations</h5>
                <div className="space-y-3">
                  {selectedSystemData.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-1 bg-blue-500/20 rounded mt-1">
                        <Target className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-300">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Select a system to view detailed analysis</p>
            </div>
          )}

          {/* Performance Summary */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Performance Summary</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {efficiencyData.filter(s => s.status === 'optimal').length}
                </div>
                <div className="text-sm text-gray-400">Optimal Systems</div>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {efficiencyData.filter(s => s.status === 'good').length}
                </div>
                <div className="text-sm text-gray-400">Good Systems</div>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">
                  {efficiencyData.filter(s => s.status === 'needs_improvement').length}
                </div>
                <div className="text-sm text-gray-400">Need Improvement</div>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                <div className="text-2xl font-bold text-red-400">
                  {efficiencyData.filter(s => s.status === 'critical').length}
                </div>
                <div className="text-sm text-gray-400">Critical Systems</div>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Category Performance</h5>
            <div className="space-y-4">
              {['energy', 'resource', 'process', 'logistics'].map(category => {
                const categorySystems = efficiencyData.filter(s => s.category === category)
                const avgEfficiency = categorySystems.length > 0 
                  ? categorySystems.reduce((sum, s) => sum + s.currentEfficiency, 0) / categorySystems.length
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
                            avgEfficiency >= 90 ? 'bg-green-500' :
                            avgEfficiency >= 80 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(avgEfficiency, 100)}%` }}
                        />
                      </div>
                      <span className="text-white text-sm w-12 text-right">
                        {avgEfficiency.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
