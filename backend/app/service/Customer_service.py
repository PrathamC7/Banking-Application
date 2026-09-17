from app.respository.Customer_repository import Customer_repository
from app.schemas.CustomerRegistration import CustomerRegistration
from app.schemas.CustomerRegistrationResponse import CustomerRegistrationResponse
from app.schemas.CustomerVerifyRequest import  CustomerVerifyRequest
from app.security.password import verify_password
from app.schemas.CustomerRegistrationResponse import CustomerRegistrationResponse
from app.schemas.CustomerVerificationResponse import CustomerVerificationResponse
from app.security.jwt import encode_token
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
    def customer_balance(self, email) :
        balance = self.repository.get_current_balance(email)
        if balance is None :
            raise HTTPException(status_code=400, detail="Customer not found ")
        return balance
    def register_customer(self, customer : CustomerRegistration) :
        new_customer = self.repository.register_customer(customer) 
        if new_customer is None :
            raise HTTPException(status_code=400,
                                detail="Email Already exist")
        return CustomerRegistrationResponse(id = new_customer.id, name = new_customer.name, email = new_customer.email,  balance =new_customer.balance)
        
    
    def verify_customer(self, customer : CustomerVerifyRequest) :
        CustomerloggedIn  = self.repository.verify_customer(customer)
        if CustomerloggedIn is None :
            raise HTTPException(status_code=400,
                                detail="Email doesn't exist")
        if not verify_password(customer.password , CustomerloggedIn.password) :
            raise HTTPException(status_code=400,
                                detail="Incorrect Password")
        return encode_token(CustomerloggedIn.id)