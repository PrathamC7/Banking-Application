import jwt  
from app.config.settings import SECRET_KEY, ALGORITHM
def encode_token(id : int, role : str) :
    payload = {"sub" : str(id),
               "role" : role}
    return jwt.encode(payload, SECRET_KEY, ALGORITHM)

    