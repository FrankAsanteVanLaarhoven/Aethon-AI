'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, MessageSquare, Globe, BarChart3 } from 'lucide-react'

export function PoliticalSentimentAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  const sentimentData = [
    {
      region: 'United States',
      sentiment: 65,
      trend: 'up',
      keyIssues: ['Tech Regulation', 'Climate Policy', 'Trade Relations'],
      confidence: 87,
      icon: Globe,
      color: 'text-neon-blue'
    },
    {
      region: 'European Union',
      sentiment: 58,
      trend: 'down',
      keyIssues: ['Digital Markets', 'AI Governance', 'Data Privacy'],
      confidence: 92,
      icon: Users,
      color: 'text-neon-green'
    },
    {
      region: 'China',
      sentiment: 42,
      trend: 'down',
      keyIssues: ['Cybersecurity', 'Tech Independence', 'Trade Policy'],
      confidence: 78,
      icon: BarChart3,
      color: 'text-neon-yellow'
    },
    {
      region: 'United Kingdom',
      sentiment: 71,
      trend: 'up',
      keyIssues: ['Post-Brexit Relations', 'Tech Innovation', 'Financial Services'],
      confidence: 85,
      icon: MessageSquare,
      color: 'text-neon-purple'
    }
  ]

  const timeframes = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ]

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 70) return 'text-neon-green'
    if (sentiment >= 50) return 'text-neon-yellow'
    return 'text-red-500'
  }

  const getSentimentBgColor = (sentiment: number) => {
    if (sentiment >= 70) return 'bg-neon-green/10'
    if (sentiment >= 50) return 'bg-neon-yellow/10'
    return 'bg-red-500/10'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-green to-neon-yellow bg-clip-text text-transparent">
          Political Sentiment Analysis
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time analysis of political climate and stakeholder sentiment across global markets
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.value}
            onClick={() => setSelectedTimeframe(timeframe.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTimeframe === timeframe.value
                ? 'bg-neon-green text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {timeframe.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sentimentData.map((region, index) => (
          <motion.div
            key={region.region}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <region.icon className={`w-8 h-8 ${region.color}`} />
                <div>
                  <h3 className="font-semibold text-lg">{region.region}</h3>
                  <div className="flex items-center space-x-2">
                    {region.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-neon-green" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {region.trend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getSentimentColor(region.sentiment)}`}>
                  {region.sentiment}
                </div>
                <div className="text-xs text-muted-foreground">Sentiment Score</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Political Sentiment</span>
                <span>{region.sentiment}/100</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className={`h-3 rounded-full ${getSentimentBgColor(region.sentiment)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${region.sentiment}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Key Issues</h4>
              <div className="flex flex-wrap gap-2">
                {region.keyIssues.map((issue, issueIndex) => (
                  <span
                    key={issueIndex}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Confidence: <span className="font-medium text-neon-blue">{region.confidence}%</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString('en-US')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Global Sentiment Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">
              {sentimentData.filter(r => r.sentiment >= 70).length}
            </div>
            <div className="text-sm text-muted-foreground">Positive</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-yellow">
              {sentimentData.filter(r => r.sentiment >= 50 && r.sentiment < 70).length}
            </div>
            <div className="text-sm text-muted-foreground">Neutral</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500">
              {sentimentData.filter(r => r.sentiment < 50).length}
            </div>
            <div className="text-sm text-muted-foreground">Negative</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">
              {Math.round(sentimentData.reduce((acc, r) => acc + r.sentiment, 0) / sentimentData.length)}
            </div>
            <div className="text-sm text-muted-foreground">Average</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
