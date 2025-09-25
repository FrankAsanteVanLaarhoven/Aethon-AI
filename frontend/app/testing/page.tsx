'use client'

import React, { useState, useEffect } from 'react'
import { WebRTCTestSuite } from '@/components/testing/WebRTCTestSuite'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TestTube, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Zap,
  Globe,
  Database
} from 'lucide-react'

export default function TestingPage() {
  const [pwaInstallable, setPwaInstallable] = useState(false)
  const [pwaInstalled, setPwaInstalled] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<any>(null)
  const [testResults, setTestResults] = useState<any[]>([])

  useEffect(() => {
    // Check PWA installability
    const checkPWAInstallability = () => {
      const isInstallable = window.matchMedia('(display-mode: standalone)').matches ||
                           (window.navigator as any).standalone === true
      setPwaInstalled(isInstallable)
      
      // Check if PWA can be installed
      if ('serviceWorker' in navigator) {
        setPwaInstallable(true)
      }
    }

    // Get device information
    const getDeviceInfo = () => {
      const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        connection: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt
        } : null,
        screen: {
          width: screen.width,
          height: screen.height,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        touchSupport: 'ontouchstart' in window,
        webRTCSupport: !!(window.RTCPeerConnection || window.webkitRTCPeerConnection),
        mediaDevicesSupport: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        webSocketSupport: !!window.WebSocket,
        serviceWorkerSupport: 'serviceWorker' in navigator,
        pushNotificationSupport: 'Notification' in window,
        geolocationSupport: 'geolocation' in navigator
      }
      setDeviceInfo(info)
    }

    checkPWAInstallability()
    getDeviceInfo()

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setPwaInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const runComprehensiveTests = async () => {
    const tests = [
      {
        name: 'PWA Manifest',
        test: () => fetch('/manifest.json').then(r => r.ok),
        category: 'PWA'
      },
      {
        name: 'Service Worker',
        test: () => navigator.serviceWorker.getRegistration().then(r => !!r),
        category: 'PWA'
      },
      {
        name: 'HTTPS Enforcement',
        test: () => Promise.resolve(location.protocol === 'https:' || location.hostname === 'localhost'),
        category: 'Security'
      },
      {
        name: 'API Health',
        test: () => fetch('/api/health').then(r => r.ok),
        category: 'API'
      },
      {
        name: 'WebSocket Connection',
        test: () => new Promise((resolve) => {
          const ws = new WebSocket('ws://localhost:8000/ws/test')
          ws.onopen = () => {
            ws.close()
            resolve(true)
          }
          ws.onerror = () => resolve(false)
          setTimeout(() => resolve(false), 5000)
        }),
        category: 'WebRTC'
      }
    ]

    const results = []
    for (const test of tests) {
      try {
        const start = performance.now()
        const result = await test.test()
        const duration = performance.now() - start
        
        results.push({
          name: test.name,
          category: test.category,
          status: result ? 'pass' : 'fail',
          duration: Math.round(duration),
          message: result ? 'Test passed' : 'Test failed'
        })
      } catch (error) {
        results.push({
          name: test.name,
          category: test.category,
          status: 'fail',
          duration: 0,
          message: `Error: ${error}`
        })
      }
    }
    
    setTestResults(results)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'text-green-400'
      case 'fail':
        return 'text-red-400'
      default:
        return 'text-yellow-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Comprehensive Testing Suite
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Validate WebRTC functionality, PWA capabilities, and cross-platform compatibility 
            across multiple browsers and devices.
          </p>
        </div>

        {/* Device Information */}
        {deviceInfo && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-400" />
                Device & Browser Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Device Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Platform:</span>
                      <span className="text-white">{deviceInfo.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Language:</span>
                      <span className="text-white">{deviceInfo.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Online:</span>
                      <Badge variant={deviceInfo.onLine ? "default" : "destructive"}>
                        {deviceInfo.onLine ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Touch Support:</span>
                      <Badge variant={deviceInfo.touchSupport ? "default" : "outline"}>
                        {deviceInfo.touchSupport ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Screen Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Resolution:</span>
                      <span className="text-white">{deviceInfo.screen.width}x{deviceInfo.screen.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Viewport:</span>
                      <span className="text-white">{deviceInfo.viewport.width}x{deviceInfo.viewport.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Color Depth:</span>
                      <span className="text-white">{deviceInfo.screen.colorDepth} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Pixel Ratio:</span>
                      <span className="text-white">{window.devicePixelRatio}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Network Information</h4>
                  <div className="space-y-2 text-sm">
                    {deviceInfo.connection ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Connection:</span>
                          <span className="text-white">{deviceInfo.connection.effectiveType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Downlink:</span>
                          <span className="text-white">{deviceInfo.connection.downlink} Mbps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">RTT:</span>
                          <span className="text-white">{deviceInfo.connection.rtt} ms</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-slate-300">Network information not available</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* PWA Testing */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-400" />
              Progressive Web App (PWA) Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">PWA Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {pwaInstalled ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="text-white font-medium">Installation Status</div>
                        <div className="text-sm text-slate-300">
                          {pwaInstalled ? 'PWA is installed' : 'PWA is not installed'}
                        </div>
                      </div>
                    </div>
                    <Badge variant={pwaInstalled ? "default" : "outline"}>
                      {pwaInstalled ? "Installed" : "Not Installed"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {pwaInstallable ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="text-white font-medium">Installability</div>
                        <div className="text-sm text-slate-300">
                          {pwaInstallable ? 'PWA can be installed' : 'PWA cannot be installed'}
                        </div>
                      </div>
                    </div>
                    <Badge variant={pwaInstallable ? "default" : "outline"}>
                      {pwaInstallable ? "Installable" : "Not Installable"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Feature Support</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Service Worker:</span>
                    <Badge variant={deviceInfo?.serviceWorkerSupport ? "default" : "destructive"}>
                      {deviceInfo?.serviceWorkerSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Push Notifications:</span>
                    <Badge variant={deviceInfo?.pushNotificationSupport ? "default" : "destructive"}>
                      {deviceInfo?.pushNotificationSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Geolocation:</span>
                    <Badge variant={deviceInfo?.geolocationSupport ? "default" : "destructive"}>
                      {deviceInfo?.geolocationSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">WebRTC:</span>
                    <Badge variant={deviceInfo?.webRTCSupport ? "default" : "destructive"}>
                      {deviceInfo?.webRTCSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comprehensive Test Suite */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TestTube className="h-5 w-5 text-purple-400" />
              Comprehensive Test Suite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button
                onClick={runComprehensiveTests}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                Run All Tests
              </Button>
            </div>

            {testResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-white font-medium">Test Results</h4>
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <div className="text-white font-medium">{result.name}</div>
                        <div className="text-sm text-slate-300">
                          {result.category} • {result.duration}ms
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {result.category}
                      </Badge>
                      <Badge variant={result.status === 'pass' ? 'default' : 'destructive'}>
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* WebRTC Test Suite */}
        <WebRTCTestSuite />

        {/* Browser Compatibility Matrix */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="h-5 w-5 text-cyan-400" />
              Browser Compatibility Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-300 py-2">Browser</th>
                    <th className="text-center text-slate-300 py-2">WebRTC</th>
                    <th className="text-center text-slate-300 py-2">PWA</th>
                    <th className="text-center text-slate-300 py-2">Screen Share</th>
                    <th className="text-center text-slate-300 py-2">Push Notifications</th>
                    <th className="text-center text-slate-300 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="text-white py-2">Chrome 90+</td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <Badge variant="default" className="text-xs">Fully Supported</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="text-white py-2">Firefox 88+</td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <Badge variant="default" className="text-xs">Fully Supported</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="text-white py-2">Safari 14+</td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <Badge variant="outline" className="text-xs">Mostly Supported</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-white py-2">Edge 90+</td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <Badge variant="default" className="text-xs">Fully Supported</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
