import fastf1
import os

# Use /tmp for Railway (ephemeral but prevents re-download within same session)
cache_dir = '/tmp/fastf1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

def load_session(year, gp, session_type, telemetry=False):
    """
    Loads an F1 session using FastF1.
    Only loads what is needed to minimize memory usage.
    
    Args:
        year: Season year (e.g. 2023)
        gp: Grand Prix name (e.g. 'Bahrain')
        session_type: Session type (e.g. 'R', 'Q')
        telemetry: Set True only when telemetry data is needed
    """
    session = fastf1.get_session(year, gp, session_type)
    session.load(
        laps=True,
        telemetry=telemetry,      # only load when explicitly needed
        weather=False,             # saves significant memory
        messages=False             # saves significant memory
    )
    return session