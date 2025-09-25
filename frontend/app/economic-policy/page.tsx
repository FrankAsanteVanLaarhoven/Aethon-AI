import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { EconomicHeader } from '@/components/economic/economic-header'
import { PolicyEngine } from '@/components/economic/policy-engine'
import { RealTimeGeneration } from '@/components/economic/real-time-generation'
import { EconomicModeling } from '@/components/economic/economic-modeling'
import { ImpactAnalysis } from '@/components/economic/impact-analysis'
import { PolicyOptimization } from '@/components/economic/policy-optimization'

export const metadata: Metadata = {
  title: 'Autonomous Economic Policy Engine',
  description: 'Real-time economic policy generation and optimization with autonomous decision-making for economic stability and growth.',
}

export default function EconomicPolicyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Economic Header */}
        <EconomicHeader />

        {/* Policy Engine Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Policy Engine - Takes 2 columns */}
          <div className="lg:col-span-2">
            <PolicyEngine />
          </div>
          
          {/* Impact Analysis - Takes 1 column */}
          <div className="lg:col-span-1">
            <ImpactAnalysis />
          </div>
        </div>

        {/* Real-Time Generation */}
        <RealTimeGeneration />

        {/* Economic Modeling & Policy Optimization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EconomicModeling />
          <PolicyOptimization />
        </div>
      </div>
    </DashboardLayout>
  )
}
