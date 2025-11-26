"""
Script to load dummy scam report data into MongoDB for ML training.
Run this script to populate the database with realistic scam patterns.

Usage:
    python scripts/load_dummy_data.py
"""

import json
import sys
from pathlib import Path
from datetime import datetime, timedelta, timezone
import random

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.db.mongo import reports_collection
from app.services.risk import classify_probability_stub, normalize_number


def load_dummy_data():
    """Load dummy reports from JSON file into MongoDB."""
    
    # Path to dummy data file
    data_file = Path(__file__).parent.parent / "data" / "dummy_reports_50.json"
    
    if not data_file.exists():
        print(f"Error: Dummy data file not found at {data_file}")
        return
    
    # Load JSON data
    with open(data_file, 'r', encoding='utf-8') as f:
        dummy_reports = json.load(f)
    
    print(f"Loading {len(dummy_reports)} dummy reports into MongoDB...")
    print("=" * 60)
    
    # Clear existing data
    print("Clearing existing reports...")
    reports_collection().delete_many({})
    
    success_count = 0
    error_count = 0
    
    # Base time for calculating timestamps
    base_time = datetime.now(timezone.utc)
    
    for idx, report in enumerate(dummy_reports, 1):
        try:
            # Use hours_ago from JSON if available, otherwise random
            hours_ago = report.get('hours_ago', random.randint(1, 168))
            
            # Calculate created_at timestamp
            created_at = base_time - timedelta(hours=hours_ago)
            
            # Use scam_probability from JSON
            scam_prob = report.get('scam_probability', 0.5)
            
            # Insert directly into MongoDB
            document = {
                "number": normalize_number(report['number']),
                "category": report['category'],
                "message": report['message'],
                "scam_probability": scam_prob,
                "created_at": created_at
            }
            
            reports_collection().insert_one(document)
            success_count += 1
            
            # Show progress every 10 reports
            if idx % 10 == 0:
                print(f"Processed {idx}/{len(dummy_reports)} reports...")
        
        except Exception as e:
            error_count += 1
            print(f"Error adding report #{idx}: {str(e)}")
    
    print("=" * 60)
    print(f"\n✅ Successfully loaded: {success_count} reports")
    if error_count > 0:
        print(f"❌ Failed: {error_count} reports")
    
    # Show summary statistics
    print("\n📊 Database Summary:")
    total_reports = reports_collection().count_documents({})
    print(f"   Total reports in DB: {total_reports}")
    
    # Count unique numbers
    unique_numbers = reports_collection().distinct("number")
    print(f"   Unique phone numbers: {len(unique_numbers)}")
    
    # Count by category
    print("\n📋 Reports by Category:")
    categories = reports_collection().distinct("category")
    for cat in sorted(categories):
        count = reports_collection().count_documents({"category": cat})
        print(f"   {cat}: {count}")
    
    print("\n✨ Dummy data loading complete!")
    print("\nℹ️  Note: Some numbers have clustered reports (last 48h) to simulate")
    print("   SIM swap patterns. This will help train anomaly detection.")


if __name__ == "__main__":
    try:
        load_dummy_data()
    except KeyboardInterrupt:
        print("\n\n⚠️  Loading interrupted by user.")
    except Exception as e:
        print(f"\n❌ Fatal error: {str(e)}")
        import traceback
        traceback.print_exc()
