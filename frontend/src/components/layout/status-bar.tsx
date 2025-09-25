'use client'

import { useWebSocket } from '@/hooks/use-websocket'
import { Activity, Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function StatusBar() {
  const { isConnected, connectionStatus } = useWebSocket()

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-foreground" />
      case 'connecting':
        return <Activity className="h-3 w-3 text-muted-foreground animate-pulse" />
      case 'disconnected':
        return <WifiOff className="h-3 w-3 text-muted-foreground" />
      case 'error':
        return <AlertCircle className="h-3 w-3 text-destructive" />
      default:
        return <WifiOff className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected'
      case 'connecting':
        return 'Connecting...'
      case 'disconnected':
        return 'API Mode' // Show API mode instead of disconnected
      case 'error':
        return 'Connection Error'
      default:
        return 'API Mode'
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-foreground'
      case 'connecting':
        return 'text-muted-foreground'
      case 'disconnected':
        return 'text-muted-foreground'
      case 'error':
        return 'text-destructive'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
      <div className="container flex h-8 items-center justify-between px-4 text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className={cn("font-medium", getStatusColor())}>
              {getStatusText()}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>Chess BI & QEMASI Operational</span>
            <Badge variant="outline" className="text-xs">
              v2.0.0
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-muted-foreground">
          <span>Last updated: 2 minutes ago</span>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-foreground animate-pulse" />
            <span>Real-time</span>
          </div>
        </div>
      </div>
    </div>
  )
}
