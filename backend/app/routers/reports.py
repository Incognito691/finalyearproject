from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.services.risk import add_report, risk_score, trending, dashboard_summary

router = APIRouter()

class ReportIn(BaseModel):
    number: str = Field(..., min_length=7, max_length=20)
    category: str = Field(..., min_length=2, max_length=40)
    message: str = Field(..., min_length=4, max_length=2000)

class ReportOut(BaseModel):
    number: str
    category: str
    message: str
    created_at: str
    scam_probability: float

@router.post("/reports", response_model=ReportOut)
async def create_report(payload: ReportIn):
    # Basic sanitation
    entry = add_report(payload.number, payload.category.strip(), payload.message.strip())
    return {
        "number": entry["number"],
        "category": entry["category"],
        "message": entry["message"],
        "created_at": entry["created_at"].isoformat(),
        "scam_probability": round(entry["scam_probability"], 3),
    }

@router.get("/number/{number}")
async def get_number(number: str):
    data = risk_score(number)
    return data

@router.get("/trending")
async def get_trending(limit: int = 10):
    return {
        "items": trending(limit),
        "limit": limit
    }

@router.get("/dashboard")
async def get_dashboard():
    return dashboard_summary()