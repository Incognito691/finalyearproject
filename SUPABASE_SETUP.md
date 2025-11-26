# Supabase Storage Setup Guide

## Step 1: Get Your Supabase Connection String

From your screenshot, I can see you have a PostgreSQL connection string from Supabase:

```
postgresql://postgres:[YOUR_PASSWORD]@db.iioqcainjtokibkcyc.supabase.co:5432/postgres
```

## Step 2: Create Storage Bucket

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project (the one with `iioqcainjtokibkcyc`)
3. Navigate to **Storage** in the left sidebar
4. Click **"New Bucket"**
5. Create a bucket with these settings:
   - **Name:** `scam-screenshots`
   - **Public bucket:** ✅ **YES** (so images can be viewed in gallery)
   - Click **Create Bucket**

## Step 3: Get Your Supabase Credentials

You need 3 things from your Supabase dashboard:

### Option A: From Project Settings

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL:** `https://iioqcainjtokibkcyc.supabase.co`
   - **anon/public key:** (long JWT token starting with `eyJ...`)
   - **service_role key:** (another JWT token - keep this SECRET!)

### Option B: I'll help you construct them

Since I can see your project reference is `iioqcainjtokibkcyc`, your:

- **SUPABASE_URL** = `https://iioqcainjtokibkcyc.supabase.co`
- **SUPABASE_KEY** = You need to copy this from Settings → API (the `anon public` key)
- **SUPABASE_SERVICE_KEY** = Copy the `service_role` key (for backend only)

## Step 4: Add Environment Variables

### Backend (.env)

Add these lines to `backend/.env`:

```bash
# Supabase Configuration
SUPABASE_URL=https://iioqcainjtokibkcyc.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
SUPABASE_BUCKET=scam-screenshots
```

### Frontend (.env.local)

Add this to `frontend/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://iioqcainjtokibkcyc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
```

## Step 5: Install Dependencies

I'll update your `requirements.txt` and `package.json` to include Supabase clients.

## Storage Structure

Your screenshots will be organized like this:

```
scam-screenshots/
├── high-risk/
│   ├── 2024-11-19_abc123.jpg  (80%+ risk)
│   ├── 2024-11-19_def456.png  (85% risk)
│   └── ...
└── analysis/
    ├── 2024-11-19_xyz789.jpg  (all uploads)
    └── ...
```

## Security Notes

⚠️ **IMPORTANT:**

- Never commit `.env` files to Git
- The `service_role` key has admin access - keep it SECRET
- Only use `anon public` key in frontend
- The public bucket allows viewing but deletion requires authentication

## Next Steps

After you provide your Supabase keys, I will:

1. ✅ Update backend to upload screenshots to Supabase
2. ✅ Save high-risk images (80%+) to a special folder
3. ✅ Add delete functionality
4. ✅ Create scam gallery to display risky screenshots
5. ✅ Make header clickable

**Please share your Supabase URL and keys (or I'll proceed with placeholders you can replace).**
