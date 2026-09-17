from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.schemas.CustomerRegistration import CustomerRegistration
from app.service.Customer_service import Customer_service
from app.schemas.CustomerVerificationResponse import CustomerVerificationResponse
from app.schemas.CustomerVerifyRequest import CustomerVerifyRequest
router = APIRouter()

@router.post('/register')
def register(customer : CustomerRegistration, db : Session = Depends(get_db)) :
    return Customer_service(db).register_customer(customer)

@router.post('/')
def login(customer : CustomerVerifyRequest, response : Response, db : Session = Depends(get_db)) :
    token = Customer_service(db).verify_customer(customer)
    response.headers["Authorization"] = f"Bearer {token}"
    return {"message" : "Login Successful"}
    
    