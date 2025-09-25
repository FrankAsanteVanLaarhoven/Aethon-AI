import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { EducationalHeader } from '@/components/educational/educational-header'
import { PopulationScaleEducation } from '@/components/educational/population-scale-education'
import { AdaptiveLearning } from '@/components/educational/adaptive-learning'
import { GlobalIntelligenceNetwork } from '@/components/educational/global-intelligence-network'
import { CompetencyMapping } from '@/components/educational/competency-mapping'
import { PerformanceAnalytics } from '@/components/educational/performance-analytics'

export const metadata: Metadata = {
  title: 'Global Educational Intelligence Network',
  description: 'Population-scale adaptive education system with global intelligence network for comprehensive learning optimization.',
}

export default function EducationalNetworkPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Educational Header */}
        <EducationalHeader />

        {/* Population Scale Education Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Population Scale Education - Takes 2 columns */}
          <div className="lg:col-span-2">
            <PopulationScaleEducation />
          </div>
          
          {/* Competency Mapping - Takes 1 column */}
          <div className="lg:col-span-1">
            <CompetencyMapping />
          </div>
        </div>

        {/* Adaptive Learning */}
        <AdaptiveLearning />

        {/* Global Intelligence Network & Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlobalIntelligenceNetwork />
          <PerformanceAnalytics />
        </div>
      </div>
    </DashboardLayout>
  )
}
