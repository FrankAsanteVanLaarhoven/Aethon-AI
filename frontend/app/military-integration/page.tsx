import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { MilitaryHeader } from '@/components/military/military-header'
import { CommandControl } from '@/components/military/command-control'
import { NATOIntegration } from '@/components/military/nato-integration'
import { ThreatAssessment } from '@/components/military/threat-assessment'
import { OperationalReadiness } from '@/components/military/operational-readiness'
import { IntelligenceFusion } from '@/components/military/intelligence-fusion'

export const metadata: Metadata = {
  title: 'Military AI Command & Control Integration',
  description: 'Full NATO/Allied interoperability with military-grade AI command and control systems for defense operations.',
}

export default function MilitaryIntegrationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Military Header */}
        <MilitaryHeader />

        {/* Command & Control Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Command Control - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CommandControl />
          </div>
          
          {/* Threat Assessment - Takes 1 column */}
          <div className="lg:col-span-1">
            <ThreatAssessment />
          </div>
        </div>

        {/* NATO Integration */}
        <NATOIntegration />

        {/* Operational Readiness & Intelligence Fusion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OperationalReadiness />
          <IntelligenceFusion />
        </div>
      </div>
    </DashboardLayout>
  )
}
