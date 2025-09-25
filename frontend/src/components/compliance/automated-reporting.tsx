'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Clock, CheckCircle, AlertTriangle, Zap, Calendar, BarChart3, Shield } from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'compliance' | 'audit' | 'regulatory' | 'summary'
  status: 'generated' | 'generating' | 'scheduled' | 'failed'
  size: string
  format: 'PDF' | 'Excel' | 'CSV' | 'JSON'
  generatedAt: string
  nextGeneration: string
  jurisdiction: string
}

interface ReportSchedule {
  id: string
  name: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  nextRun: string
  status: 'active' | 'paused' | 'error'
  lastRun: string
  successRate: number
}

export function AutomatedReporting() {
  const [reports, setReports] = useState<Report[]>([])
  const [schedules, setSchedules] = useState<ReportSchedule[]>([])
  const [totalReports, setTotalReports] = useState(0)

  useEffect(() => {
    const initialReports: Report[] = [
      {
        id: 'report-001',
        name: 'Monthly Compliance Summary',
        type: 'compliance',
        status: 'generated',
        size: '2.4 MB',
        format: 'PDF',
        generatedAt: '2 hours ago',
        nextGeneration: '28 days',
        jurisdiction: 'Global'
      },
      {
        id: 'report-002',
        name: 'GDPR Compliance Report',
        type: 'regulatory',
        status: 'generated',
        size: '1.8 MB',
        format: 'Excel',
        generatedAt: '1 hour ago',
        nextGeneration: '7 days',
        jurisdiction: 'EU'
      },
      {
        id: 'report-003',
        name: 'SOX Financial Audit',
        type: 'audit',
        status: 'generating',
        size: '0 MB',
        format: 'PDF',
        generatedAt: 'In progress',
        nextGeneration: '30 days',
        jurisdiction: 'US'
      },
      {
        id: 'report-004',
        name: 'HIPAA Security Assessment',
        type: 'compliance',
        status: 'scheduled',
        size: '0 MB',
        format: 'PDF',
        generatedAt: 'Scheduled',
        nextGeneration: '3 days',
        jurisdiction: 'US'
      },
      {
        id: 'report-005',
        name: 'ISO 27001 Certification',
        type: 'regulatory',
        status: 'generated',
        size: '3.2 MB',
        format: 'PDF',
        generatedAt: '4 hours ago',
        nextGeneration: '90 days',
        jurisdiction: 'Global'
      }
    ]

    const initialSchedules: ReportSchedule[] = [
      {
        id: 'schedule-001',
        name: 'Daily Compliance Check',
        frequency: 'daily',
        nextRun: '2 hours',
        status: 'active',
        lastRun: '22 hours ago',
        successRate: 99.8
      },
      {
        id: 'schedule-002',
        name: 'Weekly Risk Assessment',
        frequency: 'weekly',
        nextRun: '5 days',
        status: 'active',
        lastRun: '2 days ago',
        successRate: 100
      },
      {
        id: 'schedule-003',
        name: 'Monthly Audit Report',
        frequency: 'monthly',
        nextRun: '15 days',
        status: 'active',
        lastRun: '15 days ago',
        successRate: 98.5
      },
      {
        id: 'schedule-004',
        name: 'Quarterly Review',
        frequency: 'quarterly',
        nextRun: '45 days',
        status: 'paused',
        lastRun: '75 days ago',
        successRate: 95.2
      }
    ]

    setReports(initialReports)
    setSchedules(initialSchedules)
    setTotalReports(initialReports.length)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setReports(prev => prev.map(report => {
        if (report.status === 'generating') {
          return {
            ...report,
            generatedAt: 'Just completed',
            status: 'generated',
            size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
          }
        }
        return report
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generated': return <CheckCircle className="h-4 w-4" />
      case 'generating': return <Clock className="h-4 w-4 animate-pulse" />
      case 'scheduled': return <Calendar className="h-4 w-4" />
      case 'failed': return <AlertTriangle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'text-neon-green'
      case 'generating': return 'text-neon-blue'
      case 'scheduled': return 'text-neon-yellow'
      case 'failed': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-neon-green/10'
      case 'generating': return 'bg-neon-blue/10'
      case 'scheduled': return 'bg-neon-yellow/10'
      case 'failed': return 'bg-neon-red/10'
      default: return 'bg-muted/10'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'compliance': return <Shield className="h-4 w-4" />
      case 'audit': return <BarChart3 className="h-4 w-4" />
      case 'regulatory': return <FileText className="h-4 w-4" />
      case 'summary': return <Zap className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-neon-green'
      case 'paused': return 'text-neon-yellow'
      case 'error': return 'text-neon-red'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Automated Reporting</h2>
            <p className="text-muted-foreground">Automated compliance report generation and scheduling</p>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-neon-blue" />
            <span className="text-sm font-medium text-neon-blue">
              {totalReports} Reports
            </span>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
          {reports.slice(0, 4).map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border border-border ${getStatusBg(report.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(report.type)}
                  <div>
                    <div className="font-medium text-sm">{report.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {report.jurisdiction} • {report.format} • {report.size}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getStatusColor(report.status)}`}>
                      {report.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {report.generatedAt}
                    </div>
                  </div>
                  {report.status === 'generated' && (
                    <button className="p-1 hover:bg-neon-blue/10 rounded transition-colors">
                      <Download className="h-4 w-4 text-neon-blue" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Report Schedules</h3>
        <div className="space-y-3">
          {schedules.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-neon-blue" />
                <div>
                  <div className="font-medium text-sm">{schedule.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {schedule.frequency} • Last run: {schedule.lastRun}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-bold text-neon-green">
                    {schedule.successRate}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next: {schedule.nextRun}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  schedule.status === 'active' ? 'bg-neon-green' :
                  schedule.status === 'paused' ? 'bg-neon-yellow' : 'bg-neon-red'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
