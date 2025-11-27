from fastapi import FastAPI, APIRouter
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from uuid import uuid4

app = FastAPI()
v1 = APIRouter(prefix="/api/v1")

@v1.get("/ping")
def ping():
    return {"message": "pong"}

# *************************************************************************************************

todos = {}

class TodoModel(BaseModel):
    name: str
    description: str
    isCompleted: bool

@v1.get("/todos")
def getAllTodos() -> list[str]:
    return todos.keys()

@v1.get("/todo/{id}")
def getTodo(id: str) -> TodoModel:
    return todos[id]

@v1.put("/todo")
def createTodo(todo: TodoModel) -> str:
    id = str(uuid4())
    todos[id] = jsonable_encoder(todo)
    return id

@v1.patch("/todo/{id}")
def updateTodo(id: str, todo: TodoModel) -> TodoModel:
    todos[id] = jsonable_encoder(todo)
    return todos[id]

@v1.delete("/todo/{id}")
def deleteTodo(id: str) -> bool:
    todos.pop(id)
    return True

# *************************************************************************************************

app.include_router(v1)
