from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.service.Customer_service import Customer_service
from app.service.Transaction_service import Transaction_service
from app.schemas.TransactionResponse import TransactionResponse
from app.security.auth import requires_admin
router = APIRouter()

@router.get("/customer/{email}")
def customer_profile(email : str, db : Session = Depends(get_db), admin = Depends(requires_admin)):
    return Customer_service(db).get_customer_profile(email)
@router.get("/customer/balance/{email}")
def customer_balance(email : str, db : Session = Depends(get_db),admin = Depends(requires_admin)) :
    return Customer_service(db).customer_balance(email)
# GET CUSTOMER LIST OF TRANSACTION
@router.get("/tranasaction/customer/{id}", response_model = list[TransactionResponse])
def get_customer_transaction(ud : int, db : Session = Depends(get_db), admin = Depends(requires_admin)) :
    return Transaction_service(db).get_transaction_by_customer_id(id)
# GET TRANSACTION BY TRANSACTION ID
@router.get("/transaction/{id}", response_model = TransactionResponse)
def get_transaction(id : int, db : Session = Depends(get_db), admin = Depends(requires_admin)) :
    return Transaction_service(db).get_transaction_by_id(id)