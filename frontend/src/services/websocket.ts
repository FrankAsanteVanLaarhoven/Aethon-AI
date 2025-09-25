// Strategic AI Platform - WebSocket Service
import { CONFIG } from '../config'

export interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
  source?: string
}

export interface WebSocketSubscriber {
  id: string
  callback: (message: WebSocketMessage) => void
  filters?: string[]
}

export interface ConnectionStatus {
  status: 'connecting' | 'connected' | 'disconnected' | 'error'
  timestamp: string
  attempts?: number
}

export class WebSocketManager {
  private ws: WebSocket | null = null
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number
  private reconnectInterval: number
  private isConnecting: boolean = false
  private subscribers: Map<string, WebSocketSubscriber> = new Map()
  private heartbeatInterval: NodeJS.Timeout | null = null
  private heartbeatTimeout: NodeJS.Timeout | null = null
  private connectionStatus: ConnectionStatus = {
    status: 'disconnected',
    timestamp: new Date().toISOString()
  }

  constructor() {
    this.maxReconnectAttempts = CONFIG.WEBSOCKET_MAX_RECONNECT_ATTEMPTS
    this.reconnectInterval = CONFIG.WEBSOCKET_RECONNECT_INTERVAL
  }

  connect(): Promise<void> {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return Promise.resolve()
    }

    this.isConnecting = true
    this.updateConnectionStatus('connecting')

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(CONFIG.WEBSOCKET_URL)

        this.ws.onopen = () => {
          console.log('WebSocket connected')
          this.isConnecting = false
          this.reconnectAttempts = 0
          this.startHeartbeat()
          this.updateConnectionStatus('connected')
          this.notifySubscribers('connection', { status: 'connected' })
          resolve()
        }

        this.ws.onmessage = (event: MessageEvent) => {
          try {
            const data: WebSocketMessage = JSON.parse(event.data)
            this.handleMessage(data)
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }

        this.ws.onclose = (event: CloseEvent) => {
          console.log('WebSocket disconnected:', event.code, event.reason)
          this.isConnecting = false
          this.stopHeartbeat()
          this.updateConnectionStatus('disconnected')
          this.notifySubscribers('connection', { status: 'disconnected' })
          
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect()
          } else {
            this.updateConnectionStatus('error')
            this.notifySubscribers('connection', { status: 'error' })
          }
        }

        this.ws.onerror = (error: Event) => {
          console.error('WebSocket error:', error)
          this.isConnecting = false
          this.updateConnectionStatus('error')
          this.notifySubscribers('connection', { status: 'error' })
          reject(error)
        }

        // Connection timeout
        setTimeout(() => {
          if (this.isConnecting) {
            this.isConnecting = false
            this.updateConnectionStatus('error')
            reject(new Error('WebSocket connection timeout'))
          }
        }, 10000)

      } catch (error) {
        this.isConnecting = false
        this.updateConnectionStatus('error')
        reject(error)
      }
    })
  }

  disconnect(): void {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.updateConnectionStatus('disconnected')
  }

  send(message: WebSocketMessage): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({
          ...message,
          timestamp: new Date().toISOString()
        }))
        return true
      } catch (error) {
        console.error('Failed to send WebSocket message:', error)
        return false
      }
    }
    return false
  }

  subscribe(id: string, callback: (message: WebSocketMessage) => void, filters?: string[]): void {
    this.subscribers.set(id, { id, callback, filters })
  }

  unsubscribe(id: string): void {
    this.subscribers.delete(id)
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  private updateConnectionStatus(status: ConnectionStatus['status']): void {
    this.connectionStatus = {
      status,
      timestamp: new Date().toISOString(),
      attempts: this.reconnectAttempts
    }
  }

  private scheduleReconnect(): void {
    this.reconnectAttempts++
    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)
    
    setTimeout(() => {
      if (this.reconnectAttempts <= this.maxReconnectAttempts) {
        this.connect().catch(error => {
          console.error('Reconnection failed:', error)
        })
      }
    }, this.reconnectInterval)
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({
          type: 'ping',
          data: { timestamp: Date.now() },
          timestamp: new Date().toISOString()
        })

        // Set timeout for pong response
        this.heartbeatTimeout = setTimeout(() => {
          console.warn('WebSocket heartbeat timeout')
          this.disconnect()
          this.scheduleReconnect()
        }, 5000)
      }
    }, 30000) // Send ping every 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout)
      this.heartbeatTimeout = null
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    // Handle pong response
    if (message.type === 'pong') {
      if (this.heartbeatTimeout) {
        clearTimeout(this.heartbeatTimeout)
        this.heartbeatTimeout = null
      }
      return
    }

    // Notify subscribers
    this.notifySubscribers(message.type, message.data)

    // Handle specific message types
    switch (message.type) {
      case 'market_data':
        this.handleMarketData(message.data)
        break
      case 'intelligence_update':
        this.handleIntelligenceUpdate(message.data)
        break
      case 'agent_status':
        this.handleAgentStatus(message.data)
        break
      case 'simulation_result':
        this.handleSimulationResult(message.data)
        break
      case 'threat_alert':
        this.handleThreatAlert(message.data)
        break
      case 'performance_metrics':
        this.handlePerformanceMetrics(message.data)
        break
      default:
        console.log('Unknown message type:', message.type)
    }
  }

  private notifySubscribers(type: string, data: any): void {
    this.subscribers.forEach((subscriber) => {
      if (!subscriber.filters || subscriber.filters.includes(type)) {
        try {
          subscriber.callback({
            type,
            data,
            timestamp: new Date().toISOString()
          })
        } catch (error) {
          console.error(`Error in subscriber ${subscriber.id}:`, error)
        }
      }
    })
  }

  private handleMarketData(data: any): void {
    console.log('Market data update:', data)
  }

  private handleIntelligenceUpdate(data: any): void {
    console.log('Intelligence update:', data)
  }

  private handleAgentStatus(data: any): void {
    console.log('Agent status update:', data)
  }

  private handleSimulationResult(data: any): void {
    console.log('Simulation result:', data)
  }

  private handleThreatAlert(data: any): void {
    console.log('Threat alert:', data)
  }

  private handlePerformanceMetrics(data: any): void {
    console.log('Performance metrics:', data)
  }
}

// Export singleton instance
export const websocketManager = new WebSocketManager()
