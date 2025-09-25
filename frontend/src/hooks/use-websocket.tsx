'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { WebSocketMessage } from '@/types'

interface WebSocketContextType {
  isConnected: boolean
  sendMessage: (message: any) => void
  lastMessage: WebSocketMessage | null
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

interface WebSocketProviderProps {
  children: ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected')
  const ws = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  const connect = () => {
    if (ws.current?.readyState === WebSocket.OPEN || ws.current?.readyState === WebSocket.CONNECTING) {
      return
    }

    // Clean up existing connection
    if (ws.current) {
      ws.current?.close()
      ws.current = null
    }

    // Skip WebSocket connection for now since main backend isn't running
    // The Chess BI and QEMASI systems work fine without WebSockets
    setConnectionStatus('disconnected')
    setIsConnected(false)
  }

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
    }
    if (ws.current) {
      ws.current?.close()
      ws.current = null
    }
    setIsConnected(false)
    setConnectionStatus('disconnected')
  }

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current?.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected. Cannot send message:', message)
    }
  }

  useEffect(() => {
    connect()

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden && !isConnected && connectionStatus !== 'connecting') {
        console.log('Page became visible, attempting to reconnect WebSocket')
        reconnectAttempts.current = 0 // Reset attempts when page becomes visible
        connect()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isConnected, connectionStatus])

  const value: WebSocketContextType = {
    isConnected,
    sendMessage,
    lastMessage,
    connectionStatus,
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}
