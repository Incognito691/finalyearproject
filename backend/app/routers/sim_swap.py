from fastapi import APIRouter
from app.services.risk import suspicious_activity_indicators, get_reports_for, normalize_number

router = APIRouter()

@router.get("/sim_swap/{number}")
async def suspicious_activity_check(number: str):
    """
    Check for suspicious activity patterns that may indicate post-SIM-swap scam behavior.
    NOTE: This does NOT detect actual SIM swaps (requires telecom operator data).
    """
    reports = get_reports_for(number)
    data = suspicious_activity_indicators(number, reports)
    return {
        "number": normalize_number(number),
        **data
    }