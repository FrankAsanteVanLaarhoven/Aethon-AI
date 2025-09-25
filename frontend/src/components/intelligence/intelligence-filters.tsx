'use client'

import React, { useState } from 'react'
import { Filter, Search, Calendar, Globe } from 'lucide-react'

export function IntelligenceFilters() {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="palantir-card p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search intelligence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="palantir-input pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="palantir-select"
          >
            <option value="all">All Regions</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="global">Global</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="palantir-select"
          >
            <option value="all">All Types</option>
            <option value="market">Market Intelligence</option>
            <option value="competitive">Competitive Intelligence</option>
            <option value="regulatory">Regulatory Updates</option>
            <option value="threat">Threat Intelligence</option>
          </select>
        </div>
      </div>
    </div>
  )
}
