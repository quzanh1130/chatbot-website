from g4f.client import Client
from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
# from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import nest_asyncio

app = FastAPI()
nest_asyncio.apply()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)

client = Client()

@app.get("/api/v1/chatbot")
async def chatbot(message: str = "Hello"):
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}], 
        stream=True
    )
    
    response = ""
    for completion in chat_completion:
        response += completion.choices[0].delta.content or ""
        
    return {"response": response}


