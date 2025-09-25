// Strategic AI Platform - Main Application Entry Point
import { CONFIG } from './config'
import { navigationManager } from './components/navigation'
import { dashboardManager } from './components/dashboard'
import { analyticsManager } from './components/analytics'
import { intelligenceManager } from './components/intelligence'
import { simulationsManager } from './components/simulations'
import { agentsManager } from './components/agents'
import { websocketManager } from './services/websocket'
import { apiClient } from './utils/api'

export interface PlatformManagers {
  navigation: typeof navigationManager
  dashboard: typeof dashboardManager
  analytics: typeof analyticsManager
  intelligence: typeof intelligenceManager
  simulations: typeof simulationsManager
  agents: typeof agentsManager
  websocket: typeof websocketManager
}

export interface PlatformStatus {
  isInitialized: boolean
  isConnected: boolean
  lastUpdate: string
  errors: string[]
  performance: {
    loadTime: number
    memoryUsage: number
    responseTime: number
  }
}

export class StrategicAIPlatform {
  private isInitialized: boolean = false
  private managers: PlatformManagers
  private status: PlatformStatus = {
    isInitialized: false,
    isConnected: false,
    lastUpdate: new Date().toISOString(),
    errors: [],
    performance: {
      loadTime: 0,
      memoryUsage: 0,
      responseTime: 0
    }
  }
  private startTime: number = 0

  constructor() {
    this.managers = {
      navigation: navigationManager,
      dashboard: dashboardManager,
      analytics: analyticsManager,
      intelligence: intelligenceManager,
      simulations: simulationsManager,
      agents: agentsManager,
      websocket: websocketManager
    }
    this.startTime = performance.now()
  }

  async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('Platform already initialized')
      return
    }

    try {
      console.log('Initializing Strategic AI Platform...')
      
      // Initialize WebSocket connection
      await this.initializeWebSocket()
      
      // Initialize navigation
      this.initializeNavigation()
      
      // Initialize page managers
      await this.initializePageManagers()
      
      // Setup global error handling
      this.setupErrorHandling()
      
      // Setup performance monitoring
      this.setupPerformanceMonitoring()
      
      this.isInitialized = true
      this.status.isInitialized = true
      this.status.lastUpdate = new Date().toISOString()
      this.status.performance.loadTime = performance.now() - this.startTime
      
      console.log('Strategic AI Platform initialized successfully')
      this.logPlatformStatus()
    } catch (error) {
      console.error('Failed to initialize Strategic AI Platform:', error)
      this.status.errors.push(`Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      throw error
    }
  }

  private async initializeWebSocket(): Promise<void> {
    try {
      await this.managers.websocket.connect()
      this.status.isConnected = true
      console.log('WebSocket connection established')
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error)
      this.status.errors.push(`WebSocket connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      // Continue initialization even if WebSocket fails
    }
  }

  private initializeNavigation(): void {
    try {
      this.managers.navigation.init()
      
      // Register navigation handlers for each page
      this.managers.navigation.registerHandler('dashboard', async () => {
        await this.managers.dashboard.init()
      })
      
      this.managers.navigation.registerHandler('intelligence', async () => {
        await this.managers.intelligence.init()
      })
      
      this.managers.navigation.registerHandler('simulations', async () => {
        await this.managers.simulations.init()
      })
      
      this.managers.navigation.registerHandler('agents', async () => {
        await this.managers.agents.init()
      })
      
      this.managers.navigation.registerHandler('analytics', async () => {
        await this.managers.analytics.init()
      })
      
      console.log('Navigation system initialized')
    } catch (error) {
      console.error('Failed to initialize navigation:', error)
      this.status.errors.push(`Navigation initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async initializePageManagers(): Promise<void> {
    const managers = [
      { name: 'Dashboard', manager: this.managers.dashboard },
      { name: 'Intelligence', manager: this.managers.intelligence },
      { name: 'Simulations', manager: this.managers.simulations },
      { name: 'Agents', manager: this.managers.agents },
      { name: 'Analytics', manager: this.managers.analytics }
    ]

    for (const { name, manager } of managers) {
      try {
        await manager.init()
        console.log(`${name} manager initialized successfully`)
      } catch (error) {
        console.error(`Failed to initialize ${name} manager:`, error)
        this.status.errors.push(`${name} manager initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
  }

  private setupErrorHandling(): void {
    // Global error handler
    window.addEventListener('error', (event: ErrorEvent) => {
      console.error('Global error:', event.error)
        this.status.errors.push(`Global error: ${event.error instanceof Error ? event.error.message : 'Unknown error'}`)
      this.logPlatformStatus()
    })

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      this.status.errors.push(`Unhandled promise rejection: ${event.reason}`)
      this.logPlatformStatus()
    })

    // API error handler
    const originalRequest = apiClient.request.bind(apiClient)
    apiClient.request = async (endpoint: string, options: any = {}) => {
      try {
        const startTime = performance.now()
        const result = await originalRequest(endpoint, options)
        const endTime = performance.now()
        this.status.performance.responseTime = endTime - startTime
        return result
      } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error)
        this.status.errors.push(`API request failed for ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        throw error
      }
    }

    console.log('Error handling system initialized')
  }

  private setupPerformanceMonitoring(): void {
    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory
        this.status.performance.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB
      }, 30000) // Check every 30 seconds
    }

    // Monitor WebSocket connection
    setInterval(() => {
      this.status.isConnected = this.managers.websocket.isConnected()
      this.status.lastUpdate = new Date().toISOString()
    }, 10000) // Check every 10 seconds

    console.log('Performance monitoring system initialized')
  }

  private logPlatformStatus(): void {
    console.log('Platform Status:', {
      initialized: this.status.isInitialized,
      connected: this.status.isConnected,
      errors: this.status.errors.length,
      performance: this.status.performance,
      lastUpdate: this.status.lastUpdate
    })
  }

  // Public methods
  getStatus(): PlatformStatus {
    return { ...this.status }
  }

  getManagers(): PlatformManagers {
    return this.managers
  }

  async refreshAllData(): Promise<void> {
    try {
      console.log('Refreshing all platform data...')
      
      const refreshPromises = [
        this.managers.dashboard.refreshData(),
        this.managers.intelligence.refreshData(),
        this.managers.agents.refreshAgents()
      ]

      await Promise.allSettled(refreshPromises)
      this.status.lastUpdate = new Date().toISOString()
      console.log('All platform data refreshed')
    } catch (error) {
      console.error('Failed to refresh platform data:', error)
      this.status.errors.push(`Data refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async exportAllData(): Promise<void> {
    try {
      console.log('Exporting all platform data...')
      
      const exportData = {
        dashboard: this.managers.dashboard.getDashboardData(),
        intelligence: this.managers.intelligence.getIntelligenceData(),
        analytics: this.managers.analytics.getAnalyticsData(),
        simulations: this.managers.simulations.getSimulationHistory(),
        agents: {
          agents: this.managers.agents.getAgents(),
          status: this.managers.agents.getAgentStatus()
        },
        platform: {
          status: this.getStatus(),
          config: CONFIG,
          timestamp: new Date().toISOString()
        }
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `strategic-ai-platform-export-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      
      console.log('Platform data exported successfully')
    } catch (error) {
      console.error('Failed to export platform data:', error)
      this.status.errors.push(`Data export failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async shutdown(): Promise<void> {
    try {
      console.log('Shutting down Strategic AI Platform...')
      
      // Destroy all managers
      const destroyPromises = [
        this.managers.dashboard.destroy(),
        this.managers.intelligence.destroy(),
        this.managers.simulations.destroy(),
        this.managers.agents.destroy(),
        this.managers.analytics.destroy()
      ]

      await Promise.allSettled(destroyPromises)
      
      // Disconnect WebSocket
      this.managers.websocket.disconnect()
      
      this.isInitialized = false
      this.status.isInitialized = false
      this.status.isConnected = false
      
      console.log('Strategic AI Platform shut down successfully')
    } catch (error) {
      console.error('Failed to shutdown platform:', error)
      this.status.errors.push(`Shutdown failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Utility methods
  isReady(): boolean {
    return this.isInitialized && this.status.isConnected
  }

  getErrors(): string[] {
    return [...this.status.errors]
  }

  clearErrors(): void {
    this.status.errors = []
  }

  getPerformanceMetrics(): PlatformStatus['performance'] {
    return { ...this.status.performance }
  }
}

// Export singleton instance
export const strategicAIPlatform = new StrategicAIPlatform()

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      strategicAIPlatform.init().catch(error => {
        console.error('Failed to auto-initialize platform:', error)
      })
    })
  } else {
    strategicAIPlatform.init().catch(error => {
      console.error('Failed to auto-initialize platform:', error)
    })
  }
}

// Global error handler for the platform
window.addEventListener('beforeunload', () => {
  strategicAIPlatform.shutdown().catch(error => {
    console.error('Failed to shutdown platform on page unload:', error)
  })
})

// Export for global access
declare global {
  interface Window {
    strategicAIPlatform: StrategicAIPlatform
  }
}

window.strategicAIPlatform = strategicAIPlatform
