import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { CorporateHeader } from '@/components/corporate/corporate-header'
import { TransformationEngine } from '@/components/corporate/transformation-engine'
import { McKinseySurpassing } from '@/components/corporate/mckinsey-surpassing'
import { ChangeManagement } from '@/components/corporate/change-management'
import { PerformanceOptimization } from '@/components/corporate/performance-optimization'
import { StrategicAlignment } from '@/components/corporate/strategic-alignment'

export const metadata: Metadata = {
  title: 'Corporate Transformation Acceleration Engine',
  description: 'McKinsey-surpassing capabilities for corporate transformation with accelerated change management and strategic alignment.',
}

export default function CorporateTransformationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Corporate Header */}
        <CorporateHeader />

        {/* Transformation Engine Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transformation Engine - Takes 2 columns */}
          <div className="lg:col-span-2">
            <TransformationEngine />
          </div>
          
          {/* Performance Optimization - Takes 1 column */}
          <div className="lg:col-span-1">
            <PerformanceOptimization />
          </div>
        </div>

        {/* McKinsey Surpassing */}
        <McKinseySurpassing />

        {/* Change Management & Strategic Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChangeManagement />
          <StrategicAlignment />
        </div>
      </div>
    </DashboardLayout>
  )
}
