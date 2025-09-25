'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Wifi, 
  WifiOff,
  Video,
  Mic,
  Monitor,
  Users,
  Activity,
  Zap
} from 'lucide-react'

interface TestResult {
  test: string
  status: 'pass' | 'fail' | 'warning' | 'running'
  message: string
  duration?: number
  details?: any
}

interface BrowserInfo {
  name: string
  version: string
  userAgent: string
  webRTCSupport: boolean
  mediaDevicesSupport: boolean
  webSocketSupport: boolean
}

export const WebRTCTestSuite: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [connectionStats, setConnectionStats] = useState<any>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)

  const detectBrowser = (): BrowserInfo => {
    const userAgent = navigator.userAgent
    let name = 'Unknown'
    let version = 'Unknown'

    if (userAgent.includes('Chrome')) {
      name = 'Chrome'
      version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown'
    } else if (userAgent.includes('Firefox')) {
      name = 'Firefox'
      version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown'
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'Safari'
      version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown'
    } else if (userAgent.includes('Edge')) {
      name = 'Edge'
      version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown'
    }

    return {
      name,
      version,
      userAgent,
      webRTCSupport: !!(window.RTCPeerConnection || window.webkitRTCPeerConnection),
      mediaDevicesSupport: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      webSocketSupport: !!window.WebSocket
    }
  }

  const addTestResult = (test: string, status: TestResult['status'], message: string, duration?: number, details?: any) => {
    setTestResults(prev => [...prev, { test, status, message, duration, details }])
  }

  const testWebRTCSupport = async (): Promise<void> => {
    addTestResult('WebRTC Support', 'running', 'Checking WebRTC support...')
    
    try {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      })
      
      if (pc) {
        addTestResult('WebRTC Support', 'pass', 'WebRTC is supported', undefined, {
          connectionState: pc.connectionState,
          iceConnectionState: pc.iceConnectionState
        })
        pc.close()
      } else {
        addTestResult('WebRTC Support', 'fail', 'WebRTC is not supported')
      }
    } catch (error) {
      addTestResult('WebRTC Support', 'fail', `WebRTC error: ${error}`)
    }
  }

  const testMediaDevices = async (): Promise<void> => {
    addTestResult('Media Devices', 'running', 'Testing media device access...')
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      
      if (stream) {
        const videoTracks = stream.getVideoTracks()
        const audioTracks = stream.getAudioTracks()
        
        addTestResult('Media Devices', 'pass', 'Media devices accessible', undefined, {
          videoTracks: videoTracks.length,
          audioTracks: audioTracks.length,
          videoCapabilities: videoTracks[0]?.getCapabilities(),
          audioCapabilities: audioTracks[0]?.getCapabilities()
        })
        
        // Test local video display
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
        
        // Stop stream after test
        stream.getTracks().forEach(track => track.stop())
      } else {
        addTestResult('Media Devices', 'fail', 'No media devices available')
      }
    } catch (error) {
      addTestResult('Media Devices', 'fail', `Media device error: ${error}`)
    }
  }

  const testWebSocketConnection = async (): Promise<void> => {
    addTestResult('WebSocket Connection', 'running', 'Testing WebSocket connection...')
    const startTime = performance.now()
    
    return new Promise((resolve) => {
      const ws = new WebSocket('ws://localhost:8000/ws/test')
      
      ws.onopen = () => {
        const duration = performance.now() - startTime
        addTestResult('WebSocket Connection', 'pass', 'WebSocket connected successfully', duration)
        ws.close()
        resolve()
      }
      
      ws.onerror = (error) => {
        const duration = performance.now() - startTime
        addTestResult('WebSocket Connection', 'fail', `WebSocket connection failed: ${error}`, duration)
        resolve()
      }
      
      setTimeout(() => {
        const duration = performance.now() - startTime
        addTestResult('WebSocket Connection', 'fail', 'WebSocket connection timeout', duration)
        ws.close()
        resolve()
      }, 5000)
    })
  }

  const testPeerConnection = async (): Promise<void> => {
    addTestResult('Peer Connection', 'running', 'Testing peer-to-peer connection...')
    const startTime = performance.now()
    
    try {
      const pc1 = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      })
      
      const pc2 = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      })
      
      // Set up connection between two peers
      pc1.onicecandidate = (event) => {
        if (event.candidate) {
          pc2.addIceCandidate(event.candidate)
        }
      }
      
      pc2.onicecandidate = (event) => {
        if (event.candidate) {
          pc1.addIceCandidate(event.candidate)
        }
      }
      
      // Test offer/answer exchange
      const offer = await pc1.createOffer()
      await pc1.setLocalDescription(offer)
      await pc2.setRemoteDescription(offer)
      
      const answer = await pc2.createAnswer()
      await pc2.setLocalDescription(answer)
      await pc1.setRemoteDescription(answer)
      
      // Wait for connection
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'))
        }, 10000)
        
        pc1.onconnectionstatechange = () => {
          if (pc1.connectionState === 'connected') {
            clearTimeout(timeout)
            resolve(true)
          } else if (pc1.connectionState === 'failed') {
            clearTimeout(timeout)
            reject(new Error('Connection failed'))
          }
        }
      })
      
      const duration = performance.now() - startTime
      addTestResult('Peer Connection', 'pass', 'Peer connection established successfully', duration, {
        connectionState: pc1.connectionState,
        iceConnectionState: pc1.iceConnectionState
      })
      
      pc1.close()
      pc2.close()
      
    } catch (error) {
      const duration = performance.now() - startTime
      addTestResult('Peer Connection', 'fail', `Peer connection failed: ${error}`, duration)
    }
  }

  const testScreenSharing = async (): Promise<void> => {
    addTestResult('Screen Sharing', 'running', 'Testing screen sharing capability...')
    
    try {
      if ('getDisplayMedia' in navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        })
        
        if (stream) {
          addTestResult('Screen Sharing', 'pass', 'Screen sharing supported', undefined, {
            videoTracks: stream.getVideoTracks().length,
            audioTracks: stream.getAudioTracks().length
          })
          
          // Stop stream after test
          stream.getTracks().forEach(track => track.stop())
        } else {
          addTestResult('Screen Sharing', 'fail', 'Screen sharing not available')
        }
      } else {
        addTestResult('Screen Sharing', 'fail', 'getDisplayMedia not supported')
      }
    } catch (error) {
      addTestResult('Screen Sharing', 'fail', `Screen sharing error: ${error}`)
    }
  }

  const testNetworkConnectivity = async (): Promise<void> => {
    addTestResult('Network Connectivity', 'running', 'Testing network connectivity...')
    const startTime = performance.now()
    
    try {
      const response = await fetch('/api/health')
      const duration = performance.now() - startTime
      
      if (response.ok) {
        addTestResult('Network Connectivity', 'pass', 'Network connectivity OK', duration, {
          status: response.status,
          responseTime: duration
        })
      } else {
        addTestResult('Network Connectivity', 'fail', `Network error: ${response.status}`, duration)
      }
    } catch (error) {
      const duration = performance.now() - startTime
      addTestResult('Network Connectivity', 'fail', `Network error: ${error}`, duration)
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTestResults([])
    
    // Detect browser first
    const browser = detectBrowser()
    setBrowserInfo(browser)
    
    // Run tests sequentially
    await testWebRTCSupport()
    await testMediaDevices()
    await testWebSocketConnection()
    await testPeerConnection()
    await testScreenSharing()
    await testNetworkConnectivity()
    
    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return 'text-green-400'
      case 'fail':
        return 'text-red-400'
      case 'warning':
        return 'text-yellow-400'
      case 'running':
        return 'text-blue-400'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Browser Information */}
      {browserInfo && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Monitor className="h-5 w-5 text-blue-400" />
              Browser Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium mb-2">Browser Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Name:</span>
                    <span className="text-white">{browserInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Version:</span>
                    <span className="text-white">{browserInfo.version}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Feature Support</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">WebRTC:</span>
                    <Badge variant={browserInfo.webRTCSupport ? "default" : "destructive"}>
                      {browserInfo.webRTCSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Media Devices:</span>
                    <Badge variant={browserInfo.mediaDevicesSupport ? "default" : "destructive"}>
                      {browserInfo.mediaDevicesSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">WebSocket:</span>
                    <Badge variant={browserInfo.webSocketSupport ? "default" : "destructive"}>
                      {browserInfo.webSocketSupport ? "Supported" : "Not Supported"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            WebRTC Test Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isRunning ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
            
            <div className="text-sm text-slate-300">
              {testResults.length > 0 && (
                <span>
                  {testResults.filter(r => r.status === 'pass').length} passed, {' '}
                  {testResults.filter(r => r.status === 'fail').length} failed, {' '}
                  {testResults.filter(r => r.status === 'warning').length} warnings
                </span>
              )}
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="text-white font-medium">{result.test}</div>
                      <div className={`text-sm ${getStatusColor(result.status)}`}>
                        {result.message}
                      </div>
                      {result.duration && (
                        <div className="text-xs text-slate-400">
                          Duration: {result.duration.toFixed(0)}ms
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant={result.status === 'pass' ? 'default' : result.status === 'fail' ? 'destructive' : 'outline'}>
                    {result.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Test Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Local Video Test</CardTitle>
          </CardHeader>
          <CardContent>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-48 bg-slate-700 rounded-lg object-cover"
            />
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Remote Video Test</CardTitle>
          </CardHeader>
          <CardContent>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-48 bg-slate-700 rounded-lg object-cover"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
