from flask import Blueprint
from flask import jsonify

from config.db import prediction_collection

history_bp = Blueprint(
    "history",
    __name__
)


@history_bp.route(
    "/history",
    methods=["GET"]
)
def get_history():

    try:

        records = list(
            prediction_collection.find(
                {},
                {"_id": 0}
            ).sort(
                "timestamp",
                -1
            )
        )

        return jsonify({

            "success": True,
            "count": len(records),
            "data": records

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "error": str(e)

        }), 500