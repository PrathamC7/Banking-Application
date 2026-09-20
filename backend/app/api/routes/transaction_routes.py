from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.service.Transaction_service import Transaction_service
from app.schemas.TransactionResponse import TransactionResponse
from app.schemas.TransactionCreate import TransactionCreate
from app.security.auth import get_current_user
router = APIRouter()

# GET CUSTOMER LIST OF TRANSACTION
@router.get("/", response_model = list[TransactionResponse])
def get_transaction(db : Session = Depends(get_db), token = Depends(get_current_user)) :
    return Transaction_service(db).get_transaction_by_customer_id(token["sub"])
# GET TRANSACTION BY TRANSACTION ID
@router.get("/me/list", response_model = TransactionResponse)
def get_transaction( db : Session = Depends(get_db), token = Depends(get_current_user)) :
    return Transaction_service(db).get_transaction_by_id(token["sub"])

@router.post("/", response_model = TransactionResponse)
def add_transaction(transaction : TransactionCreate, db : Session = Depends(get_db),  token = Depends(get_current_user)) :
    return Transaction_service(db).addTransaction(transaction)
