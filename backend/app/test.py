from app.extensions import engine, Base
from app.models.Customer import Customer
from app.models.Transaction import Transaction

try :
    with engine.connect() as connection :
        Base.metadata.create_all(bind = engine)
        print("DB connected Successfully")
except Exception as e :
    print("Db connection failed")
    print(e)