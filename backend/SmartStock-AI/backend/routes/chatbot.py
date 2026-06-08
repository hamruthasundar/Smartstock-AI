from flask import Blueprint
from flask import request
from flask import jsonify

from config.db import (
    chat_collection,
    prediction_collection
)

from datetime import datetime

chatbot_bp = Blueprint(
    "chatbot",
    __name__
)


def get_prediction_count():

    return prediction_collection.count_documents({})


def get_latest_prediction():

    latest = prediction_collection.find_one(
        sort=[("_id", -1)]
    )

    if latest:
        return latest

    return None


def generate_response(message):

    msg = message.lower()

    total_predictions = prediction_collection.count_documents({})

    latest = prediction_collection.find_one(
        sort=[("_id", -1)]
    )

    all_predictions = list(
        prediction_collection.find({})
    )

    # -----------------------------------
    # Greeting
    # -----------------------------------

    if (
    msg.strip() == "hello"
    or msg.strip() == "hi"
    or msg.strip() == "hey"
):

        return (
            "👋 Hello! I am SmartStock AI.\n\n"
            "You can ask:\n"
            "• Latest prediction\n"
            "• Prediction count\n"
            "• Highest demand region\n"
            "• Most predicted category\n"
            "• Risk distribution"
        )

    # -----------------------------------
    # Prediction Count
    # -----------------------------------

    if "prediction count" in msg:

        return (
            f"📊 Total stored predictions: "
            f"{total_predictions}"
        )

    # -----------------------------------
    # Latest Prediction
    # -----------------------------------

    if "latest prediction" in msg:

        if not latest:

            return "No predictions found."

        return (
            f"📦 Latest forecast value: "
            f"{round(float(latest.get('prediction',0)),2)}"
        )

    # -----------------------------------
    # Highest Demand Region
    # -----------------------------------

    if (
        "highest demand region" in msg
        or
        "which region" in msg
        or
        "top region" in msg
    ):

        if not all_predictions:

            return "No prediction data available."

        region_totals = {}

        for item in all_predictions:

            region = item.get(
                "inputs",
                {}
            ).get(
                "region",
                "Unknown"
            )

            region_totals[region] = (
                region_totals.get(region,0)
                +
                item["prediction"]
            )

        best_region = max(
            region_totals,
            key=region_totals.get
        )

        return (
            f"🏆 Region with highest demand: "
            f"{best_region}"
        )

    # -----------------------------------
    # Top Category
    # -----------------------------------

    if (
        "category" in msg
        or
        "most predicted category" in msg
    ):

        if not all_predictions:

            return "No prediction data available."

        category_totals = {}

        for item in all_predictions:

            category = item.get(
                "inputs",
                {}
            ).get(
                "category",
                "Unknown"
            )

            category_totals[category] = (
                category_totals.get(category,0)
                +
                item["prediction"]
            )

        best_category = max(
            category_totals,
            key=category_totals.get
        )

        return (
            f"📦 Most demanded category: "
            f"{best_category}"
        )

    # -----------------------------------
    # Highest Risk
    # -----------------------------------

    if (
        "risk" in msg
        or
        "high risk" in msg
    ):

        high_risk = 0

        for item in all_predictions:

            if item.get(
                "risk_level"
            ) == "High":

                high_risk += 1

        return (
            f"⚠️ High risk predictions: "
            f"{high_risk}"
        )

    # -----------------------------------
    # Dashboard Summary
    # -----------------------------------

    if (
        "summary" in msg
        or
        "dashboard" in msg
    ):

        return (
            f"""
📈 SmartStock Summary

Total Predictions:
{total_predictions}

Latest Forecast:
{round(float(latest.get("prediction",0)),2) if latest else 0}

System Status:
Healthy ✅
"""
        )

    # -----------------------------------
    # Help
    # -----------------------------------

    if "help" in msg:

        return (
            "Try asking:\n\n"
            "• Prediction count\n"
            "• Latest prediction\n"
            "• Which region has highest demand?\n"
            "• Most predicted category\n"
            "• Dashboard summary\n"
            "• Risk analysis"
        )

    # -----------------------------------
    # Default
    # -----------------------------------

    return (
        "🤖 I couldn't understand that.\n\n"
        "Try:\n"
        "• Prediction count\n"
        "• Latest prediction\n"
        "• Highest demand region\n"
        "• Most predicted category\n"
        "• Dashboard summary"
    )


@chatbot_bp.route(
    "/chat",
    methods=["POST"]
)
def chat():

    try:

        data = request.get_json()

        user_message = data.get(
            "message",
            ""
        )

        bot_response = generate_response(
            user_message
        )

        chat_collection.insert_one({

            "user_message":
                user_message,

            "bot_response":
                bot_response,

            "timestamp":
                datetime.now()
                .strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
        })

        return jsonify({

            "response":
                bot_response

        })

    except Exception as e:

        return jsonify({

            "error":
                str(e)

        }), 500


@chatbot_bp.route(
    "/chat/history",
    methods=["GET"]
)
def chat_history():

    try:

        chats = list(

            chat_collection.find(
                {},
                {"_id": 0}
            )

        )

        return jsonify(
            chats
        )

    except Exception as e:

        return jsonify({

            "error":
                str(e)

        }), 500