'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Globe, Activity, Target, Brain, Clock, CheckCircle } from 'lucide-react'

interface PolicyGeneration {
  id: string
  timestamp: string
  trigger: string
  generatedPolicy: string
  confidence: number
  expectedImpact: number
  region: string
  category: 'monetary' | 'fiscal' | 'trade' | 'regulatory'
  status: 'generated' | 'reviewing' | 'implemented' | 'rejected'
}

interface GenerationMetrics {
  totalGenerated: number
  implemented: number
  successRate: number
  avgConfidence: number
}

export function RealTimeGeneration() {
  const [generations, setGenerations] = useState<PolicyGeneration[]>([])
  const [metrics, setMetrics] = useState<GenerationMetrics>({
    totalGenerated: 0,
    implemented: 0,
    successRate: 0,
    avgConfidence: 0
  })
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Simulate real-time policy generation
    const mockGenerations: PolicyGeneration[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        trigger: 'Inflation rate exceeded 3% threshold',
        generatedPolicy: 'Implement gradual interest rate increase of 0.25% over next quarter',
        confidence: 94,
        expectedImpact: 87,
        region: 'Global',
        category: 'monetary',
        status: 'implemented'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        trigger: 'Unemployment rate increased to 5.2%',
        generatedPolicy: 'Launch targeted job creation program in affected sectors',
        confidence: 89,
        expectedImpact: 82,
        region: 'North America',
        category: 'fiscal',
        status: 'reviewing'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 480000).toISOString(),
        trigger: 'Trade deficit widened to 2.1% of GDP',
        generatedPolicy: 'Adjust import tariffs on strategic goods by 5%',
        confidence: 76,
        expectedImpact: 71,
        region: 'Asia-Pacific',
        category: 'trade',
        status: 'generated'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        trigger: 'Market volatility exceeded 15% threshold',
        generatedPolicy: 'Activate market stabilization mechanisms',
        confidence: 91,
        expectedImpact: 85,
        region: 'Global',
        category: 'regulatory',
        status: 'implemented'
      }
    ]

    setGenerations(mockGenerations)
    setMetrics({
      totalGenerated: 1247,
      implemented: 1089,
      successRate: 87.3,
      avgConfidence: 89.2
    })

    // Simulate real-time generation
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIsGenerating(true)
        
        setTimeout(() => {
          const newGeneration: PolicyGeneration = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            trigger: 'Economic indicator threshold reached',
            generatedPolicy: 'AI-generated policy recommendation based on current market conditions',
            confidence: Math.floor(Math.random() * 20) + 80,
            expectedImpact: Math.floor(Math.random() * 20) + 75,
            region: ['Global', 'North America', 'EU', 'Asia-Pacific', 'UK', 'Switzerland', 'Greenland/Alaska'][Math.floor(Math.random() * 7)],
            category: ['monetary', 'fiscal', 'trade', 'regulatory'][Math.floor(Math.random() * 4)] as 'monetary' | 'fiscal' | 'trade' | 'regulatory',
            status: 'generated'
          }
          
          setGenerations(prev => [newGeneration, ...prev.slice(0, 9)])
          setMetrics(prev => ({
            ...prev,
            totalGenerated: prev.totalGenerated + 1,
            avgConfidence: (prev.avgConfidence + newGeneration.confidence) / 2
          }))
          setIsGenerating(false)
        }, 2000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monetary': return 'text-green-400'
      case 'fiscal': return 'text-blue-400'
      case 'trade': return 'text-yellow-400'
      case 'regulatory': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-blue-500/20 text-blue-400'
      case 'reviewing': return 'bg-yellow-500/20 text-yellow-400'
      case 'implemented': return 'bg-green-500/20 text-green-400'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'monetary': return TrendingUp
      case 'fiscal': return Target
      case 'trade': return Globe
      case 'regulatory': return Activity
      default: return Brain
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
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Real-Time Policy Generation</h3>
            <p className="text-gray-400">AI-powered economic policy creation & optimization</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isGenerating && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full"
            />
          )}
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{metrics.totalGenerated.toLocaleString('en-US')}</div>
            <div className="text-sm text-gray-400">Policies Generated</div>
          </div>
        </div>
      </div>

      {/* Generation Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-xl font-bold text-white">{metrics.totalGenerated.toLocaleString('en-US')}</div>
              <div className="text-sm text-gray-400">Total Generated</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-xl font-bold text-white">{metrics.implemented.toLocaleString('en-US')}</div>
              <div className="text-sm text-gray-400">Implemented</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-xl font-bold text-white">{metrics.successRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-xl font-bold text-white">{metrics.avgConfidence.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg Confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Generations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Policy Generations</h4>
        {generations.map((generation) => {
          const CategoryIcon = getCategoryIcon(generation.category)
          
          return (
            <motion.div
              key={generation.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <CategoryIcon className={`w-4 h-4 ${getCategoryColor(generation.category)}`} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{generation.region}</h5>
                    <p className="text-sm text-gray-400">
                      {new Date(generation.timestamp).toLocaleString()} • {generation.category}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(generation.status)}`}>
                  {generation.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-gray-400">Trigger: </span>
                  <span className="text-white">{generation.trigger}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Generated Policy: </span>
                  <span className="text-white">{generation.generatedPolicy}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Confidence: </span>
                      <span className="text-blue-400">{generation.confidence}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Expected Impact: </span>
                      <span className="text-green-400">{generation.expectedImpact}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Generation Status */}
      <div className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Generation Engine Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">AI Models</div>
              <div className="text-xs text-gray-400">All systems operational</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Data Processing</div>
              <div className="text-xs text-gray-400">Real-time analysis active</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Response Time</div>
              <div className="text-xs text-gray-400">Avg 1.2 seconds</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
