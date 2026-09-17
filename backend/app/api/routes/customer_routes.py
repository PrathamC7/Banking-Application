from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.service.Customer_service import Customer_service
from app.security.auth import get_current_user
router = APIRouter()

@router.get("/{email}")
def customer_profile(email : str, db : Session = Depends(get_db), token = Depends(get_current_user)):
    return Customer_service(db).get_customer_profile(email)
@router.get("/balance/{email}")
def customer_balance(email : str, db : Session = Depends(get_db),token = Depends(get_current_user)) :
    return Customer_service(db).customer_balance(email)
