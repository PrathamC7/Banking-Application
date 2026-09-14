from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.service.Customer_service import Customer_service
router = APIRouter()

@router.get("/{email}")
def customer_profile(email : str, db : Session = Depends(get_db)):
    return Customer_service(db).get_customer_profile(email)