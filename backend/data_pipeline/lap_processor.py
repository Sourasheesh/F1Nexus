import pandas as pd

def extract_lap_data(session):
    laps = session.laps[
        ['Driver', 'LapNumber', 'LapTime', 'Sector1Time', 'Sector2Time', 'Sector3Time', 'Compound']
    ].dropna().copy()

    # Convert timedelta to seconds
    for col in ['LapTime', 'Sector1Time', 'Sector2Time', 'Sector3Time']:
        laps[col] = laps[col].dt.total_seconds()

    # Downcast numbers to save memory
    laps['LapNumber'] = laps['LapNumber'].astype('int16')
    for col in ['LapTime', 'Sector1Time', 'Sector2Time', 'Sector3Time']:
        laps[col] = laps[col].astype('float32')

    return laps.to_dict(orient="records")