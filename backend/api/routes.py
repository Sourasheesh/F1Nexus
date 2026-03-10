from fastapi import APIRouter

from data_pipeline.session_loader import load_session
from data_pipeline.lap_processor import extract_lap_data
from data_pipeline.telemetry_processor import get_driver_telemetry
from data_pipeline.strategy_processor import get_tire_strategy
from data_pipeline.lap_comparison import compare_driver_laps

router = APIRouter()

@router.get("/")
def home():
    return {"message": "F1Nexus API running"}

@router.get("/laps")
def get_laps(year: int, gp: str, session: str):

    session_obj = load_session(year, gp, session)

    laps = extract_lap_data(session_obj)

    return laps

@router.get("/telemetry")
def telemetry(year:int, gp:str, session:str, driver:str):

    session_obj = load_session(year,gp,session)

    tel = get_driver_telemetry(session_obj,driver)

    return tel

@router.get("/strategy")
def strategy(year:int,gp:str,session:str):

    session_obj = load_session(year,gp,session)

    strategy = get_tire_strategy(session_obj)

    return strategy

@router.get("/compare")
def compare(year:int, gp:str, session:str, driver1:str, driver2:str):

    try:
        session_obj = load_session(year, gp, session)

        result = compare_driver_laps(session_obj, driver1, driver2)

        return result

    except Exception as e:
        print("ERROR:", e)

        return {"error": str(e)}
