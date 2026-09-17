from app.extensions import Base
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, Enum, func, Numeric
from app.enums.TransactionType import TransactionType
from decimal import Decimal
class Transaction(Base) :
    __tablename__ = "transactions"
    id : Mapped[int] = mapped_column(primary_key = True, index = True)
    customer_id : Mapped[int] = mapped_column(ForeignKey("customer.id"), nullable = False)
    description : Mapped[str] = mapped_column(String(255), nullable = False)
    transaction_type : Mapped[TransactionType] = mapped_column(Enum(TransactionType), nullable = False)
    amount : Mapped[Decimal] = mapped_column(Numeric(19,5), nullable = False)
    date : Mapped[datetime] = mapped_column(server_default = func.now(), nullable = False )
    customer : Mapped["Customer"] = relationship(back_populates = "transactions")
    