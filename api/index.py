from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
import databases

# Environment Variables
database_url = os.environ.get("DATABASE_URL")

# Initialize the FastAPI app and the database connection
database = databases.Database(database_url)
app = FastAPI()

class Task(BaseModel):
    id: int
    title: str
    description: str

class TaskCreate(BaseModel):
    title: str
    description: str

class TaskUpdate(BaseModel):
    title: str
    description: str

# In-memory store
# In a production setting, consider using a real database
tasks: Dict[int, Task] = {}

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/api/tasks", response_model=List[Task])
async def get_tasks():
    return list(tasks.values())

@app.post("/api/tasks", response_model=Task)
async def create_task(task_create: TaskCreate):
    task_id = len(tasks) + 1  # Simple ID assignment for the sake of example
    task = Task(id=task_id, title=task_create.title, description=task_create.description)
    tasks[task_id] = task
    return task

@app.get("/api/tasks/{id}", response_model=Task)
async def get_task(id: int):
    if id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    return tasks[id]

@app.put("/api/tasks/{id}", response_model=Task)
async def update_task(id: int, task_update: TaskUpdate):
    if id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    task = tasks[id]
    task.title = task_update.title
    task.description = task_update.description
    return task