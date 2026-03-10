def get_driver_telemetry(session, driver):

    lap = session.laps.pick_drivers(driver).pick_fastest()

    telemetry = lap.get_telemetry()

    telemetry = telemetry[['Distance','Speed','Throttle','Brake']]

    return telemetry.to_dict(orient="records")