from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.service.Transaction_service import Transaction_service
from app.schemas.TransactionCreate import TransactionCreate
from app.schemas.TransactionResponse import TransactionResponse
from app.security.auth import get_current_user
router = APIRouter()

@router.post("/", response_model = TransactionResponse)
def add_transaction(transaction : TransactionCreate, db : Session = Depends(get_db),  token = Depends(get_current_user)) :
    return Transaction_service(db).addTransaction(transaction)

@router.get("/", response_model = list[TransactionResponse])
def get_transaction(id : int, db : Session = Depends(get_db),  token = Depends(get_current_user)) :
    return Transaction_service(db).get_transaction_by_customer_id(id)
@router.get("/{id}", response_model = TransactionResponse)
def get_transaction(id : int, db : Session = Depends(get_db),  token = Depends(get_current_user)) :
    return Transaction_service(db).get_transaction_by_id(id)