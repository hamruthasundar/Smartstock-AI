from flask import Blueprint, jsonify
import pandas as pd

metadata_bp = Blueprint(
    "metadata",
    __name__
)

DATASET_PATH = "../dataset/Retail-Supply-Chain-Sales-Dataset.xlsx"


@metadata_bp.route(
    "/metadata",
    methods=["GET"]
)
def metadata():

    try:

        df = pd.read_excel(
            DATASET_PATH
        )

        response = {

            "categories":
                sorted(
                    df["Category"]
                    .dropna()
                    .unique()
                    .tolist()
                ),

            "sub_categories":
                sorted(
                    df["Sub-Category"]
                    .dropna()
                    .unique()
                    .tolist()
                ),

            "regions":
                sorted(
                    df["Region"]
                    .dropna()
                    .unique()
                    .tolist()
                ),

            "segments":
                sorted(
                    df["Segment"]
                    .dropna()
                    .unique()
                    .tolist()
                ),

            "ship_modes":
                sorted(
                    df["Ship Mode"]
                    .dropna()
                    .unique()
                    .tolist()
                )
        }

        return jsonify(response)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500