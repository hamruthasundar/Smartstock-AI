from flask import Blueprint
from flask import jsonify

from config.db import prediction_collection

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)

@dashboard_bp.route(
    "/dashboard",
    methods=["GET"]
)
def dashboard():

    try:

        predictions = list(
            prediction_collection.find(
                {},
                {"_id": 0}
            )
        )

        total_predictions = len(
            predictions
        )

        if total_predictions == 0:

            return jsonify({

                "total_predictions": 0,
                "average_prediction": 0,
                "total_forecast": 0,
                "high_risk_count": 0,
                "recent_predictions": [],
                "top_region": None,
                "top_category": None

            })

        total_forecast = sum(

            p["predicted_sales"]

            for p in predictions

        )

        avg_prediction = (

            total_forecast
            / total_predictions

        )

        high_risk_count = len([

            p

            for p in predictions

            if p["risk_level"] == "High"

        ])

        recent_predictions = sorted(

            predictions,

            key=lambda x:
            x["timestamp"],

            reverse=True

        )[:10]

        # --------------------
        # AI INSIGHTS
        # --------------------

        region_totals = {}

        category_totals = {}

        for p in predictions:

            region = p["inputs"]["region"]

            category = p["inputs"]["category"]

            region_totals[region] = (

                region_totals.get(
                    region,
                    0
                )

                +

                p["predicted_sales"]

            )

            category_totals[category] = (

                category_totals.get(
                    category,
                    0
                )

                +

                p["predicted_sales"]

            )

        top_region = max(
            region_totals,
            key=region_totals.get
        )

        top_category = max(
            category_totals,
            key=category_totals.get
        )

        return jsonify({

            "total_predictions":
                total_predictions,

            "average_prediction":
                round(
                    avg_prediction,
                    2
                ),

            "total_forecast":
                round(
                    total_forecast,
                    2
                ),

            "high_risk_count":
                high_risk_count,

            "recent_predictions":
                recent_predictions,

            "top_region":
                top_region,

            "top_category":
                top_category

        })

    except Exception as e:

        return jsonify({

            "error":
                str(e)

        }), 500


 