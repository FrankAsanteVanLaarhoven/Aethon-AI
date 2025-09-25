import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { GeopoliticalHeader } from '@/components/geopolitical/geopolitical-header'
import { GeopoliticalPredictions } from '@/components/geopolitical/geopolitical-predictions'
import { EconomicWarfareDetection } from '@/components/geopolitical/economic-warfare-detection'
import { GlobalThreatAssessment } from '@/components/geopolitical/global-threat-assessment'
import { PolicyImpactAnalysis } from '@/components/geopolitical/policy-impact-analysis'
import { CrisisPrediction } from '@/components/geopolitical/crisis-prediction'

export const metadata: Metadata = {
  title: 'Geopolitical Prophecy & Economic Warfare Detection',
  description: 'Advanced AI system for 12+ month geopolitical intelligence and economic warfare detection with predictive crisis management.',
}

export default function GeopoliticalProphecyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Geopolitical Header */}
        <GeopoliticalHeader />

        {/* Geopolitical Predictions Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Geopolitical Predictions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <GeopoliticalPredictions />
          </div>
          
          {/* Global Threat Assessment - Takes 1 column */}
          <div className="lg:col-span-1">
            <GlobalThreatAssessment />
          </div>
        </div>

        {/* Economic Warfare Detection */}
        <EconomicWarfareDetection />

        {/* Policy Impact Analysis & Crisis Prediction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PolicyImpactAnalysis />
          <CrisisPrediction />
        </div>
      </div>
    </DashboardLayout>
  )
}
