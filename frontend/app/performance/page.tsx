'use client'

import React from 'react'
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Zap, 
  Target, 
  Shield,
  TrendingUp,
  Clock,
  Database,
  Network,
  CheckCircle
} from 'lucide-react'

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Performance Dashboard
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Real-time monitoring of Strategic AI Platform performance metrics, 
            system health, and optimization opportunities.
          </p>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">API Performance</h3>
              <p className="text-2xl font-bold text-green-400 mb-1">&lt; 200ms</p>
              <p className="text-sm text-slate-300">Average Response Time</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Network className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">WebRTC Latency</h3>
              <p className="text-2xl font-bold text-blue-400 mb-1">&lt; 50ms</p>
              <p className="text-sm text-slate-300">Real-time Communication</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Cache Hit Rate</h3>
              <p className="text-2xl font-bold text-purple-400 mb-1">95.2%</p>
              <p className="text-sm text-slate-300">PWA Performance</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Uptime</h3>
              <p className="text-2xl font-bold text-yellow-400 mb-1">99.9%</p>
              <p className="text-sm text-slate-300">System Availability</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Performance Monitor */}
        <PerformanceMonitor />

        {/* Performance Benchmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Performance Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">First Contentful Paint</div>
                      <div className="text-sm text-slate-300">Time to first content</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    1.2s
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Largest Contentful Paint</div>
                      <div className="text-sm text-slate-300">Time to main content</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    2.1s
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Cumulative Layout Shift</div>
                      <div className="text-sm text-slate-300">Visual stability</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    0.05
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">First Input Delay</div>
                      <div className="text-sm text-slate-300">Interactivity</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    45ms
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">HTTPS Enforcement</div>
                      <div className="text-sm text-slate-300">Secure connections</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">End-to-End Encryption</div>
                      <div className="text-sm text-slate-300">WebRTC security</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    AES-256
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Content Security Policy</div>
                      <div className="text-sm text-slate-300">XSS protection</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    Enabled
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">GDPR Compliance</div>
                      <div className="text-sm text-slate-300">Data protection</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    Compliant
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack Performance */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Technology Stack Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-400">N</span>
                </div>
                <h4 className="text-white font-semibold mb-1">Next.js 14</h4>
                <p className="text-sm text-slate-300">App Router</p>
                <Badge variant="outline" className="mt-2 text-green-400 border-green-400">
                  Optimized
                </Badge>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-400">F</span>
                </div>
                <h4 className="text-white font-semibold mb-1">FastAPI</h4>
                <p className="text-sm text-slate-300">Python Backend</p>
                <Badge variant="outline" className="mt-2 text-green-400 border-green-400">
                  High Performance
                </Badge>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-400">W</span>
                </div>
                <h4 className="text-white font-semibold mb-1">WebRTC</h4>
                <p className="text-sm text-slate-300">Real-time Communication</p>
                <Badge variant="outline" className="mt-2 text-green-400 border-green-400">
                  Low Latency
                </Badge>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-yellow-400">P</span>
                </div>
                <h4 className="text-white font-semibold mb-1">PWA</h4>
                <p className="text-sm text-slate-300">Progressive Web App</p>
                <Badge variant="outline" className="mt-2 text-green-400 border-green-400">
                  Offline Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
