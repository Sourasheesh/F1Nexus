import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useTelemetry } from '@/hooks/use-f1';
import { ChartWrapper } from './ChartWrapper';
import { Zap } from 'lucide-react';

export function TelemetryChart({ year, gp, session, driver }: { year: string, gp: string, session: string, driver: string }) {
  const { data, isLoading, error } = useTelemetry(year, gp, session, driver);

  const plotData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // FIX: data is now array of records [{Distance, Speed, Throttle, Brake}, ...]
    // Extract each field into arrays for Plotly
    const Distance = data.map(d => d.Distance);
    const Speed    = data.map(d => d.Speed);
    const Throttle = data.map(d => d.Throttle);
    const Brake    = data.map(d => (Number(d.Brake) > 0 ? 100 : 0));

    return [
      {
        name: 'Speed (km/h)',
        x: Distance,
        y: Speed,
        mode: 'lines',
        type: 'scatter',
        line: { color: '#00d2ff', width: 2 },
        yaxis: 'y'
      },
      {
        name: 'Throttle (%)',
        x: Distance,
        y: Throttle,
        mode: 'lines',
        type: 'scatter',
        line: { color: '#00ff88', width: 1.5, dash: 'dot' },
        yaxis: 'y2'
      },
      {
        name: 'Brake',
        x: Distance,
        y: Brake,
        mode: 'lines',
        type: 'scatter',
        line: { color: '#e10600', width: 1.5, shape: 'hv' },
        fill: 'tozeroy',
        fillcolor: 'rgba(225, 6, 0, 0.2)',
        yaxis: 'y2'
      }
    ];
  }, [data]);

  return (
    <ChartWrapper title={`Telemetry: ${driver}`} isLoading={isLoading} error={error} icon={<Zap size={20} />}>
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
            zerolinecolor: 'rgba(255,255,255,0.1)'
          },
          yaxis: {
            title: 'Speed (km/h)',
            gridcolor: 'rgba(255,255,255,0.05)',
            zerolinecolor: 'rgba(255,255,255,0.1)',
            side: 'left'
          },
          yaxis2: {
            title: 'Input (%)',
            overlaying: 'y',
            side: 'right',
            range: [0, 105],
            showgrid: false
          },
          margin: { t: 20, r: 50, b: 40, l: 50 },
          showlegend: true,
          legend: { orientation: 'h', y: -0.2 }
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </ChartWrapper>
  );
}