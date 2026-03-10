import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useLapData } from '@/hooks/use-f1';
import { ChartWrapper } from './ChartWrapper';
import { Activity } from 'lucide-react';

const COMPOUND_COLORS: Record<string, string> = {
  SOFT: '#e10600',
  MEDIUM: '#e5c100',
  HARD: '#ffffff',
  INTERMEDIATE: '#00a33c',
  WET: '#0052cc',
  UNKNOWN: '#888888'
};

// FIX: LapTime is already a number (seconds) from backend — no parsing needed
function formatSeconds(sec: number): string {
  const mins = Math.floor(sec / 60);
  const secs = (sec % 60).toFixed(3);
  return `${mins}:${secs.padStart(6, '0')}`;
}

export function LapChart({ year, gp, session }: { year: string, gp: string, session: string }) {
  const { data, isLoading, error } = useLapData(year, gp, session);

  const plotData = useMemo(() => {
    if (!data) return [];

    const grouped = data.reduce((acc, lap) => {
      if (!acc[lap.Driver]) acc[lap.Driver] = { x: [], y: [], text: [], marker: { color: [] } };

      // FIX: lap.LapTime is already a number — use directly
      const seconds = lap.LapTime;
      if (seconds) {
        acc[lap.Driver].x.push(lap.LapNumber);
        acc[lap.Driver].y.push(seconds);
        acc[lap.Driver].text.push(`Lap ${lap.LapNumber}<br>${formatSeconds(seconds)}<br>${lap.Compound}`);
        acc[lap.Driver].marker.color.push(COMPOUND_COLORS[lap.Compound?.toUpperCase()] || COMPOUND_COLORS.UNKNOWN);
      }
      return acc;
    }, {} as Record<string, any>);

    return Object.entries(grouped).map(([driver, traces]) => ({
      name: driver,
      x: traces.x,
      y: traces.y,
      text: traces.text,
      mode: 'lines+markers',
      type: 'scatter',
      hoverinfo: 'text+name',
      marker: {
        size: 6,
        color: traces.marker.color,
        line: { width: 1, color: '#111' }
      },
      line: { width: 2, color: 'rgba(255,255,255,0.2)' }
    }));
  }, [data]);

  return (
    <ChartWrapper title="Lap Times Overview" isLoading={isLoading} error={error} icon={<Activity size={20} />}>
      <Plot
        data={plotData as any}
        layout={{
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Rajdhani, sans-serif' },
          xaxis: {
            title: 'Lap Number',
            gridcolor: 'rgba(255,255,255,0.05)',
            zerolinecolor: 'rgba(255,255,255,0.1)'
          },
          yaxis: {
            title: 'Time (Seconds)',
            gridcolor: 'rgba(255,255,255,0.05)',
            zerolinecolor: 'rgba(255,255,255,0.1)'
          },
          margin: { t: 20, r: 20, b: 40, l: 50 },
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