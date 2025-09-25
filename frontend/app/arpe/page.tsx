import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ARPEHeader } from '@/components/arpe/arpe-header'
import { RegulatoryPredictions } from '@/components/arpe/regulatory-predictions'
import { PoliticalSentimentAnalysis } from '@/components/arpe/political-sentiment-analysis'
import { LobbyingFlowAnalysis } from '@/components/arpe/lobbying-flow-analysis'
import { JurisdictionCoverage } from '@/components/arpe/jurisdiction-coverage'
import { ImpactAssessment } from '@/components/arpe/impact-assessment'

export const metadata: Metadata = {
  title: 'ARPE - Autonomous Regulatory Prophecy Engine',
  description: 'World\'s first AI system that predicts regulatory changes 6-18 months before they occur with 85-95% accuracy.',
}

export default function ARPEPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* ARPE Header */}
        <ARPEHeader />

        {/* Main ARPE Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regulatory Predictions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RegulatoryPredictions />
          </div>
          
          {/* Political Sentiment Analysis - Takes 1 column */}
          <div className="lg:col-span-1">
            <PoliticalSentimentAnalysis />
          </div>
        </div>

        {/* Lobbying Flow Analysis */}
        <LobbyingFlowAnalysis />

        {/* Jurisdiction Coverage & Impact Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JurisdictionCoverage />
          <ImpactAssessment />
        </div>
      </div>
    </DashboardLayout>
  )
}
