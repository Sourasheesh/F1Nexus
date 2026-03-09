import matplotlib.pyplot as plt
from session_loader import load_session
from lap_processor import extract_lap_data
from telemetry_processor import get_driver_telemetry
from strategy_processor import get_tire_strategy
from lap_comparison import compare_driver_laps

session = load_session(2020,"Monaco","R")

lap_comp = compare_driver_laps(session,'VER', 'HAM')

print(lap_comp.head())



plt.plot(lap_comp["Distance"], lap_comp["Delta_Speed"])

plt.xlabel("Track Distance")
plt.ylabel("Delta Time")

plt.title("VER vs HAM Lap Delta")

plt.show()