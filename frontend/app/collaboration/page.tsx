'use client'

import React, { useState, useEffect } from 'react'
import { WebRTCProvider } from '@/components/webrtc/WebRTCProvider'
import { CollaborationRoom } from '@/components/webrtc/CollaborationRoom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Video, 
  MessageSquare, 
  Share2, 
  Zap,
  Shield,
  Globe,
  Clock
} from 'lucide-react'

export default function CollaborationPage() {
  const [roomId, setRoomId] = useState('')
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const [isCreatingRoom, setIsCreatingRoom] = useState(false)

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const createRoom = () => {
    const newRoomId = generateRoomId()
    setRoomId(newRoomId)
    setCurrentRoom(newRoomId)
    setIsCreatingRoom(true)
  }

  const joinRoom = () => {
    if (roomId.trim()) {
      setCurrentRoom(roomId.trim())
    }
  }

  const leaveRoom = () => {
    setCurrentRoom(null)
    setRoomId('')
    setIsCreatingRoom(false)
  }

  if (currentRoom) {
    return (
      <WebRTCProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <CollaborationRoom 
            roomId={currentRoom} 
            onLeave={leaveRoom}
          />
        </div>
      </WebRTCProvider>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Strategic AI Collaboration Hub
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Real-time collaboration powered by WebRTC technology. Share insights, 
            conduct strategic analysis, and make decisions together with your team.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">HD Video Calls</h3>
              <p className="text-sm text-slate-300">
                Crystal clear video conferencing with up to 12 participants
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardContent className="p-6 text-center">
              <Share2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Screen Sharing</h3>
              <p className="text-sm text-slate-300">
                Share dashboards, reports, and strategic analysis in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Chat</h3>
              <p className="text-sm text-slate-300">
                Instant messaging with file sharing and message history
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-slate-300">
                End-to-end encryption with enterprise-grade security
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Room */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Create New Room
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Start a new collaboration session with your team. Share the room ID 
                with participants to join.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Globe className="h-4 w-4" />
                  <span>Global access via WebRTC</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>Instant connection setup</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Users className="h-4 w-4" />
                  <span>Up to 12 participants</span>
                </div>
              </div>

              <Button 
                onClick={createRoom}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Video className="h-4 w-4 mr-2" />
                Create Collaboration Room
              </Button>
            </CardContent>
          </Card>

          {/* Join Room */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-green-400" />
                Join Existing Room
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Enter a room ID to join an existing collaboration session.
              </p>
              
              <div className="space-y-3">
                <Input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
                
                <Button 
                  onClick={joinRoom}
                  disabled={!roomId.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Room
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-sm font-medium text-white mb-2">Recent Rooms</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm text-slate-300">Strategic Analysis Room</span>
                    <Badge variant="outline" className="text-xs">2 participants</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm text-slate-300">QEMASI Review</span>
                    <Badge variant="outline" className="text-xs">5 participants</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-6">
            Powered by Cutting-Edge Technology
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              WebRTC
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400">
              Socket.io
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              STUN/TURN
            </Badge>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              End-to-End Encryption
            </Badge>
            <Badge variant="outline" className="text-red-400 border-red-400">
              Real-time Data Channels
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
