import os
from functools import lru_cache

class Settings:
    port: int = int(os.getenv("PORT", "8000"))
    model_path: str = os.getenv("MODEL_PATH", "./model/joblib_model.pkl")

@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
