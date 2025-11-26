from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter()

class ClassifyRequest(BaseModel):
    message: str

class ClassifyResponse(BaseModel):
    scam_probability: float
    risk_level: str
    model: str = "stub-tfidf-logreg"  # placeholder

@router.post("/classify", response_model=ClassifyResponse)
async def classify(req: ClassifyRequest):
    # Placeholder heuristic: length + keyword count
    keywords = ["otp", "khalti", "esewa", "bank", "prize", "reward", "verify", "blocked"]
    text_lower = req.message.lower()
    score = 0.0
    score += min(len(req.message) / 200, 0.3)  # longer messages add small weight
    hits = sum(1 for k in keywords if k in text_lower)
    score += min(hits * 0.15, 0.6)
    score = max(0.0, min(score, 0.95))
    risk = "HIGH" if score > 0.66 else "MEDIUM" if score > 0.33 else "LOW"
    return ClassifyResponse(scam_probability=round(score, 3), risk_level=risk)
