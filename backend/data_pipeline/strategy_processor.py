def get_tire_strategy(session):

    laps = session.laps[['Driver','LapNumber','Compound']]

    strategy = laps.groupby(['Driver','Compound']).count().reset_index()

    strategy = strategy.rename(columns={'LapNumber':'Laps'})

    return strategy.to_dict(orient="records")