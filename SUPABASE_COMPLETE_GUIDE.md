# Complete Supabase Storage Setup

## ✅ Environment Variables Configured

Your Supabase credentials have been added to both backend and frontend `.env` files.

---

## 🗂️ Step 1: Create Storage Bucket in Supabase

1. **Go to Supabase Dashboard:**

   - URL: https://supabase.com/dashboard/project/iioqcalmjjtokbtbkcyc

2. **Navigate to Storage:**

   - Click **Storage** in the left sidebar

3. **Create New Bucket:**

   - Click **"New Bucket"** button
   - **Bucket name:** `scam-screenshots`
   - **Public bucket:** ✅ **CHECK THIS** (Important - allows public viewing of images)
   - Click **"Create Bucket"**

4. **Verify Bucket Created:**
   - You should see `scam-screenshots` in your buckets list

---

## 🔐 About the PostgreSQL Connection String

The connection string you showed in the screenshot:

```
postgresql://postgres:[YOUR_PASSWORD]@db.iioqcalmjjtokbtbkcyc.supabase.co:5432/postgres
```

**You DON'T need this for our project** because:

- We're using **Supabase Storage** (file storage), not PostgreSQL database
- We already have **MongoDB Atlas** for our database
- The JWT keys (service_role & anon) are what we need for Storage API

---

## 📦 Step 2: Install Backend Dependencies

```powershell
cd C:\Users\sahil\OneDrive\Desktop\Projects\FYP\backend
pip install supabase==2.3.0
```

---

## 🚀 Step 3: Restart Backend Server

```powershell
# In backend directory
python -m uvicorn app.main:app --reload --port 8000
```

You should see:

```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Check the logs** - you should NOT see "⚠️ Supabase credentials not configured" anymore.

---

## 🧪 Step 4: Test Screenshot Upload

### Test with a sample image:

1. **Create or find a test image** (any JPG/PNG/WEBP)

2. **Upload via curl:**

```powershell
curl -X POST http://localhost:8000/analyze-screenshot `
  -F "file=@C:\path\to\your\test-image.jpg"
```

3. **Expected Response:**

```json
{
  "extracted_text": "",
  "scam_probability": 0.0,
  "risk_level": "UNKNOWN",
  "detected_keywords": [],
  "explanation": "⚠️ OCR is not yet configured...",
  "image_url": "https://iioqcalmjjtokbtbkcyc.supabase.co/storage/v1/object/public/scam-screenshots/analysis/20241119_abc123.jpg",
  "storage_path": "analysis/20241119_abc123.jpg"
}
```

**Key:** Check if `image_url` is present! That means upload worked.

---

## 🎨 Step 5: Test Frontend

1. **Start frontend:**

```powershell
cd C:\Users\sahil\OneDrive\Desktop\Projects\FYP\frontend
npm run dev
```

2. **Open browser:** http://localhost:3000

3. **Test Screenshot Analyzer:**

   - Scroll to "Screenshot Scam Analyzer" section
   - Upload an image (any image for now)
   - Click "Analyze Screenshot"
   - Check if result includes "Saved to Scam Gallery" link (if 80%+ risk)

4. **Visit Scam Gallery:**
   - Click "Scam Gallery" in header
   - Should show uploaded high-risk images

---

## 🧪 Step 6: Test High-Risk Upload (80%+)

To trigger the gallery save, we need to simulate a high-risk image. Since OCR isn't configured yet, you can modify the backend temporarily:

**Option A: Manual Test with Modified Code**

Temporarily edit `backend/app/routers/screenshot.py`:

```python
# Line ~80 - Change this:
extracted_text = extract_text_from_image(contents)

# To this (temporary test):
extracted_text = "otp verification bank account password urgent click link expire"
```

This will:

- Give a high scam probability (80%+)
- Trigger upload to `high-risk` folder
- Show "Saved to Scam Gallery" notification
- Image appears in `/scam-gallery` page

**After testing, change it back!**

---

## 📁 Verify Bucket Structure

After uploads, check your Supabase Storage:

1. Go to **Storage** → **scam-screenshots** bucket
2. You should see folders:
   - **analysis/** - All uploaded images
   - **high-risk/** - Only images with 80%+ scam probability

---

## ✅ Checklist

- [x] Environment variables added to `backend/.env`
- [x] Environment variables added to `frontend/.env.local`
- [ ] Storage bucket `scam-screenshots` created in Supabase (PUBLIC)
- [ ] Backend dependency `supabase==2.3.0` installed
- [ ] Backend restarted successfully
- [ ] Test image uploaded (check for `image_url` in response)
- [ ] Frontend displays gallery link for high-risk images
- [ ] Gallery page shows uploaded images

---

## 🔧 Troubleshooting

### Problem: "Storage service not configured"

**Solution:** Make sure bucket exists and is named exactly `scam-screenshots`

### Problem: Images not appearing in gallery

**Solution:**

1. Check bucket is **PUBLIC**
2. Upload images with 80%+ probability
3. Check `high-risk` folder in Supabase Storage

### Problem: CORS error when uploading

**Solution:** Supabase Storage allows CORS by default, but check bucket settings

### Problem: 403 Forbidden

**Solution:**

1. Verify `SUPABASE_SERVICE_KEY` is correct
2. Check bucket policies (should allow public read)

---

## 🎯 Next Steps

Once storage is working:

1. **Optional:** Set up Tesseract OCR for real text extraction
2. **Test with real scam screenshots** to populate gallery
3. **Share gallery link** with testers
4. **Monitor storage usage** in Supabase dashboard

---

## 🔐 Security Reminder

✅ **Already Done Right:**

- Service role key in backend only (server-side)
- Anon key in frontend (safe for browser)
- `.env` files in `.gitignore` (not committed)

⚠️ **Never share** your `service_role` key publicly (only share with your backend server)

---

## 📊 Storage Limits (Supabase Free Tier)

- **Storage:** 1 GB
- **Bandwidth:** 2 GB per month
- **File size limit:** 50 MB per file (we limit to 5 MB)

For production, upgrade if needed: https://supabase.com/pricing

---

You're all set! Create the bucket and test the upload. 🚀
