import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { OrbitControls, Text, Box, Sphere, Line, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Extend Three.js objects for React Three Fiber
extend({ BufferGeometry: THREE.BufferGeometry })

// Business data from the comprehensive analysis
const businessData = {
  marketOpportunity: {
    tam: 82.1, // $82.1B
    aiEnhancedBI: 80.0, // $80.0B
    realTimeCollab: 2.1, // $2.1B
    sam: 12.3, // $12.3B
    som: 0.615 // $0.615B
  },
  revenueProjection: {
    2025: 0.1, // $0.1M
    2026: 2.5, // $2.5M
    2027: 9.2, // $9.2M
    2028: 22.4, // $22.4M
    2029: 132.0 // $132.0M
  },
  customerGrowth: {
    2025: 8,
    2026: 18,
    2027: 50,
    2028: 120,
    2029: 400
  },
  companyValuation: {
    2025: 10, // $10M
    2026: 12.5, // $12.5M
    2027: 57.7, // $57.7M
    2028: 235, // $235M
    2029: 3300 // $3.3B
  }
}

// Animated Market Opportunity Bars
function MarketOpportunityBars() {
  const bars = [
    { name: 'TAM', value: businessData.marketOpportunity.tam, color: '#3B82F6', position: [-8, 0, 0] },
    { name: 'AI-Enhanced BI', value: businessData.marketOpportunity.aiEnhancedBI, color: '#F97316', position: [-4, 0, 0] },
    { name: 'Real-time Collab', value: businessData.marketOpportunity.realTimeCollab, color: '#10B981', position: [0, 0, 0] },
    { name: 'SAM', value: businessData.marketOpportunity.sam, color: '#EF4444', position: [4, 0, 0] },
    { name: 'SOM', value: businessData.marketOpportunity.som, color: '#8B5CF6', position: [8, 0, 0] }
  ]

  return (
    <group>
      {bars.map((bar, index) => (
        <AnimatedBar
          key={bar.name}
          name={bar.name}
          value={bar.value}
          color={bar.color}
          position={bar.position}
          delay={index * 0.2}
        />
      ))}
    </group>
  )
}

// Animated Bar Component
function AnimatedBar({ name, value, color, position, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setScale(1)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + delay) * 0.1
    }
  })

  const height = (value / 82.1) * 10 // Normalize to TAM

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, height / 2, 0]} scale={[scale, scale, scale]}>
        <boxGeometry args={[1.5, height, 1.5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
      <Text
        position={[0, height + 1, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      <Text
        position={[0, height + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ${value}B
      </Text>
    </group>
  )
}

// Revenue Growth Line
function RevenueGrowthLine() {
  const points = Object.entries(businessData.revenueProjection).map(([year, value], index) => [
    index * 2 - 4,
    (value / 132) * 8, // Normalize to max revenue
    0
  ])

  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)))

  return (
    <group>
      <Line
        points={curve.getPoints(100)}
        color="#10B981"
        lineWidth={4}
        transparent
        opacity={0.8}
      />
      {Object.entries(businessData.revenueProjection).map(([year, value], index) => (
        <group key={year} position={[index * 2 - 4, (value / 132) * 8, 0]}>
          <Sphere args={[0.2]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.3} />
          </Sphere>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {year}
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            ${value}M
          </Text>
        </group>
      ))}
    </group>
  )
}

// Customer Growth Visualization
function CustomerGrowth() {
  const years = Object.keys(businessData.customerGrowth)
  const maxCustomers = 400

  return (
    <group>
      {years.map((year, index) => {
        const customers = businessData.customerGrowth[year as unknown as keyof typeof businessData.customerGrowth]
        const height = (customers / maxCustomers) * 6
        const x = index * 2 - 4

        return (
          <group key={year} position={[x, 0, 0]}>
            <mesh position={[0, height / 2, 0]}>
              <cylinderGeometry args={[0.3, 0.3, height, 8]} />
              <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.2} />
            </mesh>
            <Text
              position={[0, height + 0.5, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {year}
            </Text>
            <Text
              position={[0, height + 0.2, 0]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {customers}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

// Company Valuation Growth
function CompanyValuation() {
  const years = Object.keys(businessData.companyValuation)
  const maxValuation = 3300

  return (
    <group>
      {years.map((year, index) => {
        const valuation = businessData.companyValuation[year as unknown as keyof typeof businessData.companyValuation]
        const height = (valuation / maxValuation) * 10
        const x = index * 2 - 4

        return (
          <group key={year} position={[x, 0, 0]}>
            <mesh position={[0, height / 2, 0]}>
              <boxGeometry args={[0.8, height, 0.8]} />
              <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} />
            </mesh>
            <Text
              position={[0, height + 0.5, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {year}
            </Text>
            <Text
              position={[0, height + 0.2, 0]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              ${valuation}M
            </Text>
          </group>
        )
      })}
    </group>
  )
}

// Floating Particles Effect
function FloatingParticles() {
  const particles = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.1
      particles.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={particles}>
      <BufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <pointsMaterial size={0.1} color="#3B82F6" transparent opacity={0.6} />
    </points>
  )
}

// Main Demo Scene
export default function DemoScene() {
  const [currentScene, setCurrentScene] = useState(0)
  const scenes = [
    { name: 'Market Opportunity', component: MarketOpportunityBars },
    { name: 'Revenue Growth', component: RevenueGrowthLine },
    { name: 'Customer Growth', component: CustomerGrowth },
    { name: 'Company Valuation', component: CompanyValuation }
  ]

  const CurrentComponent = scenes[currentScene].component

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Aethon AI
          </h1>
          <h2 className="text-2xl text-blue-300 mb-8">
            Strategic Intelligence Platform
          </h2>
          <div className="flex justify-center space-x-4 mb-8">
            {scenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => setCurrentScene(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  currentScene === index
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 5, 15]} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        
        {/* Environment - removed to avoid HDR loading issues */}
        
        {/* Current Scene */}
        <CurrentComponent />
        
        {/* Floating particles */}
        <FloatingParticles />
      </Canvas>

      {/* Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            {scenes[currentScene].name}
          </h3>
          <div className="text-white space-y-2">
            {currentScene === 0 && (
              <>
                <p>• Total Addressable Market: <span className="text-blue-400">$82.1B</span></p>
                <p>• AI-Enhanced BI Market: <span className="text-orange-400">$80.0B</span></p>
                <p>• Real-time Collaboration: <span className="text-green-400">$2.1B</span></p>
                <p>• Serviceable Available Market: <span className="text-red-400">$12.3B</span></p>
                <p>• Serviceable Obtainable Market: <span className="text-purple-400">$0.615B</span></p>
              </>
            )}
            {currentScene === 1 && (
              <>
                <p>• 2025: <span className="text-green-400">$0.1M</span></p>
                <p>• 2026: <span className="text-green-400">$2.5M</span></p>
                <p>• 2027: <span className="text-green-400">$9.2M</span></p>
                <p>• 2028: <span className="text-green-400">$22.4M</span></p>
                <p>• 2029: <span className="text-green-400">$132.0M</span></p>
              </>
            )}
            {currentScene === 2 && (
              <>
                <p>• 2025: <span className="text-blue-400">8 customers</span></p>
                <p>• 2026: <span className="text-blue-400">18 customers</span></p>
                <p>• 2027: <span className="text-blue-400">50 customers</span></p>
                <p>• 2028: <span className="text-blue-400">120 customers</span></p>
                <p>• 2029: <span className="text-blue-400">400 customers</span></p>
              </>
            )}
            {currentScene === 3 && (
              <>
                <p>• 2025: <span className="text-yellow-400">$10M</span></p>
                <p>• 2026: <span className="text-yellow-400">$12.5M</span></p>
                <p>• 2027: <span className="text-yellow-400">$57.7M</span></p>
                <p>• 2028: <span className="text-yellow-400">$235M</span></p>
                <p>• 2029: <span className="text-yellow-400">$3.3B</span></p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
