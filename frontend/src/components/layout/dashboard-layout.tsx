'use client'

import { ReactNode, useState } from 'react'
import { Sidebar } from './sidebar'
import { TopNavigation } from './top-navigation'
import { StatusBar } from './status-bar'
import { useSidebar } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Fallback state in case context is not available
  const [fallbackCollapsed] = useState(false)
  
  let isCollapsed = fallbackCollapsed
  
  try {
    const sidebarContext = useSidebar()
    isCollapsed = sidebarContext.isCollapsed
  } catch (error) {
    console.warn('Sidebar context not available in DashboardLayout, using fallback state')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <TopNavigation />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-0 lg:ml-16" : "ml-0 lg:ml-64"
        )}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  )
}
