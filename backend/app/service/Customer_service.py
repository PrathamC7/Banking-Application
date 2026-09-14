from app.respository.Customer_repository import Customer_repository
from sqlalchemy.orm import Session
from fastapi import HTTPException
class Customer_service :
    def __init__(self, db : Session) :
        self.repository =  Customer_repository(db)
    
    def get_customer_profile(self, email):
        customer = self.repository.get_customer_profile(email)
        if customer is None :
            raise HTTPException(status_code=400, detail="Customer not found ")
        return customer