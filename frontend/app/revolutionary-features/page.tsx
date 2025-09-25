import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RevolutionaryFeaturesHeader } from '@/components/revolutionary-features/revolutionary-features-header'
import { Phase1Features } from '@/components/revolutionary-features/phase1-features'
import { Phase2Features } from '@/components/revolutionary-features/phase2-features'
import { Phase3Features } from '@/components/revolutionary-features/phase3-features'
import { Phase4Features } from '@/components/revolutionary-features/phase4-features'
import { FeatureTesting } from '@/components/revolutionary-features/feature-testing'
import { PatentStatus } from '@/components/revolutionary-features/patent-status'

export const metadata: Metadata = {
  title: 'Revolutionary Features - Strategic AI Platform',
  description: 'Patent-worthy revolutionary AI features including ARPE, QESO, ABME, and SNSE with advanced testing and monitoring capabilities.',
}

export default function RevolutionaryFeaturesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Revolutionary Features Header */}
        <RevolutionaryFeaturesHeader />

        {/* Feature Testing Panel */}
        <FeatureTesting />

        {/* Phase 1 Features */}
        <Phase1Features />

        {/* Phase 2 Features */}
        <Phase2Features />

        {/* Phase 3 Features */}
        <Phase3Features />

        {/* Phase 4 Features */}
        <Phase4Features />

        {/* Patent Status */}
        <PatentStatus />
      </div>
    </DashboardLayout>
  )
}
