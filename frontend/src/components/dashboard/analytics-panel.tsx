'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity, 
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Building,
  Zap,
  Brain,
  Shield
} from 'lucide-react'

interface Metric {
  id: string
  name: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  format: 'number' | 'percentage' | 'currency' | 'time'
  icon: React.ReactNode
  color: string
}

interface ChartData {
  name: string
  value: number
  color: string
}

interface TimeSeriesData {
  timestamp: string
  value: number
}

export function AnalyticsPanel() {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      const mockMetrics: Metric[] = [
        {
          id: 'revenue',
          name: 'Platform Revenue',
          value: 2847392,
          change: 12.5,
          changeType: 'increase',
          format: 'currency',
          icon: <DollarSign className="w-5 h-5" />,
          color: 'text-neon-green'
        },
        {
          id: 'users',
          name: 'Active Users',
          value: 15678,
          change: 8.3,
          changeType: 'increase',
          format: 'number',
          icon: <Users className="w-5 h-5" />,
          color: 'text-neon-blue'
        },
        {
          id: 'ai-tasks',
          name: 'AI Tasks Completed',
          value: 89234,
          change: 23.7,
          changeType: 'increase',
          format: 'number',
          icon: <Brain className="w-5 h-5" />,
          color: 'text-neon-purple'
        },
        {
          id: 'response-time',
          name: 'Avg Response Time',
          value: 0.847,
          change: -15.2,
          changeType: 'decrease',
          format: 'time',
          icon: <Zap className="w-5 h-5" />,
          color: 'text-neon-yellow'
        },
        {
          id: 'security-score',
          name: 'Security Score',
          value: 98.7,
          change: 2.1,
          changeType: 'increase',
          format: 'percentage',
          icon: <Shield className="w-5 h-5" />,
          color: 'text-neon-green'
        },
        {
          id: 'global-reach',
          name: 'Global Reach',
          value: 47,
          change: 5.2,
          changeType: 'increase',
          format: 'number',
          icon: <Globe className="w-5 h-5" />,
          color: 'text-neon-pink'
        }
      ]

      const mockChartData: ChartData[] = [
        { name: 'ARPE', value: 35, color: '#00D4FF' },
        { name: 'QESO', value: 28, color: '#8B5CF6' },
        { name: 'ABME', value: 22, color: '#10B981' },
        { name: 'SNSE', value: 15, color: '#EF4444' }
      ]

      const mockTimeSeriesData: TimeSeriesData[] = Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
        value: Math.random() * 1000 + 500
      }))

      setMetrics(mockMetrics)
      setChartData(mockChartData)
      setTimeSeriesData(mockTimeSeriesData)
      setIsLoading(false)
    }, 1500)
  }, [])

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      case 'percentage':
        return `${value.toFixed(1)}%`
      case 'time':
        return `${value.toFixed(3)}s`
      case 'number':
        return new Intl.NumberFormat('en-US').format(value)
      default:
        return value.toString()
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return <TrendingUp className="w-4 h-4 text-neon-green" />
      case 'decrease': return <TrendingDown className="w-4 h-4 text-neon-red" />
      case 'neutral': return <Activity className="w-4 h-4 text-muted-foreground" />
      default: return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-neon-green'
      case 'decrease': return 'text-neon-red'
      case 'neutral': return 'text-muted-foreground'
      default: return 'text-muted-foreground'
    }
  }

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ]

  if (isLoading) {
    return (
      <div className="palantir-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading analytics...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="tesla-heading text-xl font-semibold">Strategic Analytics Panel</h3>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="palantir-select text-sm"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live Data</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className="palantir-card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`${metric.color}`}>
                {metric.icon}
              </div>
              <div className="flex items-center space-x-1">
                {getChangeIcon(metric.changeType)}
                <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground mb-1">{metric.name}</h4>
              <p className="text-2xl font-bold font-mono">
                {formatValue(metric.value, metric.format)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Agent Performance */}
        <div className="palantir-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="tesla-heading text-lg font-medium">AI Agent Performance</h4>
            <PieChart className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {chartData.map((item, index) => (
              <motion.div
                key={item.name}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-mono w-8 text-right">{item.value}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="palantir-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="tesla-heading text-lg font-medium">Performance Trends</h4>
            <LineChart className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="h-32 flex items-end justify-between space-x-1">
            {timeSeriesData.slice(-12).map((point, index) => (
              <motion.div
                key={index}
                className="bg-neon-blue rounded-t"
                style={{ height: `${(point.value / 1500) * 100}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${(point.value / 1500) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>12h ago</span>
            <span>6h ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="mt-6">
        <div className="palantir-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="tesla-heading text-lg font-medium">Strategic Insights</h4>
            <Target className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                <span className="text-sm">ARPE showing 35% efficiency improvement</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                <span className="text-sm">QESO quantum optimization active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                <span className="text-sm">ABME autonomous execution at 98.7% success rate</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-yellow rounded-full"></div>
                <span className="text-sm">Response time improved by 15.2%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-pink rounded-full"></div>
                <span className="text-sm">Global reach expanded to 47 countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-red rounded-full"></div>
                <span className="text-sm">Security score maintained at 98.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
