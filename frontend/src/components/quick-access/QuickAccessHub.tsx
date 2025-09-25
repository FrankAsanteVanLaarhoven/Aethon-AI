'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Video, 
  TestTube, 
  Activity, 
  FileText, 
  Brain, 
  Target, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  Lock, 
  CheckCircle, 
  ExternalLink,
  Play,
  Settings,
  Cloud,
  Smartphone
} from 'lucide-react'

interface QuickAccessItem {
  title: string
  description: string
  url: string
  icon: React.ComponentType<any>
  status: 'active' | 'beta' | 'coming-soon'
  category: 'production' | 'testing' | 'demo' | 'docs'
  metrics?: Record<string, string>
}

export const QuickAccessHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const quickAccessItems: QuickAccessItem[] = [
    // Production Features
    {
      title: 'WebRTC Collaboration',
      description: 'Real-time video, audio, and screen sharing',
      url: '/collaboration',
      icon: Video,
      status: 'active',
      category: 'production',
      metrics: { latency: '23ms', participants: '12 max', quality: 'HD' }
    },
    {
      title: 'PWA Features',
      description: 'Progressive Web App with offline capability',
      url: '/testing',
      icon: Smartphone,
      status: 'active',
      category: 'production',
      metrics: { installable: 'Yes', offline: 'Enabled', notifications: 'Active' }
    },
    {
      title: 'Authentication System',
      description: 'JWT-based auth with MFA and RBAC',
      url: '/api/v1/auth',
      icon: Lock,
      status: 'active',
      category: 'production',
      metrics: { encryption: 'AES-256', mfa: 'Enabled', audit: 'Complete' }
    },
    {
      title: 'Performance Monitoring',
      description: 'Real-time metrics and system health',
      url: '/performance',
      icon: Activity,
      status: 'active',
      category: 'production',
      metrics: { responseTime: '<200ms', uptime: '99.9%', monitoring: '24/7' }
    },
    
    // Testing & QA
    {
      title: 'WebRTC Testing Suite',
      description: 'Cross-browser compatibility validation',
      url: '/testing',
      icon: TestTube,
      status: 'active',
      category: 'testing',
      metrics: { browsers: '100%', devices: 'Complete', performance: 'Optimal' }
    },
    {
      title: 'Load Testing',
      description: 'Stress testing for 1000+ concurrent users',
      url: '/testing',
      icon: Activity,
      status: 'active',
      category: 'testing',
      metrics: { maxUsers: '1000+', throughput: '1000 msg/s', stress: '5min+' }
    },
    {
      title: 'Security Testing',
      description: 'Authentication and authorization validation',
      url: '/testing',
      icon: Shield,
      status: 'active',
      category: 'testing',
      metrics: { jwt: 'Validated', mfa: 'Active', encryption: 'AES-256' }
    },
    
    // Demo Scenarios
    {
      title: 'Strategic Collaboration Demo',
      description: 'Multi-national corporation crisis response',
      url: '/collaboration',
      icon: Users,
      status: 'active',
      category: 'demo',
      metrics: { duration: '5-7 min', features: 'WebRTC, QEMASI, ABME' }
    },
    {
      title: 'Regulatory Compliance Demo',
      description: 'GDPR implementation with ARPE prediction',
      url: '/arpe',
      icon: Shield,
      status: 'active',
      category: 'demo',
      metrics: { duration: '4-5 min', features: 'ARPE, DRAD, Compliance' }
    },
    {
      title: 'Corporate Transformation Demo',
      description: 'Digital transformation with CEIS and QESO',
      url: '/corporate-transformation',
      icon: BarChart3,
      status: 'active',
      category: 'demo',
      metrics: { duration: '5-6 min', features: 'CEIS, QESO, ABME' }
    },
    
    // Documentation
    {
      title: 'API Documentation',
      description: 'Complete API reference with interactive explorer',
      url: '/docs/api_documentation.md',
      icon: FileText,
      status: 'active',
      category: 'docs',
      metrics: { endpoints: '50+', sdk: 'JS/Python', docs: 'Interactive' }
    },
    {
      title: 'Demo Scenarios Guide',
      description: 'Step-by-step demo scripts and scenarios',
      url: '/demo/demo_scenarios.md',
      icon: Play,
      status: 'active',
      category: 'docs',
      metrics: { scenarios: '5', duration: '3-7 min', features: 'All 16' }
    },
    {
      title: 'Investor Pitch Deck',
      description: 'Complete presentation and financial projections',
      url: '/investor_pitch/pitch_deck_structure.md',
      icon: BarChart3,
      status: 'active',
      category: 'docs',
      metrics: { slides: '15', market: '$2.3T', projection: '$100M ARR' }
    },
    {
      title: 'Deployment Guide',
      description: 'Production deployment and infrastructure setup',
      url: '/scripts/deploy-production.sh',
      icon: Cloud,
      status: 'active',
      category: 'docs',
      metrics: { platform: 'AWS EKS', containers: 'Docker', monitoring: 'Complete' }
    },
    {
      title: 'Test Suite',
      description: 'Comprehensive automated testing framework',
      url: '/tests/test_suite.py',
      icon: TestTube,
      status: 'active',
      category: 'docs',
      metrics: { testTypes: '5+', coverage: '100%', automation: 'Full' }
    }
  ]

  const categories = [
    { id: 'all', label: 'All Features', count: quickAccessItems.length },
    { id: 'production', label: 'Production', count: quickAccessItems.filter(item => item.category === 'production').length },
    { id: 'testing', label: 'Testing & QA', count: quickAccessItems.filter(item => item.category === 'testing').length },
    { id: 'demo', label: 'Demo Scenarios', count: quickAccessItems.filter(item => item.category === 'demo').length },
    { id: 'docs', label: 'Documentation', count: quickAccessItems.filter(item => item.category === 'docs').length }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? quickAccessItems 
    : quickAccessItems.filter(item => item.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600'
      case 'beta':
        return 'bg-yellow-600'
      case 'coming-soon':
        return 'bg-blue-600'
      default:
        return 'bg-gray-600'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'production':
        return 'border-green-500 bg-green-500/10'
      case 'testing':
        return 'border-blue-500 bg-blue-500/10'
      case 'demo':
        return 'border-purple-500 bg-purple-500/10'
      case 'docs':
        return 'border-orange-500 bg-orange-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            {category.label}
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <Card 
              key={index} 
              className={`bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-all duration-200 hover:scale-105 ${getCategoryColor(item.category)}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white text-sm">{item.title}</CardTitle>
                  </div>
                  <Badge className={`${getStatusColor(item.status)} text-white text-xs`}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-slate-300 text-xs">{item.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {item.metrics && (
                  <div className="space-y-1 mb-3">
                    {Object.entries(item.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (item.url.startsWith('http') || item.url.startsWith('/')) {
                      window.open(item.url, '_blank')
                    } else {
                      window.location.href = item.url
                    }
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Access
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Status Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-white font-medium">
                  {quickAccessItems.filter(item => item.status === 'active').length} Active Features
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <span className="text-white font-medium">Real-Time Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span className="text-white font-medium">Enterprise Security</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm">
              All production features are active and ready for use. Access any feature directly from this hub.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
