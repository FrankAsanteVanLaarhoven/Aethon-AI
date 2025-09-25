// Strategic AI Platform - Agents Component
import { apiClient } from '../utils/api'
import { websocketManager, WebSocketMessage } from '../services/websocket'

export interface Agent {
  id: string
  name: string
  status: 'active' | 'processing' | 'idle' | 'error'
  currentTask: string
  successRate: number
  lastUpdate: string
  capabilities: string[]
  recentActivity: string[]
  performance: {
    tasksCompleted: number
    averageResponseTime: number
    uptime: number
  }
}

export interface AgentStatus {
  [agentId: string]: {
    status: Agent['status']
    lastUpdate: string
    currentTask: string
    performance: Agent['performance']
  }
}

export interface AgentData {
  agents: Agent[]
  agentStatus: AgentStatus
  totalAgents: number
  activeAgents: number
  averageSuccessRate: number
  lastUpdated: string
}

export class AgentsManager {
  private agents: Agent[] = []
  private agentStatus: AgentStatus = {}
  private updateInterval: NodeJS.Timeout | null = null
  private isInitialized: boolean = false

  async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('AgentsManager already initialized')
      return
    }

    try {
      await this.loadAgentsData()
      this.setupWebSocketSubscriptions()
      this.startPeriodicUpdates()
      this.renderAgentsPage()
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize AgentsManager:', error)
      throw error
    }
  }

  async loadAgentsData(): Promise<void> {
    try {
      const response = await apiClient.getAgents()
      this.agents = response.data || []
      this.updateAgentStatus()
      console.log('Agents data loaded successfully')
    } catch (error) {
      console.error('Failed to load agents data:', error)
      this.agents = this.getDefaultAgentsData()
      this.updateAgentStatus()
    }
  }

  private getDefaultAgentsData(): Agent[] {
    return [
      {
        id: "data_scout",
        name: "Data Scout Agent",
        status: "active",
        currentTask: "Monitoring Scale AI SEC filings",
        successRate: 94,
        lastUpdate: "2 minutes ago",
        capabilities: ["Legal web scraping", "API integration", "Data validation"],
        recentActivity: ["Collected 47 patent filings", "Monitored 12 news sources", "Validated 156 data points"],
        performance: {
          tasksCompleted: 1247,
          averageResponseTime: 2.3,
          uptime: 99.8
        }
      },
      {
        id: "analyst",
        name: "Analyst Agent",
        status: "processing",
        currentTask: "Analyzing competitive landscape",
        successRate: 87,
        lastUpdate: "5 minutes ago",
        capabilities: ["Market analysis", "Trend prediction", "Risk assessment"],
        recentActivity: ["Analyzed 23 market trends", "Generated 5 risk reports", "Updated 12 company profiles"],
        performance: {
          tasksCompleted: 892,
          averageResponseTime: 4.1,
          uptime: 98.5
        }
      },
      {
        id: "monitor",
        name: "Monitor Agent",
        status: "active",
        currentTask: "Real-time threat monitoring",
        successRate: 91,
        lastUpdate: "1 minute ago",
        capabilities: ["Threat detection", "Security monitoring", "Alert management"],
        recentActivity: ["Detected 3 potential threats", "Processed 156 security events", "Generated 8 alerts"],
        performance: {
          tasksCompleted: 2156,
          averageResponseTime: 1.8,
          uptime: 99.9
        }
      },
      {
        id: "predictor",
        name: "Predictor Agent",
        status: "idle",
        currentTask: "Standby mode",
        successRate: 89,
        lastUpdate: "10 minutes ago",
        capabilities: ["Predictive modeling", "Scenario analysis", "Forecasting"],
        recentActivity: ["Completed market forecast", "Generated 3 scenarios", "Updated prediction models"],
        performance: {
          tasksCompleted: 634,
          averageResponseTime: 6.2,
          uptime: 97.2
        }
      },
      {
        id: "executor",
        name: "Executor Agent",
        status: "active",
        currentTask: "Executing strategic initiatives",
        successRate: 93,
        lastUpdate: "3 minutes ago",
        capabilities: ["Task execution", "Workflow automation", "Process optimization"],
        recentActivity: ["Executed 12 strategic tasks", "Automated 5 workflows", "Optimized 3 processes"],
        performance: {
          tasksCompleted: 1789,
          averageResponseTime: 3.4,
          uptime: 99.1
        }
      },
      {
        id: "optimizer",
        name: "Optimizer Agent",
        status: "processing",
        currentTask: "Resource optimization",
        successRate: 95,
        lastUpdate: "4 minutes ago",
        capabilities: ["Resource optimization", "Cost reduction", "Efficiency improvement"],
        recentActivity: ["Optimized resource allocation", "Reduced costs by 15%", "Improved efficiency by 23%"],
        performance: {
          tasksCompleted: 1456,
          averageResponseTime: 2.9,
          uptime: 99.6
        }
      }
    ]
  }

  private updateAgentStatus(): void {
    this.agentStatus = {}
    this.agents.forEach(agent => {
      this.agentStatus[agent.id] = {
        status: agent.status,
        lastUpdate: agent.lastUpdate,
        currentTask: agent.currentTask,
        performance: agent.performance
      }
    })
  }

  private setupWebSocketSubscriptions(): void {
    websocketManager.subscribe('agents', (message: WebSocketMessage) => {
      this.handleWebSocketMessage(message)
    }, ['agent_status', 'agent_update', 'agent_performance'])
  }

  private handleWebSocketMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'agent_status':
        this.updateAgentStatusFromMessage(message.data)
        break
      case 'agent_update':
        this.updateAgentFromMessage(message.data)
        break
      case 'agent_performance':
        this.updateAgentPerformance(message.data)
        break
    }
  }

  private updateAgentStatusFromMessage(data: any): void {
    if (data.agentId && this.agentStatus[data.agentId]) {
      this.agentStatus[data.agentId] = {
        ...this.agentStatus[data.agentId],
        status: data.status,
        lastUpdate: new Date().toISOString(),
        currentTask: data.currentTask || this.agentStatus[data.agentId].currentTask
      }
      this.renderAgentsPage()
    }
  }

  private updateAgentFromMessage(data: any): void {
    const agentIndex = this.agents.findIndex(agent => agent.id === data.id)
    if (agentIndex !== -1) {
      this.agents[agentIndex] = { ...this.agents[agentIndex], ...data }
      this.updateAgentStatus()
      this.renderAgentsPage()
    }
  }

  private updateAgentPerformance(data: any): void {
    if (data.agentId && this.agentStatus[data.agentId]) {
      this.agentStatus[data.agentId].performance = {
        ...this.agentStatus[data.agentId].performance,
        ...data.performance
      }
      this.renderAgentsPage()
    }
  }

  private startPeriodicUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.loadAgentsData()
    }, 30000) // Update every 30 seconds
  }

  private stopPeriodicUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  renderAgentsPage(): void {
    const container = document.getElementById('agents-container')
    if (!container) return

    const agentsData: AgentData = {
      agents: this.agents,
      agentStatus: this.agentStatus,
      totalAgents: this.agents.length,
      activeAgents: this.agents.filter(agent => agent.status === 'active').length,
      averageSuccessRate: this.agents.reduce((sum, agent) => sum + agent.successRate, 0) / this.agents.length,
      lastUpdated: new Date().toISOString()
    }

    container.innerHTML = this.generateAgentsHTML(agentsData)
    this.setupAgentEventListeners()
  }

  private generateAgentsHTML(data: AgentData): string {
    return `
      <div class="agents-dashboard">
        <div class="agents-header">
          <h2>Multi-Agent Orchestration</h2>
          <div class="agents-stats">
            <div class="stat">
              <span class="stat-label">Total Agents</span>
              <span class="stat-value">${data.totalAgents}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Active</span>
              <span class="stat-value">${data.activeAgents}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Avg Success Rate</span>
              <span class="stat-value">${data.averageSuccessRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div class="agents-grid">
          ${data.agents.map(agent => this.generateAgentCard(agent)).join('')}
        </div>

        <div class="agents-controls">
          <button class="btn btn-primary" onclick="agentsManager.refreshAgents()">
            Refresh All Agents
          </button>
          <button class="btn btn-secondary" onclick="agentsManager.restartAllAgents()">
            Restart All Agents
          </button>
        </div>
      </div>
    `
  }

  private generateAgentCard(agent: Agent): string {
    const statusClass = `status-${agent.status}`
    const statusIcon = this.getStatusIcon(agent.status)
    
    return `
      <div class="agent-card ${statusClass}" data-agent-id="${agent.id}">
        <div class="agent-header">
          <div class="agent-info">
            <h3>${agent.name}</h3>
            <span class="agent-id">${agent.id}</span>
          </div>
          <div class="agent-status">
            <span class="status-indicator ${statusClass}">${statusIcon}</span>
            <span class="status-text">${agent.status}</span>
          </div>
        </div>

        <div class="agent-details">
          <div class="current-task">
            <strong>Current Task:</strong>
            <span>${agent.currentTask}</span>
          </div>
          
          <div class="performance-metrics">
            <div class="metric">
              <span class="metric-label">Success Rate</span>
              <span class="metric-value">${agent.successRate}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">Tasks Completed</span>
              <span class="metric-value">${agent.performance.tasksCompleted}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Response Time</span>
              <span class="metric-value">${agent.performance.averageResponseTime}s</span>
            </div>
            <div class="metric">
              <span class="metric-label">Uptime</span>
              <span class="metric-value">${agent.performance.uptime}%</span>
            </div>
          </div>

          <div class="capabilities">
            <strong>Capabilities:</strong>
            <div class="capability-tags">
              ${agent.capabilities.map(cap => `<span class="capability-tag">${cap}</span>`).join('')}
            </div>
          </div>

          <div class="recent-activity">
            <strong>Recent Activity:</strong>
            <ul>
              ${agent.recentActivity.map(activity => `<li>${activity}</li>`).join('')}
            </ul>
          </div>

          <div class="agent-actions">
            <button class="btn btn-sm btn-primary" onclick="agentsManager.restartAgent('${agent.id}')">
              Restart
            </button>
            <button class="btn btn-sm btn-secondary" onclick="agentsManager.viewAgentLogs('${agent.id}')">
              View Logs
            </button>
          </div>
        </div>
      </div>
    `
  }

  private getStatusIcon(status: Agent['status']): string {
    const icons = {
      active: '🟢',
      processing: '🟡',
      idle: '⚪',
      error: '🔴'
    }
    return icons[status] || '❓'
  }

  private setupAgentEventListeners(): void {
    // Add event listeners for agent cards
    document.querySelectorAll('.agent-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const agentId = (e.currentTarget as HTMLElement).dataset.agentId
        if (agentId) {
          this.selectAgent(agentId)
        }
      })
    })
  }

  // Public methods for external use
  async refreshAgents(): Promise<void> {
    await this.loadAgentsData()
    this.renderAgentsPage()
  }

  async restartAgent(agentId: string): Promise<void> {
    try {
      // Implementation for restarting a specific agent
      console.log(`Restarting agent: ${agentId}`)
      // Add API call to restart agent
    } catch (error) {
      console.error(`Failed to restart agent ${agentId}:`, error)
    }
  }

  async restartAllAgents(): Promise<void> {
    try {
      // Implementation for restarting all agents
      console.log('Restarting all agents')
      // Add API call to restart all agents
    } catch (error) {
      console.error('Failed to restart all agents:', error)
    }
  }

  viewAgentLogs(agentId: string): void {
    // Implementation for viewing agent logs
    console.log(`Viewing logs for agent: ${agentId}`)
  }

  selectAgent(agentId: string): void {
    // Implementation for selecting an agent
    console.log(`Selected agent: ${agentId}`)
  }

  getAgents(): Agent[] {
    return [...this.agents]
  }

  getAgentStatus(): AgentStatus {
    return { ...this.agentStatus }
  }

  destroy(): void {
    this.stopPeriodicUpdates()
    websocketManager.unsubscribe('agents')
    this.isInitialized = false
  }
}

// Export singleton instance
export const agentsManager = new AgentsManager()
