from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import io
import os
from PIL import Image
from app.services.storage import storage_service
import pytesseract

# Configure Tesseract path from environment variable (fallback to default Windows path)
tesseract_path = os.getenv("TESSERACT_PATH", r"C:\Program Files\Tesseract-OCR\tesseract.exe")
if os.path.exists(tesseract_path):
    pytesseract.pytesseract.tesseract_cmd = tesseract_path
else:
    print(f"⚠️ Tesseract not found at {tesseract_path}. OCR will not work.")

router = APIRouter()

class ScreenshotAnalysisResponse(BaseModel):
    extracted_text: str
    scam_probability: float
    risk_level: str
    detected_keywords: List[str]
    explanation: str
    image_url: Optional[str] = None
    storage_path: Optional[str] = None

class ScamGalleryItem(BaseModel):
    name: str
    url: str
    path: str
    created_at: Optional[str]
    size: int

# Enhanced scam keywords with weighted categories
# HIGH priority keywords (stronger scam indicators)
HIGH_PRIORITY_KEYWORDS = [
    "congratulations", "won", "winner", "prize", "lottery", "lucky draw",
    "claim now", "claim your", "expired", "expire soon", "urgent action",
    "verify now", "verify immediately", "confirm now", "suspended account",
    "blocked account", "unusual activity", "unauthorized", "click here immediately",
    "limited time offer", "act now", "last chance", "Rs", "rupees",
    "lakh", "crore", "million", "deposit", "withdraw"
]

# MEDIUM priority keywords (common in scams)
MEDIUM_PRIORITY_KEYWORDS = [
    "otp", "verify", "blocked", "suspended", "urgent", "reward", "offer",
    "khalti", "esewa", "imepay", "fonepay", "bank", "account", "password", 
    "pin", "code", "security", "update", "confirm", "click here", "link",
    "whatsapp", "call", "contact", "number", "malik", "customer care"
]

# LOW priority keywords (context-dependent)
LOW_PRIORITY_KEYWORDS = [
    "message", "dear", "hello", "congratulation", "transfer", "payment",
    "cash", "winner", "selected", "lucky"
]

# Suspicious patterns (regex-like checks)
SUSPICIOUS_PATTERNS = [
    "tap to learn more",
    "call me",
    "contact number",
    "whatsapp number",
    "lottery no",
    "draw offer"
]

def extract_text_from_image(image_bytes: bytes) -> str:
    """
    Extract text from image using Tesseract OCR.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR extraction failed: {str(e)}")

def analyze_text_for_scam(text: str) -> tuple[float, List[str], str]:
    """Analyze extracted text for scam indicators with weighted scoring."""
    if not text:
        return 0.0, [], "No text could be extracted from the image. Please ensure the image is clear and contains readable text."
    
    text_lower = text.lower()
    detected_keywords = []
    score = 0.0
    
    # Check HIGH priority keywords (weight: 0.25 each)
    for keyword in HIGH_PRIORITY_KEYWORDS:
        if keyword in text_lower:
            detected_keywords.append(keyword)
            score += 0.25
    
    # Check MEDIUM priority keywords (weight: 0.15 each)
    for keyword in MEDIUM_PRIORITY_KEYWORDS:
        if keyword in text_lower and keyword not in detected_keywords:
            detected_keywords.append(keyword)
            score += 0.15
    
    # Check LOW priority keywords (weight: 0.08 each)
    for keyword in LOW_PRIORITY_KEYWORDS:
        if keyword in text_lower and keyword not in detected_keywords:
            detected_keywords.append(keyword)
            score += 0.08
    
    # Check suspicious patterns (weight: 0.20 each)
    pattern_matches = 0
    for pattern in SUSPICIOUS_PATTERNS:
        if pattern in text_lower:
            pattern_matches += 1
            score += 0.20
    
    # Additional red flags
    # Multiple phone numbers mentioned
    import re
    phone_pattern = r'\b\d{10,}\b'
    phone_numbers = re.findall(phone_pattern, text)
    if len(phone_numbers) >= 2:
        score += 0.15
        detected_keywords.append("multiple phone numbers")
    
    # Money amounts mentioned (Rs, lakh, crore)
    if any(money in text_lower for money in ["rs", "rupees", "lakh", "crore"]):
        score += 0.10
    
    # URLs or links
    if "http" in text_lower or "www." in text_lower or ".com" in text_lower:
        score += 0.15
        detected_keywords.append("contains link")
    
    # Urgency indicators
    urgency_words = ["urgent", "immediately", "now", "today", "expire", "last chance"]
    urgency_count = sum(1 for word in urgency_words if word in text_lower)
    if urgency_count >= 2:
        score += 0.15
        detected_keywords.append("urgency tactics")
    
    # Cap the score at 0.99
    score = min(score, 0.99)
    
    # Generate explanation based on score
    if score >= 0.75:
        explanation = f"🚨 HIGH RISK: Strong scam indicators detected! Message contains {len(detected_keywords)} suspicious elements including high-priority scam keywords. This appears to be a lottery/prize scam. DO NOT respond, share OTPs, or click any links."
    elif score >= 0.50:
        explanation = f"⚠️ MEDIUM-HIGH RISK: Message contains {len(detected_keywords)} suspicious keywords and patterns. Likely a scam attempt. Verify through official channels only. Never share OTPs or personal information."
    elif score >= 0.33:
        explanation = f"⚠️ MEDIUM RISK: Message contains {len(detected_keywords)} suspicious keywords. Exercise caution and verify through official channels before taking any action."
    else:
        explanation = "✅ LOW RISK: Few scam indicators detected. However, always verify unsolicited messages through official channels."
    
    return score, detected_keywords[:15], explanation  # Return max 15 keywords for display

@router.post("/analyze-screenshot", response_model=ScreenshotAnalysisResponse)
async def analyze_screenshot(file: UploadFile = File(...)):
    """
    Analyze a screenshot for scam content using OCR + text classification.
    
    Steps:
    1. Validate image format and size
    2. Extract text using OCR
    3. Analyze text for scam keywords and patterns
    4. Return risk assessment
    """
    # Validate file type
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP images are supported")
    
    # Read file
    contents = await file.read()
    
    # Validate size (max 5MB)
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Maximum 5MB allowed.")
    
    # Validate it's a valid image
    try:
        image = Image.open(io.BytesIO(contents))
        image.verify()  # Verify it's a valid image
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")
    
    # Extract text using OCR
    extracted_text = extract_text_from_image(contents)
    
    # Analyze text
    probability, keywords, explanation = analyze_text_for_scam(extracted_text)
    
    # Determine risk level
    if probability > 0.66:
        risk_level = "HIGH"
    elif probability > 0.33:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"
    
    # Upload to Supabase Storage (if configured)
    image_url = None
    storage_path = None
    
    if storage_service.is_available():
        # Upload high-risk images (80%+) to special folder
        is_high_risk = probability >= 0.80
        
        upload_result = storage_service.upload_screenshot(
            file_bytes=contents,
            filename=file.filename or "screenshot.jpg",
            is_high_risk=is_high_risk
        )
        
        if upload_result:
            image_url = upload_result["url"]
            storage_path = upload_result["path"]
    
    return ScreenshotAnalysisResponse(
        extracted_text=extracted_text,
        scam_probability=probability,
        risk_level=risk_level,
        detected_keywords=keywords,
        explanation=explanation,
        image_url=image_url,
        storage_path=storage_path
    )

@router.get("/scam-gallery", response_model=List[ScamGalleryItem])
async def get_scam_gallery(limit: int = 50):
    """
    Get collection of high-risk scam screenshots (80%+ probability).
    
    This endpoint returns screenshots that have been flagged as high-risk
    and saved to the 'high-risk' folder in Supabase Storage.
    """
    if not storage_service.is_available():
        raise HTTPException(
            status_code=503,
            detail="Storage service not configured. Please set up Supabase credentials."
        )
    
    screenshots = storage_service.list_high_risk_screenshots(limit=limit)
    return screenshots
