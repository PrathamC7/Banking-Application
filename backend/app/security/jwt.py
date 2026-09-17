import jwt
from app.config.settings import SECRET_KEY, ALGORITHM
def encode_token(id : int) :
    payload = {"sub" : str(id)}
    return jwt.encode(payload, SECRET_KEY, ALGORITHM)

    