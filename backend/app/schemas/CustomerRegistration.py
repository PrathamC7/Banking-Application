from pydantic import BaseModel

class CustomerRegistration(BaseModel) :
    name : str
    email : str
    password : str