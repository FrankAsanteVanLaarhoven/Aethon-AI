import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { QESOHeader } from '@/components/qeso/qeso-header'
import { QuantumOptimization } from '@/components/qeso/quantum-optimization'
import { StrategyComparison } from '@/components/qeso/strategy-comparison'
import { QuantumAdvantage } from '@/components/qeso/quantum-advantage'
import { ResourceAllocation } from '@/components/qeso/resource-allocation'
import { PerformanceMetrics } from '@/components/qeso/performance-metrics'

export const metadata: Metadata = {
  title: 'QESO - Quantum-Enhanced Strategic Optimization',
  description: 'Revolutionary quantum computing principles for business strategy optimization with 1000x faster performance.',
}

export default function QESOPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* QESO Header */}
        <QESOHeader />

        {/* Quantum Optimization Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quantum Optimization - Takes 2 columns */}
          <div className="lg:col-span-2">
            <QuantumOptimization />
          </div>
          
          {/* Quantum Advantage - Takes 1 column */}
          <div className="lg:col-span-1">
            <QuantumAdvantage />
          </div>
        </div>

        {/* Strategy Comparison */}
        <StrategyComparison />

        {/* Resource Allocation & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResourceAllocation />
          <PerformanceMetrics />
        </div>
      </div>
    </DashboardLayout>
  )
}
