'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Target, Zap, Shield, Brain, Square } from 'lucide-react'

interface ChessPiece {
  id: string
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  color: 'white' | 'black'
  position: { x: number; y: number }
  strategicValue: number
  aiCapability: string
}

interface StrategicMove {
  from: string
  to: string
  piece: string
  strategicImpact: number
  aiReasoning: string
  confidence: number
}

export function StrategicChessboard() {
  const [pieces, setPieces] = useState<ChessPiece[]>([])
  const [selectedPiece, setSelectedPiece] = useState<ChessPiece | null>(null)
  const [aiMoves, setAiMoves] = useState<StrategicMove[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    // Initialize strategic chess pieces with AI capabilities
    const initialPieces: ChessPiece[] = [
      // White pieces (Our AI Systems)
      { id: 'w-king', type: 'king', color: 'white', position: { x: 4, y: 7 }, strategicValue: 100, aiCapability: 'ARPE - Autonomous Regulatory Prophecy Engine' },
      { id: 'w-queen', type: 'queen', color: 'white', position: { x: 3, y: 7 }, strategicValue: 90, aiCapability: 'QESO - Quantum-Enhanced Strategic Optimization' },
      { id: 'w-rook1', type: 'rook', color: 'white', position: { x: 0, y: 7 }, strategicValue: 50, aiCapability: 'ABME - Autonomous Business Model Execution' },
      { id: 'w-rook2', type: 'rook', color: 'white', position: { x: 7, y: 7 }, strategicValue: 50, aiCapability: 'SNSE - Sovereign National Security Engine' },
      { id: 'w-bishop1', type: 'bishop', color: 'white', position: { x: 2, y: 7 }, strategicValue: 30, aiCapability: 'SCI - Synthetic Competition Intelligence' },
      { id: 'w-bishop2', type: 'bishop', color: 'white', position: { x: 5, y: 7 }, strategicValue: 30, aiCapability: 'CEIS - Cross-Enterprise Intelligence Synthesis' },
      { id: 'w-knight1', type: 'knight', color: 'white', position: { x: 1, y: 7 }, strategicValue: 30, aiCapability: 'PSCDO - Predictive Supply Chain Disruption Oracle' },
      { id: 'w-knight2', type: 'knight', color: 'white', position: { x: 6, y: 7 }, strategicValue: 30, aiCapability: 'RCRE - Real-Time Competitive Response Engine' },
      
      // Black pieces (Competitors/Challenges)
      { id: 'b-king', type: 'king', color: 'black', position: { x: 4, y: 0 }, strategicValue: 100, aiCapability: 'Legacy Systems' },
      { id: 'b-queen', type: 'queen', color: 'black', position: { x: 3, y: 0 }, strategicValue: 90, aiCapability: 'Traditional Analytics' },
      { id: 'b-rook1', type: 'rook', color: 'black', position: { x: 0, y: 0 }, strategicValue: 50, aiCapability: 'Manual Processes' },
      { id: 'b-rook2', type: 'rook', color: 'black', position: { x: 7, y: 0 }, strategicValue: 50, aiCapability: 'Siloed Data' },
    ]

    setPieces(initialPieces)
    generateAiMoves(initialPieces)
  }, [])

  const generateAiMoves = (currentPieces: ChessPiece[]) => {
    setIsAnalyzing(true)
    
    // Simulate AI strategic analysis
    setTimeout(() => {
      const moves: StrategicMove[] = [
        {
          from: 'e7',
          to: 'e5',
          piece: 'ARPE King',
          strategicImpact: 95,
          aiReasoning: 'Advance central control position to dominate regulatory landscape',
          confidence: 0.92
        },
        {
          from: 'd7',
          to: 'd5',
          piece: 'QESO Queen',
          strategicImpact: 88,
          aiReasoning: 'Quantum optimization suggests diagonal dominance strategy',
          confidence: 0.89
        },
        {
          from: 'c7',
          to: 'c5',
          piece: 'ABME Bishop',
          strategicImpact: 76,
          aiReasoning: 'Autonomous business model execution requires forward positioning',
          confidence: 0.85
        }
      ]
      
      setAiMoves(moves)
      setIsAnalyzing(false)
    }, 2000)
  }

  const getPieceIcon = (type: string) => {
    switch (type) {
      case 'king': return <Crown className="w-4 h-4" />
      case 'queen': return <Brain className="w-4 h-4" />
      case 'rook': return <Shield className="w-4 h-4" />
      case 'bishop': return <Zap className="w-4 h-4" />
      case 'knight': return <Target className="w-4 h-4" />
      default: return <Square className="w-4 h-4" />
    }
  }

  const getPieceColor = (color: string) => {
    return color === 'white' ? 'text-white' : 'text-gunmetal-800'
  }

  return (
    <div className="palantir-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="tesla-heading text-xl font-semibold">Strategic AI Chessboard</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            {isAnalyzing ? 'AI Analyzing...' : 'Live Strategic Analysis'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chess Board */}
        <div className="relative">
          <div className="grid grid-cols-8 gap-1 bg-gunmetal-100 dark:bg-gunmetal-800 p-4 rounded-lg">
            {Array.from({ length: 64 }, (_, i) => {
              const x = i % 8
              const y = Math.floor(i / 8)
              const isLight = (x + y) % 2 === 0
              const piece = pieces.find(p => p.position.x === x && p.position.y === y)
              
              return (
                <motion.div
                  key={`${x}-${y}`}
                  className={`
                    aspect-square flex items-center justify-center relative
                    ${isLight ? 'bg-steel-100 dark:bg-steel-800' : 'bg-steel-200 dark:bg-steel-700'}
                    ${selectedPiece?.position.x === x && selectedPiece?.position.y === y ? 'ring-2 ring-neon-blue' : ''}
                    hover:bg-neon-blue/20 cursor-pointer transition-all duration-200
                  `}
                  onClick={() => setSelectedPiece(piece || null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {piece && (
                    <motion.div
                      className={`${getPieceColor(piece.color)} ${piece.color === 'white' ? 'drop-shadow-lg' : ''}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {getPieceIcon(piece.type)}
                    </motion.div>
                  )}
                  
                  {/* Position coordinates */}
                  <div className="absolute top-0 left-0 text-xs text-muted-foreground opacity-50">
                    {String.fromCharCode(97 + x)}{8 - y}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* AI Analysis Panel */}
        <div className="space-y-4">
          {selectedPiece ? (
            <motion.div
              className="palantir-card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="tesla-heading text-lg font-semibold mb-3">
                {selectedPiece.aiCapability}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Strategic Value:</span>
                  <span className="font-mono text-neon-blue">{selectedPiece.strategicValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-mono">
                    {String.fromCharCode(97 + selectedPiece.position.x)}{8 - selectedPiece.position.y}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{selectedPiece.type}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="palantir-card p-4">
              <p className="text-muted-foreground text-center py-8">
                Select a piece to view AI strategic analysis
              </p>
            </div>
          )}

          {/* AI Recommended Moves */}
          <div className="palantir-card p-4">
            <h4 className="tesla-heading text-lg font-semibold mb-3">AI Strategic Moves</h4>
            <div className="space-y-3">
              {aiMoves.map((move, index) => (
                <motion.div
                  key={index}
                  className="border border-border rounded-lg p-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm">{move.from} → {move.to}</span>
                    <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded">
                      {Math.round(move.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{move.aiReasoning}</p>
                  <div className="flex justify-between text-xs">
                    <span>Impact: {move.strategicImpact}</span>
                    <span>Piece: {move.piece}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
