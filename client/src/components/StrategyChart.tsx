import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useStrategy } from '@/hooks/use-f1';
import { ChartWrapper } from './ChartWrapper';
import { Layers } from 'lucide-react';

const COMPOUND_COLORS: Record<string, string> = {
  SOFT: '#e10600',
  MEDIUM: '#e5c100',
  HARD: '#ffffff',
  INTERMEDIATE: '#00a33c',
  WET: '#0052cc',
  UNKNOWN: '#888888'
};

export function StrategyChart({ year, gp, session }: { year: string, gp: string, session: string }) {
  const { data, isLoading, error } = useStrategy(year, gp, session);

  const plotData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // FIX: data is now flat rows [{Driver, LapNumber, Compound, Stint}, ...]
    // Group by Driver → Stint → count laps per stint
    const driverStints = new Map<string, Map<number, { compound: string, laps: number }>>();

    for (const row of data) {
      if (!driverStints.has(row.Driver)) driverStints.set(row.Driver, new Map());
      const stints = driverStints.get(row.Driver)!;
      if (!stints.has(row.Stint)) {
        stints.set(row.Stint, { compound: row.Compound, laps: 0 });
      }
      stints.get(row.Stint)!.laps += 1;
    }

    // Find max number of stints across all drivers
    const maxStints = Math.max(...Array.from(driverStints.values()).map(s => s.size), 0);
    const drivers = Array.from(driverStints.keys());
    const traces = [];

    for (let stintNum = 1; stintNum <= maxStints; stintNum++) {
      const x: number[] = [];
      const y: string[] = [];
      const markerColors: string[] = [];
      const texts: string[] = [];

      for (const driver of drivers) {
        const stint = driverStints.get(driver)?.get(stintNum);
        if (stint) {
          x.push(stint.laps);
          y.push(driver);
          markerColors.push(COMPOUND_COLORS[stint.compound?.toUpperCase()] || COMPOUND_COLORS.UNKNOWN);
          texts.push(`${stint.laps}L ${stint.compound}`);
        } else {
          x.push(0);
          y.push(driver);
          markerColors.push('transparent');
          texts.push('');
        }
      }

      traces.push({
        x,
        y,
        name: `Stint ${stintNum}`,
        type: 'bar',
        orientation: 'h',
        marker: {
          color: markerColors,
          line: { color: '#000', width: 2 }
        },
        text: texts,
        textposition: 'inside',
        insidetextanchor: 'middle',
        hoverinfo: 'text'
      });
    }

    return traces;
  }, [data]);

  return (
    <ChartWrapper title="Race Strategy & Stints" isLoading={isLoading} error={error} icon={<Layers size={20} />}>
      <Plot
        data={plotData as any}
        layout={{
          barmode: 'stack',
          autosize: true,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#94a3b8', family: 'Rajdhani, sans-serif' },
          xaxis: {
            title: 'Laps Completed',
            gridcolor: 'rgba(255,255,255,0.05)',
            zerolinecolor: 'rgba(255,255,255,0.1)'
          },
          yaxis: {
            gridcolor: 'rgba(255,255,255,0.05)',
            autorange: 'reversed'
          },
          margin: { t: 20, r: 20, b: 40, l: 60 },
          showlegend: false
        }}
        useResizeHandler={true}
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}
      />
    </ChartWrapper>
  );
}