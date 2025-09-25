import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Types
interface DashboardState {
  // UI State
  sidebarCollapsed: boolean
  theme: 'light' | 'dark' | 'system'
  activeTab: string
  
  // Data State
  companies: any[]
  agents: any[]
  intelligenceFeed: any[]
  marketData: any[]
  performanceMetrics: any
  
  // Loading States
  isLoading: boolean
  lastUpdated: string
  
  // Actions
  setSidebarCollapsed: (collapsed: boolean) => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setActiveTab: (tab: string) => void
  setCompanies: (companies: any[]) => void
  setAgents: (agents: any[]) => void
  setIntelligenceFeed: (feed: any[]) => void
  setMarketData: (data: any[]) => void
  setPerformanceMetrics: (metrics: any) => void
  setLoading: (loading: boolean) => void
  updateLastUpdated: () => void
  refreshData: () => Promise<void>
}

// Store
export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial State
        sidebarCollapsed: false,
        theme: 'dark',
        activeTab: 'overview',
        companies: [],
        agents: [],
        intelligenceFeed: [],
        marketData: [],
        performanceMetrics: {},
        isLoading: false,
        lastUpdated: new Date().toISOString(),

        // Actions
        setSidebarCollapsed: (collapsed) =>
          set((state) => {
            state.sidebarCollapsed = collapsed
          }),

        setTheme: (theme) =>
          set((state) => {
            state.theme = theme
          }),

        setActiveTab: (tab) =>
          set((state) => {
            state.activeTab = tab
          }),

        setCompanies: (companies) =>
          set((state) => {
            state.companies = companies
          }),

        setAgents: (agents) =>
          set((state) => {
            state.agents = agents
          }),

        setIntelligenceFeed: (feed) =>
          set((state) => {
            state.intelligenceFeed = feed
          }),

        setMarketData: (data) =>
          set((state) => {
            state.marketData = data
          }),

        setPerformanceMetrics: (metrics) =>
          set((state) => {
            state.performanceMetrics = metrics
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading
          }),

        updateLastUpdated: () =>
          set((state) => {
            state.lastUpdated = new Date().toISOString()
          }),

        refreshData: async () => {
          set((state) => {
            state.isLoading = true
          })

          try {
            // Simulate API calls
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Mock data updates
            set((state) => {
              state.companies = [
                { id: 1, name: 'Company A', performance: 85 },
                { id: 2, name: 'Company B', performance: 92 },
                { id: 3, name: 'Company C', performance: 78 },
              ]
              
              state.agents = [
                { id: 1, name: 'Data Scout', status: 'active', successRate: 94 },
                { id: 2, name: 'Analyst', status: 'processing', successRate: 87 },
                { id: 3, name: 'Monitor', status: 'active', successRate: 91 },
              ]
              
              state.intelligenceFeed = [
                { id: 1, type: 'threat', severity: 'high', message: 'New threat detected' },
                { id: 2, type: 'update', severity: 'medium', message: 'System update completed' },
                { id: 3, type: 'alert', severity: 'low', message: 'Performance optimization available' },
              ]
              
              state.marketData = [
                { x: 1, y: 100, name: 'Q1' },
                { x: 2, y: 120, name: 'Q2' },
                { x: 3, y: 110, name: 'Q3' },
                { x: 4, y: 140, name: 'Q4' },
              ]
              
              state.performanceMetrics = {
                uptime: 99.8,
                responseTime: 2.3,
                throughput: 1200000,
                errorRate: 0.02,
              }
              
              state.lastUpdated = new Date().toISOString()
            })
          } catch (error) {
            console.error('Failed to refresh data:', error)
          } finally {
            set((state) => {
              state.isLoading = false
            })
          }
        },
      })),
      {
        name: 'dashboard-store',
        partialize: (state) => ({
          sidebarCollapsed: state.sidebarCollapsed,
          theme: state.theme,
          activeTab: state.activeTab,
        }),
      }
    ),
    {
      name: 'dashboard-store',
    }
  )
)

// Selectors
export const useSidebarState = () => useDashboardStore((state) => ({
  collapsed: state.sidebarCollapsed,
  setCollapsed: state.setSidebarCollapsed,
}))

export const useThemeState = () => useDashboardStore((state) => ({
  theme: state.theme,
  setTheme: state.setTheme,
}))

export const useTabState = () => useDashboardStore((state) => ({
  activeTab: state.activeTab,
  setActiveTab: state.setActiveTab,
}))

export const useDataState = () => useDashboardStore((state) => ({
  companies: state.companies,
  agents: state.agents,
  intelligenceFeed: state.intelligenceFeed,
  marketData: state.marketData,
  performanceMetrics: state.performanceMetrics,
  isLoading: state.isLoading,
  lastUpdated: state.lastUpdated,
  refreshData: state.refreshData,
}))

// WebSocket Store
interface WebSocketState {
  isConnected: boolean
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
  lastMessage: any
  messageHistory: any[]
  
  setConnected: (connected: boolean) => void
  setConnectionStatus: (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void
  setLastMessage: (message: any) => void
  addMessage: (message: any) => void
  clearHistory: () => void
}

export const useWebSocketStore = create<WebSocketState>()(
  devtools(
    immer((set) => ({
      isConnected: false,
      connectionStatus: 'disconnected',
      lastMessage: null,
      messageHistory: [],

      setConnected: (connected) =>
        set((state) => {
          state.isConnected = connected
        }),

      setConnectionStatus: (status) =>
        set((state) => {
          state.connectionStatus = status
        }),

      setLastMessage: (message) =>
        set((state) => {
          state.lastMessage = message
        }),

      addMessage: (message) =>
        set((state) => {
          state.messageHistory.push({
            ...message,
            timestamp: new Date().toISOString(),
          })
          
          // Keep only last 100 messages
          if (state.messageHistory.length > 100) {
            state.messageHistory = state.messageHistory.slice(-100)
          }
        }),

      clearHistory: () =>
        set((state) => {
          state.messageHistory = []
        }),
    })),
    {
      name: 'websocket-store',
    }
  )
)
