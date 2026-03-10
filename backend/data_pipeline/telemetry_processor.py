def get_driver_telemetry(session, driver):
    lap = session.laps.pick_drivers(driver).pick_fastest()

    telemetry = lap.get_telemetry()[['Distance', 'Speed', 'Throttle', 'Brake']]

    # Downsample to every 5th row - reduces data by 80% with minimal visual difference
    telemetry = telemetry.iloc[::5].reset_index(drop=True)

    return telemetry.to_dict(orient="records")