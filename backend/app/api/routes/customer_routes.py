from fastapi import APIRouter, Depends
from app.service.Customer_service import Customer_service
from sqlalchemy.orm import Session
from app.security.auth import get_current_user
from app.extensions import get_db
router = APIRouter()


@router.get("/")
def customer_balance(db : Session = Depends(get_db),token = Depends(get_current_user)) :
    return Customer_service(db).customer_balance(token["email"])
