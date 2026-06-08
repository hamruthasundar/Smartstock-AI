from flask import Blueprint
from flask import send_file

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from config.db import prediction_collection

pdf_bp = Blueprint(
    "pdf",
    __name__
)

@pdf_bp.route(
    "/export/pdf"
)
def export_pdf():

    records = list(
        prediction_collection.find(
            {},
            {"_id": 0}
        )
    )

    pdf_name = "SmartStock_Report.pdf"

    doc = SimpleDocTemplate(
        pdf_name
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "SmartStock AI Executive Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

    elements.append(
        Paragraph(
            f"Total Predictions: {len(records)}",
            styles["Normal"]
        )
    )

    for item in records[:10]:

        elements.append(
            Paragraph(
                f"""
Forecast:
{item['predicted_sales']}
|
Risk:
{item['risk_level']}
""",
                styles["Normal"]
            )
        )

    doc.build(elements)

    return send_file(
        pdf_name,
        as_attachment=True
    )