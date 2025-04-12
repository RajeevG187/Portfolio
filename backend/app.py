from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from rag_chain import get_chain

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://portfolio-lo2x.vercel.app/"],
    # allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_chain = get_chain()

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
            "X-Accel-Buffering": "no",  # Prevent buffering (important on Render/Nginx)
        }
    )
