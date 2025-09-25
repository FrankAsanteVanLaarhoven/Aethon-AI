"""
Authentication API endpoints
Login, logout, token refresh, user management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from typing import List, Optional
from datetime import datetime, timezone
import logging

from app.security.auth import (
    authenticate_user, create_access_token, create_refresh_token,
    verify_token, get_current_user, get_current_active_user,
    require_permission, require_role, get_admin_user,
    User, UserCreate, UserUpdate, LoginRequest, RefreshTokenRequest, Token,
    UserRole, Permission, update_last_login, log_auth_event,
    validate_password_strength, generate_mfa_secret, verify_mfa_code
)

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    """Authenticate user and return tokens"""
    try:
        # Authenticate user
        user = authenticate_user(login_data.email, login_data.password)
        if not user:
            log_auth_event("login_failed", login_data.email, {"reason": "invalid_credentials"})
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if not user["is_active"]:
            log_auth_event("login_failed", user["id"], {"reason": "account_disabled"})
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account is disabled"
            )
        
        # Create tokens
        access_token = create_access_token(
            data={
                "sub": user["id"],
                "email": user["email"],
                "role": user["role"]
            }
        )
        
        refresh_token = create_refresh_token(
            data={
                "sub": user["id"],
                "email": user["email"]
            }
        )
        
        # Update last login
        update_last_login(user["id"])
        
        # Log successful login
        log_auth_event("login_success", user["id"], {
            "email": user["email"],
            "role": user["role"]
        })
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=15 * 60  # 15 minutes
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@router.post("/refresh", response_model=Token)
async def refresh_token(refresh_data: RefreshTokenRequest):
    """Refresh access token using refresh token"""
    try:
        # Verify refresh token
        token_data = verify_token(refresh_data.refresh_token, "refresh")
        
        # Get user
        from app.security.auth import get_user_by_id
        user = get_user_by_id(token_data.user_id)
        if not user or not user["is_active"]:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Create new tokens
        access_token = create_access_token(
            data={
                "sub": user["id"],
                "email": user["email"],
                "role": user["role"]
            }
        )
        
        new_refresh_token = create_refresh_token(
            data={
                "sub": user["id"],
                "email": user["email"]
            }
        )
        
        log_auth_event("token_refresh", user["id"], {"email": user["email"]})
        
        return Token(
            access_token=access_token,
            refresh_token=new_refresh_token,
            expires_in=15 * 60
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token refresh error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_active_user)):
    """Logout user (client should discard tokens)"""
    log_auth_event("logout", current_user.id, {"email": current_user.email})
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_active_user)):
    """Get current user information"""
    return current_user

@router.get("/users", response_model=List[User])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    admin_user: User = Depends(require_permission(Permission.MANAGE_USERS))
):
    """Get list of users (admin only)"""
    from app.security.auth import users_db
    
    users = list(users_db.values())[skip:skip + limit]
    return [User(**user) for user in users]

@router.post("/users", response_model=User)
async def create_user(
    user_data: UserCreate,
    admin_user: User = Depends(require_permission(Permission.MANAGE_USERS))
):
    """Create new user (admin only)"""
    from app.security.auth import users_db, get_password_hash, validate_password_strength
    
    # Validate password strength
    password_validation = validate_password_strength(user_data.password)
    if not password_validation["is_valid"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Password validation failed: {', '.join(password_validation['issues'])}"
        )
    
    # Check if user already exists
    if user_data.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user_id = f"user_{len(users_db) + 1:03d}"
    hashed_password = get_password_hash(user_data.password)
    
    new_user = {
        "id": user_id,
        "email": user_data.email,
        "full_name": user_data.full_name,
        "hashed_password": hashed_password,
        "role": user_data.role,
        "is_active": user_data.is_active,
        "created_at": datetime.now(timezone.utc),
        "last_login": None
    }
    
    users_db[user_data.email] = new_user
    
    log_auth_event("user_created", admin_user.id, {
        "created_user_id": user_id,
        "created_user_email": user_data.email,
        "role": user_data.role
    })
    
    return User(**new_user)

@router.put("/users/{user_id}", response_model=User)
async def update_user(
    user_id: str,
    user_data: UserUpdate,
    admin_user: User = Depends(require_permission(Permission.MANAGE_USERS))
):
    """Update user (admin only)"""
    from app.security.auth import users_db, get_user_by_id
    
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Update user fields
    if user_data.email is not None:
        user["email"] = user_data.email
    if user_data.full_name is not None:
        user["full_name"] = user_data.full_name
    if user_data.role is not None:
        user["role"] = user_data.role
    if user_data.is_active is not None:
        user["is_active"] = user_data.is_active
    
    log_auth_event("user_updated", admin_user.id, {
        "updated_user_id": user_id,
        "changes": user_data.dict(exclude_unset=True)
    })
    
    return User(**user)

@router.delete("/users/{user_id}")
async def delete_user(
    user_id: str,
    admin_user: User = Depends(require_permission(Permission.MANAGE_USERS))
):
    """Delete user (admin only)"""
    from app.security.auth import users_db, get_user_by_id
    
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Don't allow deleting admin users
    if user["role"] == UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete admin users"
        )
    
    # Remove user
    del users_db[user["email"]]
    
    log_auth_event("user_deleted", admin_user.id, {
        "deleted_user_id": user_id,
        "deleted_user_email": user["email"]
    })
    
    return {"message": "User deleted successfully"}

@router.get("/permissions")
async def get_user_permissions(current_user: User = Depends(get_current_active_user)):
    """Get current user's permissions"""
    from app.security.auth import ROLE_PERMISSIONS
    
    permissions = ROLE_PERMISSIONS.get(current_user.role, [])
    return {
        "user_id": current_user.id,
        "role": current_user.role,
        "permissions": permissions
    }

@router.get("/roles")
async def get_available_roles(admin_user: User = Depends(require_permission(Permission.MANAGE_USERS))):
    """Get available user roles"""
    return {
        "roles": [
            {"name": UserRole.ADMIN, "description": "System Administrator"},
            {"name": UserRole.ANALYST, "description": "Business Analyst"},
            {"name": UserRole.USER, "description": "Regular User"},
            {"name": UserRole.GUEST, "description": "Guest User"}
        ]
    }

@router.post("/change-password")
async def change_password(
    old_password: str,
    new_password: str,
    current_user: User = Depends(get_current_active_user)
):
    """Change user password"""
    from app.security.auth import users_db, verify_password, get_password_hash, validate_password_strength
    
    user = users_db.get(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Verify old password
    if not verify_password(old_password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect old password"
        )
    
    # Validate new password
    password_validation = validate_password_strength(new_password)
    if not password_validation["is_valid"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Password validation failed: {', '.join(password_validation['issues'])}"
        )
    
    # Update password
    user["hashed_password"] = get_password_hash(new_password)
    
    log_auth_event("password_changed", current_user.id, {"email": current_user.email})
    
    return {"message": "Password changed successfully"}

@router.post("/mfa/setup")
async def setup_mfa(current_user: User = Depends(get_current_active_user)):
    """Setup multi-factor authentication"""
    mfa_secret = generate_mfa_secret()
    
    # In production, store the secret securely
    log_auth_event("mfa_setup_initiated", current_user.id, {"email": current_user.email})
    
    return {
        "secret": mfa_secret,
        "qr_code_url": f"otpauth://totp/StrategicAI:{current_user.email}?secret={mfa_secret}&issuer=StrategicAI"
    }

@router.post("/mfa/verify")
async def verify_mfa(
    code: str,
    current_user: User = Depends(get_current_active_user)
):
    """Verify MFA code"""
    # In production, get the stored secret for the user
    mfa_secret = "dummy_secret"  # Replace with actual secret retrieval
    
    if verify_mfa_code(mfa_secret, code):
        log_auth_event("mfa_verified", current_user.id, {"email": current_user.email})
        return {"message": "MFA code verified successfully"}
    else:
        log_auth_event("mfa_failed", current_user.id, {"email": current_user.email})
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid MFA code"
        )

@router.get("/sessions")
async def get_active_sessions(admin_user: User = Depends(require_permission(Permission.SYSTEM_ADMIN))):
    """Get active user sessions (admin only)"""
    from app.security.auth import active_sessions
    
    return {
        "active_sessions": len(active_sessions),
        "sessions": [
            {
                "session_id": session_id,
                "user_id": session["user_id"],
                "created_at": session["created_at"],
                "last_activity": session["last_activity"]
            }
            for session_id, session in active_sessions.items()
        ]
    }

@router.delete("/sessions/{session_id}")
async def invalidate_session(
    session_id: str,
    admin_user: User = Depends(require_permission(Permission.SYSTEM_ADMIN))
):
    """Invalidate a specific session (admin only)"""
    from app.security.auth import invalidate_session
    
    invalidate_session(session_id)
    
    log_auth_event("session_invalidated", admin_user.id, {
        "invalidated_session": session_id
    })
    
    return {"message": "Session invalidated successfully"}

@router.get("/audit-log")
async def get_audit_log(
    skip: int = 0,
    limit: int = 100,
    admin_user: User = Depends(require_permission(Permission.SYSTEM_ADMIN))
):
    """Get authentication audit log (admin only)"""
    # In production, implement proper audit log storage and retrieval
    return {
        "message": "Audit log functionality would be implemented here",
        "note": "This would return paginated audit log entries"
    }
