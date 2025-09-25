import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SNSEHeader } from '@/components/snse/snse-header'
import { ThreatDetection } from '@/components/snse/threat-detection'
import { DataSovereignty } from '@/components/snse/data-sovereignty'
import { SecurityClassification } from '@/components/snse/security-classification'
import { MilitaryIntegration } from '@/components/snse/military-integration'
import { QuantumEncryption } from '@/components/snse/quantum-encryption'

export const metadata: Metadata = {
  title: 'SNSE - Sovereign National Security Engine',
  description: 'World\'s first AI system providing complete national security infrastructure with sovereign data control and military-grade encryption.',
}

export default function SNSEPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* SNSE Header */}
        <SNSEHeader />

        {/* Threat Detection Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Detection - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ThreatDetection />
          </div>
          
          {/* Security Classification - Takes 1 column */}
          <div className="lg:col-span-1">
            <SecurityClassification />
          </div>
        </div>

        {/* Data Sovereignty */}
        <DataSovereignty />

        {/* Military Integration & Quantum Encryption */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MilitaryIntegration />
          <QuantumEncryption />
        </div>
      </div>
    </DashboardLayout>
  )
}
