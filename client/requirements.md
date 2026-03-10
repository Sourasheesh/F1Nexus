## Packages
react-plotly.js | Essential for high-performance scientific and telemetry charting as specified
plotly.js | Core rendering engine for react-plotly.js
@types/plotly.js | TypeScript definitions for Plotly
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility to merge tailwind classes safely

## Notes
The application features a custom data fetching layer in `client/src/services/api.ts` that specifically targets `http://localhost:8000` to fetch telemetry, lap, strategy, and comparison data as required by the backend integration pattern.
Tailwind configuration relies on standard colors but overrides background and text to enforce a strict, premium dark mode.
