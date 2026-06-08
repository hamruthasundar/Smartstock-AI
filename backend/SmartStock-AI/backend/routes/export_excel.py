from flask import Blueprint
from flask import send_file

import pandas as pd

from config.db import prediction_collection

excel_bp = Blueprint(
    "excel",
    __name__
)

@excel_bp.route(
    "/export/excel"
)
def export_excel():

    data = list(
        prediction_collection.find(
            {},
            {"_id": 0}
        )
    )

    df = pd.json_normalize(data)

    file_name = "forecast_history.xlsx"

    df.to_excel(
        file_name,
        index=False
    )

    return send_file(
        file_name,
        as_attachment=True
    )