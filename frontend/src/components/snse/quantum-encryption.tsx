'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Key, 
  Cpu, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react'

interface QuantumKey {
  id: string
  algorithm: string
  strength: number
  status: 'active' | 'rotating' | 'expired'
  lastRotation: string
  nextRotation: string
}

interface EncryptionMetrics {
  totalKeys: number
  activeKeys: number
  rotationRate: number
  securityLevel: number
  quantumResistance: number
}

export function QuantumEncryption() {
  const [quantumKeys, setQuantumKeys] = useState<QuantumKey[]>([])
  const [metrics, setMetrics] = useState<EncryptionMetrics>({
    totalKeys: 0,
    activeKeys: 0,
    rotationRate: 0,
    securityLevel: 0,
    quantumResistance: 0
  })
  const [isRotating, setIsRotating] = useState(false)

  useEffect(() => {
    // Simulate initial data load
    const initialKeys: QuantumKey[] = [
      {
        id: 'qk-001',
        algorithm: 'CRYSTALS-Kyber',
        strength: 256,
        status: 'active',
        lastRotation: '2025-01-15T10:30:00Z',
        nextRotation: '2025-01-15T16:30:00Z'
      },
      {
        id: 'qk-002',
        algorithm: 'CRYSTALS-Dilithium',
        strength: 512,
        status: 'active',
        lastRotation: '2025-01-15T09:15:00Z',
        nextRotation: '2025-01-15T15:15:00Z'
      },
      {
        id: 'qk-003',
        algorithm: 'FALCON',
        strength: 1024,
        status: 'rotating',
        lastRotation: '2025-01-15T08:45:00Z',
        nextRotation: '2025-01-15T14:45:00Z'
      },
      {
        id: 'qk-004',
        algorithm: 'SPHINCS+',
        strength: 256,
        status: 'expired',
        lastRotation: '2025-01-14T22:00:00Z',
        nextRotation: '2025-01-15T04:00:00Z'
      }
    ]

    setQuantumKeys(initialKeys)
    setMetrics({
      totalKeys: initialKeys.length,
      activeKeys: initialKeys.filter(k => k.status === 'active').length,
      rotationRate: 95.8,
      securityLevel: 99.2,
      quantumResistance: 100
    })

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        rotationRate: Math.min(100, prev.rotationRate + Math.random() * 0.1),
        securityLevel: Math.min(100, prev.securityLevel + Math.random() * 0.05)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleKeyRotation = async () => {
    setIsRotating(true)
    
    // Simulate rotation process
    setTimeout(() => {
      setQuantumKeys(prev => prev.map(key => ({
        ...key,
        status: key.status === 'expired' ? 'active' : key.status,
        lastRotation: new Date().toISOString(),
        nextRotation: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
      })))
      setIsRotating(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-neon-green'
      case 'rotating': return 'bg-neon-yellow'
      case 'expired': return 'bg-neon-red'
      default: return 'bg-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'rotating': return <Clock className="h-4 w-4" />
      case 'expired': return <AlertTriangle className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Quantum Encryption</h2>
            <p className="text-muted-foreground">Post-quantum cryptographic protection</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neon-purple animate-pulse" />
            <span className="text-sm font-medium text-neon-purple">Quantum-Safe</span>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Security Level</span>
              <span className="font-medium text-neon-green">{metrics.securityLevel.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div 
                className="bg-neon-green h-2 rounded-full transition-all duration-500" 
                style={{ width: `${metrics.securityLevel}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Quantum Resistance</span>
              <span className="font-medium text-neon-purple">{metrics.quantumResistance}%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div 
                className="bg-neon-purple h-2 rounded-full transition-all duration-500" 
                style={{ width: `${metrics.quantumResistance}%` }}
              />
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center p-3 bg-background/50 rounded-lg border border-border"
          >
            <div className="text-xl font-bold text-neon-blue mb-1">{metrics.totalKeys}</div>
            <div className="text-xs text-muted-foreground">Total Keys</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-3 bg-background/50 rounded-lg border border-border"
          >
            <div className="text-xl font-bold text-neon-green mb-1">{metrics.activeKeys}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center p-3 bg-background/50 rounded-lg border border-border"
          >
            <div className="text-xl font-bold text-neon-yellow mb-1">{metrics.rotationRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Rotation Rate</div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quantum Keys</h3>
          <button 
            onClick={handleKeyRotation}
            disabled={isRotating}
            className="flex items-center space-x-2 px-3 py-1.5 bg-neon-purple/10 text-neon-purple rounded-lg border border-neon-purple/20 hover:bg-neon-purple/20 transition-colors disabled:opacity-50"
          >
            {isRotating ? (
              <>
                <Activity className="h-3 w-3 animate-spin" />
                <span className="text-xs">Rotating...</span>
              </>
            ) : (
              <>
                <Key className="h-3 w-3" />
                <span className="text-xs">Rotate Keys</span>
              </>
            )}
          </button>
        </div>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {quantumKeys.map((key, index) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(key.status)}`} />
                <div>
                  <div className="font-medium text-sm">{key.algorithm}</div>
                  <div className="text-xs text-muted-foreground">{key.strength}-bit strength</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(key.status)}
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  key.status === 'active' ? 'bg-neon-green/10 text-neon-green border-neon-green/20' :
                  key.status === 'rotating' ? 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20' :
                  'bg-neon-red/10 text-neon-red border-neon-red/20'
                }`}>
                  {key.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-lg border border-neon-purple/20 p-4"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Lock className="h-4 w-4 text-neon-purple" />
          <span className="font-medium text-foreground">Encryption Status</span>
        </div>
        <div className="text-sm text-muted-foreground">
          All communications are protected with post-quantum cryptographic algorithms. 
          Keys are automatically rotated every 6 hours to maintain maximum security.
        </div>
      </motion.div>
    </div>
  )
}
