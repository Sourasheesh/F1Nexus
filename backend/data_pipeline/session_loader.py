import fastf1
import os
from data_pipeline.lap_processor import extract_lap_data
from data_pipeline.strategy_processor import get_tire_strategy
from data_pipeline.lap_comparison import compare_driver_laps
from data_pipeline.telemetry_processor import get_driver_telemetry



os.makedirs("cache", exist_ok=True)

fastf1.Cache.enable_cache("cache")

def load_session(year, gp, session_type):
    """
    Loads an F1 session using FastF1
    """

    session = fastf1.get_session(year, gp, session_type)
    session.load()

    return session

