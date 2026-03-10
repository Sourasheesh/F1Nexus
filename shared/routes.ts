import { z } from 'zod';
import { lapDataSchema, telemetryDataSchema, strategyDataSchema, compareDataSchema } from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  f1: {
    laps: {
      method: 'GET' as const,
      path: '/laps' as const,
      input: z.object({
        year: z.string(),
        gp: z.string(),
        session: z.string()
      }),
      responses: {
        200: z.array(lapDataSchema)
      }
    },
    telemetry: {
      method: 'GET' as const,
      path: '/telemetry' as const,
      input: z.object({
        year: z.string(),
        gp: z.string(),
        session: z.string(),
        driver: z.string()
      }),
      responses: {
        200: telemetryDataSchema
      }
    },
    strategy: {
      method: 'GET' as const,
      path: '/strategy' as const,
      input: z.object({
        year: z.string(),
        gp: z.string(),
        session: z.string()
      }),
      responses: {
        200: z.array(strategyDataSchema)
      }
    },
    compare: {
      method: 'GET' as const,
      path: '/compare' as const,
      input: z.object({
        year: z.string(),
        gp: z.string(),
        session: z.string(),
        driver1: z.string(),
        driver2: z.string()
      }),
      responses: {
        200: compareDataSchema
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
