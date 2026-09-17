import jwt
from fastapi import HTTPException
from fastapi import Depends
from fastapi.security import HTTPBearer
from app.config.settings import ALGORITHM, SECRET_KEY
security = HTTPBearer()

def get_token(credentials = Depends(security)) :
    return credentials.credentials

def decode_token(token :str) :
    return jwt.decode(token, SECRET_KEY,algorithms=[ALGORITHM])

def get_current_user(token : str = Depends(get_token)) :
    try :
        payload = decode_token(token)
        return payload
    except jwt.InvalidTokenError :
        raise HTTPException(
            status_code=401,
            detail="invalid token"
        )