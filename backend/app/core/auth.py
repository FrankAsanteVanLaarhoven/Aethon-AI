"""
Authentication and authorization module for security clearance verification
"""

from fastapi import HTTPException, Depends, Header
from typing import Dict, Optional
# import jwt  # Temporarily disabled
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# Mock security clearance database (in production, this would be a secure database)
CLEARANCE_DATABASE = {
    "test_user_secret": {
        "user_id": "USR001",
        "clearance_level": "SECRET",
        "jurisdiction": "US",
        "expires": "2025-12-31"
    },
    "test_user_top_secret": {
        "user_id": "USR002",
        "clearance_level": "TOP_SECRET",
        "jurisdiction": "US",
        "expires": "2025-12-31"
    },
    "test_user_sci": {
        "user_id": "USR003",
        "clearance_level": "TOP_SECRET_SCI",
        "jurisdiction": "US",
        "expires": "2025-12-31"
    }
}

async def verify_security_clearance(
    authorization: Optional[str] = Header(None)
) -> Dict[str, str]:
    """
    Verify user security clearance from authorization header
    
    In production, this would:
    - Validate JWT tokens
    - Check against secure clearance database
    - Verify clearance expiration
    - Audit access attempts
    """
    try:
        if not authorization:
            # For demo purposes, return minimal clearance
            return {
                "user_id": "DEMO",
                "level": "UNCLASSIFIED",
                "jurisdiction": "PUBLIC"
            }
        
        # Extract token (Bearer scheme)
        if authorization.startswith("Bearer "):
            token = authorization[7:]
        else:
            token = authorization
        
        # For demo, use token as key to clearance database
        if token in CLEARANCE_DATABASE:
            clearance = CLEARANCE_DATABASE[token]
            
            # Check expiration
            if datetime.now().strftime("%Y-%m-%d") > clearance["expires"]:
                raise HTTPException(status_code=401, detail="Security clearance expired")
            
            return {
                "user_id": clearance["user_id"],
                "level": clearance["clearance_level"],
                "jurisdiction": clearance["jurisdiction"]
            }
        else:
            # Default to unclassified for invalid tokens
            return {
                "user_id": "UNKNOWN",
                "level": "UNCLASSIFIED",
                "jurisdiction": "PUBLIC"
            }
            
    except Exception as e:
        logger.error(f"Error verifying security clearance: {e}")
        return {
            "user_id": "ERROR",
            "level": "UNCLASSIFIED",
            "jurisdiction": "PUBLIC"
        }

def require_clearance_level(required_level: str):
    """
    Decorator to require specific clearance level for endpoints
    """
    def decorator(func):
        async def wrapper(*args, clearance: Dict = Depends(verify_security_clearance), **kwargs):
            clearance_hierarchy = {
                "UNCLASSIFIED": 0,
                "CONFIDENTIAL": 1,
                "SECRET": 2,
                "TOP_SECRET": 3,
                "TOP_SECRET_SCI": 4
            }
            
            user_level = clearance_hierarchy.get(clearance.get("level", ""), 0)
            required = clearance_hierarchy.get(required_level, 0)
            
            if user_level < required:
                raise HTTPException(
                    status_code=403, 
                    detail=f"Insufficient clearance. Required: {required_level}"
                )
            
            return await func(*args, clearance=clearance, **kwargs)
        
        return wrapper
    return decorator
