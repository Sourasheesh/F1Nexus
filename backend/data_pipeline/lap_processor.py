import pandas as pd

def extract_lap_data(session):

    laps = session.laps[
        ['Driver','LapNumber','LapTime','Sector1Time','Sector2Time','Sector3Time','Compound']
    ]

    laps = laps.dropna()

    # Convert timedelta to seconds
    laps['LapTime'] = laps['LapTime'].dt.total_seconds()
    laps['Sector1Time'] = laps['Sector1Time'].dt.total_seconds()
    laps['Sector2Time'] = laps['Sector2Time'].dt.total_seconds()
    laps['Sector3Time'] = laps['Sector3Time'].dt.total_seconds()

    return laps.to_dict(orient="records")