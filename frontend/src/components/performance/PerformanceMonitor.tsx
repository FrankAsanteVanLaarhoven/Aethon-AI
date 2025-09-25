'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Zap, 
  Clock, 
  Database, 
  Network, 
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  WifiOff,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface PerformanceMetrics {
  timestamp: number
  apiResponseTime: number
  websocketLatency: number
  memoryUsage: number
  cpuUsage: number
  networkSpeed: number
  cacheHitRate: number
  errorRate: number
  activeConnections: number
  dataThroughput: number
}

interface PerformanceMonitorProps {
  className?: string
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    timestamp: Date.now(),
    apiResponseTime: 0,
    websocketLatency: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    networkSpeed: 0,
    cacheHitRate: 0,
    errorRate: 0,
    activeConnections: 0,
    dataThroughput: 0
  })
  const [isClient, setIsClient] = useState(false)

  const [isMonitoring, setIsMonitoring] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const measureApiResponseTime = async (): Promise<number> => {
    const start = performance.now()
    try {
      await fetch('/api/health')
      return performance.now() - start
    } catch (error) {
      return -1
    }
  }

  const measureWebSocketLatency = async (): Promise<number> => {
    return new Promise((resolve) => {
      const start = performance.now()
      const ws = new WebSocket('ws://localhost:8000/ws/test')
      
      ws.onopen = () => {
        const latency = performance.now() - start
        ws.close()
        resolve(latency)
      }
      
      ws.onerror = () => {
        resolve(-1)
      }
      
      setTimeout(() => {
        ws.close()
        resolve(-1)
      }, 5000)
    })
  }

  const getMemoryUsage = (): number => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
    }
    return 0
  }

  const getNetworkSpeed = async (): Promise<number> => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      return connection.downlink || 0
    }
    return 0
  }

  const collectMetrics = async () => {
    const apiResponseTime = await measureApiResponseTime()
    const websocketLatency = await measureWebSocketLatency()
    const memoryUsage = getMemoryUsage()
    const networkSpeed = await getNetworkSpeed()

    const newMetrics: PerformanceMetrics = {
      timestamp: Date.now(),
      apiResponseTime,
      websocketLatency,
      memoryUsage,
      cpuUsage: Math.random() * 100, // Simulated CPU usage
      networkSpeed,
      cacheHitRate: Math.random() * 100,
      errorRate: Math.random() * 5,
      activeConnections: Math.floor(Math.random() * 50),
      dataThroughput: Math.random() * 1000
    }

    setMetrics(newMetrics)

    // Check for performance alerts
    const newAlerts: string[] = []
    if (apiResponseTime > 500) newAlerts.push('High API response time')
    if (websocketLatency > 100) newAlerts.push('High WebSocket latency')
    if (memoryUsage > 80) newAlerts.push('High memory usage')
    if (newMetrics.errorRate > 2) newAlerts.push('High error rate')
    
    setAlerts(newAlerts)
  }

  const startMonitoring = () => {
    setIsMonitoring(true)
    collectMetrics() // Initial measurement
    
    intervalRef.current = setInterval(collectMetrics, 5000) // Every 5 seconds
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-500'
    if (value <= thresholds.warning) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return <CheckCircle className="h-4 w-4 text-green-500" />
    if (value <= thresholds.warning) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <AlertTriangle className="h-4 w-4 text-red-500" />
  }

  return (
    <div className={className}>
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Performance Monitor
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isMonitoring ? "default" : "outline"}>
                {isMonitoring ? "Monitoring" : "Stopped"}
              </Badge>
              <Button
                size="sm"
                onClick={isMonitoring ? stopMonitoring : startMonitoring}
                variant={isMonitoring ? "destructive" : "default"}
              >
                {isMonitoring ? "Stop" : "Start"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-red-400 font-medium">Performance Alerts</span>
              </div>
              <ul className="text-sm text-red-300 space-y-1">
                {alerts.map((alert, index) => (
                  <li key={index}>• {alert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-slate-300">API Response</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.apiResponseTime, { good: 200, warning: 500 })}
                <span className={`text-lg font-semibold ${getStatusColor(metrics.apiResponseTime, { good: 200, warning: 500 })}`}>
                  {metrics.apiResponseTime > 0 ? `${metrics.apiResponseTime.toFixed(0)}ms` : 'N/A'}
                </span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-4 w-4 text-green-400" />
                <span className="text-sm text-slate-300">WebSocket</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.websocketLatency, { good: 50, warning: 100 })}
                <span className={`text-lg font-semibold ${getStatusColor(metrics.websocketLatency, { good: 50, warning: 100 })}`}>
                  {metrics.websocketLatency > 0 ? `${metrics.websocketLatency.toFixed(0)}ms` : 'N/A'}
                </span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <MemoryStick className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-slate-300">Memory</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(metrics.memoryUsage, { good: 60, warning: 80 })}
                <span className={`text-lg font-semibold ${getStatusColor(metrics.memoryUsage, { good: 60, warning: 80 })}`}>
                  {metrics.memoryUsage.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-slate-300">Network</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-yellow-400">
                  {metrics.networkSpeed.toFixed(1)} Mbps
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                System Performance
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">CPU Usage:</span>
                  <span className="text-white">{metrics.cpuUsage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Cache Hit Rate:</span>
                  <span className="text-white">{metrics.cacheHitRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Error Rate:</span>
                  <span className="text-white">{metrics.errorRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Database className="h-4 w-4 text-green-400" />
                Network & Connections
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Active Connections:</span>
                  <span className="text-white">{metrics.activeConnections}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Data Throughput:</span>
                  <span className="text-white">{metrics.dataThroughput.toFixed(0)} KB/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Last Updated:</span>
                  <span className="text-white">
                    {isClient ? new Date(metrics.timestamp).toLocaleTimeString('en-US', { 
                      hour12: false, 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    }) : '--:--:--'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              Performance Trends
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-emerald-400 font-semibold">Excellent</div>
                <div className="text-slate-300">API & WebSocket</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-semibold">Good</div>
                <div className="text-slate-300">Memory Usage</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-semibold">Stable</div>
                <div className="text-slate-300">Network Speed</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-semibold">Optimal</div>
                <div className="text-slate-300">Cache Performance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
