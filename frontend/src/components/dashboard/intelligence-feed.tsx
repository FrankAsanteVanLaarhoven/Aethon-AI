'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Globe, 
  Building, 
  Users,
  DollarSign,
  Shield,
  Zap,
  Brain,
  Clock,
  Filter,
  Search
} from 'lucide-react'

interface IntelligenceItem {
  id: string
  type: 'market' | 'regulatory' | 'competitive' | 'economic' | 'security' | 'technology'
  priority: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  source: string
  timestamp: Date
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
  tags: string[]
  relatedAgents: string[]
}

export function IntelligenceFeed() {
  const [intelligenceItems, setIntelligenceItems] = useState<IntelligenceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<IntelligenceItem[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Simulate loading intelligence data
    setTimeout(() => {
      const mockIntelligence: IntelligenceItem[] = [
        {
          id: 'intel-1',
          type: 'regulatory',
          priority: 'critical',
          title: 'New EU AI Act Compliance Requirements',
          description: 'The European Union has announced new compliance requirements for AI systems that will affect all strategic AI platforms operating in the region.',
          source: 'EU Regulatory Database',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          impact: 'negative',
          confidence: 0.95,
          tags: ['EU', 'AI Act', 'Compliance', 'Regulation'],
          relatedAgents: ['ARPE', 'SNSE']
        },
        {
          id: 'intel-2',
          type: 'competitive',
          priority: 'high',
          title: 'Competitor Launches Quantum AI Platform',
          description: 'Major competitor has announced the launch of their quantum-enhanced AI platform, potentially threatening market position.',
          source: 'Competitive Intelligence Network',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          impact: 'negative',
          confidence: 0.88,
          tags: ['Competitor', 'Quantum AI', 'Market Threat'],
          relatedAgents: ['SCI', 'QESO', 'RCRE']
        },
        {
          id: 'intel-3',
          type: 'market',
          priority: 'medium',
          title: 'Strategic AI Market Growth Projection',
          description: 'Market research indicates 340% growth in strategic AI adoption across Fortune 500 companies in the next 18 months.',
          source: 'Market Intelligence Hub',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          impact: 'positive',
          confidence: 0.92,
          tags: ['Market Growth', 'Fortune 500', 'Adoption'],
          relatedAgents: ['ABME', 'CEIS']
        },
        {
          id: 'intel-4',
          type: 'economic',
          priority: 'high',
          title: 'Federal Reserve AI Policy Framework',
          description: 'The Federal Reserve has released a new policy framework for AI systems in financial services, creating new opportunities.',
          source: 'Federal Reserve Database',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          impact: 'positive',
          confidence: 0.90,
          tags: ['Federal Reserve', 'Financial Services', 'Policy'],
          relatedAgents: ['ARPE', 'ABME']
        },
        {
          id: 'intel-5',
          type: 'security',
          priority: 'critical',
          title: 'Advanced Persistent Threat Detected',
          description: 'AI-powered security systems have detected a sophisticated APT targeting strategic AI infrastructure.',
          source: 'Security Intelligence Center',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          impact: 'negative',
          confidence: 0.97,
          tags: ['APT', 'Security Threat', 'Infrastructure'],
          relatedAgents: ['SNSE', 'SCI']
        },
        {
          id: 'intel-6',
          type: 'technology',
          priority: 'medium',
          title: 'Breakthrough in Quantum Computing',
          description: 'New quantum computing breakthrough could accelerate QESO capabilities by 10x within the next quarter.',
          source: 'Technology Research Institute',
          timestamp: new Date(Date.now() - 90 * 60 * 1000),
          impact: 'positive',
          confidence: 0.85,
          tags: ['Quantum Computing', 'Breakthrough', 'QESO'],
          relatedAgents: ['QESO', 'CEIS']
        }
      ]

      setIntelligenceItems(mockIntelligence)
      setFilteredItems(mockIntelligence)
      setIsLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    let filtered = intelligenceItems

    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(item => item.type === selectedFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredItems(filtered)
  }, [intelligenceItems, selectedFilter, searchQuery])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'market': return <TrendingUp className="w-4 h-4" />
      case 'regulatory': return <Shield className="w-4 h-4" />
      case 'competitive': return <Users className="w-4 h-4" />
      case 'economic': return <DollarSign className="w-4 h-4" />
      case 'security': return <AlertTriangle className="w-4 h-4" />
      case 'technology': return <Zap className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'market': return 'text-neon-green'
      case 'regulatory': return 'text-neon-blue'
      case 'competitive': return 'text-neon-yellow'
      case 'economic': return 'text-neon-purple'
      case 'security': return 'text-neon-red'
      case 'technology': return 'text-neon-pink'
      default: return 'text-muted-foreground'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-neon-red/20 text-neon-red border-neon-red'
      case 'high': return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow'
      case 'medium': return 'bg-neon-blue/20 text-neon-blue border-neon-blue'
      case 'low': return 'bg-muted/20 text-muted-foreground border-muted'
      default: return 'bg-muted/20 text-muted-foreground border-muted'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-neon-green" />
      case 'negative': return <TrendingDown className="w-4 h-4 text-neon-red" />
      case 'neutral': return <CheckCircle className="w-4 h-4 text-muted-foreground" />
      default: return <Info className="w-4 h-4 text-muted-foreground" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    if (!isClient) return '--:--'
    
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return timestamp.toLocaleDateString('en-US')
  }

  const filterTypes = [
    { value: 'all', label: 'All Intelligence' },
    { value: 'market', label: 'Market Intelligence' },
    { value: 'regulatory', label: 'Regulatory Updates' },
    { value: 'competitive', label: 'Competitive Intelligence' },
    { value: 'economic', label: 'Economic Indicators' },
    { value: 'security', label: 'Security Alerts' },
    { value: 'technology', label: 'Technology Updates' }
  ]

  if (isLoading) {
    return (
      <div className="palantir-card p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading intelligence feed...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="tesla-heading text-xl font-semibold">Strategic Intelligence Feed</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Intelligence</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="palantir-input pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="palantir-select"
          >
            {filterTypes.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Intelligence Items */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(item.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getImpactIcon(item.impact)}
                  <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">Confidence:</span>
                    <span className="text-xs font-mono text-neon-blue">
                      {Math.round(item.confidence * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {item.relatedAgents.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-muted px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No intelligence items match your filters.</p>
        </div>
      )}
    </div>
  )
}
