from datetime import datetime, timedelta
from math import log
from typing import List, Dict, Any
from app.db.mongo import reports_collection

# MongoDB-backed storage; previous in-memory REPORTS removed.

def add_report(number: str, category: str, message: str) -> Dict[str, Any]:
    prob = classify_probability_stub(message)
    doc = {
        "number": normalize_number(number),
        "category": category,
        "message": message,
        "created_at": datetime.utcnow(),
        "scam_probability": prob,
    }
    reports_collection().insert_one(doc)
    return doc

def normalize_number(number: str) -> str:
    digits = ''.join(ch for ch in number if ch.isdigit())
    # Basic Nepali mobile normalization: assume country code +977 if length 10
    if len(digits) == 10:
        return "+977" + digits
    if digits.startswith("977") and len(digits) == 13:
        return "+" + digits
    if digits.startswith("+977") and len(digits) == 14:
        return digits
    return "+" + digits  # fallback

def get_reports_for(number: str) -> List[Dict[str, Any]]:
    n = normalize_number(number)
    cursor = reports_collection().find({"number": n}).sort("created_at", -1)
    return list(cursor)

def recent_reports(number: str, minutes: int = 60) -> List[Dict[str, Any]]:
    cutoff = datetime.utcnow() - timedelta(minutes=minutes)
    return [r for r in get_reports_for(number) if r["created_at"] >= cutoff]

def classify_probability_stub(message: str) -> float:
    # Mirror heuristic from classify endpoint for internal scoring (duplicated for now)
    keywords = ["otp", "khalti", "esewa", "bank", "prize", "reward", "verify", "blocked"]
    text_lower = message.lower()
    score = 0.0
    score += min(len(message) / 200, 0.3)
    hits = sum(1 for k in keywords if k in text_lower)
    score += min(hits * 0.15, 0.6)
    return max(0.0, min(score, 0.95))

def anomaly_flags(number: str) -> Dict[str, bool]:
    recent = recent_reports(number, 60)
    flags = {
        "spike": len(recent) >= 3,  # 3+ reports in last hour
        "burst": len(recent) >= 5,  # stronger flag
        "repeated_message": False,
    }
    if len(recent) > 1:
        messages = [r["message"].lower().strip() for r in recent]
        unique = set(messages)
        if len(unique) <= len(messages) / 2:
            flags["repeated_message"] = True
    return flags

def risk_score(number: str) -> Dict[str, Any]:
    reports = get_reports_for(number)
    count = len(reports)
    latest_message = reports[-1]["message"] if reports else ""
    ml_prob = classify_probability_stub(latest_message) if latest_message else 0.0
    flags = anomaly_flags(number)
    suspicious_flags = suspicious_activity_indicators(number, reports)
    anomaly_bonus = 0.0
    if flags["spike"]:
        anomaly_bonus += 0.15
    if flags["burst"]:
        anomaly_bonus += 0.15
    if flags["repeated_message"]:
        anomaly_bonus += 0.1
    if suspicious_flags["suspicious_activity_detected"]:
        anomaly_bonus += 0.2  # Higher weight for post-swap activity
    score = ml_prob + 0.1 * log(1 + count) + anomaly_bonus
    score = min(score, 0.99)
    level = "HIGH" if score > 0.66 else "MEDIUM" if score > 0.33 else "LOW"
    return {
        "number": normalize_number(number),
        "risk_score": round(score, 3),
        "risk_level": level,
        "report_count": count,
        "anomalies": [k for k, v in flags.items() if v],
        "suspicious_activity": suspicious_flags,
        "recent_reports": [
            {
                "category": r["category"],
                "created_at": r["created_at"].isoformat(),
                "scam_probability": round(r.get("scam_probability", 0.0), 3),
            }
            for r in reports[-10:]
        ],
    }

def dashboard_summary() -> Dict[str, Any]:
    total_reports = reports_collection().count_documents({})
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
    ]
    cat = list(reports_collection().aggregate(pipeline))
    categories = {c["_id"]: c["count"] for c in cat}
    return {
        "total_reports": total_reports,
        "category_distribution": categories,
        "trending": trending(10),
    }

def trending(limit: int = 10) -> List[Dict[str, Any]]:
    pipeline = [
        {"$group": {"_id": "$number", "reports": {"$sum": 1}}},
        {"$sort": {"reports": -1}},
        {"$limit": limit},
    ]
    results = list(reports_collection().aggregate(pipeline))
    return [{"number": r["_id"], "reports": r["reports"]} for r in results]

def suspicious_activity_indicators(number: str, reports: List[Dict[str, Any]] | None = None) -> Dict[str, Any]:
    """
    Detect suspicious patterns that MAY indicate post-SIM-swap scam activity.
    NOTE: This does NOT detect actual SIM swaps (requires telecom data).
    It detects BEHAVIORS suggesting a number was hijacked or is being used for coordinated scams.
    """
    if reports is None:
        reports = get_reports_for(number)
    # Patterns: recent surge + OTP focus + victim self-reports + category diversity
    last_48h_cut = datetime.utcnow() - timedelta(hours=48)
    recent = [r for r in reports if r["created_at"] >= last_48h_cut]
    
    # OTP-related categories (indicates account takeover attempts)
    otp_like = {"OTP Theft Attempt", "Impersonation (Bank)"}
    otp_recent = [r for r in recent if r["category"] in otp_like]
    proportion_otp = (len(otp_recent) / len(recent)) if recent else 0.0
    
    # High scam probability cluster
    repeated_prob_high = sum(1 for r in recent if r.get("scam_probability", 0) > 0.6)
    
    # Victim self-report detection (phrases indicating hijack)
    victim_keywords = ["hacked", "not me", "someone using", "stolen", "hijacked", "unauthorized"]
    victim_reports = [r for r in recent if any(kw in r["message"].lower() for kw in victim_keywords)]
    
    # Category diversity (multiple scam types = coordinated attack)
    unique_categories = set(r["category"] for r in recent)
    multi_category_attack = len(unique_categories) >= 3 and len(recent) >= 4
    
    flags = {
        "recent_surge": len(recent) >= 4,  # 4+ reports in 48h
        "otp_focus": proportion_otp >= 0.5 and len(recent) >= 2,
        "high_prob_cluster": repeated_prob_high >= 3,
        "victim_self_report": len(victim_reports) > 0,
        "multi_category_attack": multi_category_attack,
    }
    
    # Possible post-swap activity if 2+ strong signals
    possible = sum(1 for v in flags.values() if v) >= 2
    
    return {
        "suspicious_activity_detected": possible,
        "confidence": "medium" if possible else "low",
        "likely_scenario": "Possible post-SIM-swap scam or coordinated attack" if possible else "Normal activity",
        "flags": flags,
        "recent_report_count": len(recent),
        "otp_proportion": round(proportion_otp, 3),
        "unique_categories": list(unique_categories),
        "disclaimer": "This is behavioral analysis from user reports, not telecom-level SIM swap detection."
    }