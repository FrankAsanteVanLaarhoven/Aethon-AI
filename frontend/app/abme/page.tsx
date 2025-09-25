import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ABMEHeader } from '@/components/abme/abme-header'
import { BusinessModelExecution } from '@/components/abme/business-model-execution'
import { ExecutionPipeline } from '@/components/abme/execution-pipeline'
import { PerformanceMonitoring } from '@/components/abme/performance-monitoring'
import { ResourceManagement } from '@/components/abme/resource-management'
import { SuccessMetrics } from '@/components/abme/success-metrics'

export const metadata: Metadata = {
  title: 'ABME - Autonomous Business Model Execution',
  description: 'Revolutionary AI system for 24/7 autonomous strategy execution with real-time adaptation and optimization.',
}

export default function ABMEPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* ABME Header */}
        <ABMEHeader />

        {/* Business Model Execution Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Business Model Execution - Takes 2 columns */}
          <div className="lg:col-span-2">
            <BusinessModelExecution />
          </div>
          
          {/* Performance Monitoring - Takes 1 column */}
          <div className="lg:col-span-1">
            <PerformanceMonitoring />
          </div>
        </div>

        {/* Execution Pipeline */}
        <ExecutionPipeline />

        {/* Resource Management & Success Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResourceManagement />
          <SuccessMetrics />
        </div>
      </div>
    </DashboardLayout>
  )
}
