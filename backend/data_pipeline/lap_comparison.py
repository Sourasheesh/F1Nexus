import pandas as pd
import numpy as np

def compare_driver_laps(session, driver1, driver2):

    lap1 = session.laps.pick_drivers(driver1).pick_fastest()
    lap2 = session.laps.pick_drivers(driver2).pick_fastest()

    tel1 = lap1.get_car_data().add_distance()
    tel2 = lap2.get_car_data().add_distance()

    tel1 = tel1[['Distance','Speed','Throttle','Brake']]
    tel2 = tel2[['Distance','Speed','Throttle','Brake']]

    tel1 = tel1.rename(columns={
        "Speed":"Speed_driver1",
        "Throttle":"Throttle_driver1",
        "Brake":"Brake_driver1"
    })

    tel2 = tel2.rename(columns={
        "Speed":"Speed_driver2",
        "Throttle":"Throttle_driver2",
        "Brake":"Brake_driver2"
    })

    comparison = pd.merge_asof(
        tel1.sort_values("Distance"),
        tel2.sort_values("Distance"),
        on="Distance"
    )

    comparison["Delta_Speed"] = comparison["Speed_driver1"] - comparison["Speed_driver2"]
    comparison = comparison.replace({np.nan: None})
    return comparison.to_dict(orient="list")