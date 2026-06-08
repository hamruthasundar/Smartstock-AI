from flask import Blueprint
from flask import jsonify

from config.db import (
    supplier_collection
)

recommend_supplier_bp = Blueprint(
    "recommend_supplier",
    __name__
)

@recommend_supplier_bp.route(
    "/recommended-supplier",
    methods=["GET"]
)
def recommended_supplier():

    try:

        supplier = supplier_collection.find_one(
            {},
            sort=[
                ("reliability", -1),
                ("lead_time", 1)
            ]
        )

        if not supplier:

            return jsonify({

                "success": False

            })

        supplier["_id"] = str(
            supplier["_id"]
        )

        return jsonify({

            "success": True,

            "data": supplier

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "error": str(e)

        }), 500