import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ResourceHeader } from '@/components/resource/resource-header'
import { PlanetaryOptimization } from '@/components/resource/planetary-optimization'
import { GlobalAllocation } from '@/components/resource/global-allocation'
import { ResourceMonitoring } from '@/components/resource/resource-monitoring'
import { SustainabilityMetrics } from '@/components/resource/sustainability-metrics'
import { EfficiencyAnalysis } from '@/components/resource/efficiency-analysis'

export const metadata: Metadata = {
  title: 'Planetary Resource Optimization Network',
  description: 'Global resource allocation and optimization system for planetary-scale resource management and sustainability.',
}

export default function ResourceOptimizationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Resource Header */}
        <ResourceHeader />

        {/* Planetary Optimization Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Planetary Optimization - Takes 2 columns */}
          <div className="lg:col-span-2">
            <PlanetaryOptimization />
          </div>
          
          {/* Resource Monitoring - Takes 1 column */}
          <div className="lg:col-span-1">
            <ResourceMonitoring />
          </div>
        </div>

        {/* Global Allocation */}
        <GlobalAllocation />

        {/* Sustainability Metrics & Efficiency Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SustainabilityMetrics />
          <EfficiencyAnalysis />
        </div>
      </div>
    </DashboardLayout>
  )
}
