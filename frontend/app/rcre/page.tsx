import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RCREHeader } from '@/components/rcre/rcre-header'
import { CompetitiveResponse } from '@/components/rcre/competitive-response'
import { MachineSpeedCountermeasures } from '@/components/rcre/machine-speed-countermeasures'
import { ThreatDetection } from '@/components/rcre/threat-detection'
import { ResponseOptimization } from '@/components/rcre/response-optimization'
import { PerformanceMetrics } from '@/components/rcre/performance-metrics'

export const metadata: Metadata = {
  title: 'RCRE - Real-Time Competitive Response Engine',
  description: 'Machine-speed countermeasures and real-time competitive response with automated threat detection and response optimization.',
}

export default function RCREPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* RCRE Header */}
        <RCREHeader />

        {/* Competitive Response Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competitive Response - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CompetitiveResponse />
          </div>
          
          {/* Threat Detection - Takes 1 column */}
          <div className="lg:col-span-1">
            <ThreatDetection />
          </div>
        </div>

        {/* Machine Speed Countermeasures */}
        <MachineSpeedCountermeasures />

        {/* Response Optimization & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponseOptimization />
          <PerformanceMetrics />
        </div>
      </div>
    </DashboardLayout>
  )
}
