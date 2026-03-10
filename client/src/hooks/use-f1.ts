import { useQuery } from "@tanstack/react-query";
import { getLapData, getTelemetry, getStrategy, compareDrivers } from "../services/api";
import { z } from "zod";
import { lapDataSchema, telemetryDataSchema, strategyDataSchema, compareDataSchema } from "@shared/schema";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw new Error(`Validation failed for ${label}`);
  }
  return result.data;
}

export function useLapData(year: string, gp: string, session: string) {
  return useQuery({
    queryKey: ["laps", year, gp, session],
    queryFn: async () => {
      const data = await getLapData(year, gp, session);
      return parseWithLogging(z.array(lapDataSchema), data, "LapData");
    },
    enabled: Boolean(year && gp && session),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTelemetry(year: string, gp: string, session: string, driver: string) {
  return useQuery({
    queryKey: ["telemetry", year, gp, session, driver],
    queryFn: async () => {
      const data = await getTelemetry(year, gp, session, driver);
      // FIX: was telemetryDataSchema (single object) — backend returns array of records
      return parseWithLogging(z.array(telemetryDataSchema), data, "TelemetryData");
    },
    enabled: Boolean(year && gp && session && driver),
    staleTime: 5 * 60 * 1000,
  });
}

export function useStrategy(year: string, gp: string, session: string) {
  return useQuery({
    queryKey: ["strategy", year, gp, session],
    queryFn: async () => {
      const data = await getStrategy(year, gp, session);
      return parseWithLogging(z.array(strategyDataSchema), data, "StrategyData");
    },
    enabled: Boolean(year && gp && session),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCompareDrivers(year: string, gp: string, session: string, driver1: string, driver2: string) {
  return useQuery({
    queryKey: ["compare", year, gp, session, driver1, driver2],
    queryFn: async () => {
      const data = await compareDrivers(year, gp, session, driver1, driver2);
      // FIX: was compareDataSchema (single object) — backend returns array of records
      return parseWithLogging(z.array(compareDataSchema), data, "CompareData");
    },
    enabled: Boolean(year && gp && session && driver1 && driver2),
    staleTime: 5 * 60 * 1000,
  });
}