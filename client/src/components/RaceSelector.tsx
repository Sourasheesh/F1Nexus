import React from 'react';
import { Settings, Calendar, MapPin, Flag, Users } from 'lucide-react';

interface RaceSelectorProps {
  year: string;
  gp: string;
  session: string;
  driver1: string;
  driver2: string;
  onChange: (field: string, value: string) => void;
}

const YEARS = ["2024", "2023", "2022", "2021"];
const GPS = ["Bahrain", "Saudi Arabia", "Australia", "Japan", "Miami", "Monaco", "Silverstone", "Monza", "Spa", "Austin", "Las Vegas"];
const SESSIONS = [
  { value: "FP1", label: "Practice 1" },
  { value: "FP2", label: "Practice 2" },
  { value: "FP3", label: "Practice 3" },
  { value: "Q", label: "Qualifying" },
  { value: "R", label: "Race" }
];
const DRIVERS = ["VER", "PER", "HAM", "RUS", "LEC", "SAI", "NOR", "PIA", "ALO", "STR"];

export function RaceSelector({ year, gp, session, driver1, driver2, onChange }: RaceSelectorProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 mb-8 border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/20 rounded-lg text-primary">
          <Settings size={20} className="animate-[spin_10s_linear_infinite]" />
        </div>
        <h2 className="text-xl font-display font-semibold text-white">Event Configuration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Year */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar size={14} /> Season
          </label>
          <select 
            value={year}
            onChange={(e) => onChange('year', e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            {YEARS.map(y => <option key={y} value={y} className="bg-card text-white">{y}</option>)}
          </select>
        </div>

        {/* Grand Prix */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin size={14} /> Grand Prix
          </label>
          <select 
            value={gp}
            onChange={(e) => onChange('gp', e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            {GPS.map(g => <option key={g} value={g} className="bg-card text-white">{g}</option>)}
          </select>
        </div>

        {/* Session */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Flag size={14} /> Session
          </label>
          <select 
            value={session}
            onChange={(e) => onChange('session', e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            {SESSIONS.map(s => <option key={s.value} value={s.value} className="bg-card text-white">{s.label}</option>)}
          </select>
        </div>

        {/* Driver 1 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users size={14} /> Primary Driver
          </label>
          <select 
            value={driver1}
            onChange={(e) => onChange('driver1', e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none cursor-pointer"
          >
            {DRIVERS.map(d => <option key={d} value={d} className="bg-card text-white">{d}</option>)}
          </select>
        </div>

        {/* Driver 2 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users size={14} /> Comparison Driver
          </label>
          <select 
            value={driver2}
            onChange={(e) => onChange('driver2', e.target.value)}
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none cursor-pointer"
          >
            {DRIVERS.map(d => <option key={d} value={d} className="bg-card text-white">{d}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
