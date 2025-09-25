import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { IntelligenceHeader } from '@/components/intelligence/intelligence-header'
import { IntelligenceFilters } from '@/components/intelligence/intelligence-filters'
import { IntelligenceGrid } from '@/components/intelligence/intelligence-grid'
import { IntelligenceAnalytics } from '@/components/intelligence/intelligence-analytics'
import { ThreatMonitoring } from '@/components/intelligence/threat-monitoring'

export const metadata: Metadata = {
  title: 'Intelligence - Strategic AI Platform',
  description: 'Comprehensive competitive intelligence dashboard with real-time monitoring, threat detection, and strategic insights.',
}

export default function IntelligencePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Intelligence Header */}
        <IntelligenceHeader />

        {/* Intelligence Filters */}
        <IntelligenceFilters />

        {/* Main Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Intelligence Feed - Takes 2 columns */}
          <div className="lg:col-span-2">
            <IntelligenceGrid />
          </div>
          
          {/* Intelligence Analytics - Takes 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <IntelligenceAnalytics />
            <ThreatMonitoring />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
