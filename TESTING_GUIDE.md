# Testing Guide - ScamGuard Nepal (FYP)

## Prerequisites

- Backend running on `http://localhost:8000`
- Frontend running on `http://localhost:3000`
- MongoDB Atlas cluster connected

---

## Phase 1: Setup & Installation

### 1.1 Install Node.js 20+ (Required for Frontend)

```powershell
# If you have nvm-windows installed:
nvm install 20
nvm use 20
node -v  # Should show v20.x.x

# If not, download from: https://nodejs.org/ (LTS version 20.x)
```

### 1.2 Install Backend Dependencies

```powershell
cd c:\Users\sahil\OneDrive\Desktop\Projects\FYP\backend
pip install -r requirements.txt
```

**New Dependencies Added:**

- `pillow==10.2.0` - Image processing for screenshot analysis
- `python-multipart==0.0.9` - File upload support

### 1.3 Install Frontend Dependencies

```powershell
cd c:\Users\sahil\OneDrive\Desktop\Projects\FYP\frontend
npm install
```

---

## Phase 2: Backend Testing

### 2.1 Start Backend Server

```powershell
cd c:\Users\sahil\OneDrive\Desktop\Projects\FYP\backend
python -m uvicorn app.main:app --reload --port 8000
```

**Expected Output:**

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
```

### 2.2 Test Health Endpoints

```powershell
# Basic health check
curl http://localhost:8000/health

# Expected: {"status":"ok"}

# Database connectivity check
curl http://localhost:8000/health/db

# Expected: {"status":"ok","db":"connected"}
```

### 2.3 Test Classification Endpoint

```powershell
# Test scam message classification
curl -X POST http://localhost:8000/classify `
  -H "Content-Type: application/json" `
  -d '{\"text\":\"Congratulations! You won Rs 50,000. Click here to claim your prize now!\"}'

# Expected: {"scam_probability": 0.85, "is_scam": true}
```

### 2.4 Test Report Submission

```powershell
# Submit a scam report
curl -X POST http://localhost:8000/reports `
  -H "Content-Type: application/json" `
  -d '{\"number\":\"9841234567\",\"category\":\"OTP Theft\",\"description\":\"Received fake OTP request claiming to be from bank\",\"scam_probability\":0.75}'

# Expected: {"id":"<mongo_id>","number":"9841234567",...}
```

### 2.5 Test Number Lookup

```powershell
# Check risk score for a number
curl http://localhost:8000/number/9841234567

# Expected:
# {
#   "number": "9841234567",
#   "report_count": 1,
#   "risk_score": 0.75,
#   "risk_level": "HIGH",
#   "sim_swap_detected": false,
#   "anomaly_flags": {...},
#   "recent_reports": [...]
# }
```

### 2.6 Test SIM Swap Detection

```powershell
# Check SIM swap indicators
curl http://localhost:8000/sim_swap/9841234567

# Expected:
# {
#   "number": "9841234567",
#   "sim_swap_detected": false,
#   "confidence": 0.2,
#   "indicators": {...}
# }
```

### 2.7 Test Trending Numbers

```powershell
# Get most reported numbers (last 7 days)
curl http://localhost:8000/trending

# Expected: [{"number":"9841234567","count":1,"latest_category":"OTP Theft"}]
```

### 2.8 Test Dashboard Summary

```powershell
# Get dashboard statistics
curl http://localhost:8000/dashboard

# Expected:
# {
#   "total_reports": 1,
#   "total_numbers": 1,
#   "high_risk_numbers": 1,
#   "reports_today": 1,
#   "top_categories": [...],
#   "recent_spike_numbers": []
# }
```

### 2.9 Test Screenshot Analysis

```powershell
# Create a test image (or use any screenshot)
# Then upload it:
curl -X POST http://localhost:8000/analyze-screenshot `
  -F "file=@c:\path\to\screenshot.jpg"

# Expected (without OCR configured):
# {
#   "extracted_text": "",
#   "scam_probability": 0.0,
#   "risk_level": "UNKNOWN",
#   "detected_keywords": [],
#   "explanation": "⚠️ OCR is not yet configured..."
# }
```

**Note:** Screenshot analysis requires Tesseract OCR for full functionality.

---

## Phase 3: Frontend Testing

### 3.1 Start Frontend Dev Server

```powershell
cd c:\Users\sahil\OneDrive\Desktop\Projects\FYP\frontend
npm run dev
```

**Expected Output:**

```
> frontend@0.1.0 dev
> next dev

  ▲ Next.js 14.2.10
  - Local:        http://localhost:3000
```

### 3.2 Manual UI Testing Checklist

#### Homepage (`http://localhost:3000`)

- [ ] Hero section displays "ScamGuard Nepal" with gradient
- [ ] Number search form visible
- [ ] SIM swap explainer section present
- [ ] Screenshot analyzer component visible
- [ ] Report form loads
- [ ] Trending numbers list appears

#### Number Search Feature

- [ ] Enter number: `9841234567`
- [ ] Click "Check Number"
- [ ] Results show:
  - [ ] Visual risk gauge (animated progress bar)
  - [ ] Risk level badge (color-coded)
  - [ ] Report count
  - [ ] Anomaly badges (if any)
  - [ ] SIM swap detection panel
  - [ ] Recent reports list

#### Report Submission

- [ ] Fill form: Number, Category, Description
- [ ] Click "Submit Report"
- [ ] Success message appears
- [ ] Trending list updates

#### Screenshot Analysis

- [ ] Click "Select Image" or drag-drop an image
- [ ] Image preview appears
- [ ] Click "Analyze Screenshot"
- [ ] Results display (or OCR setup message)

#### Navigation

- [ ] Click "About" in header → `/about` page loads
- [ ] Check content: Mission, Features, Tech Stack, How It Works
- [ ] Click "Help" in header → `/help` page loads
- [ ] Check tabs: Check Numbers, Report Scams, Screenshot Analysis, Understanding Results

#### Responsive Design

- [ ] Resize browser window
- [ ] Glass cards adjust properly
- [ ] Navigation works on mobile view

---

## Phase 4: Integration Testing

### 4.1 End-to-End Workflow Test

**Scenario: User reports a scam number and checks risk**

1. **Submit 3 reports for same number** (simulate multiple victims):

```powershell
# Report 1
curl -X POST http://localhost:8000/reports `
  -H "Content-Type: application/json" `
  -d '{\"number\":\"9851112233\",\"category\":\"OTP Theft\",\"description\":\"Asked for bank OTP\",\"scam_probability\":0.80}'

# Report 2
curl -X POST http://localhost:8000/reports `
  -H "Content-Type: application/json" `
  -d '{\"number\":\"9851112233\",\"category\":\"Bank Impersonation\",\"description\":\"Claimed to be from NIC Asia Bank\",\"scam_probability\":0.75}'

# Report 3
curl -X POST http://localhost:8000/reports `
  -H "Content-Type: application/json" `
  -d '{\"number\":\"9851112233\",\"category\":\"OTP Theft\",\"description\":\"Fake verification SMS\",\"scam_probability\":0.85}'
```

2. **Check risk score:**

```powershell
curl http://localhost:8000/number/9851112233
```

**Expected Results:**

- `report_count`: 3
- `risk_score`: High (>0.66)
- `risk_level`: "HIGH"
- `anomaly_flags.repeated_targets`: true (3+ reports)
- `anomaly_flags.category_focus`: true (67% OTP-related)

3. **Check SIM swap detection:**

```powershell
curl http://localhost:8000/sim_swap/9851112233
```

**Expected:**

- `sim_swap_detected`: true (if 2+ flags active)
- `indicators.otp_focus`: true (≥50% OTP/bank reports)
- `indicators.high_probability_cluster`: true (3 high-prob reports)

4. **Verify in frontend:**

- Go to `http://localhost:3000`
- Enter `9851112233` in search
- Check for:
  - Red HIGH RISK badge
  - SIM swap warning in detection panel
  - 3 recent reports listed

### 4.2 Trending Numbers Test

```powershell
# Submit reports for multiple numbers
curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9801234567\",\"category\":\"Fake Job Offer\",\"description\":\"Scam\",\"scam_probability\":0.60}'

curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9801234567\",\"category\":\"Fake Job Offer\",\"description\":\"Scam\",\"scam_probability\":0.65}'

# Check trending
curl http://localhost:8000/trending
```

**Expected:** `9851112233` and `9801234567` appear in trending list

---

## Phase 5: Optional OCR Setup (Screenshot Analysis)

### 5.1 Install Tesseract OCR

**Windows:**

1. Download installer: https://github.com/UB-Mannheim/tesseract/wiki
2. Install to `C:\Program Files\Tesseract-OCR`
3. Add to PATH: `C:\Program Files\Tesseract-OCR`

**Verify installation:**

```powershell
tesseract --version
# Expected: tesseract 5.x.x
```

### 5.2 Install Python Package

```powershell
cd c:\Users\sahil\OneDrive\Desktop\Projects\FYP\backend
pip install pytesseract
```

### 5.3 Update Screenshot Router

Edit `backend/app/routers/screenshot.py`:

```python
# Uncomment these lines in extract_text_from_image():
import pytesseract
from PIL import Image

def extract_text_from_image(image_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR extraction failed: {str(e)}")
```

### 5.4 Test OCR

Create a test image with scam text (e.g., screenshot of fake OTP message), then:

```powershell
curl -X POST http://localhost:8000/analyze-screenshot `
  -F "file=@c:\path\to\scam_screenshot.jpg"
```

**Expected:** `extracted_text` contains actual text, `scam_probability` based on keywords

---

## Phase 6: Sample Data Seeding

### 6.1 Seed Realistic Nepali Scam Reports

Run these commands to populate your database with demo data:

```powershell
# OTP Theft cluster (triggers SIM swap)
curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9849876543\",\"category\":\"OTP Theft\",\"description\":\"Fake bank SMS asking for OTP\",\"scam_probability\":0.82}'

curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9849876543\",\"category\":\"Bank Impersonation\",\"description\":\"Called pretending to be from Nabil Bank\",\"scam_probability\":0.78}'

curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9849876543\",\"category\":\"OTP Theft\",\"description\":\"SMS: Your account will be blocked, send OTP\",\"scam_probability\":0.85}'

curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9849876543\",\"category\":\"OTP Theft\",\"description\":\"WhatsApp message asking for eSewa PIN\",\"scam_probability\":0.80}'

# Fake job offers
curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9801122334\",\"category\":\"Fake Job Offer\",\"description\":\"Promised high salary, asked for registration fee\",\"scam_probability\":0.70}'

curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9801122334\",\"category\":\"Fake Job Offer\",\"description\":\"Dubai job scam, demanded Rs 50,000 upfront\",\"scam_probability\":0.75}'

# Prize/lottery scams
curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9811998877\",\"category\":\"Prize/Lottery Scam\",\"description\":\"Won Rs 10 lakh in lucky draw, asked to pay tax first\",\"scam_probability\":0.88}'

# Low-risk examples
curl -X POST http://localhost:8000/reports -H "Content-Type: application/json" -d '{\"number\":\"9851234500\",\"category\":\"Spam\",\"description\":\"Annoying marketing calls\",\"scam_probability\":0.25}'
```

### 6.2 Verify Seeded Data

```powershell
# Check dashboard
curl http://localhost:8000/dashboard

# Expected:
# - total_reports: 8
# - high_risk_numbers: 3-4
# - top_categories: [OTP Theft, Fake Job Offer, etc.]

# Check SIM swap for high-activity number
curl http://localhost:8000/sim_swap/9849876543

# Expected: sim_swap_detected: true
```

---

## Phase 7: API Documentation

### 7.1 Access Swagger UI

Open in browser: `http://localhost:8000/docs`

**Features:**

- Interactive API documentation
- Try out endpoints directly
- View request/response schemas

### 7.2 Access ReDoc

Open in browser: `http://localhost:8000/redoc`

**Features:**

- Clean documentation layout
- Better for reading/reference

---

## Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'app'`

```powershell
# Solution: Run from backend directory
cd c:\Users\sahil\OneDrive\Desktop\Projects\FYP\backend
python -m uvicorn app.main:app --reload --port 8000
```

**Problem:** MongoDB connection fails

```powershell
# Check .env file exists
cat backend\.env

# Verify MONGODB_URI is set correctly
# Test connection:
curl http://localhost:8000/health/db
```

**Problem:** CORS errors in browser console

```powershell
# Verify backend .env has:
# CORS_ORIGINS=http://localhost:3000

# Restart backend after env changes
```

### Frontend Issues

**Problem:** `Error: Node.js version 14.21.3 is too old`

```powershell
# Install Node 20+
nvm install 20
nvm use 20
```

**Problem:** `ECONNREFUSED` when calling API

```powershell
# Ensure backend is running first
# Check NEXT_PUBLIC_API_BASE_URL in frontend/.env.local
cat frontend\.env.local
```

**Problem:** Screenshot upload fails

```powershell
# Check file size (<5MB)
# Verify format (JPG/PNG/WEBP only)
# Check browser console for errors
```

### Database Issues

**Problem:** No data returned from queries

```powershell
# Seed sample data (see Phase 6)
# Or create reports manually via frontend
```

---

## Performance Testing

### Load Test with Multiple Reports

```powershell
# Submit 20 reports rapidly
for ($i=1; $i -le 20; $i++) {
    curl -X POST http://localhost:8000/reports `
      -H "Content-Type: application/json" `
      -d "{`"number`":`"985111$i$i$i$i`",`"category`":`"Spam`",`"description`":`"Test $i`",`"scam_probability`":0.5}"
}

# Check dashboard performance
Measure-Command { curl http://localhost:8000/dashboard }
```

---

## Production Checklist

Before deploying to production:

- [ ] Replace `classify_probability_stub()` with real ML model
- [ ] Configure Tesseract OCR or Google Cloud Vision API
- [ ] Add authentication/authorization for report submissions
- [ ] Implement rate limiting (prevent spam reports)
- [ ] Add CAPTCHA to forms
- [ ] Set up proper logging (not just console)
- [ ] Configure production MongoDB with backups
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (SSL certificates)
- [ ] Add monitoring (Sentry, New Relic, etc.)
- [ ] Optimize database indexes
- [ ] Add input validation and sanitization
- [ ] Implement proper error handling
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline

---

## Next Steps

1. **Install Node 20** (if not done)
2. **Start backend** → Test all endpoints with curl
3. **Start frontend** → Test UI features manually
4. **Seed sample data** → Make demo realistic
5. **Test end-to-end** → Number lookup, report submission, SIM swap detection
6. **Optional: Set up OCR** → Enable full screenshot analysis

**Your project is ready for demonstration!** 🎉

For questions or issues, check:

- FastAPI docs: http://localhost:8000/docs
- MongoDB logs in Atlas dashboard
- Browser console for frontend errors
- Backend terminal for API errors
