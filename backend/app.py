from fastapi import FastAPI, Request, Response
import uuid
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import time
from langchain.memory import ConversationSummaryMemory
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

session_memories = {}
MEMORY_TTL = 1800 # 30 minutes 
llm = llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        streaming=True
    )

from rag_chain import get_chain
from utils.db import get_vectorindex

app = FastAPI()

@app.middleware("http")
async def add_session_id(request: Request, call_next):
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = str(uuid.uuid4())
    request.state.session_id = session_id  # for downstream access
    response: Response = await call_next(request)
    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        # Change these settings:
        samesite="none",    
        secure=False,
        max_age=1800  # 30 minutes to match your MEMORY_TTL
    )
    print(f"Session ID: {session_id}")
    return response
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://portfolio-lo2x.vercel.app/', 'http://localhost:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

vector_index = None
rag_chain = None

@app.on_event("startup")
def load_resources():
    global vector_index, rag_chain
    vector_index = get_vectorindex()

@app.get("/api/ping")
async def ping():
    return {"status": "ok"}

@app.get("/api/debug/session")
async def debug_session(request: Request):
    return {
        "session_id": request.state.session_id,
        "cookies_received": request.cookies
    }

def get_memory(session_id: str):
    now = time.time()
    # Clean up old sessions
    expired = [sid for sid, (_, t) in session_memories.items() if now - t > MEMORY_TTL]
    for sid in expired:
        del session_memories[sid]

    if session_id not in session_memories:
        memory = ConversationSummaryMemory(
            llm=llm,
            memory_key="chat_history",
            return_messages=True
        )
        session_memories[session_id] = (memory, now)
    else:
        session_memories[session_id] = (session_memories[session_id][0], now)

    return session_memories[session_id][0]

@app.get("/api/chat/stream")
async def chat_stream(request: Request, question: str):
    session_id = request.state.session_id
    print(f"Using session ID: {session_id}")
    print(f"Request cookies: {request.cookies}")
    memory = get_memory(session_id)
    rag_chain = get_chain(vector_index, llm, memory)
    print(f"Current memory buffer: {getattr(memory, 'buffer', None)}")

    async def event_generator():
        # ConversationalRetrievalChain returns a dict with 'answer' key
        async for chunk in rag_chain.astream({"question": question}):
            if "answer" in chunk:
                yield f"data: {chunk['answer']}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )
