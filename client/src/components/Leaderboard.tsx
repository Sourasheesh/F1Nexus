import React, { useMemo } from 'react';
import { useLapData } from '@/hooks/use-f1';
import { Trophy, Timer } from 'lucide-react';

// FIX: LapTime is already a number (seconds) from backend — no parsing needed
// This helper just formats it for display
function formatSeconds(sec: number): string {
  const mins = Math.floor(sec / 60);
  const secs = (sec % 60).toFixed(3);
  return `${mins}:${secs.padStart(6, '0')}`;
}

export function Leaderboard({ year, gp, session }: { year: string, gp: string, session: string }) {
  const { data, isLoading, error } = useLapData(year, gp, session);

  const bestLaps = useMemo(() => {
    if (!data) return [];

    const driverBest = new Map<string, { timeSec: number, lap: number, compound: string }>();

    data.forEach(lap => {
      // FIX: lap.LapTime is already a number — use directly
      const sec = lap.LapTime;
      if (sec) {
        const current = driverBest.get(lap.Driver);
        if (!current || sec < current.timeSec) {
          driverBest.set(lap.Driver, {
            timeSec: sec,
            lap: lap.LapNumber,
            compound: lap.Compound
          });
        }
      }
    });

    return Array.from(driverBest.entries())
      .map(([driver, details]) => ({ driver, ...details }))
      .sort((a, b) => a.timeSec - b.timeSec);
  }, [data]);

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50 bg-background/30">
        <Trophy className="text-primary w-5 h-5" />
        <h3 className="font-display font-medium text-lg text-white">Session Best Laps</h3>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-white/5 animate-pulse rounded-lg w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">Failed to load leaderboard</div>
        ) : bestLaps.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">No lap data available</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-white/5">
                <th className="p-4 font-semibold">Pos</th>
                <th className="p-4 font-semibold">Driver</th>
                <th className="p-4 font-semibold">Best Time</th>
                <th className="p-4 font-semibold">Gap</th>
                <th className="p-4 font-semibold">Lap</th>
                <th className="p-4 font-semibold">Tyre</th>
              </tr>
            </thead>
            <tbody>
              {bestLaps.map((row, idx) => {
                const gap = idx === 0 ? "-" : `+${(row.timeSec - bestLaps[0].timeSec).toFixed(3)}`;
                return (
                  <tr
                    key={row.driver}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4">
                      <span className={`font-display font-bold ${idx === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-white tracking-wider">{row.driver}</td>
                    <td className="p-4 text-emerald-400 font-mono flex items-center gap-2">
                      {/* FIX: format the number for display */}
                      <Timer size={14} className="opacity-50" /> {formatSeconds(row.timeSec)}
                    </td>
                    <td className="p-4 text-white/60 font-mono text-sm">{gap}</td>
                    <td className="p-4 text-white/60 text-sm">Lap {row.lap}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-bold
                        ${row.compound.toUpperCase() === 'SOFT' ? 'bg-red-500/20 text-red-400' :
                          row.compound.toUpperCase() === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                          row.compound.toUpperCase() === 'HARD' ? 'bg-white/20 text-white' :
                          'bg-blue-500/20 text-blue-400'}
                      `}>
                        {row.compound.charAt(0).toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}