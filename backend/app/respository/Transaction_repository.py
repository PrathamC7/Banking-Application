from sqlalchemy.orm import Session
from app.schemas.TransactionCreate import TransactionCreate
from app.models.Customer import Customer
from app.models.Transaction import Transaction
from sqlalchemy import select

class Transaction_repository:
    def __init__(self, db : Session) :
        self.db = db
    def add_transaction(self, transaction : TransactionCreate,customer: Customer) :
        new_transaction = Transaction(customer = customer,
                                      description = transaction.description,
                                      amount = transaction.amount,
                                      transaction_type = transaction.transaction_type)
        self.db.add(new_transaction)
        return new_transaction
    
    def get_transaction_by_customer_id(self, id : int) :
        stmt = select(Transaction).where(Transaction.customer_id == id)
        return self.db.execute(stmt).scalars().all()
    
    def get_transaction_by_id(self, id : int) :
        stmt = select(Transaction).where(Transaction.id == id)
        return self.db.execute(stmt).scalar_one_or_none()