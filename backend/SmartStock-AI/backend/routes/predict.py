from flask import Blueprint
from flask import request
from flask import jsonify

import joblib
import pandas as pd
import os

from config.db import (
    prediction_collection,
    alert_collection
)

from utils.helpers import (
    current_timestamp,
    risk_level,
    inventory_recommendation
)

from utils.reorder import (
    calculate_inventory_metrics
)

predict_bp = Blueprint(
    "predict",
    __name__
)

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "smartstock_model.pkl"
)

FEATURE_PATH = os.path.join(
    BASE_DIR,
    "models",
    "feature_columns.pkl"
)

model = joblib.load(
    MODEL_PATH
)

feature_columns = joblib.load(
    FEATURE_PATH
)


@predict_bp.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        data = request.json

        category = data.get(
            "category"
        )

        sub_category = data.get(
            "sub_category"
        )

        region = data.get(
            "region"
        )

        segment = data.get(
            "segment"
        )

        ship_mode = data.get(
            "ship_mode"
        )

        quantity = float(
            data.get("quantity")
        )

        discount = float(
            data.get("discount")
        )

        year = int(
            data.get("year")
        )

        month = int(
            data.get("month")
        )

        quarter = int(
            data.get("quarter")
        )

        row = {

            "Category":
                category,

            "Sub-Category":
                sub_category,

            "Region":
                region,

            "Segment":
                segment,

            "Ship Mode":
                ship_mode,

            "Quantity":
                quantity,

            "Discount":
                discount,

            "Year":
                year,

            "Month":
                month,

            "Quarter":
                quarter
        }

        df = pd.DataFrame(
            [row]
        )

        df = pd.get_dummies(
            df
        )

        for col in feature_columns:

            if col not in df.columns:

                df[col] = 0

        df = df[
            feature_columns
        ]

        prediction = float(
            model.predict(df)[0]
        )

        confidence = 92

        recommendation = (
            inventory_recommendation(
                prediction
            )
        )

        risk = risk_level(
            prediction
        )

        inventory_metrics = (
            calculate_inventory_metrics(
                prediction
            )
        )

        record = {

            "inputs":
                data,

            "predicted_sales":
                prediction,

            "recommended_stock":
                recommendation,

            "risk_level":
                risk,

            "safety_stock":
                inventory_metrics[
                    "safety_stock"
                ],

            "reorder_point":
                inventory_metrics[
                    "reorder_point"
                ],

            "recommended_order":
                inventory_metrics[
                    "recommended_order"
                ],

            "timestamp":
                current_timestamp()
        }

        prediction_collection.insert_one(
            record
        )

        if risk == "High":

            alert_collection.insert_one({

                "alert_type":
                    "LOW_STOCK",

                "severity":
                    "HIGH",

                "category":
                    category,

                "message":
                    f"{category} inventory requires attention",

                "predicted_sales":
                    prediction,

                "timestamp":
                    current_timestamp()

            })

        return jsonify({

            "success": True,

            "predicted_sales":
                round(
                    prediction,
                    2
                ),

            "recommended_stock":
                recommendation,

            "risk_level":
                risk,

            "confidence":
                confidence,

            "safety_stock":
                inventory_metrics[
                    "safety_stock"
                ],

            "reorder_point":
                inventory_metrics[
                    "reorder_point"
                ],

            "recommended_order":
                inventory_metrics[
                    "recommended_order"
                ]
        })

    except Exception as e:

        print("\n====================")
        print("PREDICT ERROR")
        print("====================")
        print(e)
        print("====================\n")

        return jsonify({

            "success": False,

            "error":
                str(e)

        }), 500