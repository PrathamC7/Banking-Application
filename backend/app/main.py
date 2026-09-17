from fastapi import FastAPI
from app.api.routes.customer_routes import router as customer_router
from app.api.routes.transaction_routes import router as transaction_router 
from app.api.routes.Auth import router as auth_router

app = FastAPI()
app.include_router(
    customer_router,
    prefix="/customer"
)
app.include_router(
    transaction_router,
    prefix="/transaction"
)
app.include_router(
    auth_router,
    prefix="/auth"
)

@app.get("/")
def root():
    return "application started successfully"