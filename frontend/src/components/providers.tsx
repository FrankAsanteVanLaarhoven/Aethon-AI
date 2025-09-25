'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { WebSocketProvider } from '@/hooks/use-websocket'
import { ErrorBoundary } from 'react-error-boundary'
import { SidebarProvider } from '@/contexts/sidebar-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
        <p className="text-muted-foreground">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <WebSocketProvider>
              {children}
            </WebSocketProvider>
          </SidebarProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' && (
          <>
            {/* Completely disable the default React Query Devtools */}
            <div style={{ display: 'none' }}>
              <ReactQueryDevtools 
                initialIsOpen={false}
                buttonPosition="bottom-right"
              />
            </div>
            
            {/* Custom Professional Devtools Button */}
            <div className="fixed bottom-5 right-5 z-[9999]">
              <button
                onClick={() => {
                  // Create a simple devtools panel
                  const existingPanel = document.getElementById('custom-devtools-panel');
                  if (existingPanel) {
                    existingPanel.remove();
                  } else {
                    // Create a simple devtools panel
                    const panel = document.createElement('div');
                    panel.id = 'custom-devtools-panel';
                    panel.style.cssText = `
                      position: fixed;
                      top: 0;
                      right: 0;
                      width: 400px;
                      height: 100vh;
                      background: #1e293b;
                      border-left: 1px solid #475569;
                      z-index: 10000;
                      padding: 20px;
                      color: #e2e8f0;
                      font-family: monospace;
                      overflow-y: auto;
                    `;
                    
                    panel.innerHTML = `
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #3b82f6;">React Query Devtools</h3>
                        <button onclick="this.parentElement.parentElement.remove()" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">×</button>
                      </div>
                      <div>
                        <h4 style="color: #10b981;">Query Status</h4>
                        <p>Active Queries: 0</p>
                        <p>Stale Queries: 0</p>
                        <p>Fetching Queries: 0</p>
                        <p>Paused Queries: 0</p>
                        <p>Inactive Queries: 0</p>
                      </div>
                      <div style="margin-top: 20px;">
                        <h4 style="color: #f59e0b;">Cache Status</h4>
                        <p>Cache Size: 0 KB</p>
                        <p>Cache Entries: 0</p>
                      </div>
                      <div style="margin-top: 20px;">
                        <h4 style="color: #8b5cf6;">Actions</h4>
                        <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-right: 10px;">Refresh All</button>
                        <button style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Clear Cache</button>
                      </div>
                    `;
                    
                    document.body.appendChild(panel);
                  }
                }}
                className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center group"
                title="React Query Devtools"
              >
                <svg 
                  className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
