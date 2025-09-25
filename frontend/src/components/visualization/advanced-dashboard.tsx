'use client'

import { useState, useEffect } from 'react'
import { PlotlyChart } from './plotly-chart'
import { D3Chart } from './d3-chart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Globe, 
  Zap,
  RefreshCw,
  Download,
  Maximize2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdvancedDashboardProps {
  className?: string
}

export function AdvancedDashboard({ className }: AdvancedDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Sample data for demonstrations
  const marketData = [
    { x: 1, y: 100, name: 'Q1' },
    { x: 2, y: 120, name: 'Q2' },
    { x: 3, y: 110, name: 'Q3' },
    { x: 4, y: 140, name: 'Q4' },
    { x: 5, y: 160, name: 'Q1' },
    { x: 6, y: 180, name: 'Q2' },
  ]

  const performanceData = [
    { x: 0, y: 85, name: 'Performance' },
    { x: 1, y: 92, name: 'Performance' },
    { x: 2, y: 88, name: 'Performance' },
    { x: 3, y: 95, name: 'Performance' },
    { x: 4, y: 98, name: 'Performance' },
    { x: 5, y: 94, name: 'Performance' },
  ]

  const agentData = [
    { x: 'Data Scout', y: 94, color: '#00ff88' },
    { x: 'Analyst', y: 87, color: '#00d4ff' },
    { x: 'Monitor', y: 91, color: '#8b5cf6' },
    { x: 'Predictor', y: 89, color: '#f472b6' },
  ]

  const threatData = [
    { x: 0, y: 2, name: 'Threats' },
    { x: 1, y: 5, name: 'Threats' },
    { x: 2, y: 3, name: 'Threats' },
    { x: 3, y: 7, name: 'Threats' },
    { x: 4, y: 4, name: 'Threats' },
    { x: 5, y: 6, name: 'Threats' },
  ]

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true)
    setLastUpdated(new Date())
  }, [])

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'agents', label: 'Agents', icon: Activity },
    { id: 'threats', label: 'Threats', icon: Globe },
  ]

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tesla-heading">
            Strategic Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground tesla-text">
            Real-time analytics and performance monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            Live Data
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="palantir-button-ghost"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "palantir-button",
                activeTab === tab.id 
                  ? "palantir-button-primary" 
                  : "palantir-button-ghost"
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          )
        })}
      </div>

      {/* Dashboard Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="responsive-grid">
            <div className="lg:col-span-2">
              <PlotlyChart
                data={[{
                  x: marketData.map(d => d.x),
                  y: marketData.map(d => d.y),
                  name: 'Market Performance',
                  type: 'scatter',
                  mode: 'lines+markers'
                }]}
                type="line"
                title="Market Performance Trend"
                subtitle="Quarterly performance metrics"
                height={400}
              />
            </div>
            <div className="lg:col-span-1">
              <D3Chart
                data={agentData.map((d, i) => ({ x: i, y: d.y }))}
                type="bar"
                title="Agent Performance"
                subtitle="Success rates by agent"
                height={400}
                color="#00ff88"
              />
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="responsive-grid">
            <div className="lg:col-span-2">
              <PlotlyChart
                data={[{
                  x: performanceData.map(d => d.x),
                  y: performanceData.map(d => d.y),
                  name: 'System Performance',
                  type: 'scatter',
                  mode: 'lines+markers'
                }]}
                type="line"
                title="System Performance Metrics"
                subtitle="Real-time performance indicators"
                height={500}
              />
            </div>
            <div className="lg:col-span-1 space-y-4">
              <div className="palantir-card p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="font-semibold text-neon-green">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="font-semibold text-neon-blue">2.3ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Throughput</span>
                    <span className="font-semibold text-neon-purple">1.2M req/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="responsive-grid">
            <div className="lg:col-span-3">
              <PlotlyChart
                data={agentData.map(agent => ({
                  x: [agent.x],
                  y: [agent.y],
                  name: agent.x,
                  type: 'bar',
                  marker: { color: agent.color }
                }))}
                type="bar"
                title="Agent Performance Overview"
                subtitle="Individual agent success rates"
                height={400}
              />
            </div>
            <div className="lg:col-span-1">
              <div className="palantir-card p-6">
                <h3 className="text-lg font-semibold mb-4">Active Agents</h3>
                <div className="space-y-3">
                  {agentData.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: agent.color }}
                        />
                        <span className="text-sm">{agent.x}</span>
                      </div>
                      <span className="text-sm font-semibold">{agent.y}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'threats' && (
          <div className="responsive-grid">
            <div className="lg:col-span-2">
              <D3Chart
                data={threatData}
                type="area"
                title="Threat Detection Timeline"
                subtitle="Security threats over time"
                height={400}
                color="#ef4444"
              />
            </div>
            <div className="lg:col-span-1">
              <div className="palantir-card p-6">
                <h3 className="text-lg font-semibold mb-4">Threat Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Critical</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">High</span>
                    <Badge variant="destructive">4</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Medium</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Low</span>
                    <Badge variant="outline">12</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Last updated: {isClient && lastUpdated ? lastUpdated.toLocaleTimeString('en-US') : '--:--:--'}</span>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-blue" />
            <span>Real-time monitoring active</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="palantir-button-ghost">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="sm" className="palantir-button-ghost">
            <Maximize2 className="w-4 h-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  )
}
