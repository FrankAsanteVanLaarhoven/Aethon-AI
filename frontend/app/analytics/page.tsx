import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AnalyticsHeader } from '@/components/analytics/analytics-header'
import { PerformanceMetrics } from '@/components/analytics/performance-metrics'
import { MarketAnalysis } from '@/components/analytics/market-analysis'
import { CompetitiveIntelligence } from '@/components/analytics/competitive-intelligence'
import { StrategicInsights } from '@/components/analytics/strategic-insights'
import { PredictiveAnalytics } from '@/components/analytics/predictive-analytics'

export const metadata: Metadata = {
  title: 'Analytics - Strategic AI Platform',
  description: 'Comprehensive analytics dashboard with performance metrics, market analysis, competitive intelligence, and predictive insights.',
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Analytics Header */}
        <AnalyticsHeader />

        {/* Performance Metrics */}
        <PerformanceMetrics />

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Analysis */}
          <MarketAnalysis />
          
          {/* Competitive Intelligence */}
          <CompetitiveIntelligence />
        </div>

        {/* Strategic Insights */}
        <StrategicInsights />

        {/* Predictive Analytics */}
        <PredictiveAnalytics />
      </div>
    </DashboardLayout>
  )
}
