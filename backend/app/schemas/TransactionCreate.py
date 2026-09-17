from pydantic import BaseModel
from decimal import Decimal
from app.enums.TransactionType import TransactionType
class TransactionCreate(BaseModel):
    email : str
    description : str
    transaction_type : TransactionType
    amount : Decimal