'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { PlotParams } from 'react-plotly.js'

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface PlotlyChartProps {
  data: any[]
  layout?: Partial<PlotParams['layout']>
  config?: Partial<PlotParams['config']>
  type?: 'line' | 'bar' | 'scatter' | 'pie' | 'heatmap' | '3d' | 'surface'
  title?: string
  subtitle?: string
  height?: number
  className?: string
}

export function PlotlyChart({
  data,
  layout,
  config,
  type = 'line',
  title,
  subtitle,
  height = 400,
  className = ''
}: PlotlyChartProps) {
  const plotData = useMemo(() => {
    if (!data || data.length === 0) return []
    
    return data.map((item, index) => ({
      ...item,
      line: type === 'line' ? {
        color: `hsl(${index * 60}, 70%, 50%)`,
        width: 2,
        shape: 'spline'
      } : undefined,
      marker: type === 'scatter' || type === 'bar' ? {
        color: `hsl(${index * 60}, 70%, 50%)`,
        size: 8,
        line: {
          color: 'hsl(var(--background))',
          width: 1
        }
      } : undefined,
      type: type === '3d' ? 'scatter3d' : type === 'surface' ? 'surface' : type,
      mode: type === 'scatter' ? 'markers+lines' : undefined,
      hovertemplate: '<b>%{fullData.name}</b><br>' +
        'X: %{x}<br>' +
        'Y: %{y}<br>' +
        '<extra></extra>',
    }))
  }, [data, type])

  const plotLayout = useMemo(() => ({
    title: title ? {
      text: title,
      font: {
        family: 'Inter, system-ui, sans-serif',
        size: 18,
        color: 'hsl(var(--foreground))'
      },
      x: 0.05,
      xanchor: 'left' as const
    } : undefined,
    font: {
      family: 'Inter, system-ui, sans-serif',
      size: 12,
      color: 'hsl(var(--foreground))'
    },
    paper_bgcolor: 'hsl(var(--background))',
    plot_bgcolor: 'hsl(var(--background))',
    xaxis: {
      gridcolor: 'hsl(var(--border))',
      linecolor: 'hsl(var(--border))',
      tickcolor: 'hsl(var(--border))',
      zerolinecolor: 'hsl(var(--border))',
      showgrid: true,
      gridwidth: 1,
      zeroline: false,
    },
    yaxis: {
      gridcolor: 'hsl(var(--border))',
      linecolor: 'hsl(var(--border))',
      tickcolor: 'hsl(var(--border))',
      zerolinecolor: 'hsl(var(--border))',
      showgrid: true,
      gridwidth: 1,
      zeroline: false,
    },
    margin: {
      l: 60,
      r: 30,
      t: title ? 60 : 30,
      b: 60
    },
    showlegend: data.length > 1,
    legend: {
      orientation: 'h' as const,
      yanchor: 'bottom' as const,
      y: -0.2,
      xanchor: 'right' as const,
      x: 1,
      font: {
        color: 'hsl(var(--foreground))'
      }
    },
    ...layout
  }), [title, layout, data.length])

  const plotConfig = useMemo(() => ({
    responsive: true,
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'] as any,
    displaylogo: false,
    toImageButtonOptions: {
      format: 'png' as const,
      filename: title || 'chart',
      height: height,
      width: undefined,
      scale: 2
    },
    ...config
  }), [title, height, config])

  if (!data || data.length === 0) {
    return (
      <div className={`viz-container ${className}`}>
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
    <div className={`viz-container ${className}`}>
      <div className="viz-header">
        <div>
          {title && <h3 className="viz-title">{title}</h3>}
          {subtitle && <p className="viz-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="w-full">
        <Plot
          data={plotData}
          layout={plotLayout}
          config={plotConfig}
          style={{ width: '100%', height: `${height}px` }}
          useResizeHandler={true}
        />
      </div>
    </div>
  )
}
