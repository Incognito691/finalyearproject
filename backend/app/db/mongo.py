import os
from typing import Optional
from pymongo import MongoClient, ASCENDING

_client: Optional[MongoClient] = None

def get_client() -> MongoClient:
    global _client
    if _client is None:
        uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        _client = MongoClient(uri)
        _ensure_indexes(_client)
    return _client

def _ensure_indexes(client: MongoClient):
    db = client.get_database(_db_name())
    reports = db.get_collection("reports")
    # Index number + created_at for queries
    reports.create_index([("number", ASCENDING)])
    reports.create_index([("created_at", ASCENDING)])
    reports.create_index([("category", ASCENDING)])

def _db_name() -> str:
    return os.getenv("MONGODB_DB", "fyp")

def reports_collection():
    return get_client().get_database(_db_name()).get_collection("reports")