from flask import Blueprint
from flask import jsonify

from config.db import prediction_collection

recommendation_bp = Blueprint(
    "recommendation",
    __name__
)

@recommendation_bp.route(
    "/recommendations",
    methods=["GET"]
)
def recommendations():

    data = list(
        prediction_collection.find(
            {},
            {"_id":0}
        )
    )

    recommendations = []

    for item in data:

        prediction = item.get(
            "prediction",
            0
        )

        category = (
            item.get(
                "inputs",
                {}
            ).get(
                "category",
                "Unknown"
            )
        )

        if prediction > 1000:

            recommendations.append({

                "category":
                    category,

                "recommendation":
                    "Increase Stock",

                "forecast":
                    round(prediction,2)
            })

    return jsonify(
        recommendations
    )