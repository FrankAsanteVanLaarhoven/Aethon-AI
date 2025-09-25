import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { CEISHeader } from '@/components/ceis/ceis-header'
import { NetworkIntelligence } from '@/components/ceis/network-intelligence'
import { CrossEnterpriseSynthesis } from '@/components/ceis/cross-enterprise-synthesis'
import { NetworkEffects } from '@/components/ceis/network-effects'
import { IntelligenceFusion } from '@/components/ceis/intelligence-fusion'
import { CollaborativeInsights } from '@/components/ceis/collaborative-insights'

export const metadata: Metadata = {
  title: 'CEIS - Cross-Enterprise Intelligence Synthesis',
  description: 'Network effects intelligence with cross-enterprise synthesis for compound intelligence and collaborative insights.',
}

export default function CEISPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* CEIS Header */}
        <CEISHeader />

        {/* Network Intelligence Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Network Intelligence - Takes 2 columns */}
          <div className="lg:col-span-2">
            <NetworkIntelligence />
          </div>
          
          {/* Network Effects - Takes 1 column */}
          <div className="lg:col-span-1">
            <NetworkEffects />
          </div>
        </div>

        {/* Cross-Enterprise Synthesis */}
        <CrossEnterpriseSynthesis />

        {/* Intelligence Fusion & Collaborative Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IntelligenceFusion />
          <CollaborativeInsights />
        </div>
      </div>
    </DashboardLayout>
  )
}
