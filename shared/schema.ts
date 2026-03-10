import { z } from "zod";

// ---- LAP DATA ----
// Backend returns orient="records" → array of flat objects
export const lapDataSchema = z.object({
  Driver: z.string(),
  LapNumber: z.number(),
  LapTime: z.number(),         // FIX: backend converts to seconds (float), not string
  Sector1Time: z.number(),     // FIX: was missing
  Sector2Time: z.number(),     // FIX: was missing
  Sector3Time: z.number(),     // FIX: was missing
  Compound: z.string(),
});
export type LapData = z.infer<typeof lapDataSchema>;

// ---- TELEMETRY DATA ----
// Backend returns orient="records" → array of flat objects, NOT one object with arrays
export const telemetryDataSchema = z.object({
  Distance: z.number(),        // FIX: flat number per record, not array
  Speed: z.number(),           // FIX: flat number per record, not array
  Throttle: z.number(),        // FIX: flat number per record, not array
  Brake: z.union([z.boolean(), z.number()]), // FastF1 Brake can be bool or int
});
export type TelemetryData = z.infer<typeof telemetryDataSchema>;

// ---- STRATEGY DATA ----
// Backend returns orient="records" → flat rows of Driver/LapNumber/Compound/Stint
export const strategyDataSchema = z.object({
  Driver: z.string(),
  LapNumber: z.number(),       // FIX: was nested Stints array - backend returns flat rows
  Compound: z.string(),
  Stint: z.number(),           // FIX: added Stint column from updated strategy_processor
});
export type StrategyData = z.infer<typeof strategyDataSchema>;

// ---- COMPARE DATA ----
// Backend returns orient="records" → array of flat objects per distance point
export const compareDataSchema = z.object({
  Distance: z.number(),                        // FIX: flat number per record
  Speed_driver1: z.number().nullable(),        // FIX: was DeltaTime - actual backend fields
  Speed_driver2: z.number().nullable(),
  Throttle_driver1: z.number().nullable(),
  Throttle_driver2: z.number().nullable(),
  Brake_driver1: z.union([z.boolean(), z.number()]).nullable(),
  Brake_driver2: z.union([z.boolean(), z.number()]).nullable(),
  Delta_Speed: z.number().nullable(),          // FIX: was DeltaTime, actual field is Delta_Speed
});
export type CompareData = z.infer<typeof compareDataSchema>;