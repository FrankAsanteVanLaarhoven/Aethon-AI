import { Metadata } from 'next'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ComplianceHeader } from '@/components/compliance/compliance-header'
import { UniversalCompliance } from '@/components/compliance/universal-compliance'
import { JurisdictionCoverage } from '@/components/compliance/jurisdiction-coverage'
import { AutomatedReporting } from '@/components/compliance/automated-reporting'
import { RiskAssessment } from '@/components/compliance/risk-assessment'
import { ComplianceMonitoring } from '@/components/compliance/compliance-monitoring'

export const metadata: Metadata = {
  title: 'Universal Compliance Automation Network',
  description: 'All-jurisdiction compliance automation with 99.9% automated compliance management across global regulatory frameworks.',
}

export default function ComplianceAutomationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Compliance Header */}
        <ComplianceHeader />

        {/* Universal Compliance Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Universal Compliance - Takes 2 columns */}
          <div className="lg:col-span-2">
            <UniversalCompliance />
          </div>
          
          {/* Risk Assessment - Takes 1 column */}
          <div className="lg:col-span-1">
            <RiskAssessment />
          </div>
        </div>

        {/* Jurisdiction Coverage */}
        <JurisdictionCoverage />

        {/* Automated Reporting & Compliance Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AutomatedReporting />
          <ComplianceMonitoring />
        </div>
      </div>
    </DashboardLayout>
  )
}
