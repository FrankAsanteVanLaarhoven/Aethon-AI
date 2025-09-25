'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const contextValue = { isCollapsed, setIsCollapsed, toggleSidebar }

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    console.error('useSidebar must be used within a SidebarProvider')
    // Return a default context to prevent crashes during development
    return {
      isCollapsed: false,
      setIsCollapsed: () => {},
      toggleSidebar: () => {}
    }
  }
  return context
}
