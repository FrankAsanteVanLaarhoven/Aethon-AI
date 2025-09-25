'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, Zap } from 'lucide-react'

interface MarketMetric {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  unit: string
  color: string
}

interface MarketEvent {
  id: string
  type: 'price_change' | 'volume_spike' | 'news_event' | 'competitor_action'
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  magnitude: number
  timestamp: string
}

export function MarketDynamics() {
  const [metrics, setMetrics] = useState<MarketMetric[]>([])
  const [events, setEvents] = useState<MarketEvent[]>([])
  const [marketVolatility, setMarketVolatility] = useState(0)

  useEffect(() => {
    const initialMetrics: MarketMetric[] = [
      {
        name: 'Market Cap',
        value: 2.4,
        change: 5.2,
        trend: 'up',
        unit: 'T',
        color: 'text-neon-green'
      },
      {
        name: 'Trading Volume',
        value: 847,
        change: -2.1,
        trend: 'down',
        unit: 'M',
        color: 'text-neon-red'
      },
      {
        name: 'Price Index',
        value: 1247,
        change: 3.8,
        trend: 'up',
        unit: '',
        color: 'text-neon-blue'
      },
      {
        name: 'Volatility',
        value: 23.4,
        change: 1.2,
        trend: 'up',
        unit: '%',
        color: 'text-neon-yellow'
      }
    ]

    const initialEvents: MarketEvent[] = [
      {
        id: 'event-001',
        type: 'price_change',
        description: 'TechCorp stock surged 12%',
        impact: 'positive',
        magnitude: 8.5,
        timestamp: '5 min ago'
      },
      {
        id: 'event-002',
        type: 'volume_spike',
        description: 'Unusual trading volume detected',
        impact: 'neutral',
        magnitude: 6.2,
        timestamp: '12 min ago'
      },
      {
        id: 'event-003',
        type: 'news_event',
        description: 'Regulatory approval announced',
        impact: 'positive',
        magnitude: 7.8,
        timestamp: '1 hour ago'
      },
      {
        id: 'event-004',
        type: 'competitor_action',
        description: 'FutureTech launched new product',
        impact: 'negative',
        magnitude: 5.4,
        timestamp: '2 hours ago'
      }
    ]

    setMetrics(initialMetrics)
    setEvents(initialEvents)
    setMarketVolatility(23.4)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.1,
        change: metric.change + (Math.random() - 0.5) * 0.2
      })))
      setMarketVolatility(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-neon-green" />
      case 'down': return <TrendingDown className="h-4 w-4 text-neon-red" />
      case 'stable': return <div className="w-4 h-0.5 bg-neon-blue" />
      default: return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'price_change': return BarChart3
      case 'volume_spike': return Activity
      case 'news_event': return Target
      case 'competitor_action': return Zap
      default: return Activity
    }
  }

  const getEventColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-neon-green'
      case 'negative': return 'text-neon-red'
      case 'neutral': return 'text-neon-blue'
      default: return 'text-muted-foreground'
    }
  }

  const getEventBg = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-neon-green/10'
      case 'negative': return 'bg-neon-red/10'
      case 'neutral': return 'bg-neon-blue/10'
      default: return 'bg-muted/10'
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
            <h2 className="text-xl font-bold mb-2">Market Dynamics</h2>
            <p className="text-muted-foreground">Real-time market analysis and trends</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              marketVolatility > 30 ? 'bg-neon-red' :
              marketVolatility > 15 ? 'bg-neon-yellow' : 'bg-neon-green'
            } animate-pulse`} />
            <span className="text-sm font-medium">
              Volatility: {marketVolatility.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Market Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.name}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center space-x-2">
                <div className={`text-xl font-bold ${metric.color}`}>
                  {metric.value.toFixed(1)}{metric.unit}
                </div>
                <div className={`text-sm ${metric.trend === 'up' ? 'text-neon-green' : 'text-neon-red'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Volatility Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Market Volatility</span>
            <span className="text-sm font-medium">{marketVolatility.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                marketVolatility > 30 ? 'bg-neon-red' :
                marketVolatility > 15 ? 'bg-neon-yellow' : 'bg-neon-green'
              }`}
              style={{ width: `${marketVolatility}%` }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Market Events</h3>
        <div className="space-y-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-3 rounded-lg border border-border ${getEventBg(event.impact)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {React.createElement(getEventIcon(event.type), {
                    className: `h-4 w-4 ${getEventColor(event.impact)}`
                  })}
                  <div>
                    <div className="font-medium text-sm">{event.description}</div>
                    <div className="text-xs text-muted-foreground">{event.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getEventColor(event.impact)}`}>
                    {event.magnitude.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">impact</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
