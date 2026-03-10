import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface ChartWrapperProps {
  title: string;
  isLoading: boolean;
  error?: Error | null;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function ChartWrapper({ title, isLoading, error, children, icon }: ChartWrapperProps) {
  return (
    <div className="glass-panel rounded-2xl p-1 flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/5 hover:border-primary/20">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-background/30 rounded-t-xl">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="font-display font-medium text-lg text-white/90">{title}</h3>
      </div>
      
      <div className="p-4 flex-1 relative min-h-[350px]">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10 rounded-b-xl">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground font-medium animate-pulse">Crunching telemetry...</p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm z-10 rounded-b-xl px-6 text-center">
            <AlertCircle className="w-10 h-10 text-destructive mb-4" />
            <p className="text-white font-medium mb-2">Failed to load data</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        ) : (
          <div className="w-full h-full animate-in fade-in duration-500">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
