// Strategic AI Platform - Simulations Component
import { apiClient } from '../utils/api'
import { websocketManager, WebSocketMessage } from '../services/websocket'

export interface Simulation {
  id: string
  name: string
  type: 'competitive_analysis' | 'game_theory' | 'market_simulation' | 'risk_assessment' | 'scenario_planning'
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
  createdAt: string
  completedAt?: string
  results?: SimulationResults
  parameters: SimulationParameters
  progress: number
  estimatedDuration: number
  actualDuration?: number
}

export interface SimulationResults {
  success: boolean
  recommendations: string[]
  riskAssessment: 'low' | 'medium' | 'high'
  expectedROI: number
  confidence: number
  keyInsights: string[]
  dataPoints: {
    [key: string]: any
  }
  visualizations?: {
    charts: any[]
    graphs: any[]
    heatmaps: any[]
  }
}

export interface SimulationParameters {
  scenario: string
  timeframe: string
  variables: {
    [key: string]: any
  }
  constraints: string[]
  objectives: string[]
  iterations: number
}

export interface SimulationHistory {
  simulations: Simulation[]
  totalSimulations: number
  successfulSimulations: number
  averageROI: number
  averageConfidence: number
  lastUpdated: string
}

export class SimulationsManager {
  private simulations: Simulation[] = []
  private currentSimulation: Simulation | null = null
  private simulationHistory: SimulationHistory = {
    simulations: [],
    totalSimulations: 0,
    successfulSimulations: 0,
    averageROI: 0,
    averageConfidence: 0,
    lastUpdated: new Date().toISOString()
  }
  private isRunning: boolean = false
  private updateInterval: NodeJS.Timeout | null = null
  private isInitialized: boolean = false

  async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('SimulationsManager already initialized')
      return
    }

    try {
      await this.loadSimulationHistory()
      this.setupWebSocketSubscriptions()
      this.renderSimulationsPage()
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize SimulationsManager:', error)
      throw error
    }
  }

  async loadSimulationHistory(): Promise<void> {
    try {
      const response = await apiClient.getSimulationHistory()
      this.simulationHistory = response.data || this.getDefaultSimulationHistory()
      this.simulations = this.simulationHistory.simulations
      console.log('Simulation history loaded successfully')
    } catch (error) {
      console.error('Failed to load simulation history:', error)
      this.simulationHistory = this.getDefaultSimulationHistory()
      this.simulations = this.simulationHistory.simulations
    }
  }

  private getDefaultSimulationHistory(): SimulationHistory {
    const defaultSimulations: Simulation[] = [
      {
        id: 'sim_001',
        name: 'Market Entry Strategy',
        type: 'competitive_analysis',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        completedAt: new Date(Date.now() - 82800000).toISOString(),
        results: {
          success: true,
          recommendations: ['Enter European market', 'Focus on SMB segment', 'Partner with local distributors'],
          riskAssessment: 'medium',
          expectedROI: 25.5,
          confidence: 87.3,
          keyInsights: ['Market size: $2.3B', 'Competition: Moderate', 'Entry barriers: Low'],
          dataPoints: {
            marketSize: 2300000000,
            competitionLevel: 0.6,
            entryBarriers: 0.3
          }
        },
        parameters: {
          scenario: 'European market entry',
          timeframe: '12 months',
          variables: {
            marketSize: 2300000000,
            competitionLevel: 0.6,
            entryBarriers: 0.3
          },
          constraints: ['Budget: $50M', 'Timeline: 12 months', 'Regulatory compliance'],
          objectives: ['Market penetration', 'Revenue growth', 'Brand recognition'],
          iterations: 1000
        },
        progress: 100,
        estimatedDuration: 3600,
        actualDuration: 3240
      },
      {
        id: 'sim_002',
        name: 'Competitive Response Analysis',
        type: 'game_theory',
        status: 'completed',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        completedAt: new Date(Date.now() - 169200000).toISOString(),
        results: {
          success: true,
          recommendations: ['Aggressive pricing strategy', 'Product differentiation', 'Strategic partnerships'],
          riskAssessment: 'high',
          expectedROI: 18.7,
          confidence: 82.1,
          keyInsights: ['Competitor response: 85% probability', 'Market share impact: 12%', 'Price war risk: High'],
          dataPoints: {
            competitorResponse: 0.85,
            marketShareImpact: 0.12,
            priceWarRisk: 0.8
          }
        },
        parameters: {
          scenario: 'Competitive response to new product launch',
          timeframe: '6 months',
          variables: {
            competitorResponse: 0.85,
            marketShareImpact: 0.12,
            priceWarRisk: 0.8
          },
          constraints: ['Budget: $30M', 'Timeline: 6 months', 'Market share protection'],
          objectives: ['Market share maintenance', 'Revenue protection', 'Competitive advantage'],
          iterations: 2000
        },
        progress: 100,
        estimatedDuration: 7200,
        actualDuration: 6840
      },
      {
        id: 'sim_003',
        name: 'Risk Assessment Simulation',
        type: 'risk_assessment',
        status: 'running',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        results: undefined,
        parameters: {
          scenario: 'Portfolio risk assessment',
          timeframe: '24 months',
          variables: {
            marketVolatility: 0.25,
            correlationRisk: 0.4,
            liquidityRisk: 0.3
          },
          constraints: ['Risk tolerance: Medium', 'Diversification requirements', 'Regulatory limits'],
          objectives: ['Risk minimization', 'Return optimization', 'Portfolio stability'],
          iterations: 5000
        },
        progress: 65,
        estimatedDuration: 10800,
        actualDuration: 7020
      },
      {
        id: 'sim_004',
        name: 'Scenario Planning Analysis',
        type: 'scenario_planning',
        status: 'pending',
        createdAt: new Date(Date.now() - 300000).toISOString(),
        results: undefined,
        parameters: {
          scenario: 'Economic downturn scenarios',
          timeframe: '36 months',
          variables: {
            recessionProbability: 0.3,
            marketDecline: 0.4,
            recoveryTime: 18
          },
          constraints: ['Budget: $100M', 'Timeline: 36 months', 'Survival requirements'],
          objectives: ['Business continuity', 'Market position maintenance', 'Recovery planning'],
          iterations: 3000
        },
        progress: 0,
        estimatedDuration: 14400
      }
    ]

    const successfulSimulations = defaultSimulations.filter(s => s.status === 'completed' && s.results?.success)
    const averageROI = successfulSimulations.reduce((sum, s) => sum + (s.results?.expectedROI || 0), 0) / successfulSimulations.length
    const averageConfidence = successfulSimulations.reduce((sum, s) => sum + (s.results?.confidence || 0), 0) / successfulSimulations.length

    return {
      simulations: defaultSimulations,
      totalSimulations: defaultSimulations.length,
      successfulSimulations: successfulSimulations.length,
      averageROI: averageROI || 0,
      averageConfidence: averageConfidence || 0,
      lastUpdated: new Date().toISOString()
    }
  }

  private setupWebSocketSubscriptions(): void {
    websocketManager.subscribe('simulations', (message: WebSocketMessage) => {
      this.handleWebSocketMessage(message)
    }, ['simulation_update', 'simulation_result', 'simulation_progress'])
  }

  private handleWebSocketMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'simulation_update':
        this.updateSimulation(message.data)
        break
      case 'simulation_result':
        this.handleSimulationResult(message.data)
        break
      case 'simulation_progress':
        this.updateSimulationProgress(message.data)
        break
    }
  }

  private updateSimulation(data: any): void {
    const simulationIndex = this.simulations.findIndex(s => s.id === data.id)
    if (simulationIndex !== -1) {
      this.simulations[simulationIndex] = { ...this.simulations[simulationIndex], ...data }
      this.renderSimulationsPage()
    }
  }

  private handleSimulationResult(data: any): void {
    const simulationIndex = this.simulations.findIndex(s => s.id === data.simulationId)
    if (simulationIndex !== -1) {
      this.simulations[simulationIndex].results = data.results
      this.simulations[simulationIndex].status = 'completed'
      this.simulations[simulationIndex].completedAt = new Date().toISOString()
      this.simulations[simulationIndex].actualDuration = data.actualDuration
      this.simulations[simulationIndex].progress = 100
      this.updateSimulationHistory()
      this.renderSimulationsPage()
    }
  }

  private updateSimulationProgress(data: any): void {
    const simulationIndex = this.simulations.findIndex(s => s.id === data.simulationId)
    if (simulationIndex !== -1) {
      this.simulations[simulationIndex].progress = data.progress
      this.renderSimulationsPage()
    }
  }

  private updateSimulationHistory(): void {
    const successfulSimulations = this.simulations.filter(s => s.status === 'completed' && s.results?.success)
    const averageROI = successfulSimulations.reduce((sum, s) => sum + (s.results?.expectedROI || 0), 0) / successfulSimulations.length
    const averageConfidence = successfulSimulations.reduce((sum, s) => sum + (s.results?.confidence || 0), 0) / successfulSimulations.length

    this.simulationHistory = {
      simulations: [...this.simulations],
      totalSimulations: this.simulations.length,
      successfulSimulations: successfulSimulations.length,
      averageROI: averageROI || 0,
      averageConfidence: averageConfidence || 0,
      lastUpdated: new Date().toISOString()
    }
  }

  renderSimulationsPage(): void {
    const container = document.getElementById('simulations-container')
    if (!container) return

    container.innerHTML = this.generateSimulationsHTML(this.simulationHistory)
    this.setupSimulationsEventListeners()
  }

  private generateSimulationsHTML(history: SimulationHistory): string {
    return `
      <div class="simulations-dashboard">
        <div class="simulations-header">
          <h1>Advanced Simulations Center</h1>
          <div class="simulations-stats">
            <div class="stat">
              <span class="stat-label">Total Simulations</span>
              <span class="stat-value">${history.totalSimulations}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Successful</span>
              <span class="stat-value">${history.successfulSimulations}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Avg ROI</span>
              <span class="stat-value">${history.averageROI.toFixed(1)}%</span>
            </div>
            <div class="stat">
              <span class="stat-label">Avg Confidence</span>
              <span class="stat-value">${history.averageConfidence.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div class="simulations-content">
          <div class="simulations-controls">
            <button class="btn btn-primary" onclick="simulationsManager.createNewSimulation()">
              Create New Simulation
            </button>
            <button class="btn btn-secondary" onclick="simulationsManager.runAllPendingSimulations()">
              Run All Pending
            </button>
            <button class="btn btn-secondary" onclick="simulationsManager.exportResults()">
              Export Results
            </button>
          </div>

          <div class="simulations-grid">
            ${history.simulations.map(simulation => this.generateSimulationCard(simulation)).join('')}
          </div>
        </div>

        <div class="simulations-footer">
          <div class="last-updated">
            Last updated: ${new Date(history.lastUpdated).toLocaleString()}
          </div>
        </div>
      </div>
    `
  }

  private generateSimulationCard(simulation: Simulation): string {
    const statusClass = `status-${simulation.status}`
    const typeIcon = this.getTypeIcon(simulation.type)
    
    return `
      <div class="simulation-card ${statusClass}" data-simulation-id="${simulation.id}">
        <div class="simulation-header">
          <div class="simulation-info">
            <h3>${simulation.name}</h3>
            <span class="simulation-type">${typeIcon} ${simulation.type.replace('_', ' ').toUpperCase()}</span>
          </div>
          <div class="simulation-status">
            <span class="status-indicator ${statusClass}">${simulation.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="simulation-details">
          <div class="simulation-scenario">
            <strong>Scenario:</strong>
            <span>${simulation.parameters.scenario}</span>
          </div>
          
          <div class="simulation-timeframe">
            <strong>Timeframe:</strong>
            <span>${simulation.parameters.timeframe}</span>
          </div>

          ${simulation.status === 'running' ? `
            <div class="simulation-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${simulation.progress}%"></div>
              </div>
              <span class="progress-text">${simulation.progress}% Complete</span>
            </div>
          ` : ''}

          ${simulation.results ? `
            <div class="simulation-results">
              <div class="result-metrics">
                <div class="metric">
                  <span class="metric-label">Expected ROI</span>
                  <span class="metric-value">${simulation.results.expectedROI.toFixed(1)}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Confidence</span>
                  <span class="metric-value">${simulation.results.confidence.toFixed(1)}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Risk Level</span>
                  <span class="metric-value risk-${simulation.results.riskAssessment}">${simulation.results.riskAssessment.toUpperCase()}</span>
                </div>
              </div>
              
              <div class="recommendations">
                <h4>Key Recommendations</h4>
                <ul>
                  ${simulation.results.recommendations.slice(0, 3).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
              </div>
            </div>
          ` : ''}

          <div class="simulation-parameters">
            <h4>Parameters</h4>
            <div class="parameter-list">
              <div class="parameter">
                <span class="param-label">Iterations:</span>
                <span class="param-value">${simulation.parameters.iterations.toLocaleString()}</span>
              </div>
              <div class="parameter">
                <span class="param-label">Duration:</span>
                <span class="param-value">${this.formatDuration(simulation.estimatedDuration)}</span>
              </div>
              ${simulation.actualDuration ? `
                <div class="parameter">
                  <span class="param-label">Actual:</span>
                  <span class="param-value">${this.formatDuration(simulation.actualDuration)}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="simulation-actions">
          ${simulation.status === 'pending' ? `
            <button class="btn btn-sm btn-primary" onclick="simulationsManager.runSimulation('${simulation.id}')">
              Run Simulation
            </button>
          ` : ''}
          ${simulation.status === 'running' ? `
            <button class="btn btn-sm btn-warning" onclick="simulationsManager.pauseSimulation('${simulation.id}')">
              Pause
            </button>
          ` : ''}
          ${simulation.status === 'paused' ? `
            <button class="btn btn-sm btn-primary" onclick="simulationsManager.resumeSimulation('${simulation.id}')">
              Resume
            </button>
          ` : ''}
          ${simulation.status === 'completed' ? `
            <button class="btn btn-sm btn-primary" onclick="simulationsManager.viewResults('${simulation.id}')">
              View Results
            </button>
          ` : ''}
          <button class="btn btn-sm btn-secondary" onclick="simulationsManager.viewDetails('${simulation.id}')">
            View Details
          </button>
          <button class="btn btn-sm btn-danger" onclick="simulationsManager.deleteSimulation('${simulation.id}')">
            Delete
          </button>
        </div>

        <div class="simulation-timestamps">
          <small>Created: ${new Date(simulation.createdAt).toLocaleString()}</small>
          ${simulation.completedAt ? `
            <small>Completed: ${new Date(simulation.completedAt).toLocaleString()}</small>
          ` : ''}
        </div>
      </div>
    `
  }

  private getTypeIcon(type: Simulation['type']): string {
    const icons = {
      competitive_analysis: '🎯',
      game_theory: '♟️',
      market_simulation: '📊',
      risk_assessment: '⚠️',
      scenario_planning: '🔮'
    }
    return icons[type] || '📈'
  }

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  private setupSimulationsEventListeners(): void {
    // Add event listeners for simulation cards
    document.querySelectorAll('.simulation-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const simulationId = (e.currentTarget as HTMLElement).dataset.simulationId
        if (simulationId) {
          this.selectSimulation(simulationId)
        }
      })
    })
  }

  // Public methods
  async createNewSimulation(): Promise<void> {
    // Implementation for creating a new simulation
    console.log('Creating new simulation...')
    // Add UI for simulation creation
  }

  async runSimulation(simulationId: string): Promise<void> {
    try {
      const simulation = this.simulations.find(s => s.id === simulationId)
      if (!simulation) {
        console.error(`Simulation not found: ${simulationId}`)
        return
      }

      simulation.status = 'running'
      simulation.progress = 0
      this.renderSimulationsPage()

      const response = await apiClient.runSimulation(simulation.parameters)
      // Handle simulation response
      console.log(`Running simulation: ${simulationId}`, response)
    } catch (error) {
      console.error(`Failed to run simulation ${simulationId}:`, error)
      const simulation = this.simulations.find(s => s.id === simulationId)
      if (simulation) {
        simulation.status = 'failed'
        this.renderSimulationsPage()
      }
    }
  }

  async pauseSimulation(simulationId: string): Promise<void> {
    const simulation = this.simulations.find(s => s.id === simulationId)
    if (simulation && simulation.status === 'running') {
      simulation.status = 'paused'
      this.renderSimulationsPage()
      console.log(`Paused simulation: ${simulationId}`)
    }
  }

  async resumeSimulation(simulationId: string): Promise<void> {
    const simulation = this.simulations.find(s => s.id === simulationId)
    if (simulation && simulation.status === 'paused') {
      simulation.status = 'running'
      this.renderSimulationsPage()
      console.log(`Resumed simulation: ${simulationId}`)
    }
  }

  async runAllPendingSimulations(): Promise<void> {
    const pendingSimulations = this.simulations.filter(s => s.status === 'pending')
    for (const simulation of pendingSimulations) {
      await this.runSimulation(simulation.id)
      // Add delay between simulations
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  viewResults(simulationId: string): void {
    const simulation = this.simulations.find(s => s.id === simulationId)
    if (simulation && simulation.results) {
      console.log(`Viewing results for simulation: ${simulationId}`, simulation.results)
      // Implementation for viewing detailed results
    }
  }

  viewDetails(simulationId: string): void {
    const simulation = this.simulations.find(s => s.id === simulationId)
    if (simulation) {
      console.log(`Viewing details for simulation: ${simulationId}`, simulation)
      // Implementation for viewing simulation details
    }
  }

  deleteSimulation(simulationId: string): void {
    const simulationIndex = this.simulations.findIndex(s => s.id === simulationId)
    if (simulationIndex !== -1) {
      this.simulations.splice(simulationIndex, 1)
      this.updateSimulationHistory()
      this.renderSimulationsPage()
      console.log(`Deleted simulation: ${simulationId}`)
    }
  }

  selectSimulation(simulationId: string): void {
    console.log(`Selected simulation: ${simulationId}`)
    // Implementation for selecting a simulation
  }

  exportResults(): void {
    const blob = new Blob([JSON.stringify(this.simulationHistory, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'simulation-results.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  getSimulationHistory(): SimulationHistory {
    return { ...this.simulationHistory }
  }

  destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
    websocketManager.unsubscribe('simulations')
    this.isInitialized = false
  }
}

// Export singleton instance
export const simulationsManager = new SimulationsManager()
