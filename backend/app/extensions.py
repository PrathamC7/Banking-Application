from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import create_engine
from app.config.db_config import DB_URL

engine = create_engine(DB_URL)
session = sessionmaker(autocommit = False, autoflush = False, bind = engine)

class Base(DeclarativeBase) :
    pass

def get_db() :
    db = session()
    try :
        yield db
    finally :
        db.close()