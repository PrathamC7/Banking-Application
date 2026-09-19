import jwt  
from app.config.settings import SECRET_KEY, ALGORITHM
def encode_token(id : int, role : str, email : str) :
    payload = {"sub" : str(id),
               "role" : role,
               "email" : email}
    return jwt.encode(payload, SECRET_KEY, ALGORITHM)

    