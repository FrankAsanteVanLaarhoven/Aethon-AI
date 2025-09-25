import axios, { AxiosInstance, AxiosResponse } from 'axios'

// API Client for Strategic AI Platform
class StrategicAPIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
      }
    )
  }

  // Health Check
  async getHealth(): Promise<any> {
    const response = await this.client.get('/api/v1/health')
    return response.data
  }

  // Intelligence API
  async getIntelligence(): Promise<any> {
    const response = await this.client.get('/api/v1/intel')
    return response.data
  }

  async getIntelligenceFeed(): Promise<any> {
    const response = await this.client.get('/api/v1/intel/feed')
    return response.data
  }

  // Agents API
  async getAgents(): Promise<any> {
    const response = await this.client.get('/api/v1/agents')
    return response.data
  }

  async getAgentStatus(agentId: string): Promise<any> {
    const response = await this.client.get(`/api/v1/agents/${agentId}/status`)
    return response.data
  }

  // Simulations API
  async getSimulations(): Promise<any> {
    const response = await this.client.get('/api/v1/simulations')
    return response.data
  }

  async runSimulation(simulationData: any): Promise<any> {
    const response = await this.client.post('/api/v1/simulations/run', simulationData)
    return response.data
  }

  // Quantitative Data API
  async getQuantData(): Promise<any> {
    const response = await this.client.get('/api/v1/quant')
    return response.data
  }

  // Stream Analytics API
  async getStreamAnalytics(): Promise<any> {
    const response = await this.client.get('/api/v1/streams')
    return response.data
  }

  // ARPE - Autonomous Regulatory Prophecy Engine
  async getARPEPredictions(): Promise<any> {
    const response = await this.client.get('/api/v1/regulatory-prophecy/predictions')
    return response.data
  }

  async getARPEAnalysis(jurisdiction: string): Promise<any> {
    const response = await this.client.get(`/api/v1/regulatory-prophecy/analysis/${jurisdiction}`)
    return response.data
  }

  async getPoliticalSentiment(): Promise<any> {
    const response = await this.client.get('/api/v1/regulatory-prophecy/sentiment')
    return response.data
  }

  // QESO - Quantum-Enhanced Strategic Optimization
  async getQESOOptimization(): Promise<any> {
    const response = await this.client.get('/api/v1/qeso/optimization')
    return response.data
  }

  async runQESOAnalysis(objective: string): Promise<any> {
    const response = await this.client.post('/api/v1/qeso/analyze', { objective })
    return response.data
  }

  async getQuantumAdvantage(): Promise<any> {
    const response = await this.client.get('/api/v1/qeso/quantum-advantage')
    return response.data
  }

  // ABME - Autonomous Business Model Execution
  async getABMEStatus(): Promise<any> {
    const response = await this.client.get('/api/v1/abme/status')
    return response.data
  }

  async getABMEExecutions(): Promise<any> {
    const response = await this.client.get('/api/v1/abme/executions')
    return response.data
  }

  async startABMEExecution(modelId: string): Promise<any> {
    const response = await this.client.post(`/api/v1/abme/execute/${modelId}`)
    return response.data
  }

  // SNSE - Sovereign National Security Engine
  async getSNSEThreats(): Promise<any> {
    const response = await this.client.get('/api/v1/sovereign-security/threats')
    return response.data
  }

  async getSNSEStatus(): Promise<any> {
    const response = await this.client.get('/api/v1/sovereign-security/status')
    return response.data
  }

  async getDataSovereignty(): Promise<any> {
    const response = await this.client.get('/api/v1/sovereign-security/sovereignty')
    return response.data
  }

  // SCI - Synthetic Competition Intelligence
  async getSCISimulations(): Promise<any> {
    const response = await this.client.get('/api/v1/sci/simulations')
    return response.data
  }

  async runSCISimulation(scenario: any): Promise<any> {
    const response = await this.client.post('/api/v1/sci/simulate', scenario)
    return response.data
  }

  // CEIS - Cross-Enterprise Intelligence Synthesis
  async getCEISNetwork(): Promise<any> {
    const response = await this.client.get('/api/v1/ceis/network')
    return response.data
  }

  async getCEISIntelligence(): Promise<any> {
    const response = await this.client.get('/api/v1/ceis/intelligence')
    return response.data
  }

  // PSCDO - Predictive Supply Chain Disruption Oracle
  async getPSCDOPredictions(): Promise<any> {
    const response = await this.client.get('/api/v1/pscdo/predictions')
    return response.data
  }

  async getPSCDORisks(): Promise<any> {
    const response = await this.client.get('/api/v1/pscdo/risks')
    return response.data
  }

  // RCRE - Real-Time Competitive Response Engine
  async getRCREStatus(): Promise<any> {
    const response = await this.client.get('/api/v1/rcre/status')
    return response.data
  }

  async getRCREThreats(): Promise<any> {
    const response = await this.client.get('/api/v1/rcre/threats')
    return response.data
  }

  // DRAD - Dynamic Regulatory Arbitrage Discovery
  async getDRADOpportunities(): Promise<any> {
    const response = await this.client.get('/api/v1/drad/opportunities')
    return response.data
  }

  async getDRADAnalysis(): Promise<any> {
    const response = await this.client.get('/api/v1/drad/analysis')
    return response.data
  }

  // Geopolitical Prophecy
  async getGeopoliticalPredictions(): Promise<any> {
    const response = await this.client.get('/api/v1/geopolitical/predictions')
    return response.data
  }

  async getEconomicWarfare(): Promise<any> {
    const response = await this.client.get('/api/v1/geopolitical/economic-warfare')
    return response.data
  }

  // Military Integration
  async getMilitaryStatus(): Promise<any> {
    const response = await this.client.get('/api/v1/military/status')
    return response.data
  }

  async getNATOIntegration(): Promise<any> {
    const response = await this.client.get('/api/v1/military/nato')
    return response.data
  }

  // Educational Network
  async getEducationalNetwork(): Promise<any> {
    const response = await this.client.get('/api/v1/education/network')
    return response.data
  }

  async getPopulationScaleEducation(): Promise<any> {
    const response = await this.client.get('/api/v1/education/population-scale')
    return response.data
  }

  // Corporate Transformation
  async getCorporateTransformation(): Promise<any> {
    const response = await this.client.get('/api/v1/corporate/transformation')
    return response.data
  }

  async getMcKinseySurpassing(): Promise<any> {
    const response = await this.client.get('/api/v1/corporate/mckinsey-surpassing')
    return response.data
  }

  // Resource Optimization
  async getResourceOptimization(): Promise<any> {
    const response = await this.client.get('/api/v1/resources/optimization')
    return response.data
  }

  async getPlanetaryResources(): Promise<any> {
    const response = await this.client.get('/api/v1/resources/planetary')
    return response.data
  }

  // Economic Policy
  async getEconomicPolicy(): Promise<any> {
    const response = await this.client.get('/api/v1/economic/policy')
    return response.data
  }

  async getPolicyEngine(): Promise<any> {
    const response = await this.client.get('/api/v1/economic/policy-engine')
    return response.data
  }

  // Compliance Automation
  async getComplianceStatus(): Promise<any> {
    const response = await this.client.get('/api/v1/compliance/status')
    return response.data
  }

  async getUniversalCompliance(): Promise<any> {
    const response = await this.client.get('/api/v1/compliance/universal')
    return response.data
  }

  // Performance Metrics
  async getPerformanceMetrics(): Promise<any> {
    const response = await this.client.get('/api/v1/performance')
    return response.data
  }

  // System Status
  async getSystemStatus(): Promise<any> {
    const response = await this.client.get('/api/v1/system/status')
    return response.data
  }
}

// Export singleton instance
export const apiClient = new StrategicAPIClient()

// Export types
export interface APIResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T = any> extends APIResponse<T> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
