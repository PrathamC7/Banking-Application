from pydantic import BaseModel

class CustomerVerifyRequest(BaseModel) :
    email : str
    password : str