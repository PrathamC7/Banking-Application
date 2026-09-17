from pydantic import BaseModel

class CustomerVerificationResponse(BaseModel) :
    id : int
    name : str
    email : str