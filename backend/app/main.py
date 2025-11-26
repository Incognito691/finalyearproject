from fastapi import FastAPI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()  # load environment variables from .env if present
from app.routers.health import router as health_router
from app.routers.classify import router as classify_router
from app.routers.reports import router as reports_router
from app.routers.sim_swap import router as sim_swap_router
from app.routers.screenshot import router as screenshot_router

app = FastAPI(title="AI-Powered SIM Swap & Fake Number Verification Backend", version="0.0.1")

# CORS configuration (allow frontend calls)
origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000")
origins = [o.strip() for o in origins_env.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(classify_router)
app.include_router(reports_router)
app.include_router(sim_swap_router)
app.include_router(screenshot_router)

@app.get("/")
async def root():
    return {"name": "backend", "status": "running"}
