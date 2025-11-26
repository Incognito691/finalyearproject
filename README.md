# FYP: AI-Powered SIM Swap & Fake Number Verification System

This document captures a pragmatic, free-tier-friendly tech stack and deployment plan for your project. It balances speed, cost, and maintainability while enabling solid ML/NLP integration for Nepali + English scam detection.

## Recommended Stack (Production-Ready Student Build)

- Frontend: Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui
- App Backend (CRUD + Dashboard): Next.js Server Actions / Route Handlers (Node 18+)
- ML Service (Text Classification): Python FastAPI + scikit-learn (baseline) → optional Transformers later
- Database (Free): PostgreSQL on Neon or Supabase (both have generous free tiers)
- ORM: Prisma (TypeScript) connecting Next.js → Postgres
- Caching/Rate limiting (Free): Upstash Redis (optional but recommended)
- File Storage (optional for artifacts): Supabase storage or Git LFS for model files (<100 MB)
- Auth (optional): NextAuth.js with Email (magic link) or Credentials; or Supabase Auth
- Telemetry: Sentry (free) for frontend + backend error tracking
- Deployment: Vercel (Next.js), Railway/Render (FastAPI), Neon/Supabase (Postgres), Upstash (Redis)

### Why this setup

- Python is the most practical for NLP/ML; FastAPI is simple and fast.
- Next.js covers UI + APIs, reducing the need for a separate Node server.
- Postgres fits structured entities (numbers, reports, categories, scores) and supports analytics queries.
- All services have stable free tiers suitable for a capstone.

## Simpler Alternative (Fast Demo)

- Keep Frontend + CRUD in Next.js as above.
- Skip hosting your own ML initially: call Hugging Face Inference API (free tier) with a multilingual model (e.g., `distilbert-base-multilingual-cased`) for classification. Migrate to FastAPI later when dataset grows.

## High-Level Architecture

User → Next.js (UI) → Route Handler/Server Action →

- DB: Postgres (Prisma) for numbers, reports, scores, categories
- Cache: Redis for rate limiting, trending lists
- ML: FastAPI endpoint `/classify` scoring text → returns probability

Risk Score = f(ML score, #reports, recency, category weight, anomaly flags)

## Database Schema (initial)

- numbers(id, e164, created_at)
- reports(id, number_id, message_text, category, created_at, reporter_ip_hash)
- scores(id, number_id, risk_low_med_high, score_float, evidence_json, updated_at)
- categories(id, key, label)
- events(id, number_id, type, payload_json, created_at) // optional for audit/anomalies

## ML Plan

- Phase 1 (baseline):
  - Preprocess: lowercasing, Unicode normalization, basic tokenization; retain Devanagari.
  - Features: TF-IDF (char + word n-grams).
  - Model: Logistic Regression or Linear SVM.
  - Persistence: `joblib` dump file.
- Phase 2 (upgrade):
  - Transformer: `xlm-roberta-base` or `distilbert-multilingual`. Fine-tune with Nepali + English samples.
  - Add simple anomaly rules (e.g., frequency spikes per 24h, repeated reports per IP/AS).

## Free-Tier Mapping

- Vercel: Next.js (hobby) – free
- Railway/Render: FastAPI ML service – free tier
- Neon or Supabase: Postgres – free
- Upstash: Redis & QStash (optional jobs) – free
- Sentry: error monitoring – free

## Key Libraries

- Frontend: `next`, `react`, `tailwindcss`, `@tanstack/react-query` (optional), `zod`, `shadcn/ui`
- Backend (Next): `prisma`, `@prisma/client`, `zod`, `next-auth` (optional)
- ML (Python): `fastapi`, `uvicorn`, `scikit-learn`, `pandas`, `numpy`, `joblib`
- Optional NLP upgrade: `transformers`, `datasets`, `torch`
- Phone utils: `libphonenumber-js` (format/validate E.164)
- Rate limiting: `@upstash/ratelimit`, `ioredis`

## Security & Privacy

- Store numbers in E.164; mask on UI (e.g., 98**\*\***45).
- Hash reporter IP (salted) to dedupe without storing PII.
- Rate limit submissions; CAPTCHA on report forms.
- Show disclaimer: "AI-assisted risk prediction, not definitive proof."

## Project Breakdown

1. Bootstrap Next.js app (UI, search, report form, dashboard)
2. Set up Postgres (Neon/Supabase) + Prisma schema + migrations
3. Implement CRUD APIs in Next.js route handlers; add Zod validation
4. Stand up FastAPI `/classify` with TF-IDF + Logistic Regression baseline
5. Risk score service combining ML probability + report history + simple anomalies
6. Dashboard: trending numbers, categories, precision/recall (offline eval)
7. Auth (optional) & admin moderation
8. Deploy (Vercel + Railway + Neon/Supabase) and wire env vars

## Next Steps (Suggested)

- Initialize repo(s) and env templates
- Choose Neon or Supabase; generate connection string
- Create Prisma schema and first migration
- Scaffold FastAPI with a placeholder classifier
- Wire search/report UI and basic risk scoring

This plan is ready to implement incrementally while staying within free tiers.

## Folder Structure (Split Frontend & Backend)

```
FYP/
  README.md                ← master architecture & planning
  frontend/                ← Next.js + Tailwind (user UI, dashboard)
    src/app/...            ← App Router pages & components
    src/lib/...            ← client utilities
    src/components/...     ← shared UI components
    public/                ← static assets
    package.json
    tsconfig.json
    tailwind.config.ts
    postcss.config.mjs
    next.config.mjs
    .env.example           ← FRONTEND env placeholders
  backend/                 ← FastAPI ML/risk scoring & data APIs
    app/main.py            ← FastAPI app factory & router include
    app/routers/classify.py← mock classify endpoint
    app/routers/numbers.py ← number/report endpoints (to add later)
    app/core/config.py     ← settings via env
    models/ (optional)     ← Pydantic models
    tests/test_health.py   ← basic health test
    requirements.txt
    .env.example           ← BACKEND env placeholders
```

Rationale: Clear separation eases deployment (Vercel for `frontend`, Railway/Render for `backend`) and independent scaling of ML and UI concerns.

### Quick Start

Frontend:

```
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

Backend:

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Health: http://localhost:8000/health
# Classify test (POST): http://localhost:8000/classify
```

Environment Variables:

- `frontend/.env` → `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`
- `backend/.env` → `PORT=8000`, `MODEL_PATH=./model/joblib_model.pkl`

Next Steps:

1. Connect frontend search to backend classify endpoint.
2. (DONE) Report submission API & in-memory persistence.
3. Implement real ML pipeline (train TF-IDF model; replace stub logic).
4. (DONE) Risk score aggregation route `/number/{number}`.
5. Add trending endpoint (DONE) & dashboard (DONE).
6. Integrate rate limiting & basic auth (pending).
7. Replace in-memory stores with DB (Postgres or MongoDB).
8. Add admin panel & retraining trigger.

## Implemented MVP Endpoints

- `POST /reports` submit scam report (stores scam_probability heuristic)
- `GET /number/{number}` returns risk score, anomalies, recent reports
- `GET /trending` top reported numbers
- `GET /dashboard` aggregate counts & category distribution
- `POST /classify` standalone message classification stub
- `GET /health` service status
- `GET /sim_swap/{number}` heuristic SIM-swap indicators

## Feature Phases

Phase 0 (Prototype - current): MongoDB persistence (reports), heuristic classifier, risk scoring combining probability + log(report_count) + anomaly + sim-swap flags.
Phase 1: Implement TF-IDF Logistic Regression model, add rate limiting & basic validation, expose richer number history endpoint.
Phase 2: Add admin panel (review, export, retrain), community voting (up/down), API key auth for public API usage.
Phase 3: Transformer fine-tune (multilingual), anomaly model improvements, scheduled retraining workflow.
Phase 4: Notifications (email/in-app), dataset publication, performance scaling (Redis cache, batching).

## Risk Scoring (Current Formula)

score = ml_prob + 0.1 \* log(1 + reports) + anomaly_bonus (spike/burst/repeated_message + sim_swap) capped at 0.99; thresholds: LOW <0.33, MEDIUM <=0.66, HIGH >0.66.

## SIM-Swap Detection (Behavioral Proxy)

**Important Disclaimer:** This system does NOT detect actual SIM-swap events at the telecom level (which requires IMSI/IMEI logs, SIM replacement events, network auth data). Instead, it detects **suspicious activity patterns** from crowd-sourced reports that MAY indicate a number was compromised via SIM-swap or is being used for coordinated scams.

Endpoint: `GET /sim_swap/{number}` and embedded in `/number/{number}` as `suspicious_activity`.

**Behavioral Indicators Detected:**

1. **recent_surge**: ≥4 reports within 48 hours (rapid escalation)
2. **otp_focus**: ≥50% of recent reports are OTP Theft / Bank Impersonation (account takeover attempt pattern)
3. **high_prob_cluster**: ≥3 recent reports with scam_probability >0.6 (ML confirms malicious content)
4. **victim_self_report**: Report messages contain keywords like "hacked", "not me", "stolen", "unauthorized" (victim realized hijack)
5. **multi_category_attack**: ≥3 different scam categories reported in 48h (coordinated fraud campaign)

**Detection Logic:**

- If ≥2 flags are true → `suspicious_activity_detected: true`
- Adds +0.2 to risk score (higher weight than basic anomalies)
- Returns `likely_scenario` explanation

**What This Detects vs. What It Doesn't:**
✅ Detects: Scam activity spike after a SIM swap likely occurred  
✅ Detects: Number being used for mass OTP phishing (post-hijack behavior)  
✅ Detects: Victim reporting their own number was compromised  
❌ Does NOT detect: The actual SIM card replacement event  
❌ Does NOT detect: IMEI changes, location jumps, telecom auth logs

**Use Case:**  
If a victim's SIM is swapped and attacker starts calling people requesting OTPs, victims will report the number → system flags it as suspicious → other users see warning before falling victim.

**Future Enhancement:**  
Integrate with Nepal Telecom API (if available) for real SIM replacement event webhooks.

## Planned Data Fields (DB Migration)

Reports (Mongo): { \_id, number, category, message, scam_probability, created_at }
Future Collections:

- numbers: number (pk), first_seen_at, last_report_at
- scores: number, risk_score, risk_level, anomalies, sim_swap, updated_at
- categories: key, label, weight
- events (optional): number, event_type, payload, created_at

## MongoDB Setup

1. Create Atlas cluster → get connection string.
2. Set `MONGODB_URI` & `MONGODB_DB` in `.env`.
3. Service auto-creates indexes on: number, created_at, category.
4. Data growth considerations: add TTL if needed for very old low-risk reports.

## MongoDB Option (If You Prefer NoSQL)

- DB: MongoDB Atlas (free shared cluster). Replace Postgres with Mongo.
- Driver/ORM choice:
  - Official driver: simplest, no extra layer; manual validation.
  - Mongoose (ODM): schema + validation + middleware; popular and stable.
  - Prisma (Mongo connector): type-safe client; fewer aggregation features vs SQL.

### When to pick MongoDB

- You want schemaless iteration and are comfortable modeling documents.
- You don’t need SQL-style joins/window functions for analytics right now.
- Team already knows Mongoose/Node and wants a quick path.

### When to stick with Postgres

- You’ll run analytics (trending, time windows) and ad‑hoc queries.
- You prefer strict relational schemas and transactional integrity across relations.

### Minimal Setup (MongoDB + Next.js)

- Create an Atlas cluster → get `MONGODB_URI`.
- Add a tiny connection utility and reuse it in Route Handlers/Server Actions.

Example (Mongoose):

```ts
// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

let cached = (global as any).mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, { dbName: "fyp" });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
```

Example (Official Driver):

```ts
// lib/mongo.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error("MONGODB_URI not set");

const client = new MongoClient(uri);
export async function mongo() {
  if (!client.topology) await client.connect();
  return client.db("fyp");
}
```

Collections you’d create:

- `numbers` { \_id, e164, createdAt }
- `reports` { \_id, numberId (ref), messageText, category, createdAt, reporterIpHash }
- `scores` { \_id, numberId (ref), level, score, evidence }

Typical aggregation for trending (Mongo):

```js
db.reports.aggregate([
  {
    $match: { createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
  },
  { $group: { _id: "$numberId", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 20 },
]);
```

Summary: MongoDB works fine for this project, especially if your team prefers it. An ORM/ODM isn’t strictly required, but using Mongoose (or Prisma’s Mongo connector) improves schema validation, DX, and maintainability. If you anticipate heavier analytics and complex joins later, Postgres + Prisma remains the safer long‑term choice.
#   f i n a l y e a r p r o j e c t  
 