const BASE_URL = "http://127.0.0.1:8000";

/**
 * Fetch lap data for a specific race session
 */
export async function getLapData(year: string, gp: string, session: string) {
  const url = `${BASE_URL}/laps?year=${encodeURIComponent(year)}&gp=${encodeURIComponent(gp)}&session=${encodeURIComponent(session)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch lap data: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch telemetry data for a specific driver in a session
 */
export async function getTelemetry(year: string, gp: string, session: string, driver: string) {
  const url = `${BASE_URL}/telemetry?year=${encodeURIComponent(year)}&gp=${encodeURIComponent(gp)}&session=${encodeURIComponent(session)}&driver=${encodeURIComponent(driver)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch telemetry data: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch strategy stints for a race
 */
export async function getStrategy(year: string, gp: string, session: string) {
  const url = `${BASE_URL}/strategy?year=${encodeURIComponent(year)}&gp=${encodeURIComponent(gp)}&session=${encodeURIComponent(session)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch strategy data: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch comparative delta time between two drivers
 */
export async function compareDrivers(year: string, gp: string, session: string, driver1: string, driver2: string) {
  const url = `${BASE_URL}/compare?year=${encodeURIComponent(year)}&gp=${encodeURIComponent(gp)}&session=${encodeURIComponent(session)}&driver1=${encodeURIComponent(driver1)}&driver2=${encodeURIComponent(driver2)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch comparison data: ${res.statusText}`);
  }
  return res.json();
}
