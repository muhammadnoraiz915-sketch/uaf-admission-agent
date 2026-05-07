from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import ask_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    message: str

@app.get("/")
def home():
    return {"status": "UAF Agent is running!"}

@app.post("/chat")
def chat(question: Question):
    answer = ask_agent(question.message)
    return {"response": answer}