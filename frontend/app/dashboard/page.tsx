import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AdvancedDashboard } from '@/components/visualization/advanced-dashboard'
import { StrategicChessboard } from '@/components/dashboard/strategic-chessboard'
import { MultiAgentOrchestration } from '@/components/dashboard/multi-agent-orchestration'
import { IntelligenceFeed } from '@/components/dashboard/intelligence-feed'
import { AnalyticsPanel } from '@/components/dashboard/analytics-panel'
import { DashboardProtection } from '@/components/dashboard-protection'
import { QuickAccessHub } from '@/components/quick-access/QuickAccessHub'

export const metadata: Metadata = {
  title: 'Dashboard - Strategic AI Platform',
  description: 'World-class Palantir-inspired dashboard with advanced analytics, multi-agent orchestration, and real-time intelligence monitoring.',
}

export default function DashboardPage() {
  return (
    <DashboardProtection>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Quick Access Hub */}
          <QuickAccessHub />
          
          {/* Advanced Analytics Dashboard */}
          <AdvancedDashboard />
          
          {/* Strategic Components Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Strategic Chessboard - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <StrategicChessboard />
            </div>
            
            {/* Multi-Agent Orchestration - Takes 1 column */}
            <div className="lg:col-span-1">
              <MultiAgentOrchestration />
            </div>
          </div>

          {/* Intelligence Feed */}
          <IntelligenceFeed />

          {/* Analytics Panel */}
          <AnalyticsPanel />
        </div>
      </DashboardLayout>
    </DashboardProtection>
  )
}
