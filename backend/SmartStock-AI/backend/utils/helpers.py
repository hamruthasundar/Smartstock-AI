from datetime import datetime


def current_timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def risk_level(prediction):

    if prediction > 1000:
        return "High"

    elif prediction > 500:
        return "Medium"

    return "Low"


def inventory_recommendation(prediction):

    return round(prediction * 1.2)