import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { DRADHeader } from '@/components/drad/drad-header'
import { RegulatoryArbitrage } from '@/components/drad/regulatory-arbitrage'
import { ProfitOpportunities } from '@/components/drad/profit-opportunities'
import { DynamicDiscovery } from '@/components/drad/dynamic-discovery'
import { RiskAssessment } from '@/components/drad/risk-assessment'
import { OptimizationEngine } from '@/components/drad/optimization-engine'

export const metadata: Metadata = {
  title: 'DRAD - Dynamic Regulatory Arbitrage Discovery',
  description: 'Automatic profit opportunities discovery through dynamic regulatory arbitrage with real-time optimization and risk assessment.',
}

export default function DRADPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* DRAD Header */}
        <DRADHeader />

        {/* Regulatory Arbitrage Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regulatory Arbitrage - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RegulatoryArbitrage />
          </div>
          
          {/* Risk Assessment - Takes 1 column */}
          <div className="lg:col-span-1">
            <RiskAssessment />
          </div>
        </div>

        {/* Profit Opportunities */}
        <ProfitOpportunities />

        {/* Dynamic Discovery & Optimization Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DynamicDiscovery />
          <OptimizationEngine />
        </div>
      </div>
    </DashboardLayout>
  )
}
