from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import time
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import logging
from dotenv import load_dotenv
from pydantic import BaseModel
import datetime
from rag_chain import get_chain
from utils.db import get_vectorindex

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
app = FastAPI()
session_memory = {}
app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://portfolio-lo2x.vercel.app', 'http://localhost:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        streaming=True
    )

class ChatRequest(BaseModel):
    session_id: str
    question: str

class PingRequest(BaseModel):
    session_id: str

def extract_text_from_chunk(chunk):
    """Extract text from chunk based on model-specific formats"""
    try:
        if chunk is None:
            return ""
        
        # Handle different chunk formats
        if isinstance(chunk, dict):
            # Try different possible keys
            for key in ["text", "answer", "content", "output", "generated_text"]:
                if key in chunk and chunk[key]:
                    return str(chunk[key])
            # If no specific key found, return string representation
            return str(chunk)
        elif isinstance(chunk, str):
            return chunk
        else:
            return str(chunk)
    except Exception as e:
        logger.error(f"Error extracting text from chunk: {e}")
        return ""

vector_index = None
rag_chain = None

@app.on_event("startup")
async def startup_event():
    global vector_index, rag_chain
    try:
        logger.info("Starting up the application...")
        # Initialize vector index and RAG chain
        vector_index = get_vectorindex()
        # rag_chain = get_chain(vector_index, llm)
        logger.info("Application started successfully.")
    except Exception as e:
        logger.error(f"Error during startup: {e}")

@app.post("/api/ping")
async def ping(request: PingRequest):
    global session_memory
    session_memory[request.session_id] = []
    return {"status": "ok"}


@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    global session_memory, vector_index, llm
    
    # Add user message to session memory
    session_memory[request.session_id].append({
        "role": "user",
        "message": request.question
    })
    
    # Get the RAG chain with current conversation history
    rag_chain = get_chain(vector_index, llm, session_memory[request.session_id])
    
    async def event_generator():
        full_answer = ""  # Store complete answer for memory
        
        try:
            # Stream the response
            async for chunk in rag_chain.astream(request.question):
                # Extract text from chunk using your existing function
                chunk_text = extract_text_from_chunk(chunk)
                
                if chunk_text:
                    # Add to full answer
                    full_answer += chunk_text
                    
                    # Stream the chunk to client
                    yield f"data: {chunk_text}\n\n"
            
            # After streaming is complete, store bot response in memory
            if full_answer.strip():
                session_memory[request.session_id].append({
                    "role": "bot",
                    "message": full_answer.strip()
                })
            
            # Send end signal
            yield f"data: [DONE]\n\n"
            
        except Exception as e:
            logger.error(f"Error in chat stream: {e}")
            # Send error message
            yield f"data: I apologize, but I encountered an error while processing your request.\n\n"
            yield f"data: [DONE]\n\n"
            
            # Store error response in memory
            session_memory[request.session_id].append({
                "role": "bot",
                "message": "I apologize, but I encountered an error while processing your request."
            })

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)