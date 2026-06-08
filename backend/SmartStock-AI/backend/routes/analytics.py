from flask import Blueprint
from flask import jsonify

from collections import Counter

from config.db import prediction_collection

analytics_bp = Blueprint(
    "analytics",
    __name__
)


@analytics_bp.route(
    "/analytics",
    methods=["GET"]
)
def analytics():

    try:

        records = list(
            prediction_collection.find(
                {},
                {"_id": 0}
            )
        )

        if len(records) == 0:

            return jsonify({

                "category_sales": [],
                "region_sales": [],
                "risk_sales": []

            })

        categories = [
            r["inputs"]["category"]
            for r in records
        ]

        regions = [
            r["inputs"]["region"]
            for r in records
        ]

        risks = [
            r["risk_level"]
            for r in records
        ]

        category_counter = Counter(
            categories
        )

        region_counter = Counter(
            regions
        )

        risk_counter = Counter(
            risks
        )

        category_sales = [

            {
                "name": k,
                "value": v
            }

            for k, v in
            category_counter.items()

        ]

        region_sales = [

            {
                "name": k,
                "value": v
            }

            for k, v in
            region_counter.items()

        ]

        risk_sales = [

            {
                "name": k,
                "value": v
            }

            for k, v in
            risk_counter.items()

        ]

        return jsonify({

            "category_sales":
                category_sales,

            "region_sales":
                region_sales,

            "risk_sales":
                risk_sales

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500