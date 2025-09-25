'use client'

import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

interface WebRTCContextType {
  localStream: MediaStream | null
  remoteStreams: Map<string, MediaStream>
  isConnected: boolean
  joinRoom: (roomId: string) => void
  leaveRoom: () => void
  sendMessage: (message: string) => void
  messages: Array<{ id: string; user: string; message: string; timestamp: Date }>
  participants: string[]
  startScreenShare: () => void
  stopScreenShare: () => void
  isScreenSharing: boolean
}

const WebRTCContext = createContext<WebRTCContextType | null>(null)

export const useWebRTC = () => {
  const context = useContext(WebRTCContext)
  if (!context) {
    throw new Error('useWebRTC must be used within a WebRTCProvider')
  }
  return context
}

interface WebRTCProviderProps {
  children: React.ReactNode
}

export const WebRTCProvider: React.FC<WebRTCProviderProps> = ({ children }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStreams, setRemoteStreams] = useState<Map<string, MediaStream>>(new Map())
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: string; user: string; message: string; timestamp: Date }>>([])
  const [participants, setParticipants] = useState<string[]>([])
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  const socketRef = useRef<Socket | null>(null)
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map())
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const currentRoomRef = useRef<string | null>(null)

  const STUN_SERVERS = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' }
    ]
  }

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000', {
      transports: ['websocket', 'polling']
    })

    const socket = socketRef.current

    socket.on('connect', () => {
      console.log('Connected to signaling server')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from signaling server')
      setIsConnected(false)
    })

    socket.on('room-joined', (data: { roomId: string; participants: string[] }) => {
      console.log('Joined room:', data.roomId)
      setParticipants(data.participants)
    })

    socket.on('user-joined', async (data: { userId: string; participants: string[] }) => {
      console.log('User joined:', data.userId)
      setParticipants(data.participants)
      
      // Create offer for new user
      if (localStream) {
        await createPeerConnection(data.userId, true)
      }
    })

    socket.on('user-left', (data: { userId: string; participants: string[] }) => {
      console.log('User left:', data.userId)
      setParticipants(data.participants)
      
      // Clean up peer connection
      const peerConnection = peerConnectionsRef.current.get(data.userId)
      if (peerConnection) {
        peerConnection.close()
        peerConnectionsRef.current.delete(data.userId)
      }
      
      // Remove remote stream
      setRemoteStreams(prev => {
        const newMap = new Map(prev)
        newMap.delete(data.userId)
        return newMap
      })
    })

    socket.on('offer', async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      console.log('Received offer from:', data.from)
      await handleOffer(data.from, data.offer)
    })

    socket.on('answer', async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      console.log('Received answer from:', data.from)
      await handleAnswer(data.from, data.answer)
    })

    socket.on('ice-candidate', async (data: { from: string; candidate: RTCIceCandidateInit }) => {
      console.log('Received ICE candidate from:', data.from)
      await handleIceCandidate(data.from, data.candidate)
    })

    socket.on('message', (data: { id: string; user: string; message: string; timestamp: string }) => {
      setMessages(prev => [...prev, {
        ...data,
        timestamp: new Date(data.timestamp)
      }])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const createPeerConnection = async (userId: string, isInitiator: boolean): Promise<RTCPeerConnection> => {
    const peerConnection = new RTCPeerConnection(STUN_SERVERS)
    peerConnectionsRef.current.set(userId, peerConnection)

    // Add local stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream)
      })
    }

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      console.log('Received remote stream from:', userId)
      const [remoteStream] = event.streams
      setRemoteStreams(prev => new Map(prev.set(userId, remoteStream)))
    }

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && socketRef.current) {
        socketRef.current.emit('ice-candidate', {
          to: userId,
          candidate: event.candidate
        })
      }
    }

    // Handle connection state changes
    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state with ${userId}:`, peerConnection.connectionState)
    }

    return peerConnection
  }

  const handleOffer = async (from: string, offer: RTCSessionDescriptionInit) => {
    const peerConnection = await createPeerConnection(from, false)
    
    await peerConnection.setRemoteDescription(offer)
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    
    if (socketRef.current) {
      socketRef.current.emit('answer', {
        to: from,
        answer: answer
      })
    }
  }

  const handleAnswer = async (from: string, answer: RTCSessionDescriptionInit) => {
    const peerConnection = peerConnectionsRef.current.get(from)
    if (peerConnection) {
      await peerConnection.setRemoteDescription(answer)
    }
  }

  const handleIceCandidate = async (from: string, candidate: RTCIceCandidateInit) => {
    const peerConnection = peerConnectionsRef.current.get(from)
    if (peerConnection) {
      await peerConnection.addIceCandidate(candidate)
    }
  }

  const joinRoom = async (roomId: string) => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      
      setLocalStream(stream)
      currentRoomRef.current = roomId
      
      if (socketRef.current) {
        socketRef.current.emit('join-room', { roomId })
      }
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const leaveRoom = () => {
    // Stop local stream
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      setLocalStream(null)
    }

    // Close all peer connections
    peerConnectionsRef.current.forEach(peerConnection => {
      peerConnection.close()
    })
    peerConnectionsRef.current.clear()

    // Clear remote streams
    setRemoteStreams(new Map())

    // Leave room
    if (socketRef.current && currentRoomRef.current) {
      socketRef.current.emit('leave-room', { roomId: currentRoomRef.current })
    }

    currentRoomRef.current = null
    setParticipants([])
  }

  const sendMessage = (message: string) => {
    if (socketRef.current && currentRoomRef.current) {
      const messageData = {
        id: Date.now().toString(),
        user: 'You', // In a real app, this would be the actual username
        message,
        timestamp: new Date().toISOString()
      }
      
      socketRef.current.emit('message', {
        roomId: currentRoomRef.current,
        ...messageData
      })
    }
  }

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      })

      // Replace video track in all peer connections
      const videoTrack = screenStream.getVideoTracks()[0]
      
      peerConnectionsRef.current.forEach(peerConnection => {
        const sender = peerConnection.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        )
        if (sender) {
          sender.replaceTrack(videoTrack)
        }
      })

      setIsScreenSharing(true)

      // Handle screen share end
      videoTrack.onended = () => {
        stopScreenShare()
      }
    } catch (error) {
      console.error('Error starting screen share:', error)
    }
  }

  const stopScreenShare = () => {
    if (localStream) {
      // Restore original video track
      const videoTrack = localStream.getVideoTracks()[0]
      
      peerConnectionsRef.current.forEach(peerConnection => {
        const sender = peerConnection.getSenders().find(s => 
          s.track && s.track.kind === 'video'
        )
        if (sender && videoTrack) {
          sender.replaceTrack(videoTrack)
        }
      })
    }

    setIsScreenSharing(false)
  }

  const value: WebRTCContextType = {
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
  }

  return (
    <WebRTCContext.Provider value={value}>
      {children}
    </WebRTCContext.Provider>
  )
}
