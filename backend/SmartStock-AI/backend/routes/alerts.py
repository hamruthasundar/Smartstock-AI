from flask import Blueprint
from flask import jsonify

from config.db import alert_collection

alerts_bp = Blueprint(
    "alerts",
    __name__
)

@alerts_bp.route(
    "/alerts",
    methods=["GET"]
)
def get_alerts():

    try:

        alerts = list(

            alert_collection.find(
                {},
                {"_id": 0}
            )

        )

        alerts = sorted(

            alerts,

            key=lambda x:
            x["timestamp"],

            reverse=True

        )

        return jsonify({

            "success": True,

            "count":
                len(alerts),

            "data":
                alerts

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500