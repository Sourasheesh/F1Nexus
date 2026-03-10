import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useCompareDrivers } from '@/hooks/use-f1';
import { ChartWrapper } from './ChartWrapper';
import { GitCompare } from 'lucide-react';

export function DriverComparison({ year, gp, session, driver1, driver2 }: { year: string, gp: string, session: string, driver1: string, driver2: string }) {
  const { data, isLoading, error } = useCompareDrivers(year, gp, session, driver1, driver2);

  const plotData = useMemo(() => {
    if (!data) return [];
    
    return [
      {
        name: `Delta (${driver1} vs ${driver2})`,
        x: data.Distance,
        y: data.DeltaTime,
        mode: 'lines',
        type: 'scatter',
        line: { color: '#e10600', width: 2 },
        fill: 'tozeroy',
        fillcolor: 'rgba(225, 6, 0, 0.15)',
      }
    ];
  }, [data, driver1, driver2]);

  return (
    <ChartWrapper title={`Pace Delta: ${driver1} vs ${driver2}`} isLoading={isLoading} error={error} icon={<GitCompare size={20} />}>
      <Plot
        data={plotData as any}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Rajdhani, sans-serif' },
          xaxis: { 
            title: 'Distance (m)', 
            gridcolor: 'rgba(255,255,255,0.05)',
            zerolinecolor: 'rgba(255,255,255,0.3)'
          },
          yaxis: { 
            title: 'Delta Time (s)', 
            gridcolor: 'rgba(255,255,255,0.05)',
            zerolinecolor: 'rgba(255,255,255,0.3)',
            autorange: 'reversed' // Typically negative delta means faster
          },
          margin: { t: 20, r: 20, b: 40, l: 50 },
          showlegend: false,
          annotations: [
            {
              x: 0,
              y: 1,
              xref: 'paper',
              yref: 'paper',
              text: `Down = ${driver1} Faster`,
              showarrow: false,
              font: { color: '#e10600', size: 12 },
              xanchor: 'left',
              yanchor: 'bottom'
            }
          ]
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </ChartWrapper>
  );
}
