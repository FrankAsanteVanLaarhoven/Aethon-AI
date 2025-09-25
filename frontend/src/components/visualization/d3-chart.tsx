'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { cn } from '@/lib/utils'

interface D3ChartProps {
  data: any[]
  type: 'line' | 'bar' | 'scatter' | 'area' | 'heatmap'
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
  title?: string
  subtitle?: string
  className?: string
  color?: string
  showGrid?: boolean
  showTooltip?: boolean
}

export function D3Chart({
  data,
  type,
  width = 800,
  height = 400,
  margin = { top: 20, right: 30, bottom: 40, left: 40 },
  title,
  subtitle,
  className,
  color = 'hsl(var(--neon-blue))',
  showGrid = true,
  showTooltip = true
}: D3ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width, height })

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current?.parentElement) {
        const containerWidth = svgRef.current.parentElement.clientWidth
        setDimensions({ width: containerWidth, height })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [height])

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const { width: w, height: h } = dimensions
    const innerWidth = w - margin.left - margin.right
    const innerHeight = h - margin.top - margin.bottom

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x) as [number, number])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y) as [number, number])
      .range([innerHeight, 0])

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Add grid
    if (showGrid) {
      g.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickFormat(() => '')
        )
        .style('stroke', 'hsl(var(--border))')
        .style('stroke-opacity', 0.3)

      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
        )
        .style('stroke', 'hsl(var(--border))')
        .style('stroke-opacity', 0.3)
    }

    // Add axes
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style('color', 'hsl(var(--foreground))')

    g.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .style('color', 'hsl(var(--foreground))')

    // Create tooltip
    const tooltip = showTooltip ? d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '8px 12px')
      .style('background', 'hsl(var(--card))')
      .style('border', '1px solid hsl(var(--border))')
      .style('border-radius', '6px')
      .style('font-size', '12px')
      .style('color', 'hsl(var(--foreground))')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', 1000) : null

    // Render chart based on type
    switch (type) {
      case 'line':
        const line = d3.line<{ x: number; y: number }>()
          .x(d => xScale(d.x))
          .y(d => yScale(d.y))
          .curve(d3.curveMonotoneX)

        g.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('d', line)

        // Add dots
        g.selectAll('.dot')
          .data(data)
          .enter().append('circle')
          .attr('class', 'dot')
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r', 4)
          .attr('fill', color)
          .attr('stroke', 'hsl(var(--background))')
          .attr('stroke-width', 2)
          .on('mouseover', (event, d) => {
            if (tooltip) {
              tooltip.transition().duration(200).style('opacity', 0.9)
              tooltip.html(`X: ${d.x}<br/>Y: ${d.y}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px')
            }
          })
          .on('mouseout', () => {
            if (tooltip) {
              tooltip.transition().duration(500).style('opacity', 0)
            }
          })
        break

      case 'bar':
        g.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => xScale(d.x) - (innerWidth / data.length) / 2)
          .attr('width', innerWidth / data.length * 0.8)
          .attr('y', d => yScale(d.y))
          .attr('height', d => innerHeight - yScale(d.y))
          .attr('fill', color)
          .attr('opacity', 0.8)
          .on('mouseover', (event, d) => {
            if (tooltip) {
              tooltip.transition().duration(200).style('opacity', 0.9)
              tooltip.html(`X: ${d.x}<br/>Y: ${d.y}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px')
            }
          })
          .on('mouseout', () => {
            if (tooltip) {
              tooltip.transition().duration(500).style('opacity', 0)
            }
          })
        break

      case 'scatter':
        g.selectAll('.dot')
          .data(data)
          .enter().append('circle')
          .attr('class', 'dot')
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r', 6)
          .attr('fill', color)
          .attr('opacity', 0.7)
          .on('mouseover', (event, d) => {
            if (tooltip) {
              tooltip.transition().duration(200).style('opacity', 0.9)
              tooltip.html(`X: ${d.x}<br/>Y: ${d.y}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px')
            }
          })
          .on('mouseout', () => {
            if (tooltip) {
              tooltip.transition().duration(500).style('opacity', 0)
            }
          })
        break

      case 'area':
        const area = d3.area<{ x: number; y: number }>()
          .x(d => xScale(d.x))
          .y0(innerHeight)
          .y1(d => yScale(d.y))
          .curve(d3.curveMonotoneX)

        g.append('path')
          .datum(data)
          .attr('fill', color)
          .attr('fill-opacity', 0.3)
          .attr('d', area)
        break
    }

    return () => {
      if (tooltip) {
        tooltip.remove()
      }
    }
  }, [data, type, dimensions, margin, color, showGrid, showTooltip])

  if (!data || data.length === 0) {
    return (
      <div className={cn('viz-container', className)}>
        <div className="viz-header">
          <div>
            {title && <h3 className="viz-title">{title}</h3>}
            {subtitle && <p className="viz-subtitle">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No data available
        </div>
      </div>
    )
  }

  return (
    <div className={cn('viz-container', className)}>
      <div className="viz-header">
        <div>
          {title && <h3 className="viz-title">{title}</h3>}
          {subtitle && <p className="viz-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}
