from pydantic import BaseModel
from decimal import Decimal
class CustomerResponse(BaseModel) :
    id : int
    name : str
    email : str
    balance : Decimal
    role : str
    