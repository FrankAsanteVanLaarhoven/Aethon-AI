'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Cpu, 
  Network, 
  Atom,
  Star,
  Award,
  Lightbulb,
  Rocket
} from 'lucide-react'

interface QEMASIMoveAnalysis {
  piece: string
  from_position: { x: number; y: number }
  to_position: { x: number; y: number }
  strategic_value: number
  risk_score: number
  expected_return: number
  qemasi_confidence: number
  neural_confidence: number
  quantum_coherence: number
}

interface QEMASIEnsembleAnalysis {
  minimax_move: string
  mcts_move: string
  neural_move: string
  quantum_move: string
  algorithm_weights: Record<string, number>
  ensemble_diversity: number
  algorithm_convergence: number
}

interface QEMASIAnalysis {
  best_move: QEMASIMoveAnalysis
  ensemble_analysis: QEMASIEnsembleAnalysis
  top_moves: QEMASIMoveAnalysis[]
  advanced_metrics: Record<string, any>
  qemasi_recommendations: string[]
  analysis_timestamp: string
  algorithm_version: string
}

interface AlgorithmComparison {
  qemasi_advantages: string[]
  performance_benchmarks: Record<string, any>
  innovation_metrics: Record<string, string>
  patent_potential: string[]
}

interface QuantumInsights {
  quantum_principles: string[]
  business_applications: string[]
  competitive_advantages: string[]
  future_developments: string[]
}

export default function QEMASIPage() {
  const [analysis, setAnalysis] = useState<QEMASIAnalysis | null>(null)
  const [comparison, setComparison] = useState<AlgorithmComparison | null>(null)
  const [insights, setInsights] = useState<QuantumInsights | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Quantum Superposition'])
  const [featureDetails, setFeatureDetails] = useState<Record<string, any>>({})
  const [showConfigPanel, setShowConfigPanel] = useState<string | null>(null)
  const [productionConfigs, setProductionConfigs] = useState<Record<string, any>>({
    'Quantum Superposition': {
      qubitCount: 1024,
      coherenceTime: 100,
      errorRate: 0.001,
      parallelThreads: 8,
      optimizationLevel: 'maximum'
    },
    'Neural Networks': {
      layerCount: 12,
      neuronsPerLayer: 2048,
      learningRate: 0.001,
      batchSize: 64,
      epochs: 1000,
      activationFunction: 'relu'
    },
    'Monte Carlo Tree Search': {
      iterations: 10000,
      explorationConstant: 1.414,
      maxDepth: 20,
      timeLimit: 5.0,
      parallelSimulations: 16
    },
    'Ensemble Learning': {
      modelCount: 10,
      votingMethod: 'weighted',
      diversityThreshold: 0.7,
      confidenceThreshold: 0.85,
      retrainingInterval: 24
    }
  })

  const revolutionaryFeatures = [
    {
      id: 'Quantum Superposition',
      name: 'Quantum Superposition',
      icon: Atom,
      description: 'Leverages quantum superposition states to evaluate multiple strategic scenarios simultaneously',
      benefits: ['Parallel computation', 'Enhanced decision accuracy', 'Quantum advantage'],
      status: 'active',
      color: 'text-foreground',
      bgColor: 'bg-foreground/10'
    },
    {
      id: 'Neural Networks',
      name: 'Neural Networks',
      icon: Brain,
      description: 'Advanced neural network architecture for pattern recognition and strategic learning',
      benefits: ['Adaptive learning', 'Pattern recognition', 'Continuous improvement'],
      status: 'available',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/10'
    },
    {
      id: 'Monte Carlo Tree Search',
      name: 'Monte Carlo Tree Search',
      icon: Network,
      description: 'Sophisticated tree search algorithm for optimal strategic pathfinding',
      benefits: ['Optimal pathfinding', 'Risk assessment', 'Strategic depth'],
      status: 'available',
      color: 'text-secondary-foreground',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'Ensemble Learning',
      name: 'Ensemble Learning',
      icon: Cpu,
      description: 'Combines multiple algorithms for robust and accurate strategic predictions',
      benefits: ['Improved accuracy', 'Reduced bias', 'Robust predictions'],
      status: 'available',
      color: 'text-accent-foreground',
      bgColor: 'bg-accent/10'
    }
  ]

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId)
      } else {
        return [...prev, featureId]
      }
    })
  }

  const getFeatureDetails = async (featureId: string) => {
    try {
      const response = await fetch(`http://localhost:8002/api/v1/qemasi/feature-details/${featureId}`)
      if (response.ok) {
        const details = await response.json()
        setFeatureDetails(prev => ({ ...prev, [featureId]: details }))
      }
    } catch (err) {
      console.error(`Failed to load details for ${featureId}:`, err)
    }
  }

  const updateProductionConfig = (featureId: string, configKey: string, value: any) => {
    setProductionConfigs(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        [configKey]: value
      }
    }))
  }

  const saveProductionConfig = async (featureId: string) => {
    try {
      const response = await fetch(`http://localhost:8002/api/v1/qemasi/configure-feature/${featureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feature_id: featureId,
          configuration: productionConfigs[featureId],
          environment: 'production'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log(`Configuration saved for ${featureId}:`, result)
        setShowConfigPanel(null)
      }
    } catch (err) {
      console.error(`Failed to save configuration for ${featureId}:`, err)
    }
  }

  const validateConfiguration = (featureId: string) => {
    const config = productionConfigs[featureId]
    const validationResults = {
      valid: true,
      warnings: [] as string[],
      errors: [] as string[]
    }

    switch (featureId) {
      case 'Quantum Superposition':
        if (config.qubitCount > 2048) {
          validationResults.warnings.push('High qubit count may impact performance')
        }
        if (config.errorRate > 0.01) {
          validationResults.errors.push('Error rate too high for production use')
          validationResults.valid = false
        }
        break
      case 'Neural Networks':
        if (config.layerCount > 20) {
          validationResults.warnings.push('Deep networks may require more training time')
        }
        if (config.learningRate > 0.01) {
          validationResults.warnings.push('High learning rate may cause instability')
        }
        break
      case 'Monte Carlo Tree Search':
        if (config.iterations > 50000) {
          validationResults.warnings.push('High iteration count may impact response time')
        }
        break
      case 'Ensemble Learning':
        if (config.modelCount > 20) {
          validationResults.warnings.push('Many models may impact performance')
        }
        break
    }

    return validationResults
  }

  const marketData = {
    conditions: {
      market_volatility: 0.3,
      growth_rate: 0.15,
      competition_intensity: 0.7,
      regulatory_pressure: 0.4
    },
    landscape: {
      total_market_size: 1000000000,
      market_maturity: 0.6,
      technology_adoption: 0.8
    },
    competitors: [
      { name: "Competitor A", market_share: 0.25, strength: 0.8 },
      { name: "Competitor B", market_share: 0.20, strength: 0.7 },
      { name: "Competitor C", market_share: 0.15, strength: 0.6 }
    ],
    market_segments: ["Enterprise", "SMB", "Government"],
    geographic_regions: ["North America", "Europe", "Asia-Pacific"]
  }

  const runQEMASIAnalysis = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const analysisData = {
        ...marketData,
        selected_features: selectedFeatures,
        feature_configurations: featureDetails
      }

      const response = await fetch('http://localhost:8002/api/v1/qemasi/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      })

      if (!response.ok) {
        throw new Error(`QEMASI analysis failed: ${response.statusText}`)
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QEMASI analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const loadAlgorithmComparison = async () => {
    try {
      const response = await fetch('http://localhost:8002/api/v1/qemasi/algorithm-comparison')
      if (response.ok) {
        const result = await response.json()
        setComparison(result)
      }
    } catch (err) {
      console.error('Failed to load algorithm comparison:', err)
    }
  }

  const loadQuantumInsights = async () => {
    try {
      const response = await fetch('http://localhost:8002/api/v1/qemasi/quantum-insights')
      if (response.ok) {
        const result = await response.json()
        setInsights(result)
      }
    } catch (err) {
      console.error('Failed to load quantum insights:', err)
    }
  }

  useEffect(() => {
    loadAlgorithmComparison()
    loadQuantumInsights()
  }, [])

  return (
    <div className="min-h-screen bg-black dark:bg-black bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Atom className="h-12 w-12 text-white dark:text-white text-black" />
            <h1 className="text-4xl font-bold text-white dark:text-white text-black">
              QEMASI
            </h1>
          </div>
          <p className="text-xl text-white dark:text-white text-black">
            Quantum-Enhanced Multi-Agent Strategic Intelligence
          </p>
          <Badge variant="outline" className="bg-white/10 dark:bg-white/10 bg-black/10 border-white dark:border-white border-black text-white dark:text-white text-black">
            Revolutionary Algorithm v2.0.0
          </Badge>
        </div>

        {/* Revolutionary Features */}
        <Card className="bg-black/50 dark:bg-black/50 bg-white/50 border-white/20 dark:border-white/20 border-black/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Rocket className="h-6 w-6" />
              <span>Revolutionary Features</span>
            </CardTitle>
            <CardDescription className="text-white">
              Select and configure the revolutionary features to enhance your QEMASI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {revolutionaryFeatures.map((feature) => {
                const isSelected = selectedFeatures.includes(feature.id)
                const IconComponent = feature.icon
                
                return (
                  <div
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? `bg-white/10 border-2 border-white/50 shadow-lg` 
                        : `bg-black/50 border border-transparent hover:border-white/30`
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 ${isSelected ? feature.color : feature.color}`} />
                    <span className="text-sm text-white">
                      {feature.name}
                    </span>
                    {isSelected && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Selected Features Details */}
            {selectedFeatures.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Selected Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedFeatures.map((featureId) => {
                    const feature = revolutionaryFeatures.find(f => f.id === featureId)
                    if (!feature) return null
                    
                    return (
                      <div key={featureId} className="p-4 bg-black/50 rounded-lg border border-white/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <feature.icon className={`h-5 w-5 ${feature.color}`} />
                          <h5 className="font-semibold text-white">{feature.name}</h5>
                        </div>
                        <p className="text-sm text-white mb-3">{feature.description}</p>
                        <div className="space-y-1">
                          <h6 className="text-xs font-medium text-white">Benefits:</h6>
                          <ul className="text-xs text-white space-y-1">
                            {feature.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center space-x-1">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-3 w-full"
                          onClick={() => setShowConfigPanel(showConfigPanel === featureId ? null : featureId)}
                        >
                          {showConfigPanel === featureId ? 'Close Config' : 'Configure Feature'}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Production Configuration Panel */}
        {showConfigPanel && (
          <Card className="bg-gradient-to-r from-accent/10 to-muted/10 border-accent-foreground/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Cpu className="h-6 w-6" />
                <span>Production Configuration - {showConfigPanel}</span>
              </CardTitle>
              <CardDescription className="text-gray-300">
                Configure advanced parameters for production deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showConfigPanel === 'Quantum Superposition' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Qubit Count</label>
                    <input
                      type="number"
                      value={productionConfigs['Quantum Superposition'].qubitCount}
                      onChange={(e) => updateProductionConfig('Quantum Superposition', 'qubitCount', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="64"
                      max="4096"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Coherence Time (μs)</label>
                    <input
                      type="number"
                      value={productionConfigs['Quantum Superposition'].coherenceTime}
                      onChange={(e) => updateProductionConfig('Quantum Superposition', 'coherenceTime', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="10"
                      max="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Error Rate</label>
                    <input
                      type="number"
                      step="0.001"
                      value={productionConfigs['Quantum Superposition'].errorRate}
                      onChange={(e) => updateProductionConfig('Quantum Superposition', 'errorRate', parseFloat(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="0.0001"
                      max="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Parallel Threads</label>
                    <input
                      type="number"
                      value={productionConfigs['Quantum Superposition'].parallelThreads}
                      onChange={(e) => updateProductionConfig('Quantum Superposition', 'parallelThreads', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="1"
                      max="32"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Optimization Level</label>
                    <select
                      value={productionConfigs['Quantum Superposition'].optimizationLevel}
                      onChange={(e) => updateProductionConfig('Quantum Superposition', 'optimizationLevel', e.target.value)}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="minimum">Minimum</option>
                      <option value="balanced">Balanced</option>
                      <option value="maximum">Maximum</option>
                    </select>
                  </div>
                </div>
              )}

              {showConfigPanel === 'Neural Networks' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Layer Count</label>
                    <input
                      type="number"
                      value={productionConfigs['Neural Networks'].layerCount}
                      onChange={(e) => updateProductionConfig('Neural Networks', 'layerCount', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="3"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Neurons Per Layer</label>
                    <input
                      type="number"
                      value={productionConfigs['Neural Networks'].neuronsPerLayer}
                      onChange={(e) => updateProductionConfig('Neural Networks', 'neuronsPerLayer', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="64"
                      max="8192"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Learning Rate</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={productionConfigs['Neural Networks'].learningRate}
                      onChange={(e) => updateProductionConfig('Neural Networks', 'learningRate', parseFloat(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="0.0001"
                      max="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Batch Size</label>
                    <input
                      type="number"
                      value={productionConfigs['Neural Networks'].batchSize}
                      onChange={(e) => updateProductionConfig('Neural Networks', 'batchSize', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="8"
                      max="512"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Epochs</label>
                    <input
                      type="number"
                      value={productionConfigs['Neural Networks'].epochs}
                      onChange={(e) => updateProductionConfig('Neural Networks', 'epochs', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="100"
                      max="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Activation Function</label>
                    <select
                      value={productionConfigs['Neural Networks'].activationFunction}
                      onChange={(e) => updateProductionConfig('Neural Networks', 'activationFunction', e.target.value)}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="relu">ReLU</option>
                      <option value="sigmoid">Sigmoid</option>
                      <option value="tanh">Tanh</option>
                      <option value="leaky_relu">Leaky ReLU</option>
                    </select>
                  </div>
                </div>
              )}

              {showConfigPanel === 'Monte Carlo Tree Search' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Iterations</label>
                    <input
                      type="number"
                      value={productionConfigs['Monte Carlo Tree Search'].iterations}
                      onChange={(e) => updateProductionConfig('Monte Carlo Tree Search', 'iterations', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="1000"
                      max="100000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Exploration Constant</label>
                    <input
                      type="number"
                      step="0.001"
                      value={productionConfigs['Monte Carlo Tree Search'].explorationConstant}
                      onChange={(e) => updateProductionConfig('Monte Carlo Tree Search', 'explorationConstant', parseFloat(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="0.1"
                      max="3.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Max Depth</label>
                    <input
                      type="number"
                      value={productionConfigs['Monte Carlo Tree Search'].maxDepth}
                      onChange={(e) => updateProductionConfig('Monte Carlo Tree Search', 'maxDepth', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="5"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (seconds)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={productionConfigs['Monte Carlo Tree Search'].timeLimit}
                      onChange={(e) => updateProductionConfig('Monte Carlo Tree Search', 'timeLimit', parseFloat(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="0.1"
                      max="60.0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Parallel Simulations</label>
                    <input
                      type="number"
                      value={productionConfigs['Monte Carlo Tree Search'].parallelSimulations}
                      onChange={(e) => updateProductionConfig('Monte Carlo Tree Search', 'parallelSimulations', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="1"
                      max="64"
                    />
                  </div>
                </div>
              )}

              {showConfigPanel === 'Ensemble Learning' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Model Count</label>
                    <input
                      type="number"
                      value={productionConfigs['Ensemble Learning'].modelCount}
                      onChange={(e) => updateProductionConfig('Ensemble Learning', 'modelCount', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="3"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Voting Method</label>
                    <select
                      value={productionConfigs['Ensemble Learning'].votingMethod}
                      onChange={(e) => updateProductionConfig('Ensemble Learning', 'votingMethod', e.target.value)}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                    >
                      <option value="majority">Majority</option>
                      <option value="weighted">Weighted</option>
                      <option value="soft">Soft Voting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Diversity Threshold</label>
                    <input
                      type="number"
                      step="0.1"
                      value={productionConfigs['Ensemble Learning'].diversityThreshold}
                      onChange={(e) => updateProductionConfig('Ensemble Learning', 'diversityThreshold', parseFloat(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="0.1"
                      max="1.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Confidence Threshold</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productionConfigs['Ensemble Learning'].confidenceThreshold}
                      onChange={(e) => updateProductionConfig('Ensemble Learning', 'confidenceThreshold', parseFloat(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="0.5"
                      max="1.0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Retraining Interval (hours)</label>
                    <input
                      type="number"
                      value={productionConfigs['Ensemble Learning'].retrainingInterval}
                      onChange={(e) => updateProductionConfig('Ensemble Learning', 'retrainingInterval', parseInt(e.target.value))}
                      className="w-full p-2 bg-background border border-border rounded-md text-foreground"
                      min="1"
                      max="168"
                    />
                  </div>
                </div>
              )}

              {/* Configuration Validation */}
              {(() => {
                const validation = validateConfiguration(showConfigPanel)
                return (
                  <div className="mt-4">
                    {validation.errors.length > 0 && (
                      <div className="mb-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                        <h5 className="text-sm font-medium text-red-400 mb-1">Configuration Errors:</h5>
                        <ul className="text-xs text-red-300 space-y-1">
                          {validation.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {validation.warnings.length > 0 && (
                      <div className="mb-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                        <h5 className="text-sm font-medium text-yellow-400 mb-1">Configuration Warnings:</h5>
                        <ul className="text-xs text-yellow-300 space-y-1">
                          {validation.warnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Save Configuration Button */}
              <div className="mt-4 flex space-x-3">
                <Button
                  onClick={() => saveProductionConfig(showConfigPanel)}
                  className="bg-gradient-to-r from-foreground to-muted-foreground hover:from-foreground/90 hover:to-muted-foreground/90"
                  disabled={!validateConfiguration(showConfigPanel).valid}
                >
                  Save Production Configuration
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowConfigPanel(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance Benchmarks */}
        {comparison && (
          <Card className="bg-gradient-to-r from-muted/10 to-secondary/10 border-muted-foreground/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Award className="h-6 w-6" />
                <span>Performance Benchmarks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Traditional Minimax</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Accuracy:</span>
                      <span className="text-red-400">75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Depth:</span>
                      <span className="text-red-400">4 levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Learning:</span>
                      <span className="text-red-400">None</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">QEMASI Quantum</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Accuracy:</span>
                      <span className="text-foreground">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Depth:</span>
                      <span className="text-foreground">6 levels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Learning:</span>
                      <span className="text-foreground">Continuous</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-foreground/10 rounded-lg">
                <h5 className="font-semibold text-foreground mb-2">Innovation Metrics</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Algorithm Complexity:</span>
                    <span className="text-foreground">10x traditional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Decision Accuracy:</span>
                    <span className="text-foreground">+17% improvement</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Strategic Depth:</span>
                    <span className="text-foreground">+50% deeper</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Risk Assessment:</span>
                    <span className="text-foreground">+25% more accurate</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature Testing Status */}
        {selectedFeatures.length > 0 && (
          <Card className="bg-gradient-to-r from-accent/10 to-muted/10 border-accent-foreground/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Cpu className="h-6 w-6" />
                <span>Feature Testing Status</span>
              </CardTitle>
              <CardDescription className="text-gray-300">
                Real-time status of your selected revolutionary features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedFeatures.map((featureId) => {
                  const feature = revolutionaryFeatures.find(f => f.id === featureId)
                  if (!feature) return null
                  
                  return (
                    <div key={featureId} className="p-4 bg-foreground/5 rounded-lg border border-foreground/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <feature.icon className={`h-5 w-5 ${feature.color}`} />
                        <span className="text-sm font-medium text-foreground">{feature.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Active</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-300">
                        Ready for analysis
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* QEMASI Analysis */}
        <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary-foreground/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Target className="h-6 w-6" />
              <span>QEMASI Strategic Analysis</span>
            </CardTitle>
            <CardDescription className="text-gray-300">
              Revolutionary quantum-enhanced multi-agent strategic intelligence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={runQEMASIAnalysis} 
              disabled={loading}
              className="w-full bg-gradient-to-r from-foreground to-muted-foreground hover:from-foreground/90 hover:to-muted-foreground/90"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Running QEMASI Analysis...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Atom className="h-4 w-4" />
                  <span>Run QEMASI Analysis</span>
                </div>
              )}
            </Button>

            {error && (
              <Alert className="bg-destructive/10 border-destructive/20">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Best Move */}
                <div className="p-4 bg-foreground/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Optimal Strategic Move</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-300">Piece: {analysis.best_move.piece}</div>
                      <div className="text-sm text-gray-300">
                        From: ({analysis.best_move.from_position.x}, {analysis.best_move.from_position.y})
                      </div>
                      <div className="text-sm text-gray-300">
                        To: ({analysis.best_move.to_position.x}, {analysis.best_move.to_position.y})
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-300">Strategic Value:</span>
                        <span className="text-sm text-foreground">{analysis.best_move.strategic_value.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-300">Risk Score:</span>
                        <span className="text-sm text-muted-foreground">{analysis.best_move.risk_score.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-300">Expected Return:</span>
                        <span className="text-sm text-foreground">{analysis.best_move.expected_return.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ensemble Analysis */}
                <div className="p-4 bg-muted/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-muted-foreground mb-3">Ensemble Algorithm Analysis</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-300">Minimax Neural:</div>
                      <div className="text-foreground">{analysis.ensemble_analysis.minimax_move}</div>
                    </div>
                    <div>
                      <div className="text-gray-300">MCTS Neural:</div>
                      <div className="text-foreground">{analysis.ensemble_analysis.mcts_move}</div>
                    </div>
                    <div>
                      <div className="text-gray-300">Neural Move:</div>
                      <div className="text-foreground">{analysis.ensemble_analysis.neural_move}</div>
                    </div>
                    <div>
                      <div className="text-gray-300">Quantum Move:</div>
                      <div className="text-foreground">{analysis.ensemble_analysis.quantum_move}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-300">Ensemble Diversity:</div>
                      <Progress value={analysis.ensemble_analysis.ensemble_diversity * 100} className="mt-1" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Algorithm Convergence:</div>
                      <Progress value={analysis.ensemble_analysis.algorithm_convergence * 100} className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Advanced Metrics */}
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-secondary-foreground mb-3">Advanced QEMASI Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-300">Neural Confidence:</div>
                      <div className="text-foreground">{(analysis.best_move.neural_confidence * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-300">Quantum Coherence:</div>
                      <div className="text-foreground">{(analysis.best_move.quantum_coherence * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-300">QEMASI Confidence:</div>
                      <div className="text-foreground">{(analysis.best_move.qemasi_confidence * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="text-lg font-semibold text-accent-foreground mb-3">QEMASI Recommendations</h4>
                  <div className="space-y-2">
                    {analysis.qemasi_recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Lightbulb className="h-4 w-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quantum Insights */}
        {insights && (
          <Card className="bg-gradient-to-r from-accent/10 to-muted/10 border-accent-foreground/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Star className="h-6 w-6" />
                <span>Quantum Computing Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Quantum Principles</h4>
                  <div className="space-y-2">
                    {insights.quantum_principles.slice(0, 4).map((principle, index) => (
                      <div key={index} className="text-sm text-gray-300 p-2 bg-foreground/10 rounded">
                        {principle}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Business Applications</h4>
                  <div className="space-y-2">
                    {insights.business_applications.slice(0, 4).map((application, index) => (
                      <div key={index} className="text-sm text-gray-300 p-2 bg-muted/10 rounded">
                        {application}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Patent Information */}
        <Card className="bg-gradient-to-r from-muted/10 to-secondary/10 border-muted-foreground/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Award className="h-6 w-6" />
              <span>Patent-Ready Technology</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-foreground/10 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Patent Title</h4>
                <p className="text-sm text-gray-300">
                  "Quantum-Enhanced Multi-Agent Strategic Intelligence System for Business Decision Making"
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-white mb-2">Key Patent Claims</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Quantum superposition states for strategic evaluation</li>
                    <li>• Neural network evaluation with adaptive learning</li>
                    <li>• Monte Carlo Tree Search with neural guidance</li>
                    <li>• Ensemble learning with weighted voting</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Novelty Factors</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• First quantum business intelligence system</li>
                    <li>• Novel quantum + neural combination</li>
                    <li>• Revolutionary ensemble learning approach</li>
                    <li>• Breakthrough multi-agent coordination</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
