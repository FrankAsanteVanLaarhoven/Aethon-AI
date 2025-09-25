'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Cpu, Target, Brain, Sparkles, Atom, Infinity, CheckCircle } from 'lucide-react'

export function QuantumAdvantage() {
  const [activeAdvantage, setActiveAdvantage] = useState(0)
  const [quantumPower, setQuantumPower] = useState(0)

  const advantages = [
    {
      title: 'Exponential Speedup',
      description: 'Quantum algorithms provide exponential speedup for complex optimization problems',
      speedup: 1000,
      icon: Zap,
      color: 'text-neon-blue',
      details: 'Traditional computers require 2^n operations, quantum computers solve in polynomial time'
    },
    {
      title: 'Parallel Processing',
      description: 'Quantum superposition enables simultaneous processing of multiple solutions',
      speedup: 500,
      icon: Brain,
      color: 'text-neon-purple',
      details: 'Process millions of scenarios simultaneously in quantum superposition states'
    },
    {
      title: 'Optimization Mastery',
      description: 'Quantum annealing finds global optima in complex multi-dimensional spaces',
      speedup: 750,
      icon: Target,
      color: 'text-neon-green',
      details: 'Escape local minima and find true global optimal solutions'
    },
    {
      title: 'Unlimited Scalability',
      description: 'Quantum systems scale exponentially with additional qubits',
      speedup: 2000,
      icon: Infinity,
      color: 'text-neon-cyan',
      details: 'Each additional qubit doubles computational capacity'
    }
  ]

  const quantumMetrics = [
    {
      name: 'Computational Power',
      value: 1000,
      unit: 'x faster',
      icon: Cpu,
      color: 'text-neon-blue'
    },
    {
      name: 'Problem Complexity',
      value: 95,
      unit: '%',
      icon: Brain,
      color: 'text-neon-purple'
    },
    {
      name: 'Solution Accuracy',
      value: 99.9,
      unit: '%',
      icon: Target,
      color: 'text-neon-green'
    },
    {
      name: 'Energy Efficiency',
      value: 85,
      unit: '%',
      icon: Sparkles,
      color: 'text-neon-cyan'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAdvantage(prev => (prev + 1) % advantages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [advantages.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumPower(prev => (prev + 1) % 100)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
          Quantum Advantage
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Revolutionary quantum computing capabilities that provide exponential advantages over classical systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quantum Advantages Carousel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Quantum Advantages</h3>
          <div className="space-y-4">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index === activeAdvantage ? 1 : 0.6,
                  x: 0,
                  scale: index === activeAdvantage ? 1.02 : 1
                }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveAdvantage(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  index === activeAdvantage 
                    ? 'border-neon-blue bg-neon-blue/5' 
                    : 'border-border hover:border-neon-blue/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <advantage.icon className={`w-6 h-6 ${advantage.color}`} />
                  <h4 className="font-semibold">{advantage.title}</h4>
                  <span className="text-sm text-neon-blue font-medium">
                    {advantage.speedup}x faster
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{advantage.description}</p>
                {index === activeAdvantage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground italic"
                  >
                    {advantage.details}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quantum Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Quantum Performance Metrics</h3>
          <div className="space-y-4">
            {quantumMetrics.map((metric, index) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <span className={`text-lg font-bold ${metric.color}`}>
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      metric.color.replace('text-', 'bg-')
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
            <div className="flex items-center space-x-2 mb-2">
              <Atom className="w-5 h-5 text-neon-blue" />
              <span className="font-semibold text-neon-blue">Quantum Power Level</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-neon-blue to-neon-purple h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${quantumPower}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Current quantum processing capacity: {quantumPower}%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quantum vs Classical Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Quantum vs Classical Computing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-neon-blue">Quantum Computing</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span className="text-sm">Exponential speedup for optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span className="text-sm">Parallel processing in superposition</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span className="text-sm">Global optimization capabilities</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-neon-green" />
                <span className="text-sm">Unlimited scalability potential</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-muted-foreground">Classical Computing</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Linear processing limitations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Sequential problem solving</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Local optimization traps</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Limited scalability</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
