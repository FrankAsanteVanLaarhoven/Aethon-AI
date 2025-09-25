// Strategic AI Platform - Dashboard Component
import { apiClient } from '../utils/api'
import { websocketManager, WebSocketMessage } from '../services/websocket'

export interface Company {
  id: string
  name: string
  marketCap: number
  marketShare: number
  recentMoves: string[]
  predictedMoves: string[]
  riskLevel: 'low' | 'medium' | 'high'
  opportunities: string[]
  stockPrice?: number
  change?: number
  changePercent?: number
}

export interface MarketData {
  totalMarketCap: number
  marketTrend: 'bullish' | 'bearish' | 'neutral'
  volatility: number
  topPerformers: string[]
  bottomPerformers: string[]
  sectorPerformance: {
    [sector: string]: number
  }
  lastUpdated: string
}

export interface RealTimeUpdate {
  id: string
  type: 'market' | 'company' | 'regulatory' | 'threat'
  message: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  source: string
}

export interface DashboardData {
  companies: Company[]
  marketData: MarketData
  realTimeUpdates: RealTimeUpdate[]
  performanceMetrics: {
    totalCompanies: number
    averageMarketCap: number
    totalOpportunities: number
    riskDistribution: {
      low: number
      medium: number
      high: number
    }
  }
  lastUpdated: string
}

export class DashboardManager {
  private data: DashboardData = {
    companies: [],
    marketData: {
      totalMarketCap: 0,
      marketTrend: 'neutral',
      volatility: 0,
      topPerformers: [],
      bottomPerformers: [],
      sectorPerformance: {},
      lastUpdated: new Date().toISOString()
    },
    realTimeUpdates: [],
    performanceMetrics: {
      totalCompanies: 0,
      averageMarketCap: 0,
      totalOpportunities: 0,
      riskDistribution: { low: 0, medium: 0, high: 0 }
    },
    lastUpdated: new Date().toISOString()
  }
  private updateInterval: NodeJS.Timeout | null = null
  private isInitialized: boolean = false

  async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('DashboardManager already initialized')
      return
    }

    try {
      await this.loadInitialData()
      this.setupWebSocketSubscriptions()
      this.startPeriodicUpdates()
      this.renderDashboard()
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize DashboardManager:', error)
      throw error
    }
  }

  async loadInitialData(): Promise<void> {
    try {
      // Load companies data
      this.data.companies = await this.getCompaniesData()
      
      // Load market data
      this.data.marketData = await this.getMarketData()
      
      // Load real-time updates
      this.data.realTimeUpdates = await this.getRealTimeUpdates()
      
      // Update performance metrics
      this.updatePerformanceMetrics()
      
      console.log('Dashboard data loaded successfully')
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      this.data.companies = this.getDefaultCompaniesData()
      this.updatePerformanceMetrics()
    }
  }

  async getCompaniesData(): Promise<Company[]> {
    try {
      const response = await apiClient.getIntelligence()
      return response.data?.companies || []
    } catch (error) {
      console.error('Failed to fetch companies data:', error)
      return this.getDefaultCompaniesData()
    }
  }

  async getMarketData(): Promise<MarketData> {
    try {
      const response = await apiClient.getStreamAnalytics()
      return response.data?.market_data || this.getDefaultMarketData()
    } catch (error) {
      console.error('Failed to fetch market data:', error)
      return this.getDefaultMarketData()
    }
  }

  async getRealTimeUpdates(): Promise<RealTimeUpdate[]> {
    try {
      const response = await apiClient.getIntelligenceFeed()
      return response.data?.updates || []
    } catch (error) {
      console.error('Failed to fetch real-time updates:', error)
      return this.getDefaultRealTimeUpdates()
    }
  }

  private getDefaultCompaniesData(): Company[] {
    return [
      {
        id: "scale_ai",
        name: "Scale AI",
        marketCap: 14000000000,
        marketShare: 25,
        recentMoves: ["Expanded data annotation services", "Government contract wins"],
        predictedMoves: ["Scale enterprise offerings", "International expansion"],
        riskLevel: "medium",
        opportunities: ["AI training data market", "Government contracts"],
        stockPrice: 45.67,
        change: 2.34,
        changePercent: 5.4
      },
      {
        id: "palantir",
        name: "Palantir",
        marketCap: 45000000000,
        marketShare: 15,
        recentMoves: ["Gotham platform expansion", "Commercial sector growth"],
        predictedMoves: ["AI platform integration", "Global expansion"],
        riskLevel: "low",
        opportunities: ["Enterprise AI adoption", "Government partnerships"],
        stockPrice: 23.45,
        change: -0.67,
        changePercent: -2.8
      },
      {
        id: "openai",
        name: "OpenAI",
        marketCap: 80000000000,
        marketShare: 35,
        recentMoves: ["GPT-4 release", "Enterprise partnerships"],
        predictedMoves: ["Multimodal AI expansion", "API monetization"],
        riskLevel: "medium",
        opportunities: ["Enterprise AI solutions", "Developer ecosystem"],
        stockPrice: 156.78,
        change: 8.92,
        changePercent: 6.0
      },
      {
        id: "anthropic",
        name: "Anthropic",
        marketCap: 25000000000,
        marketShare: 12,
        recentMoves: ["Claude 3 release", "Safety research expansion"],
        predictedMoves: ["Enterprise AI platform", "Research partnerships"],
        riskLevel: "low",
        opportunities: ["AI safety market", "Research collaborations"],
        stockPrice: 89.12,
        change: 3.45,
        changePercent: 4.0
      },
      {
        id: "databricks",
        name: "Databricks",
        marketCap: 38000000000,
        marketShare: 18,
        recentMoves: ["Lakehouse platform growth", "AI/ML integration"],
        predictedMoves: ["Unified analytics platform", "AI democratization"],
        riskLevel: "medium",
        opportunities: ["Data analytics market", "AI/ML platform"],
        stockPrice: 67.89,
        change: 1.23,
        changePercent: 1.8
      }
    ]
  }

  private getDefaultMarketData(): MarketData {
    return {
      totalMarketCap: 1200000000000,
      marketTrend: 'bullish',
      volatility: 0.15,
      topPerformers: ['openai', 'anthropic', 'scale_ai'],
      bottomPerformers: ['palantir'],
      sectorPerformance: {
        'AI Infrastructure': 8.5,
        'AI Applications': 6.2,
        'AI Research': 9.1,
        'AI Safety': 7.8
      },
      lastUpdated: new Date().toISOString()
    }
  }

  private getDefaultRealTimeUpdates(): RealTimeUpdate[] {
    return [
      {
        id: 'update_001',
        type: 'market',
        message: 'AI market showing strong bullish momentum with 8.5% sector growth',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        severity: 'medium',
        source: 'Market Intelligence'
      },
      {
        id: 'update_002',
        type: 'company',
        message: 'Scale AI announces new government contract worth $2.3B',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        severity: 'high',
        source: 'Company Intelligence'
      },
      {
        id: 'update_003',
        type: 'regulatory',
        message: 'EU AI Act implementation timeline accelerated by 6 months',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        severity: 'high',
        source: 'Regulatory Intelligence'
      },
      {
        id: 'update_004',
        type: 'threat',
        message: 'Potential competitive threat detected from emerging AI startup',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        severity: 'medium',
        source: 'Threat Intelligence'
      }
    ]
  }

  private updatePerformanceMetrics(): void {
    this.data.performanceMetrics = {
      totalCompanies: this.data.companies.length,
      averageMarketCap: this.data.companies.reduce((sum, company) => sum + company.marketCap, 0) / this.data.companies.length,
      totalOpportunities: this.data.companies.reduce((sum, company) => sum + company.opportunities.length, 0),
      riskDistribution: {
        low: this.data.companies.filter(c => c.riskLevel === 'low').length,
        medium: this.data.companies.filter(c => c.riskLevel === 'medium').length,
        high: this.data.companies.filter(c => c.riskLevel === 'high').length
      }
    }
    this.data.lastUpdated = new Date().toISOString()
  }

  private setupWebSocketSubscriptions(): void {
    websocketManager.subscribe('dashboard', (message: WebSocketMessage) => {
      this.handleWebSocketMessage(message)
    }, ['market_data', 'company_update', 'real_time_update', 'threat_alert'])
  }

  private handleWebSocketMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'market_data':
        this.updateMarketData(message.data)
        break
      case 'company_update':
        this.updateCompanyData(message.data)
        break
      case 'real_time_update':
        this.addRealTimeUpdate(message.data)
        break
      case 'threat_alert':
        this.handleThreatAlert(message.data)
        break
    }
  }

  private updateMarketData(data: any): void {
    this.data.marketData = { ...this.data.marketData, ...data }
    this.renderDashboard()
  }

  private updateCompanyData(data: any): void {
    const companyIndex = this.data.companies.findIndex(c => c.id === data.id)
    if (companyIndex !== -1) {
      this.data.companies[companyIndex] = { ...this.data.companies[companyIndex], ...data }
      this.updatePerformanceMetrics()
      this.renderDashboard()
    }
  }

  private addRealTimeUpdate(data: RealTimeUpdate): void {
    this.data.realTimeUpdates.unshift(data)
    // Keep only the last 50 updates
    if (this.data.realTimeUpdates.length > 50) {
      this.data.realTimeUpdates = this.data.realTimeUpdates.slice(0, 50)
    }
    this.renderDashboard()
  }

  private handleThreatAlert(data: any): void {
    const threatUpdate: RealTimeUpdate = {
      id: `threat_${Date.now()}`,
      type: 'threat',
      message: data.message,
      timestamp: new Date().toISOString(),
      severity: data.severity || 'high',
      source: 'Threat Intelligence'
    }
    this.addRealTimeUpdate(threatUpdate)
  }

  private startPeriodicUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.loadInitialData()
    }, 30000) // Update every 30 seconds
  }

  private stopPeriodicUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  renderDashboard(): void {
    const container = document.getElementById('dashboard-container')
    if (!container) return

    container.innerHTML = this.generateDashboardHTML(this.data)
    this.setupDashboardEventListeners()
  }

  private generateDashboardHTML(data: DashboardData): string {
    return `
      <div class="dashboard">
        <div class="dashboard-header">
          <h1>Strategic AI Platform Dashboard</h1>
          <div class="dashboard-stats">
            <div class="stat">
              <span class="stat-label">Total Companies</span>
              <span class="stat-value">${data.performanceMetrics.totalCompanies}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Avg Market Cap</span>
              <span class="stat-value">$${(data.performanceMetrics.averageMarketCap / 1000000000).toFixed(1)}B</span>
            </div>
            <div class="stat">
              <span class="stat-label">Total Opportunities</span>
              <span class="stat-value">${data.performanceMetrics.totalOpportunities}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Market Trend</span>
              <span class="stat-value trend-${data.marketData.marketTrend}">${data.marketData.marketTrend}</span>
            </div>
          </div>
        </div>

        <div class="dashboard-content">
          <div class="dashboard-grid">
            <div class="companies-section">
              <h2>Company Intelligence</h2>
              <div class="companies-grid">
                ${data.companies.map(company => this.generateCompanyCard(company)).join('')}
              </div>
            </div>

            <div class="market-section">
              <h2>Market Analysis</h2>
              <div class="market-overview">
                <div class="market-metrics">
                  <div class="metric">
                    <span class="metric-label">Total Market Cap</span>
                    <span class="metric-value">$${(data.marketData.totalMarketCap / 1000000000000).toFixed(1)}T</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Volatility</span>
                    <span class="metric-value">${(data.marketData.volatility * 100).toFixed(1)}%</span>
                  </div>
                </div>
                
                <div class="sector-performance">
                  <h3>Sector Performance</h3>
                  ${Object.entries(data.marketData.sectorPerformance).map(([sector, performance]) => `
                    <div class="sector-item">
                      <span class="sector-name">${sector}</span>
                      <span class="sector-performance ${performance > 0 ? 'positive' : 'negative'}">
                        ${performance > 0 ? '+' : ''}${performance.toFixed(1)}%
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="updates-section">
              <h2>Real-Time Updates</h2>
              <div class="updates-feed">
                ${data.realTimeUpdates.map(update => this.generateUpdateCard(update)).join('')}
              </div>
            </div>

            <div class="risk-section">
              <h2>Risk Distribution</h2>
              <div class="risk-metrics">
                <div class="risk-item">
                  <span class="risk-label">Low Risk</span>
                  <span class="risk-value">${data.performanceMetrics.riskDistribution.low}</span>
                </div>
                <div class="risk-item">
                  <span class="risk-label">Medium Risk</span>
                  <span class="risk-value">${data.performanceMetrics.riskDistribution.medium}</span>
                </div>
                <div class="risk-item">
                  <span class="risk-label">High Risk</span>
                  <span class="risk-value">${data.performanceMetrics.riskDistribution.high}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-footer">
          <div class="last-updated">
            Last updated: ${new Date(data.lastUpdated).toLocaleString()}
          </div>
          <div class="dashboard-controls">
            <button class="btn btn-primary" onclick="dashboardManager.refreshData()">
              Refresh Data
            </button>
            <button class="btn btn-secondary" onclick="dashboardManager.exportData()">
              Export Data
            </button>
          </div>
        </div>
      </div>
    `
  }

  private generateCompanyCard(company: Company): string {
    const changeClass = (company.change || 0) >= 0 ? 'positive' : 'negative'
    const changeSymbol = (company.change || 0) >= 0 ? '+' : ''
    
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
          ${company.stockPrice ? `
            <div class="metric">
              <span class="metric-label">Stock Price</span>
              <span class="metric-value">$${company.stockPrice.toFixed(2)}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Change</span>
              <span class="metric-value ${changeClass}">
                ${changeSymbol}${company.change?.toFixed(2)} (${changeSymbol}${company.changePercent?.toFixed(1)}%)
              </span>
            </div>
          ` : ''}
        </div>
        
        <div class="company-risk">
          <span class="risk-indicator risk-${company.riskLevel}">${company.riskLevel.toUpperCase()}</span>
        </div>
        
        <div class="company-opportunities">
          <h4>Opportunities</h4>
          <ul>
            ${company.opportunities.map(opp => `<li>${opp}</li>`).join('')}
          </ul>
        </div>
        
        <div class="company-actions">
          <button class="btn btn-sm btn-primary" onclick="dashboardManager.viewCompanyDetails('${company.id}')">
            View Details
          </button>
          <button class="btn btn-sm btn-secondary" onclick="dashboardManager.analyzeCompany('${company.id}')">
            Analyze
          </button>
        </div>
      </div>
    `
  }

  private generateUpdateCard(update: RealTimeUpdate): string {
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
          <span class="update-severity">${update.severity.toUpperCase()}</span>
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

  private setupDashboardEventListeners(): void {
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
    await this.loadInitialData()
    this.renderDashboard()
  }

  exportData(): void {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dashboard-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  viewCompanyDetails(companyId: string): void {
    const company = this.data.companies.find(c => c.id === companyId)
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

  getDashboardData(): DashboardData {
    return { ...this.data }
  }

  destroy(): void {
    this.stopPeriodicUpdates()
    websocketManager.unsubscribe('dashboard')
    this.isInitialized = false
  }
}

// Export singleton instance
export const dashboardManager = new DashboardManager()
