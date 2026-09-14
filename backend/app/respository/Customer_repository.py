from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.Customer import Customer

class Customer_repository:
    def __init__(self, db : Session) :
        self.db = db
    def get_customer_profile(self, email : str) :
        stmt = select(Customer).where(Customer.email == email)
        customer =  self.db.execute(stmt).scalar_one_or_none()
        if customer is None : return None
        return customer