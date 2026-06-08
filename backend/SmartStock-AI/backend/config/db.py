from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)

db = client[DB_NAME]

prediction_collection = db["prediction_history"]
chat_collection = db["chat_history"]
analytics_collection = db["analytics_logs"]
dashboard_collection = db["dashboard_metrics"]
alert_collection = db["alerts"]

supplier_collection = db["suppliers"]

user_collection = db["users"]