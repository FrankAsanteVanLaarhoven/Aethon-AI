import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SCIHeader } from '@/components/sci/sci-header'
import { AIvsAISimulation } from '@/components/sci/ai-vs-ai-simulation'
import { CompetitiveIntelligence } from '@/components/sci/competitive-intelligence'
import { StrategicScenarios } from '@/components/sci/strategic-scenarios'
import { MarketDynamics } from '@/components/sci/market-dynamics'
import { SimulationResults } from '@/components/sci/simulation-results'

export const metadata: Metadata = {
  title: 'SCI - Synthetic Competition Intelligence',
  description: 'Revolutionary AI vs AI strategic simulation system for predicting competitive responses and market dynamics.',
}

export default function SCIPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* SCI Header */}
        <SCIHeader />

        {/* AI vs AI Simulation Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI vs AI Simulation - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AIvsAISimulation />
          </div>
          
          {/* Competitive Intelligence - Takes 1 column */}
          <div className="lg:col-span-1">
            <CompetitiveIntelligence />
          </div>
        </div>

        {/* Strategic Scenarios */}
        <StrategicScenarios />

        {/* Market Dynamics & Simulation Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketDynamics />
          <SimulationResults />
        </div>
      </div>
    </DashboardLayout>
  )
}
