from flask import Flask
from flask_cors import CORS

from routes.predict import predict_bp
from routes.history import history_bp
from routes.analytics import analytics_bp
from routes.dashboard import dashboard_bp
from routes.metadata import metadata_bp
from routes.chatbot import chatbot_bp
from routes.recommendations import recommendation_bp
from routes.export_excel import excel_bp
from routes.export_pdf import pdf_bp
from routes.alerts import alerts_bp
from routes.suppliers import supplier_bp
from routes.recommendation_supplier import (
    recommend_supplier_bp
)

app = Flask(__name__)

CORS(app)

app.register_blueprint(
    recommend_supplier_bp
)

app.register_blueprint(
    supplier_bp
)

app.register_blueprint(
    alerts_bp
)

app.register_blueprint(
    recommendation_bp
)

app.register_blueprint(
    pdf_bp
)

app.register_blueprint(
    excel_bp
)

app.register_blueprint(
    chatbot_bp
)

app.register_blueprint(
    metadata_bp
)

app.register_blueprint(
    predict_bp
)

app.register_blueprint(
    history_bp
)

app.register_blueprint(
    analytics_bp
)

app.register_blueprint(
    dashboard_bp
)


@app.route("/")
def home():

    return {
        "project":
            "SmartStock AI Backend Running"
    }


@app.route("/health")
def health():

    return {
        "status":
            "healthy"
    }

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )