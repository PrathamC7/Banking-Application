from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.Customer import Customer
from app.schemas.TransactionCreate import TransactionCreate
from app.enums.TransactionType import TransactionType
from app.schemas.CustomerVerifyRequest import CustomerVerifyRequest
from app.schemas.CustomerRegistration import CustomerRegistration
from app.security.password import hash_password
class Customer_repository:
    def __init__(self, db : Session) :
        self.db = db
    def get_customer_profile(self, email : str) :
        stmt = select(Customer).where(Customer.email == email)
        customer =  self.db.execute(stmt).scalar_one_or_none()
        if customer is None : return None
        return customer
    
    def get_current_balance(self, email : str) :
        stmt = select(Customer.balance).where(Customer.email == email)
        balance = self.db.execute(stmt).scalar_one_or_none()
        if balance is None : return None
        return balance
    
    def trans_amount(self, transaction : TransactionCreate, customer : Customer) :
        if transaction.transaction_type == TransactionType.DEPOSIT : 
            customer.balance += transaction.amount
        else :
            customer.balance -= transaction.amount
        return customer
    
    def register_customer(self, customer : CustomerRegistration) :
        stmt = select(Customer).where(Customer.email == customer.email)
        customer_present = self.db.execute(stmt).scalar_one_or_none()
        
        if customer_present is not None :
            return None
        new_customer = Customer(name = customer.name,
                                email = customer.email,
                                password = hash_password(customer.password),
                                balance = 1000)
        self.db.add(new_customer)
        self.db.commit()
        self.db.refresh(new_customer)
        return new_customer
    
    def verify_customer(self, customer : CustomerVerifyRequest) :
        stmt = select(Customer).where(Customer.email == customer.email)
        customerLogedIn : Customer = self.db.execute(stmt).scalar_one_or_none()
        if customerLogedIn is None : return None
        return customerLogedIn
