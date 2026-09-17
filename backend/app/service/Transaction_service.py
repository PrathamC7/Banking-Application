from app.respository.Transaction_repository import Transaction_repository
from app.respository.Customer_repository import Customer_repository
from app.schemas.TransactionCreate import TransactionCreate
from app.enums.TransactionType import TransactionType
from app.models.Customer import Customer
from fastapi import HTTPException
from sqlalchemy.orm import Session

class Transaction_service :
    def __init__(self, db : Session) :
        self.transaction_repo = Transaction_repository(db)
        self.customer_repo = Customer_repository(db) 
        self.db = db
    
    def addTransaction(self, transaction : TransactionCreate) :
        customer : Customer = self.customer_repo.get_customer_profile(transaction.email)
        if transaction.amount <= 0:
            raise HTTPException(
                status_code=400,
                detail="Amount must be greater than zero"
            )
        if customer is None :
            raise HTTPException(status_code=404,detail="Customer not found")
        if transaction.transaction_type == TransactionType.WITHDRAW and customer.balance < transaction.amount :
            raise HTTPException(status_code=400, detail="No enough balance available")
        self.customer_repo.trans_amount(transaction, customer)
        new_transaction = self.transaction_repo.add_transaction(transaction, customer)
        self.db.commit()
        return new_transaction
    
    def get_transaction_by_customer_id(self, id : int) :
        return self.transaction_repo.get_transaction_by_customer_id(id) 
    
    def get_transaction_by_id(self, id : int) :
        return self.transaction_repo.get_transaction_by_id(id) 