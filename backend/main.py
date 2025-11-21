from fastapi import FastAPI, APIRouter

app = FastAPI()
v1 = APIRouter(prefix="/api/v1")

@v1.get("/ping")
def ping():
    return {"message": "pong"}

# *************************************************************************************************

# your API endpoints go here

# *************************************************************************************************

app.include_router(v1)
