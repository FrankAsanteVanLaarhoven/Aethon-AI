'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Target, TrendingUp, Brain, Zap, CheckCircle, AlertTriangle, Activity } from 'lucide-react'

interface OptimizationRule {
  id: string
  name: string
  objective: string
  currentValue: number
  targetValue: number
  progress: number
  priority: 'high' | 'medium' | 'low'
  status: 'active' | 'optimizing' | 'completed' | 'paused'
  lastOptimized: string
}

interface OptimizationResult {
  id: string
  rule: string
  optimization: string
  improvement: number
  confidence: number
  impact: 'high' | 'medium' | 'low'
  timestamp: string
  status: 'implemented' | 'pending' | 'testing'
}

export function PolicyOptimization() {
  const [rules, setRules] = useState<OptimizationRule[]>([])
  const [results, setResults] = useState<OptimizationResult[]>([])
  const [selectedRule, setSelectedRule] = useState<string | null>(null)
  const [optimizationScore, setOptimizationScore] = useState(0)
  const [totalOptimizations, setTotalOptimizations] = useState(0)

  useEffect(() => {
    // Simulate policy optimization data
    const mockRules: OptimizationRule[] = [
      {
        id: '1',
        name: 'GDP Growth Maximization',
        objective: 'Maximize GDP growth rate',
        currentValue: 3.8,
        targetValue: 4.5,
        progress: 84,
        priority: 'high',
        status: 'active',
        lastOptimized: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Inflation Control',
        objective: 'Maintain inflation within 2-3% range',
        currentValue: 2.1,
        targetValue: 2.5,
        progress: 92,
        priority: 'high',
        status: 'optimizing',
        lastOptimized: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Unemployment Reduction',
        objective: 'Minimize unemployment rate',
        currentValue: 4.2,
        targetValue: 3.5,
        progress: 76,
        priority: 'high',
        status: 'active',
        lastOptimized: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Trade Balance Optimization',
        objective: 'Optimize trade balance',
        currentValue: 1.2,
        targetValue: 2.0,
        progress: 60,
        priority: 'medium',
        status: 'active',
        lastOptimized: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Market Stability',
        objective: 'Minimize market volatility',
        currentValue: 12.5,
        targetValue: 10.0,
        progress: 80,
        priority: 'medium',
        status: 'completed',
        lastOptimized: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Resource Efficiency',
        objective: 'Maximize resource utilization',
        currentValue: 78.3,
        targetValue: 85.0,
        progress: 92,
        priority: 'low',
        status: 'active',
        lastOptimized: new Date().toISOString()
      }
    ]

    const mockResults: OptimizationResult[] = [
      {
        id: '1',
        rule: 'GDP Growth Maximization',
        optimization: 'Implemented infrastructure investment program',
        improvement: 0.3,
        confidence: 94,
        impact: 'high',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        status: 'implemented'
      },
      {
        id: '2',
        rule: 'Inflation Control',
        optimization: 'Adjusted monetary policy parameters',
        improvement: 0.2,
        confidence: 89,
        impact: 'high',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        status: 'implemented'
      },
      {
        id: '3',
        rule: 'Unemployment Reduction',
        optimization: 'Launched targeted job creation initiatives',
        improvement: 0.4,
        confidence: 87,
        impact: 'medium',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: 'testing'
      },
      {
        id: '4',
        rule: 'Trade Balance Optimization',
        optimization: 'Optimized import/export tariffs',
        improvement: 0.1,
        confidence: 82,
        impact: 'medium',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        status: 'pending'
      }
    ]

    setRules(mockRules)
    setResults(mockResults)
    setOptimizationScore(87.3)
    setTotalOptimizations(1247)

    // Update data every 6 seconds
    const interval = setInterval(() => {
      setRules(prev => prev.map(rule => ({
        ...rule,
        currentValue: Math.max(0, rule.currentValue + (Math.random() - 0.5) * 0.1),
        progress: Math.max(0, Math.min(100, rule.progress + (Math.random() - 0.5) * 0.5)),
        lastOptimized: new Date().toISOString()
      })))
      setOptimizationScore(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.2)))
      setTotalOptimizations(prev => prev + Math.floor(Math.random() * 2))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'low': return 'bg-green-500/20 text-green-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'optimizing': return 'bg-blue-500/20 text-blue-400'
      case 'completed': return 'bg-purple-500/20 text-purple-400'
      case 'paused': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
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

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'testing': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const selectedRuleData = selectedRule 
    ? rules.find(rule => rule.id === selectedRule)
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
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Settings className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Policy Optimization</h3>
            <p className="text-gray-400">AI-driven policy optimization & performance enhancement</p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-400">{optimizationScore.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Optimization Score</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{totalOptimizations.toLocaleString('en-US')}</div>
            <div className="text-sm text-gray-400">Total Optimizations</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Optimization Rules */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Optimization Rules</h4>
          {rules.map((rule) => (
            <motion.div
              key={rule.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedRule === rule.id 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
              onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Target className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{rule.name}</h5>
                    <p className="text-sm text-gray-400">{rule.objective}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(rule.status)}`}>
                    {rule.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rule.priority)}`}>
                    {rule.priority}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{rule.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      rule.progress >= 90 ? 'bg-green-500' :
                      rule.progress >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${rule.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current: {rule.currentValue.toFixed(1)}</span>
                  <span className="text-gray-400">Target: {rule.targetValue.toFixed(1)}</span>
                </div>
                
                <div className="text-xs text-gray-400">
                  Last optimized: {new Date(rule.lastOptimized).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optimization Results */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Recent Optimizations</h4>
          
          {selectedRuleData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h5 className="text-xl font-bold text-white">{selectedRuleData.name}</h5>
                  <p className="text-gray-400">{selectedRuleData.objective}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-400">{selectedRuleData.progress.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Progress</div>
                </div>
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{selectedRuleData.currentValue.toFixed(1)}</div>
                  <div className="text-sm text-gray-400">Current Value</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Value</span>
                  <span className="text-white">{selectedRuleData.targetValue.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedRuleData.status)}`}>
                    {selectedRuleData.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Priority</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedRuleData.priority)}`}>
                    {selectedRuleData.priority}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
              <Settings className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Select a rule to view detailed optimization data</p>
            </div>
          )}

          {/* Recent Results */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Recent Optimization Results</h5>
            {results.map((result) => (
              <motion.div
                key={result.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <Brain className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <h6 className="font-semibold text-white">{result.rule}</h6>
                      <p className="text-sm text-gray-400">{new Date(result.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(result.impact)}`}>
                      {result.impact}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getResultStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-400">Optimization: </span>
                    <span className="text-white">{result.optimization}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Improvement</span>
                    <span className="text-green-400">+{result.improvement.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-blue-400">{result.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization Performance */}
      <div className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Optimization Performance</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Settings className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{rules.length}</div>
            <div className="text-sm text-gray-400">Active Rules</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {rules.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {rules.filter(r => r.status === 'optimizing').length}
            </div>
            <div className="text-sm text-gray-400">Optimizing</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {(rules.reduce((sum, r) => sum + r.progress, 0) / rules.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Avg Progress</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
