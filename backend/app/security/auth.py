"""
Advanced Authentication and Authorization System
JWT-based authentication with role-based access control
"""

from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
import secrets
import hashlib
import logging

logger = logging.getLogger(__name__)

# Security configuration
SECRET_KEY = "your-secret-key-change-in-production"  # Change in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# HTTP Bearer token
security = HTTPBearer()

# User roles and permissions
class UserRole:
    ADMIN = "admin"
    ANALYST = "analyst"
    USER = "user"
    GUEST = "guest"

class Permission:
    # Dashboard permissions
    VIEW_DASHBOARD = "view:dashboard"
    EDIT_DASHBOARD = "edit:dashboard"
    
    # Revolutionary features permissions
    VIEW_FEATURES = "view:features"
    USE_FEATURES = "use:features"
    ADMIN_FEATURES = "admin:features"
    
    # Collaboration permissions
    JOIN_COLLABORATION = "join:collaboration"
    CREATE_ROOMS = "create:rooms"
    MODERATE_ROOMS = "moderate:rooms"
    
    # Analytics permissions
    VIEW_ANALYTICS = "view:analytics"
    EXPORT_ANALYTICS = "export:analytics"
    
    # System permissions
    VIEW_PERFORMANCE = "view:performance"
    MANAGE_USERS = "manage:users"
    SYSTEM_ADMIN = "system:admin"

# Role-based permissions mapping
ROLE_PERMISSIONS = {
    UserRole.ADMIN: [
        Permission.VIEW_DASHBOARD,
        Permission.EDIT_DASHBOARD,
        Permission.VIEW_FEATURES,
        Permission.USE_FEATURES,
        Permission.ADMIN_FEATURES,
        Permission.JOIN_COLLABORATION,
        Permission.CREATE_ROOMS,
        Permission.MODERATE_ROOMS,
        Permission.VIEW_ANALYTICS,
        Permission.EXPORT_ANALYTICS,
        Permission.VIEW_PERFORMANCE,
        Permission.MANAGE_USERS,
        Permission.SYSTEM_ADMIN
    ],
    UserRole.ANALYST: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_FEATURES,
        Permission.USE_FEATURES,
        Permission.JOIN_COLLABORATION,
        Permission.CREATE_ROOMS,
        Permission.VIEW_ANALYTICS,
        Permission.EXPORT_ANALYTICS,
        Permission.VIEW_PERFORMANCE
    ],
    UserRole.USER: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_FEATURES,
        Permission.USE_FEATURES,
        Permission.JOIN_COLLABORATION
    ],
    UserRole.GUEST: [
        Permission.VIEW_DASHBOARD,
        Permission.VIEW_FEATURES
    ]
}

# Pydantic models
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = UserRole.USER
    is_active: bool = True

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None

class User(UserBase):
    id: str
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

class TokenData(BaseModel):
    user_id: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

# Password utilities
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

# JWT utilities
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: Dict[str, Any]) -> str:
    """Create a JWT refresh token"""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, token_type: str = "access") -> TokenData:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        token_type_from_payload = payload.get("type")
        
        if token_type_from_payload != token_type:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        role: str = payload.get("role")
        
        if user_id is None or email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return TokenData(user_id=user_id, email=email, role=role)
    
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Mock user database (replace with real database in production)
users_db: Dict[str, Dict[str, Any]] = {
    "admin@strategicai.com": {
        "id": "admin_001",
        "email": "admin@strategicai.com",
        "full_name": "System Administrator",
        "hashed_password": get_password_hash("admin123"),
        "role": UserRole.ADMIN,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "last_login": None
    },
    "analyst@strategicai.com": {
        "id": "analyst_001",
        "email": "analyst@strategicai.com",
        "full_name": "Business Analyst",
        "hashed_password": get_password_hash("analyst123"),
        "role": UserRole.ANALYST,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "last_login": None
    },
    "user@strategicai.com": {
        "id": "user_001",
        "email": "user@strategicai.com",
        "full_name": "Regular User",
        "hashed_password": get_password_hash("user123"),
        "role": UserRole.USER,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "last_login": None
    }
}

# Authentication functions
def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    """Get user by email"""
    return users_db.get(email)

def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    """Get user by ID"""
    for user in users_db.values():
        if user["id"] == user_id:
            return user
    return None

def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
    """Authenticate a user"""
    user = get_user_by_email(email)
    if not user:
        return None
    if not verify_password(password, user["hashed_password"]):
        return None
    return user

def update_last_login(user_id: str):
    """Update user's last login timestamp"""
    for user in users_db.values():
        if user["id"] == user_id:
            user["last_login"] = datetime.now(timezone.utc)
            break

# Dependency functions
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Get current authenticated user"""
    token = credentials.credentials
    token_data = verify_token(token)
    
    user = get_user_by_id(token_data.user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    return User(**user)

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """Get current active user"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def require_permission(permission: str):
    """Decorator to require specific permission"""
    def permission_checker(current_user: User = Depends(get_current_active_user)) -> User:
        user_permissions = ROLE_PERMISSIONS.get(current_user.role, [])
        if permission not in user_permissions:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission required: {permission}"
            )
        return current_user
    return permission_checker

def require_role(required_role: str):
    """Decorator to require specific role"""
    def role_checker(current_user: User = Depends(get_current_active_user)) -> User:
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role required: {required_role}"
            )
        return current_user
    return role_checker

# Admin-only dependency
async def get_admin_user(current_user: User = Depends(require_role(UserRole.ADMIN))) -> User:
    """Get admin user"""
    return current_user

# Analyst or higher dependency
async def get_analyst_user(current_user: User = Depends(require_permission(Permission.VIEW_ANALYTICS))) -> User:
    """Get analyst or higher user"""
    return current_user

# Rate limiting (simple in-memory implementation)
rate_limit_store: Dict[str, List[datetime]] = {}

def check_rate_limit(identifier: str, max_requests: int = 100, window_minutes: int = 15) -> bool:
    """Check if request is within rate limit"""
    now = datetime.now(timezone.utc)
    window_start = now - timedelta(minutes=window_minutes)
    
    # Clean old entries
    if identifier in rate_limit_store:
        rate_limit_store[identifier] = [
            req_time for req_time in rate_limit_store[identifier]
            if req_time > window_start
        ]
    else:
        rate_limit_store[identifier] = []
    
    # Check limit
    if len(rate_limit_store[identifier]) >= max_requests:
        return False
    
    # Add current request
    rate_limit_store[identifier].append(now)
    return True

def rate_limit_dependency(max_requests: int = 100, window_minutes: int = 15):
    """Rate limiting dependency"""
    def rate_limiter(current_user: User = Depends(get_current_active_user)):
        if not check_rate_limit(current_user.id, max_requests, window_minutes):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded"
            )
        return current_user
    return rate_limiter

# Session management
active_sessions: Dict[str, Dict[str, Any]] = {}

def create_session(user_id: str, access_token: str, refresh_token: str) -> str:
    """Create a new user session"""
    session_id = secrets.token_urlsafe(32)
    active_sessions[session_id] = {
        "user_id": user_id,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "created_at": datetime.now(timezone.utc),
        "last_activity": datetime.now(timezone.utc)
    }
    return session_id

def get_session(session_id: str) -> Optional[Dict[str, Any]]:
    """Get session by ID"""
    return active_sessions.get(session_id)

def update_session_activity(session_id: str):
    """Update session last activity"""
    if session_id in active_sessions:
        active_sessions[session_id]["last_activity"] = datetime.now(timezone.utc)

def invalidate_session(session_id: str):
    """Invalidate a session"""
    if session_id in active_sessions:
        del active_sessions[session_id]

def cleanup_expired_sessions():
    """Clean up expired sessions"""
    now = datetime.now(timezone.utc)
    expired_sessions = []
    
    for session_id, session in active_sessions.items():
        if now - session["last_activity"] > timedelta(hours=24):
            expired_sessions.append(session_id)
    
    for session_id in expired_sessions:
        del active_sessions[session_id]

# Security utilities
def generate_api_key() -> str:
    """Generate a secure API key"""
    return secrets.token_urlsafe(32)

def hash_api_key(api_key: str) -> str:
    """Hash an API key for storage"""
    return hashlib.sha256(api_key.encode()).hexdigest()

def verify_api_key(api_key: str, hashed_key: str) -> bool:
    """Verify an API key against its hash"""
    return hash_api_key(api_key) == hashed_key

# Audit logging
def log_auth_event(event_type: str, user_id: str, details: Dict[str, Any] = None):
    """Log authentication events"""
    logger.info(f"Auth Event: {event_type} - User: {user_id} - Details: {details}")

# Multi-factor authentication (basic implementation)
def generate_mfa_secret() -> str:
    """Generate MFA secret"""
    return secrets.token_urlsafe(16)

def verify_mfa_code(secret: str, code: str) -> bool:
    """Verify MFA code (simplified implementation)"""
    # In production, use proper TOTP implementation
    return len(code) == 6 and code.isdigit()

# Password policy
def validate_password_strength(password: str) -> Dict[str, Any]:
    """Validate password strength"""
    issues = []
    
    if len(password) < 8:
        issues.append("Password must be at least 8 characters long")
    
    if not any(c.isupper() for c in password):
        issues.append("Password must contain at least one uppercase letter")
    
    if not any(c.islower() for c in password):
        issues.append("Password must contain at least one lowercase letter")
    
    if not any(c.isdigit() for c in password):
        issues.append("Password must contain at least one number")
    
    if not any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        issues.append("Password must contain at least one special character")
    
    return {
        "is_valid": len(issues) == 0,
        "issues": issues,
        "strength": "strong" if len(issues) == 0 else "weak"
    }