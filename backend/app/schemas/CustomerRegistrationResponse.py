from pydantic import BaseModel
class CustomerRegistrationResponse(BaseModel) :
    id : int
    name : str
    email : str