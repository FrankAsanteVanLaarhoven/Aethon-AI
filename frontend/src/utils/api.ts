// Strategic AI Platform - API Utilities
import { CONFIG, ENDPOINTS } from '../config'

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
  timestamp: string
}

export interface RequestOptions {
  headers?: Record<string, string>
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
}

export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = CONFIG.API_BASE_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: { ...this.defaultHeaders, ...options.headers },
      method: options.method || 'GET',
      ...options
    }

    if (options.body && config.method !== 'GET') {
      config.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return await response.text() as T
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  async get<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers })
  }

  async post<T = any>(endpoint: string, data: any = {}, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers,
      body: data
    })
  }

  async put<T = any>(endpoint: string, data: any = {}, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      headers,
      body: data
    })
  }

  async delete<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers })
  }

  // Health Check
  async getHealth(): Promise<ApiResponse> {
    return this.get<ApiResponse>(ENDPOINTS.HEALTH)
  }

  // Intelligence API
  async getIntelligence(): Promise<ApiResponse> {
    return this.get<ApiResponse>(ENDPOINTS.INTELLIGENCE)
  }

  async getIntelligenceFeed(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.INTELLIGENCE}/feed`)
  }

  // Agents API
  async getAgents(): Promise<ApiResponse> {
    return this.get<ApiResponse>(ENDPOINTS.AGENTS)
  }

  async getAgentStatus(agentId: string): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.AGENTS}/${agentId}/status`)
  }

  // Simulations API
  async getSimulations(): Promise<ApiResponse> {
    return this.get<ApiResponse>(ENDPOINTS.SIMULATIONS)
  }

  async getSimulationHistory(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.SIMULATIONS}/history`)
  }

  async runSimulation(simulationData: any): Promise<ApiResponse> {
    return this.post<ApiResponse>(`${ENDPOINTS.SIMULATIONS}/run`, simulationData)
  }

  // Quantitative Data API
  async getQuantData(): Promise<ApiResponse> {
    return this.get<ApiResponse>(ENDPOINTS.QUANT_DATA)
  }

  // Stream Analytics API
  async getStreamAnalytics(): Promise<ApiResponse> {
    return this.get<ApiResponse>(ENDPOINTS.STREAM_ANALYTICS)
  }

  // ARPE - Autonomous Regulatory Prophecy Engine
  async getARPEPredictions(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.REGULATORY_PROPHECY}/predictions`)
  }

  async getARPEAnalysis(jurisdiction: string): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.REGULATORY_PROPHECY}/analysis/${jurisdiction}`)
  }

  // QESO - Quantum-Enhanced Strategic Optimization
  async getQESOOptimization(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.QESO}/optimization`)
  }

  async runQESOAnalysis(objective: string): Promise<ApiResponse> {
    return this.post<ApiResponse>(`${ENDPOINTS.QESO}/analyze`, { objective })
  }

  // ABME - Autonomous Business Model Execution
  async getABMEStatus(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.ABME}/status`)
  }

  async getABMEExecutions(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.ABME}/executions`)
  }

  // SNSE - Sovereign National Security Engine
  async getSNSEThreats(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.SOVEREIGN_SECURITY}/threats`)
  }

  async getSNSEStatus(): Promise<ApiResponse> {
    return this.get<ApiResponse>(`${ENDPOINTS.SOVEREIGN_SECURITY}/status`)
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
