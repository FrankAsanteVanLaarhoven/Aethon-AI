import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AgentsHeader } from '@/components/agents/agents-header'
import { AgentsGrid } from '@/components/agents/agents-grid'
import { AgentPerformance } from '@/components/agents/agent-performance'
import { AgentControls } from '@/components/agents/agent-controls'
import { AgentLogs } from '@/components/agents/agent-logs'

export const metadata: Metadata = {
  title: 'Agents - Strategic AI Platform',
  description: 'Multi-agent orchestration dashboard with real-time monitoring, performance analytics, and autonomous execution controls.',
}

export default function AgentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Agents Header */}
        <AgentsHeader />

        {/* Agent Controls */}
        <AgentControls />

        {/* Main Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agents Grid - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AgentsGrid />
          </div>
          
          {/* Agent Performance & Logs - Takes 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <AgentPerformance />
            <AgentLogs />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
