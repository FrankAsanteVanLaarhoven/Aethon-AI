'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, Brain, Activity, Globe, Zap } from 'lucide-react'

interface EconomicModel {
  id: string
  name: string
  type: 'macro' | 'micro' | 'behavioral' | 'predictive'
  accuracy: number
  lastUpdated: string
  variables: number
  predictions: number
  status: 'active' | 'training' | 'validating' | 'inactive'
}

interface ModelPrediction {
  id: string
  model: string
  prediction: string
  timeframe: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  region: string
  timestamp: string
}

export function EconomicModeling() {
  const [models, setModels] = useState<EconomicModel[]>([])
  const [predictions, setPredictions] = useState<ModelPrediction[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [overallAccuracy, setOverallAccuracy] = useState(0)

  useEffect(() => {
    // Simulate economic modeling data
    const mockModels: EconomicModel[] = [
      {
        id: '1',
        name: 'Global GDP Growth Model',
        type: 'macro',
        accuracy: 94.2,
        lastUpdated: new Date().toISOString(),
        variables: 47,
        predictions: 1247,
        status: 'active'
      },
      {
        id: '2',
        name: 'Inflation Prediction Engine',
        type: 'predictive',
        accuracy: 91.8,
        lastUpdated: new Date().toISOString(),
        variables: 32,
        predictions: 892,
        status: 'active'
      },
      {
        id: '3',
        name: 'Consumer Behavior Model',
        type: 'behavioral',
        accuracy: 88.5,
        lastUpdated: new Date().toISOString(),
        variables: 28,
        predictions: 654,
        status: 'training'
      },
      {
        id: '4',
        name: 'Market Volatility Predictor',
        type: 'micro',
        accuracy: 86.7,
        lastUpdated: new Date().toISOString(),
        variables: 41,
        predictions: 1089,
        status: 'active'
      },
      {
        id: '5',
        name: 'Trade Flow Analysis',
        type: 'macro',
        accuracy: 92.1,
        lastUpdated: new Date().toISOString(),
        variables: 35,
        predictions: 743,
        status: 'validating'
      }
    ]

    const mockPredictions: ModelPrediction[] = [
      {
        id: '1',
        model: 'Global GDP Growth Model',
        prediction: 'GDP growth will increase by 0.3% in Q4',
        timeframe: '3 months',
        confidence: 94,
        impact: 'high',
        region: 'Global',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        model: 'Inflation Prediction Engine',
        prediction: 'Inflation rate will stabilize at 2.1%',
        timeframe: '6 months',
        confidence: 89,
        impact: 'high',
        region: 'North America',
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        model: 'Consumer Behavior Model',
        prediction: 'Consumer spending will increase by 4.2%',
        timeframe: '1 year',
        confidence: 87,
        impact: 'medium',
        region: 'EU',
        timestamp: new Date().toISOString()
      },
      {
        id: '4',
        model: 'Market Volatility Predictor',
        prediction: 'Market volatility will decrease to 12%',
        timeframe: '2 months',
        confidence: 82,
        impact: 'medium',
        region: 'Asia-Pacific',
        timestamp: new Date().toISOString()
      },
      {
        id: '5',
        model: 'Post-Brexit Trade Model',
        prediction: 'UK trade efficiency will improve by 3.5%',
        timeframe: '8 months',
        confidence: 85,
        impact: 'high',
        region: 'UK',
        timestamp: new Date().toISOString()
      },
      {
        id: '6',
        model: 'Swiss Financial Stability Model',
        prediction: 'Swiss franc will maintain stability within 1% range',
        timeframe: '4 months',
        confidence: 92,
        impact: 'medium',
        region: 'Switzerland',
        timestamp: new Date().toISOString()
      },
      {
        id: '7',
        model: 'Arctic Resource Development Model',
        prediction: 'Arctic resource extraction will increase by 15%',
        timeframe: '2 years',
        confidence: 78,
        impact: 'high',
        region: 'Greenland/Alaska',
        timestamp: new Date().toISOString()
      }
    ]

    setModels(mockModels)
    setPredictions(mockPredictions)
    setOverallAccuracy(90.7)

    // Update data every 7 seconds
    const interval = setInterval(() => {
      setModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(0, Math.min(100, model.accuracy + (Math.random() - 0.5) * 0.2)),
        lastUpdated: new Date().toISOString()
      })))
      setOverallAccuracy(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 0.1)))
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'macro': return 'text-blue-400'
      case 'micro': return 'text-green-400'
      case 'behavioral': return 'text-purple-400'
      case 'predictive': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'training': return 'bg-yellow-500/20 text-yellow-400'
      case 'validating': return 'bg-blue-500/20 text-blue-400'
      case 'inactive': return 'bg-gray-500/20 text-gray-400'
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'macro': return Globe
      case 'micro': return Activity
      case 'behavioral': return Brain
      case 'predictive': return Target
      default: return BarChart3
    }
  }

  const selectedModelData = selectedModel 
    ? models.find(model => model.id === selectedModel)
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
            <h3 className="text-xl font-bold text-white">Economic Modeling</h3>
            <p className="text-gray-400">Advanced AI models for economic prediction & analysis</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-400">{overallAccuracy.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Overall Accuracy</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Models Overview */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Active Models</h4>
          {models.map((model) => {
            const TypeIcon = getTypeIcon(model.type)
            
            return (
              <motion.div
                key={model.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedModel === model.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
                onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <TypeIcon className={`w-4 h-4 ${getTypeColor(model.type)}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{model.name}</h5>
                      <p className="text-sm text-gray-400">{model.type} model</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(model.status)}`}>
                    {model.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-white">{model.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        model.accuracy >= 90 ? 'bg-green-500' :
                        model.accuracy >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${model.accuracy}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Variables</span>
                    <span className="text-white">{model.variables}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Predictions</span>
                    <span className="text-white">{model.predictions.toLocaleString('en-US')}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Model Details & Predictions */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Model Analysis</h4>
          
          {selectedModelData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Model Details */}
              <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedModelData.type)
                      return <TypeIcon className={`w-6 h-6 ${getTypeColor(selectedModelData.type)}`} />
                    })()}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">{selectedModelData.name}</h5>
                    <p className="text-gray-400">{selectedModelData.type} economic model</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{selectedModelData.accuracy.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">Accuracy</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{selectedModelData.variables}</div>
                    <div className="text-sm text-gray-400">Variables</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Predictions</span>
                    <span className="text-white">{selectedModelData.predictions.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedModelData.status)}`}>
                      {selectedModelData.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white">{new Date(selectedModelData.lastUpdated).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
              <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Select a model to view detailed analysis</p>
            </div>
          )}

          {/* Recent Predictions */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Recent Predictions</h5>
            <div className="space-y-3">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">{prediction.model}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(prediction.impact)}`}>
                      {prediction.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{prediction.prediction}</p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{prediction.region} • {prediction.timeframe}</span>
                    <span>{prediction.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance Summary */}
      <div className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Model Performance Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{models.length}</div>
            <div className="text-sm text-gray-400">Active Models</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {models.filter(m => m.status === 'active').length}
            </div>
            <div className="text-sm text-gray-400">Operational</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {models.reduce((sum, m) => sum + m.predictions, 0).toLocaleString('en-US')}
            </div>
            <div className="text-sm text-gray-400">Total Predictions</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Avg Accuracy</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
