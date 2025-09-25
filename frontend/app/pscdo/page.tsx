import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PSCDOHeader } from '@/components/pscdo/pscdo-header'
import { DisruptionPrediction } from '@/components/pscdo/disruption-prediction'
import { SupplyChainMonitoring } from '@/components/pscdo/supply-chain-monitoring'
import { RiskAssessment } from '@/components/pscdo/risk-assessment'
import { EarlyWarningSystem } from '@/components/pscdo/early-warning-system'
import { MitigationStrategies } from '@/components/pscdo/mitigation-strategies'

export const metadata: Metadata = {
  title: 'PSCDO - Predictive Supply Chain Disruption Oracle',
  description: 'AI system for supply chain disruption prediction with 3-12 month early warning capabilities and mitigation strategies.',
}

export default function PSCDOPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* PSCDO Header */}
        <PSCDOHeader />

        {/* Disruption Prediction Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Disruption Prediction - Takes 2 columns */}
          <div className="lg:col-span-2">
            <DisruptionPrediction />
          </div>
          
          {/* Risk Assessment - Takes 1 column */}
          <div className="lg:col-span-1">
            <RiskAssessment />
          </div>
        </div>

        {/* Supply Chain Monitoring */}
        <SupplyChainMonitoring />

        {/* Early Warning System & Mitigation Strategies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EarlyWarningSystem />
          <MitigationStrategies />
        </div>
      </div>
    </DashboardLayout>
  )
}
