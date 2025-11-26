import os
from datetime import datetime
from typing import Optional
from supabase import create_client, Client
import uuid

class StorageService:
    """Service for managing screenshot uploads to Supabase Storage."""
    
    def __init__(self):
        supabase_url = os.getenv("SUPABASE_URL")
        supabase_key = os.getenv("SUPABASE_SERVICE_KEY")
        
        if not supabase_url or not supabase_key:
            self.client = None
            self.bucket = None
            print("⚠️ Supabase credentials not configured. Storage features disabled.")
        else:
            self.client: Client = create_client(supabase_url, supabase_key)
            self.bucket = os.getenv("SUPABASE_BUCKET", "scam-screenshots")
    
    def is_available(self) -> bool:
        """Check if storage service is configured."""
        return self.client is not None
    
    def upload_screenshot(
        self, 
        file_bytes: bytes, 
        filename: str,
        is_high_risk: bool = False
    ) -> Optional[dict]:
        """
        Upload screenshot to Supabase Storage.
        
        Args:
            file_bytes: Image file bytes
            filename: Original filename
            is_high_risk: If True, save to high-risk folder
            
        Returns:
            dict with 'url' and 'path' or None if failed
        """
        if not self.is_available():
            return None
        
        try:
            # Generate unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            unique_id = str(uuid.uuid4())[:8]
            ext = filename.split('.')[-1] if '.' in filename else 'jpg'
            
            # Determine folder based on risk level
            folder = "high-risk" if is_high_risk else "analysis"
            storage_path = f"{folder}/{timestamp}_{unique_id}.{ext}"
            
            # Upload to Supabase
            response = self.client.storage.from_(self.bucket).upload(
                path=storage_path,
                file=file_bytes,
                file_options={"content-type": f"image/{ext}"}
            )
            
            # Get public URL
            public_url = self.client.storage.from_(self.bucket).get_public_url(storage_path)
            
            return {
                "url": public_url,
                "path": storage_path,
                "folder": folder,
                "uploaded_at": datetime.now().isoformat()
            }
        
        except Exception as e:
            print(f"Storage upload failed: {e}")
            return None
    
    def delete_screenshot(self, storage_path: str) -> bool:
        """
        Delete screenshot from Supabase Storage.
        
        Args:
            storage_path: Path in storage (e.g., 'analysis/20241119_abc123.jpg')
            
        Returns:
            True if deleted successfully, False otherwise
        """
        if not self.is_available():
            return False
        
        try:
            self.client.storage.from_(self.bucket).remove([storage_path])
            return True
        except Exception as e:
            print(f"Storage deletion failed: {e}")
            return False
    
    def list_high_risk_screenshots(self, limit: int = 50) -> list:
        """
        List all high-risk screenshots from storage.
        
        Args:
            limit: Maximum number of screenshots to return
            
        Returns:
            List of dicts with file info and public URLs
        """
        if not self.is_available():
            return []
        
        try:
            # List files in high-risk folder
            files = self.client.storage.from_(self.bucket).list("high-risk")
            
            # Get public URLs for each file
            screenshots = []
            for file in files[:limit]:
                path = f"high-risk/{file['name']}"
                url = self.client.storage.from_(self.bucket).get_public_url(path)
                
                screenshots.append({
                    "name": file['name'],
                    "url": url,
                    "path": path,
                    "created_at": file.get('created_at'),
                    "size": file.get('metadata', {}).get('size', 0)
                })
            
            # Sort by creation date (newest first)
            screenshots.sort(key=lambda x: x.get('created_at', ''), reverse=True)
            
            return screenshots
        
        except Exception as e:
            print(f"Failed to list screenshots: {e}")
            return []

# Singleton instance
storage_service = StorageService()
