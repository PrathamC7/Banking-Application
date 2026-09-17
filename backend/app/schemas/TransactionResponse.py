from pydantic import BaseModel, ConfigDict
from decimal import Decimal
from app.enums.TransactionType import TransactionType
from datetime import datetime

class TransactionResponse(BaseModel):
    id: int
    customer_id: int
    amount: Decimal
    description: str
    transaction_type: TransactionType
    date: datetime
