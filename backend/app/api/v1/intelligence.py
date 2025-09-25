from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/companies/{company_id}")
def list_company_intel(company_id: int, db: Session = Depends(get_db)):
    # Placeholder for DB query
    return {"company_id": company_id, "items": []}

