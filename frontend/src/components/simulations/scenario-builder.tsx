'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit, Save } from 'lucide-react'

export function ScenarioBuilder() {
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: 'Market Crash Scenario',
      probability: 0.15,
      impact: 'high',
      description: 'Global market downturn with 30% portfolio loss'
    },
    {
      id: 2,
      name: 'Regulatory Change',
      probability: 0.25,
      impact: 'medium',
      description: 'New compliance requirements affecting operations'
    },
    {
      id: 3,
      name: 'Technology Disruption',
      probability: 0.35,
      impact: 'high',
      description: 'AI breakthrough disrupting current business models'
    }
  ])

  const [newScenario, setNewScenario] = useState({
    name: '',
    probability: 0.1,
    impact: 'low',
    description: ''
  })

  const addScenario = () => {
    if (newScenario.name && newScenario.description) {
      const scenario = {
        id: Date.now(),
        ...newScenario
      }
      setScenarios([...scenarios, scenario])
      setNewScenario({ name: '', probability: 0.1, impact: 'low', description: '' })
    }
  }

  const deleteScenario = (id: number) => {
    setScenarios(scenarios.filter(s => s.id !== id))
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-neon-red/20 text-neon-red border-neon-red'
      case 'medium': return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow'
      case 'low': return 'bg-neon-green/20 text-neon-green border-neon-green'
      default: return 'bg-muted/20 text-muted-foreground border-muted'
    }
  }

  return (
    <div className="palantir-card p-6">
      <h3 className="tesla-heading text-xl font-semibold mb-4">Scenario Builder</h3>
      
      <div className="space-y-4">
        {/* Add New Scenario */}
        <div className="border border-border rounded-lg p-4">
          <h4 className="font-medium mb-3">Add New Scenario</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Scenario Name</label>
              <input
                type="text"
                value={newScenario.name}
                onChange={(e) => setNewScenario({...newScenario, name: e.target.value})}
                className="palantir-input"
                placeholder="Enter scenario name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Probability: {Math.round(newScenario.probability * 100)}%</label>
              <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={newScenario.probability}
                onChange={(e) => setNewScenario({...newScenario, probability: Number(e.target.value)})}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Impact Level</label>
              <select
                value={newScenario.impact}
                onChange={(e) => setNewScenario({...newScenario, impact: e.target.value})}
                className="palantir-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Description</label>
              <input
                type="text"
                value={newScenario.description}
                onChange={(e) => setNewScenario({...newScenario, description: e.target.value})}
                className="palantir-input"
                placeholder="Describe the scenario"
              />
            </div>
          </div>
          <motion.button
            onClick={addScenario}
            className="mt-3 flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 text-neon-blue border border-neon-blue rounded-md hover:bg-neon-blue/30 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Scenario</span>
          </motion.button>
        </div>

        {/* Existing Scenarios */}
        <div className="space-y-3">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.id}
              className="border border-border rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{scenario.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded border ${getImpactColor(scenario.impact)}`}>
                      {scenario.impact}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(scenario.probability * 100)}% probability
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    className="p-2 hover:bg-muted rounded-md transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => deleteScenario(scenario.id)}
                    className="p-2 hover:bg-neon-red/20 text-neon-red rounded-md transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
