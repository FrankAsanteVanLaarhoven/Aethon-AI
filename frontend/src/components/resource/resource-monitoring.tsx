'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Globe, Zap } from 'lucide-react'

interface ResourceData {
  id: string
  name: string
  type: 'energy' | 'water' | 'minerals' | 'food' | 'materials'
  currentLevel: number
  maxCapacity: number
  efficiency: number
  status: 'optimal' | 'warning' | 'critical'
  location: string
  lastUpdate: string
}

export function ResourceMonitoring() {
  const [resources, setResources] = useState<ResourceData[]>([])
  const [selectedResource, setSelectedResource] = useState<string | null>(null)
  const [globalEfficiency, setGlobalEfficiency] = useState(0)

  useEffect(() => {
    // Simulate real-time resource monitoring
    const mockResources: ResourceData[] = [
      {
        id: '1',
        name: 'Solar Energy Grid',
        type: 'energy',
        currentLevel: 85,
        maxCapacity: 100,
        efficiency: 92,
        status: 'optimal',
        location: 'Global Network',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Water Purification',
        type: 'water',
        currentLevel: 67,
        maxCapacity: 100,
        efficiency: 88,
        status: 'warning',
        location: 'Regional Hubs',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Rare Earth Mining',
        type: 'minerals',
        currentLevel: 45,
        maxCapacity: 100,
        efficiency: 76,
        status: 'critical',
        location: 'Strategic Sites',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Vertical Farming',
        type: 'food',
        currentLevel: 78,
        maxCapacity: 100,
        efficiency: 94,
        status: 'optimal',
        location: 'Urban Centers',
        lastUpdate: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Recycling Systems',
        type: 'materials',
        currentLevel: 82,
        maxCapacity: 100,
        efficiency: 89,
        status: 'optimal',
        location: 'Industrial Zones',
        lastUpdate: new Date().toISOString()
      }
    ]

    setResources(mockResources)
    setGlobalEfficiency(88)

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setResources(prev => prev.map(resource => ({
        ...resource,
        currentLevel: Math.max(0, Math.min(100, resource.currentLevel + (Math.random() - 0.5) * 2)),
        efficiency: Math.max(0, Math.min(100, resource.efficiency + (Math.random() - 0.5) * 1)),
        lastUpdate: new Date().toISOString()
      })))
      setGlobalEfficiency(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 1)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return CheckCircle
      case 'warning': return AlertTriangle
      case 'critical': return AlertTriangle
      default: return Activity
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'energy': return Zap
      case 'water': return Globe
      case 'minerals': return Activity
      case 'food': return Globe
      case 'materials': return Activity
      default: return Activity
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
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Resource Monitoring</h3>
            <p className="text-gray-400">Real-time planetary resource tracking</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{globalEfficiency.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Global Efficiency</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource List */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white mb-4">Active Resources</h4>
          {resources.map((resource) => {
            const StatusIcon = getStatusIcon(resource.status)
            const TypeIcon = getTypeIcon(resource.type)
            
            return (
              <motion.div
                key={resource.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedResource === resource.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
                onClick={() => setSelectedResource(selectedResource === resource.id ? null : resource.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg">
                      <TypeIcon className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{resource.name}</h5>
                      <p className="text-sm text-gray-400">{resource.location}</p>
                    </div>
                  </div>
                  <div className={`p-1 rounded-full ${getStatusColor(resource.status)}`}>
                    <StatusIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Capacity</span>
                    <span className="text-white">{resource.currentLevel.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${resource.currentLevel}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Efficiency</span>
                    <span className="text-green-400">{resource.efficiency.toFixed(1)}%</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Resource Details */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white mb-4">Resource Analytics</h4>
          
          {selectedResource ? (
            (() => {
              const resource = resources.find(r => r.id === selectedResource)
              if (!resource) return null
              
              const TypeIcon = getTypeIcon(resource.type)
              
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <TypeIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-white">{resource.name}</h5>
                      <p className="text-gray-400">{resource.type} • {resource.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{resource.currentLevel.toFixed(1)}%</div>
                      <div className="text-sm text-gray-400">Current Level</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{resource.efficiency.toFixed(1)}%</div>
                      <div className="text-sm text-gray-400">Efficiency</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Capacity</span>
                      <span className="text-white">{resource.maxCapacity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        resource.status === 'optimal' ? 'bg-green-500/20 text-green-400' :
                        resource.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {resource.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Update</span>
                      <span className="text-white">{new Date(resource.lastUpdate).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })()
          ) : (
            <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
              <Activity className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Select a resource to view detailed analytics</p>
            </div>
          )}

          {/* Global Metrics */}
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h5 className="text-lg font-semibold text-white mb-4">Global Metrics</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{resources.filter(r => r.status === 'optimal').length}</div>
                <div className="text-sm text-gray-400">Optimal Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{resources.filter(r => r.status === 'warning').length}</div>
                <div className="text-sm text-gray-400">Warning Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{resources.filter(r => r.status === 'critical').length}</div>
                <div className="text-sm text-gray-400">Critical Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{resources.length}</div>
                <div className="text-sm text-gray-400">Total Resources</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}