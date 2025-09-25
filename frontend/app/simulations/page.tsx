import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SimulationsHeader } from '@/components/simulations/simulations-header'
import { SimulationControls } from '@/components/simulations/simulation-controls'
import { ScenarioBuilder } from '@/components/simulations/scenario-builder'
import { SimulationResults } from '@/components/simulations/simulation-results'
import { MonteCarloVisualization } from '@/components/simulations/monte-carlo-visualization'

export const metadata: Metadata = {
  title: 'Simulations - Strategic AI Platform',
  description: 'Advanced strategic simulation engine with Monte Carlo analysis, scenario planning, and game theory optimization.',
}

export default function SimulationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Simulations Header */}
        <SimulationsHeader />

        {/* Simulation Controls */}
        <SimulationControls />

        {/* Main Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scenario Builder */}
          <ScenarioBuilder />
          
          {/* Simulation Results */}
          <SimulationResults />
        </div>

        {/* Monte Carlo Visualization */}
        <MonteCarloVisualization />
      </div>
    </DashboardLayout>
  )
}
