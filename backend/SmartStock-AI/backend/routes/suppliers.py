from flask import Blueprint
from flask import request
from flask import jsonify

from bson import ObjectId

from config.db import (
    supplier_collection
)

supplier_bp = Blueprint(
    "suppliers",
    __name__
)


@supplier_bp.route(
    "/suppliers",
    methods=["GET"]
)
def get_suppliers():

    try:

        suppliers = []

        for supplier in supplier_collection.find().sort(
                "reliability",
                -1
            ):

            supplier["_id"] = str(
                supplier["_id"]
            )

            suppliers.append(
                supplier
            )

        return jsonify({

            "success": True,

            "count":
                len(suppliers),

            "data":
                suppliers

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500


@supplier_bp.route(
    "/suppliers",
    methods=["POST"]
)
def add_supplier():

    try:

        data = request.json

        supplier = {

    "name":
        data.get("name"),

    "company":
        data.get("company"),

    "email":
        data.get("email"),

    "phone":
        data.get("phone"),

    "lead_time":
        int(
            data.get(
                "lead_time",
                7
            )
        ),

    "reliability":
        int(
            data.get(
                "reliability",
                90
            )
        )
}

        supplier_collection.insert_one(
            supplier
        )

        return jsonify({

            "success": True,

            "message":
                "Supplier added successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500


@supplier_bp.route(
    "/suppliers/<id>",
    methods=["DELETE"]
)
def delete_supplier(id):

    try:

        supplier_collection.delete_one({

            "_id":
                ObjectId(id)

        })

        return jsonify({

            "success": True,

            "message":
                "Supplier deleted"

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500
    
@supplier_bp.route(
    "/suppliers/best",
    methods=["GET"]
)
def best_supplier():

    try:

        suppliers = list(
            supplier_collection.find()
        )

        if len(suppliers) == 0:

            return jsonify({

                "success": False,

                "message":
                    "No suppliers found"

            })

        best = max(

            suppliers,

            key=lambda x:
            x.get(
                "reliability",
                0
            )

        )

        best["_id"] = str(
            best["_id"]
        )

        return jsonify({

            "success": True,

            "supplier":
                best

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500