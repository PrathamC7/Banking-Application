from app.extensions import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import  ForeignKey, Enum
from app.enums.UserRole import UserRole as Role
class UserRole(Base) :
    __tablename__ = "user_role"
    id : Mapped[int] = mapped_column(ForeignKey("customer.id"), primary_key = True, index = True, nullable = False)
    role : Mapped[Role] = mapped_column(Enum(Role), nullable = False)
    customer : Mapped["Customer"] = relationship(back_populates = "user_role")