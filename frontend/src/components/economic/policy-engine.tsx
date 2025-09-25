'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Settings, Brain, Target, Zap, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

interface PolicyRule {
  id: string
  name: string
  condition: string
  action: string
  priority: 'high' | 'medium' | 'low'
  status: 'active' | 'inactive' | 'testing'
  effectiveness: number
  lastTriggered: string
}

interface PolicyDecision {
  id: string
  timestamp: string
  trigger: string
  decision: string
  confidence: number
  impact: 'positive' | 'negative' | 'neutral'
  region: string
}

export function PolicyEngine() {
  const [rules, setRules] = useState<PolicyRule[]>([])
  const [decisions, setDecisions] = useState<PolicyDecision[]>([])
  const [engineStatus, setEngineStatus] = useState('operational')
  const [decisionCount, setDecisionCount] = useState(0)

  useEffect(() => {
    // Simulate policy engine data
    const mockRules: PolicyRule[] = [
      {
        id: '1',
        name: 'Inflation Control',
        condition: 'Inflation > 3%',
        action: 'Increase interest rates by 0.25%',
        priority: 'high',
        status: 'active',
        effectiveness: 92,
        lastTriggered: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Employment Boost',
        condition: 'Unemployment > 5%',
        action: 'Implement job creation incentives',
        priority: 'high',
        status: 'active',
        effectiveness: 87,
        lastTriggered: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Currency Stability',
        condition: 'Currency volatility > 2%',
        action: 'Intervene in forex markets',
        priority: 'medium',
        status: 'active',
        effectiveness: 78,
        lastTriggered: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Trade Balance',
        condition: 'Trade deficit > 2% of GDP',
        action: 'Adjust import tariffs',
        priority: 'medium',
        status: 'testing',
        effectiveness: 65,
        lastTriggered: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Market Stability',
        condition: 'Market volatility > 15%',
        action: 'Activate circuit breakers',
        priority: 'high',
        status: 'active',
        effectiveness: 89,
        lastTriggered: new Date().toISOString()
      }
    ]

    const mockDecisions: PolicyDecision[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        trigger: 'Inflation rate increased to 3.2%',
        decision: 'Raised interest rates by 0.25%',
        confidence: 94,
        impact: 'positive',
        region: 'Global'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        trigger: 'Unemployment rate at 4.8%',
        decision: 'Maintained current employment policies',
        confidence: 87,
        impact: 'neutral',
        region: 'North America'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        trigger: 'Currency volatility at 1.8%',
        decision: 'No intervention required',
        confidence: 91,
        impact: 'neutral',
        region: 'EU'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        trigger: 'Market volatility at 12%',
        decision: 'Monitored market conditions',
        confidence: 85,
        impact: 'positive',
        region: 'Asia-Pacific'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 1500000).toISOString(),
        trigger: 'Post-Brexit trade adjustment needed',
        decision: 'Implemented UK-specific trade protocols',
        confidence: 89,
        impact: 'positive',
        region: 'UK'
      },
      {
        id: '6',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        trigger: 'Swiss franc stability maintained',
        decision: 'Continued neutrality-based monetary policy',
        confidence: 94,
        impact: 'positive',
        region: 'Switzerland'
      },
      {
        id: '7',
        timestamp: new Date(Date.now() - 2100000).toISOString(),
        trigger: 'Arctic resource development opportunities',
        decision: 'Coordinated Greenland-Alaska resource framework',
        confidence: 82,
        impact: 'positive',
        region: 'Greenland/Alaska'
      }
    ]

    setRules(mockRules)
    setDecisions(mockDecisions)
    setDecisionCount(1247)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setDecisionCount(prev => prev + Math.floor(Math.random() * 3))
      
      // Add new decision occasionally
      if (Math.random() > 0.7) {
        const newDecision: PolicyDecision = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          trigger: 'Economic indicator threshold reached',
          decision: 'Policy adjustment implemented',
          confidence: Math.floor(Math.random() * 20) + 80,
          impact: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
          region: ['Global', 'North America', 'EU', 'Asia-Pacific'][Math.floor(Math.random() * 4)]
        }
        setDecisions(prev => [newDecision, ...prev.slice(0, 9)])
      }
    }, 5000)

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
      case 'inactive': return 'bg-gray-500/20 text-gray-400'
      case 'testing': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
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
      case 'neutral': return Clock
      default: return Clock
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
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Settings className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Autonomous Policy Engine</h3>
            <p className="text-gray-400">AI-driven economic policy decision making</p>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{decisionCount.toLocaleString('en-US')}</div>
            <div className="text-sm text-gray-400">Decisions Made</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400 capitalize">{engineStatus}</div>
            <div className="text-sm text-gray-400">Engine Status</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policy Rules */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Active Policy Rules</h4>
          {rules.map((rule) => (
            <motion.div
              key={rule.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Brain className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white">{rule.name}</h5>
                    <p className="text-sm text-gray-400">Priority: {rule.priority}</p>
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
              
              <div className="space-y-2 mb-3">
                <div className="text-sm">
                  <span className="text-gray-400">Condition: </span>
                  <span className="text-white">{rule.condition}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Action: </span>
                  <span className="text-white">{rule.action}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Effectiveness</span>
                  <span className="text-white">{rule.effectiveness}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      rule.effectiveness >= 90 ? 'bg-green-500' :
                      rule.effectiveness >= 80 ? 'bg-blue-500' :
                      rule.effectiveness >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${rule.effectiveness}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">
                  Last triggered: {new Date(rule.lastTriggered).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Decisions */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Recent Decisions</h4>
          {decisions.map((decision) => {
            const ImpactIcon = getImpactIcon(decision.impact)
            
            return (
              <motion.div
                key={decision.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <Target className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{decision.region}</h5>
                      <p className="text-sm text-gray-400">{new Date(decision.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ImpactIcon className={`w-4 h-4 ${getImpactColor(decision.impact)}`} />
                    <span className={`text-sm font-medium ${getImpactColor(decision.impact)}`}>
                      {decision.impact}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-400">Trigger: </span>
                    <span className="text-white">{decision.trigger}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Decision: </span>
                    <span className="text-white">{decision.decision}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-blue-400">{decision.confidence}%</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Engine Performance */}
      <div className="mt-6 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Engine Performance</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">94.2%</div>
            <div className="text-sm text-gray-400">Decision Accuracy</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">2.3ms</div>
            <div className="text-sm text-gray-400">Avg Response Time</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">87.5%</div>
            <div className="text-sm text-gray-400">Positive Impact</div>
          </div>
          <div className="text-center p-4 bg-gray-700/50 rounded-lg">
            <Settings className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
