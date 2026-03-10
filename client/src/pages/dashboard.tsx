import React, { useState } from "react";
import { RaceSelector } from "@/components/RaceSelector";
import { LapChart } from "@/components/LapChart";
import { TelemetryChart } from "@/components/TelemetryChart";
import { DriverComparison } from "@/components/DriverComparison";
import { StrategyChart } from "@/components/StrategyChart";
import { Leaderboard } from "@/components/Leaderboard";
import { Gauge } from "lucide-react";

export default function Dashboard() {
  const [config, setConfig] = useState({
    year: "2023",
    gp: "Bahrain",
    session: "R",
    driver1: "VER",
    driver2: "HAM",
  });

  const handleChange = (field: string, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden pt-6 pb-20">
      {/* Decorative background glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <header className="flex items-center gap-4 mb-8 pb-6 border-b border-border/50">
          <div className="bg-primary text-white p-3 rounded-2xl shadow-[0_0_20px_rgba(225,6,0,0.4)]">
            <Gauge size={28} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight flex items-center gap-3">
              F1<span className="text-gradient-primary">Nexus</span> Analytics
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base font-medium mt-1">
              High-performance telemetry and strategic insights
            </p>
          </div>
        </header>

        {/* Global Controls */}
        <RaceSelector {...config} onChange={handleChange} />

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Top Row: Laps and Strategy */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="h-[450px]">
              <LapChart year={config.year} gp={config.gp} session={config.session} />
            </div>
            <div className="h-[400px]">
              <StrategyChart year={config.year} gp={config.gp} session={config.session} />
            </div>
          </div>

          <div className="lg:col-span-4 h-full min-h-[500px]">
            <Leaderboard year={config.year} gp={config.gp} session={config.session} />
          </div>

          {/* Bottom Row: Telemetry and Comparison */}
          <div className="lg:col-span-6 h-[450px]">
            <TelemetryChart 
              year={config.year} 
              gp={config.gp} 
              session={config.session} 
              driver={config.driver1} 
            />
          </div>
          <div className="lg:col-span-6 h-[450px]">
            <DriverComparison 
              year={config.year} 
              gp={config.gp} 
              session={config.session} 
              driver1={config.driver1} 
              driver2={config.driver2} 
            />
          </div>

        </div>

      </div>
    </div>
  );
}
