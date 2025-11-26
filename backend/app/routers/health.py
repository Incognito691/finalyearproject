from fastapi import APIRouter
from app.db.mongo import get_client
from app.services.storage import storage_service

router = APIRouter()

@router.get("/health")
async def health():
    return {"status": "ok"}

@router.get("/health/db")
async def health_db():
    try:
        # Simple ping to confirm DB connectivity
        get_client().admin.command("ping")
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        # Do not leak sensitive details; return brief message
        return {"status": "degraded", "db": "unreachable"}

@router.get("/health/storage")
async def health_storage():
    """Check if Supabase storage is configured and accessible."""
    if not storage_service.is_available():
        return {
            "status": "not_configured",
            "storage": "disabled",
            "message": "Supabase credentials not set. Check SUPABASE_URL and SUPABASE_SERVICE_KEY in .env"
        }
    
    try:
        # Try to list buckets to verify connection
        buckets = storage_service.client.storage.list_buckets()
        bucket_names = [b.name for b in buckets] if buckets else []
        
        return {
            "status": "ok",
            "storage": "connected",
            "buckets": bucket_names,
            "target_bucket": storage_service.bucket
        }
    except Exception as e:
        return {
            "status": "error",
            "storage": "connection_failed",
            "error": str(e)
        }
