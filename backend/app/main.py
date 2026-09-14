from fastapi import FastAPI
from app.api.routes.customer_routes import router

app = FastAPI()
app.include_router(
    router,
    prefix="/customer"
)
@app.get("/")
def root():
    return "application started successfully"