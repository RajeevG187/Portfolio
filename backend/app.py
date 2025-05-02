from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from rag_chain import get_chain
from utils.db import get_vectorindex

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    rag_chain = get_chain(vector_index)

@app.get("/api/ping")
async def ping():
    return {"status": "ok"}

@app.get("/api/chat/stream")
async def chat_stream(question: str):
    async def event_generator():
        async for chunk in rag_chain.astream({"input": question}):
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
