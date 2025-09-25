// Strategic AI Platform - Intelligence Component
import { apiClient } from '../utils/api'
import { websocketManager, WebSocketMessage } from '../services/websocket'

export interface IntelligenceCompany {
  id: string
  name: string
  marketCap: number
  marketShare: number
  recentMoves: string[]
  predictedMoves: string[]
  riskLevel: 'low' | 'medium' | 'high'
  opportunities: string[]
  competitivePosition: string
  strategicThreats: string[]
  financialHealth: {
    revenue: number
    profit: number
    growth: number
    debt: number
  }
}

export interface MarketTrend {
  sector: string
  trend: 'bullish' | 'bearish' | 'neutral'
  growth: number
  volatility: number
  keyDrivers: string[]
  timeframe: string
}

export interface CompetitiveAnalysis {
  marketLeader: string
  marketShare: {
    [companyId: string]: number
  }
  competitiveGaps: string[]
  emergingThreats: string[]
  consolidationOpportunities: string[]
}

export interface IntelligenceData {
  companies: IntelligenceCompany[]
  marketTrends: MarketTrend[]
  competitiveAnalysis: CompetitiveAnalysis
  realTimeUpdates: {
    id: string
    type: 'market' | 'company' | 'regulatory' | 'competitive'
    message: string
    timestamp: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    source: string
    impact: string
  }[]
  intelligenceMetrics: {
    totalCompanies: number
    highRiskCompanies: number
    emergingOpportunities: number
    competitiveThreats: number
    marketVolatility: number
  }
  lastUpdated: string
}

export class IntelligenceManager {
  private intelligenceData: IntelligenceData = {
    companies: [],
    marketTrends: [],
    competitiveAnalysis: {
      marketLeader: '',
      marketShare: {},
      competitiveGaps: [],
      emergingThreats: [],
      consolidationOpportunities: []
    },
    realTimeUpdates: [],
    intelligenceMetrics: {
      totalCompanies: 0,
      highRiskCompanies: 0,
      emergingOpportunities: 0,
      competitiveThreats: 0,
      marketVolatility: 0
    },
    lastUpdated: new Date().toISOString()
  }
  private updateInterval: NodeJS.Timeout | null = null
  private isInitialized: boolean = false

  async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('IntelligenceManager already initialized')
      return
    }

    try {
      await this.loadIntelligenceData()
      this.setupWebSocketSubscriptions()
      this.startPeriodicUpdates()
      this.renderIntelligencePage()
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize IntelligenceManager:', error)
      throw error
    }
  }

  async loadIntelligenceData(): Promise<void> {
    try {
      const response = await apiClient.getIntelligence()
      this.intelligenceData = { ...this.intelligenceData, ...response.data }
      this.updateIntelligenceMetrics()
      console.log('Intelligence data loaded successfully')
    } catch (error) {
      console.error('Failed to load intelligence data:', error)
      this.intelligenceData = this.getDefaultIntelligenceData()
      this.updateIntelligenceMetrics()
    }
  }

  private getDefaultIntelligenceData(): IntelligenceData {
    return {
      companies: [
        {
          id: "scale_ai",
          name: "Scale AI",
          marketCap: 14000000000,
          marketShare: 25,
          recentMoves: ["Expanded data annotation services", "Government contract wins", "AI training data partnerships"],
          predictedMoves: ["Scale enterprise offerings", "International expansion", "AI infrastructure investment"],
          riskLevel: "medium",
          opportunities: ["AI training data market", "Government contracts", "Enterprise AI adoption"],
          competitivePosition: "Leading data annotation platform with strong government relationships",
          strategicThreats: ["Open source alternatives", "Big tech competition", "Data privacy regulations"],
          financialHealth: {
            revenue: 1200000000,
            profit: 180000000,
            growth: 45,
            debt: 200000000
          }
        },
        {
          id: "palantir",
          name: "Palantir",
          marketCap: 45000000000,
          marketShare: 15,
          recentMoves: ["Gotham platform expansion", "Commercial sector growth", "AI integration"],
          predictedMoves: ["AI platform integration", "Global expansion", "Commercial market focus"],
          riskLevel: "low",
          opportunities: ["Enterprise AI adoption", "Government partnerships", "Commercial expansion"],
          competitivePosition: "Dominant in government sector, expanding commercial presence",
          strategicThreats: ["Competition from big tech", "Government budget constraints", "Privacy concerns"],
          financialHealth: {
            revenue: 2800000000,
            profit: 420000000,
            growth: 25,
            debt: 500000000
          }
        },
        {
          id: "openai",
          name: "OpenAI",
          marketCap: 80000000000,
          marketShare: 35,
          recentMoves: ["GPT-4 release", "Enterprise partnerships", "API monetization"],
          predictedMoves: ["Multimodal AI expansion", "API monetization", "Enterprise solutions"],
          riskLevel: "medium",
          opportunities: ["Enterprise AI solutions", "Developer ecosystem", "AI research leadership"],
          competitivePosition: "Leading AI research and development with strong enterprise adoption",
          strategicThreats: ["Competition from big tech", "Regulatory scrutiny", "AI safety concerns"],
          financialHealth: {
            revenue: 2000000000,
            profit: 300000000,
            growth: 150,
            debt: 1000000000
          }
        },
        {
          id: "anthropic",
          name: "Anthropic",
          marketCap: 25000000000,
          marketShare: 12,
          recentMoves: ["Claude 3 release", "Safety research expansion", "Enterprise partnerships"],
          predictedMoves: ["Enterprise AI platform", "Research partnerships", "Safety-focused AI"],
          riskLevel: "low",
          opportunities: ["AI safety market", "Research collaborations", "Enterprise AI adoption"],
          competitivePosition: "Leading AI safety research with strong enterprise focus",
          strategicThreats: ["Competition from larger players", "Research funding constraints", "Market adoption challenges"],
          financialHealth: {
            revenue: 800000000,
            profit: 120000000,
            growth: 200,
            debt: 300000000
          }
        },
        {
          id: "databricks",
          name: "Databricks",
          marketCap: 38000000000,
          marketShare: 18,
          recentMoves: ["Lakehouse platform growth", "AI/ML integration", "Enterprise expansion"],
          predictedMoves: ["Unified analytics platform", "AI democratization", "Global expansion"],
          riskLevel: "medium",
          opportunities: ["Data analytics market", "AI/ML platform", "Enterprise digital transformation"],
          competitivePosition: "Leading unified analytics platform with strong AI/ML capabilities",
          strategicThreats: ["Cloud provider competition", "Open source alternatives", "Market saturation"],
          financialHealth: {
            revenue: 1500000000,
            profit: 225000000,
            growth: 60,
            debt: 400000000
          }
        }
      ],
      marketTrends: [
        {
          sector: "AI Infrastructure",
          trend: "bullish",
          growth: 8.5,
          volatility: 0.15,
          keyDrivers: ["Enterprise AI adoption", "Government investment", "Research breakthroughs"],
          timeframe: "12 months"
        },
        {
          sector: "AI Applications",
          trend: "bullish",
          growth: 6.2,
          volatility: 0.22,
          keyDrivers: ["Consumer AI adoption", "Business automation", "AI-powered solutions"],
          timeframe: "6 months"
        },
        {
          sector: "AI Research",
          trend: "bullish",
          growth: 9.1,
          volatility: 0.18,
          keyDrivers: ["Academic partnerships", "Corporate R&D", "Breakthrough technologies"],
          timeframe: "18 months"
        },
        {
          sector: "AI Safety",
          trend: "neutral",
          growth: 4.3,
          volatility: 0.25,
          keyDrivers: ["Regulatory focus", "Ethical AI", "Safety research"],
          timeframe: "24 months"
        }
      ],
      competitiveAnalysis: {
        marketLeader: "openai",
        marketShare: {
          "openai": 35,
          "scale_ai": 25,
          "databricks": 18,
          "palantir": 15,
          "anthropic": 12
        },
        competitiveGaps: ["AI safety integration", "Government sector penetration", "Enterprise AI adoption"],
        emergingThreats: ["Big tech AI platforms", "Open source alternatives", "Regulatory constraints"],
        consolidationOpportunities: ["AI infrastructure consolidation", "Enterprise AI platform integration", "Research collaboration"]
      },
      realTimeUpdates: [
        {
          id: 'intel_001',
          type: 'market',
          message: 'AI infrastructure market showing 8.5% growth with strong enterprise adoption',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          severity: 'medium',
          source: 'Market Intelligence',
          impact: 'Positive for infrastructure providers'
        },
        {
          id: 'intel_002',
          type: 'company',
          message: 'Scale AI secures $2.3B government contract for AI training data services',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          severity: 'high',
          source: 'Company Intelligence',
          impact: 'Significant revenue boost and market position strengthening'
        },
        {
          id: 'intel_003',
          type: 'competitive',
          message: 'New AI startup emerges with novel approach to data annotation',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          severity: 'medium',
          source: 'Competitive Intelligence',
          impact: 'Potential disruption to existing data annotation market'
        },
        {
          id: 'intel_004',
          type: 'regulatory',
          message: 'EU AI Act implementation timeline accelerated, affecting AI companies',
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          severity: 'high',
          source: 'Regulatory Intelligence',
          impact: 'Compliance requirements and potential market restrictions'
        }
      ],
      intelligenceMetrics: {
        totalCompanies: 5,
        highRiskCompanies: 2,
        emergingOpportunities: 8,
        competitiveThreats: 3,
        marketVolatility: 0.20
      },
      lastUpdated: new Date().toISOString()
    }
  }

  private updateIntelligenceMetrics(): void {
    this.intelligenceData.intelligenceMetrics = {
      totalCompanies: this.intelligenceData.companies.length,
      highRiskCompanies: this.intelligenceData.companies.filter(c => c.riskLevel === 'high').length,
      emergingOpportunities: this.intelligenceData.companies.reduce((sum, c) => sum + c.opportunities.length, 0),
      competitiveThreats: this.intelligenceData.companies.reduce((sum, c) => sum + c.strategicThreats.length, 0),
      marketVolatility: this.intelligenceData.marketTrends.reduce((sum, t) => sum + t.volatility, 0) / this.intelligenceData.marketTrends.length
    }
    this.intelligenceData.lastUpdated = new Date().toISOString()
  }

  private setupWebSocketSubscriptions(): void {
    websocketManager.subscribe('intelligence', (message: WebSocketMessage) => {
      this.handleWebSocketMessage(message)
    }, ['intelligence_update', 'market_trend', 'competitive_analysis', 'threat_alert'])
  }

  private handleWebSocketMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'intelligence_update':
        this.updateIntelligenceData(message.data)
        break
      case 'market_trend':
        this.updateMarketTrends(message.data)
        break
      case 'competitive_analysis':
        this.updateCompetitiveAnalysis(message.data)
        break
      case 'threat_alert':
        this.handleThreatAlert(message.data)
        break
    }
  }

  private updateIntelligenceData(data: any): void {
    if (data.companies) {
      this.intelligenceData.companies = data.companies
    }
    if (data.realTimeUpdates) {
      this.intelligenceData.realTimeUpdates = data.realTimeUpdates
    }
    this.updateIntelligenceMetrics()
    this.renderIntelligencePage()
  }

  private updateMarketTrends(data: any): void {
    this.intelligenceData.marketTrends = data.trends || this.intelligenceData.marketTrends
    this.renderIntelligencePage()
  }

  private updateCompetitiveAnalysis(data: any): void {
    this.intelligenceData.competitiveAnalysis = { ...this.intelligenceData.competitiveAnalysis, ...data }
    this.renderIntelligencePage()
  }

  private handleThreatAlert(data: any): void {
    const threatUpdate = {
      id: `threat_${Date.now()}`,
      type: 'competitive' as const,
      message: data.message,
      timestamp: new Date().toISOString(),
      severity: data.severity || 'high' as const,
      source: 'Threat Intelligence',
      impact: data.impact || 'Unknown impact'
    }
    this.intelligenceData.realTimeUpdates.unshift(threatUpdate)
    this.renderIntelligencePage()
  }

  private startPeriodicUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.loadIntelligenceData()
    }, 30000) // Update every 30 seconds
  }

  private stopPeriodicUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  renderIntelligencePage(): void {
    const container = document.getElementById('intelligence-container')
    if (!container) return

    container.innerHTML = this.generateIntelligenceHTML(this.intelligenceData)
    this.setupIntelligenceEventListeners()
  }

  private generateIntelligenceHTML(data: IntelligenceData): string {
    return `
      <div class="intelligence-dashboard">
        <div class="intelligence-header">
          <h1>Strategic Intelligence Center</h1>
          <div class="intelligence-stats">
            <div class="stat">
              <span class="stat-label">Total Companies</span>
              <span class="stat-value">${data.intelligenceMetrics.totalCompanies}</span>
            </div>
            <div class="stat">
              <span class="stat-label">High Risk</span>
              <span class="stat-value">${data.intelligenceMetrics.highRiskCompanies}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Opportunities</span>
              <span class="stat-value">${data.intelligenceMetrics.emergingOpportunities}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Threats</span>
              <span class="stat-value">${data.intelligenceMetrics.competitiveThreats}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Volatility</span>
              <span class="stat-value">${(data.intelligenceMetrics.marketVolatility * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div class="intelligence-content">
          <div class="intelligence-grid">
            <div class="companies-section">
              <h2>Company Intelligence</h2>
              <div class="companies-grid">
                ${data.companies.map(company => this.generateCompanyCard(company)).join('')}
              </div>
            </div>

            <div class="market-trends-section">
              <h2>Market Trends</h2>
              <div class="trends-grid">
                ${data.marketTrends.map(trend => this.generateTrendCard(trend)).join('')}
              </div>
            </div>

            <div class="competitive-analysis-section">
              <h2>Competitive Analysis</h2>
              <div class="competitive-overview">
                <div class="market-leader">
                  <h3>Market Leader</h3>
                  <p>${data.companies.find(c => c.id === data.competitiveAnalysis.marketLeader)?.name || 'Unknown'}</p>
                </div>
                
                <div class="market-share">
                  <h3>Market Share Distribution</h3>
                  ${Object.entries(data.competitiveAnalysis.marketShare).map(([companyId, share]) => {
                    const company = data.companies.find(c => c.id === companyId)
                    return `
                      <div class="share-item">
                        <span class="company-name">${company?.name || companyId}</span>
                        <span class="share-value">${share}%</span>
                      </div>
                    `
                  }).join('')}
                </div>
                
                <div class="competitive-gaps">
                  <h3>Competitive Gaps</h3>
                  <ul>
                    ${data.competitiveAnalysis.competitiveGaps.map(gap => `<li>${gap}</li>`).join('')}
                  </ul>
                </div>
                
                <div class="emerging-threats">
                  <h3>Emerging Threats</h3>
                  <ul>
                    ${data.competitiveAnalysis.emergingThreats.map(threat => `<li>${threat}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>

            <div class="updates-section">
              <h2>Real-Time Intelligence Updates</h2>
              <div class="updates-feed">
                ${data.realTimeUpdates.map(update => this.generateUpdateCard(update)).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="intelligence-footer">
          <div class="last-updated">
            Last updated: ${new Date(data.lastUpdated).toLocaleString()}
          </div>
          <div class="intelligence-controls">
            <button class="btn btn-primary" onclick="intelligenceManager.refreshData()">
              Refresh Intelligence
            </button>
            <button class="btn btn-secondary" onclick="intelligenceManager.exportIntelligence()">
              Export Intelligence
            </button>
          </div>
        </div>
      </div>
    `
  }

  private generateCompanyCard(company: IntelligenceCompany): string {
    return `
      <div class="company-card" data-company-id="${company.id}">
        <div class="company-header">
          <h3>${company.name}</h3>
          <span class="company-id">${company.id}</span>
        </div>
        
        <div class="company-metrics">
          <div class="metric">
            <span class="metric-label">Market Cap</span>
            <span class="metric-value">$${(company.marketCap / 1000000000).toFixed(1)}B</span>
          </div>
          <div class="metric">
            <span class="metric-label">Market Share</span>
            <span class="metric-value">${company.marketShare}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Revenue</span>
            <span class="metric-value">$${(company.financialHealth.revenue / 1000000000).toFixed(1)}B</span>
          </div>
          <div class="metric">
            <span class="metric-label">Growth</span>
            <span class="metric-value">${company.financialHealth.growth}%</span>
          </div>
        </div>
        
        <div class="company-risk">
          <span class="risk-indicator risk-${company.riskLevel}">${company.riskLevel.toUpperCase()}</span>
        </div>
        
        <div class="company-position">
          <h4>Competitive Position</h4>
          <p>${company.competitivePosition}</p>
        </div>
        
        <div class="company-opportunities">
          <h4>Key Opportunities</h4>
          <ul>
            ${company.opportunities.slice(0, 3).map(opp => `<li>${opp}</li>`).join('')}
          </ul>
        </div>
        
        <div class="company-threats">
          <h4>Strategic Threats</h4>
          <ul>
            ${company.strategicThreats.slice(0, 2).map(threat => `<li>${threat}</li>`).join('')}
          </ul>
        </div>
        
        <div class="company-actions">
          <button class="btn btn-sm btn-primary" onclick="intelligenceManager.viewCompanyDetails('${company.id}')">
            View Details
          </button>
          <button class="btn btn-sm btn-secondary" onclick="intelligenceManager.analyzeCompany('${company.id}')">
            Deep Analysis
          </button>
        </div>
      </div>
    `
  }

  private generateTrendCard(trend: MarketTrend): string {
    const trendClass = `trend-${trend.trend}`
    
    return `
      <div class="trend-card ${trendClass}">
        <div class="trend-header">
          <h3>${trend.sector}</h3>
          <span class="trend-indicator">${trend.trend}</span>
        </div>
        
        <div class="trend-metrics">
          <div class="metric">
            <span class="metric-label">Growth</span>
            <span class="metric-value">${trend.growth}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Volatility</span>
            <span class="metric-value">${(trend.volatility * 100).toFixed(1)}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Timeframe</span>
            <span class="metric-value">${trend.timeframe}</span>
          </div>
        </div>
        
        <div class="trend-drivers">
          <h4>Key Drivers</h4>
          <ul>
            ${trend.keyDrivers.map(driver => `<li>${driver}</li>`).join('')}
          </ul>
        </div>
      </div>
    `
  }

  private generateUpdateCard(update: IntelligenceData['realTimeUpdates'][0]): string {
    const timeAgo = this.getTimeAgo(update.timestamp)
    
    return `
      <div class="update-card severity-${update.severity}" data-update-id="${update.id}">
        <div class="update-header">
          <span class="update-type">${update.type.toUpperCase()}</span>
          <span class="update-time">${timeAgo}</span>
        </div>
        <div class="update-content">
          <p>${update.message}</p>
        </div>
        <div class="update-footer">
          <span class="update-source">${update.source}</span>
          <span class="update-impact">${update.impact}</span>
        </div>
      </div>
    `
  }

  private getTimeAgo(timestamp: string): string {
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now.getTime() - time.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  private setupIntelligenceEventListeners(): void {
    // Add event listeners for company cards
    document.querySelectorAll('.company-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const companyId = (e.currentTarget as HTMLElement).dataset.companyId
        if (companyId) {
          this.selectCompany(companyId)
        }
      })
    })

    // Add event listeners for update cards
    document.querySelectorAll('.update-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const updateId = (e.currentTarget as HTMLElement).dataset.updateId
        if (updateId) {
          this.selectUpdate(updateId)
        }
      })
    })
  }

  // Public methods
  async refreshData(): Promise<void> {
    await this.loadIntelligenceData()
    this.renderIntelligencePage()
  }

  exportIntelligence(): void {
    const blob = new Blob([JSON.stringify(this.intelligenceData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'intelligence-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  viewCompanyDetails(companyId: string): void {
    const company = this.intelligenceData.companies.find(c => c.id === companyId)
    if (company) {
      console.log(`Viewing details for company: ${companyId}`, company)
      // Implementation for viewing company details
    }
  }

  analyzeCompany(companyId: string): void {
    console.log(`Analyzing company: ${companyId}`)
    // Implementation for company analysis
  }

  selectCompany(companyId: string): void {
    console.log(`Selected company: ${companyId}`)
    // Implementation for selecting a company
  }

  selectUpdate(updateId: string): void {
    console.log(`Selected update: ${updateId}`)
    // Implementation for selecting an update
  }

  getIntelligenceData(): IntelligenceData {
    return { ...this.intelligenceData }
  }

  destroy(): void {
    this.stopPeriodicUpdates()
    websocketManager.unsubscribe('intelligence')
    this.isInitialized = false
  }
}

// Export singleton instance
export const intelligenceManager = new IntelligenceManager()
