'use client'

import { usePathname } from 'next/navigation'
import { TubelightNavigation } from './tubelight-navigation'

export function ConditionalTubelightNav() {
  const pathname = usePathname()
  
  // Only show tubelight navigation on the landing page (root path)
  if (pathname !== '/') {
    return null
  }
  
  // Don't render anything since the landing page now has inline navigation
  return null
}
