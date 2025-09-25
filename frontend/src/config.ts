// Strategic AI Platform - Configuration
export interface Config {
  API_BASE_URL: string
  WEBSOCKET_URL: string
  WEBSOCKET_RECONNECT_INTERVAL: number
  WEBSOCKET_MAX_RECONNECT_ATTEMPTS: number
  CACHE_DURATION: number
  ANIMATION_DURATION: number
  POLLING_INTERVAL: number
  MAX_RETRIES: number
  RETRY_DELAY: number
}

export interface Endpoints {
  HEALTH: string
  INTELLIGENCE: string
  SIMULATIONS: string
  AGENTS: string
  QUANT_DATA: string
  STREAM_ANALYTICS: string
  REGULATORY_PROPHECY: string
  SOVEREIGN_SECURITY: string
  QESO: string
  ABME: string
}

export interface SecurityClearance {
  UNCLASSIFIED: string
  CONFIDENTIAL: string
  SECRET: string
  TOP_SECRET: string
  TOP_SECRET_SCI: string
}

export const CONFIG: Config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  WEBSOCKET_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws',
  WEBSOCKET_RECONNECT_INTERVAL: 5000,
  WEBSOCKET_MAX_RECONNECT_ATTEMPTS: 10,
  CACHE_DURATION: 300000, // 5 minutes
  ANIMATION_DURATION: 300,
  POLLING_INTERVAL: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
}

export const ENDPOINTS: Endpoints = {
  HEALTH: '/health',
  INTELLIGENCE: '/intel',
  SIMULATIONS: '/simulations',
  AGENTS: '/agents',
  QUANT_DATA: '/quant',
  STREAM_ANALYTICS: '/streams',
  REGULATORY_PROPHECY: '/regulatory-prophecy',
  SOVEREIGN_SECURITY: '/sovereign-security',
  QESO: '/qeso',
  ABME: '/abme'
}

export const SECURITY_CLEARANCE: SecurityClearance = {
  UNCLASSIFIED: 'UNCLASSIFIED',
  CONFIDENTIAL: 'CONFIDENTIAL',
  SECRET: 'SECRET',
  TOP_SECRET: 'TOP_SECRET',
  TOP_SECRET_SCI: 'TOP_SECRET_SCI'
}
