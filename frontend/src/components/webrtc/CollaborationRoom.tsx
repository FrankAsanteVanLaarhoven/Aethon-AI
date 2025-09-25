'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useWebRTC } from './WebRTCProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff, 
  Users, 
  MessageSquare,
  Send,
  Phone,
  PhoneOff
} from 'lucide-react'

interface CollaborationRoomProps {
  roomId: string
  onLeave?: () => void
}

export const CollaborationRoom: React.FC<CollaborationRoomProps> = ({ 
  roomId, 
  onLeave 
}) => {
  const {
    localStream,
    remoteStreams,
    isConnected,
    joinRoom,
    leaveRoom,
    sendMessage,
    messages,
    participants,
    startScreenShare,
    stopScreenShare,
    isScreenSharing
  } = useWebRTC()

  const [message, setMessage] = useState('')
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isJoined, setIsJoined] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleJoin = () => {
    joinRoom(roomId)
    setIsJoined(true)
  }

  const handleLeave = () => {
    leaveRoom()
    setIsJoined(false)
    onLeave?.()
  }

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsAudioEnabled(audioTrack.enabled)
      }
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isJoined) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Join Collaboration Room
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Badge variant="outline" className="mb-2">
              Room ID: {roomId}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Connect with your team for real-time collaboration
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>

          <Button 
            onClick={handleJoin} 
            className="w-full"
            disabled={!isConnected}
          >
            <Video className="h-4 w-4 mr-2" />
            Join Room
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Room: {roomId}</Badge>
          <Badge variant="secondary">
            <Users className="h-3 w-3 mr-1" />
            {participants.length} participants
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Local Video */}
            <Card className="relative">
              <CardContent className="p-2">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  You
                </div>
              </CardContent>
            </Card>

            {/* Remote Videos */}
            {Array.from(remoteStreams.entries()).map(([userId, stream]) => (
              <Card key={userId} className="relative">
                <CardContent className="p-2">
                  <video
                    autoPlay
                    playsInline
                    className="w-full h-48 object-cover rounded-lg"
                    ref={(video) => {
                      if (video) {
                        video.srcObject = stream
                      }
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    User {userId}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="w-80 border-l flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm">
                <div className="font-medium text-blue-600">{msg.user}</div>
                <div className="text-gray-700">{msg.message}</div>
                <div className="text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-4 border-t bg-gray-50">
        <Button
          variant={isVideoEnabled ? "default" : "destructive"}
          size="sm"
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant={isAudioEnabled ? "default" : "destructive"}
          size="sm"
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant={isScreenSharing ? "destructive" : "outline"}
          size="sm"
          onClick={isScreenSharing ? stopScreenShare : startScreenShare}
        >
          {isScreenSharing ? <MonitorOff className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLeave}
        >
          <PhoneOff className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
