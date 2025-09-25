'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardProtectionProps {
  children: React.ReactNode
}

export function DashboardProtection({ children }: DashboardProtectionProps) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user has seen the landing page
    const hasSeenLanding = localStorage.getItem('hasSeenLanding')
    
    if (hasSeenLanding === 'true') {
      setHasAccess(true)
    }
    
    setIsLoading(false)
  }, [])

  const handleGoToLanding = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg border border-emerald-400/20 mx-auto mb-6">
              <Shield className="h-8 w-8" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Access Restricted
            </h1>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              To access the Strategic AI Dashboard, you must first visit our landing page to understand our platform and services.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleGoToLanding}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Visit Landing Page
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-800/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <p className="text-xs text-slate-400">
                This ensures you have the proper context before accessing our advanced intelligence platform.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
