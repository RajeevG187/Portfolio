from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import Runnable
import os
from dotenv import load_dotenv

load_dotenv()

def get_chain(vector_index) -> Runnable:
    retriever = vector_index.vectorstore.as_retriever()

    # Load the LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        streaming=True
    )

    # Prompt Template
    prompt = ChatPromptTemplate.from_template(
        "You are a friendly and knowledgeable AI assistant designed to help users explore Rajeev Goel’s professional portfolio. Provide concise, accurate, and engaging answers based on the provided context documents, which include details about Rajeev’s projects, experiences, skills, and achievements. If the answer is not in the context, respond honestly and say you don't have that information. Always maintain a helpful and approachable tone. Refer to Rajeev in the third person (e.g., \"Rajeev has worked on...\").\n\n"
        "<context>\n{context}\n</context>\n\n"
        "Question: {input}"
    )

    # Combine documents + retrieval
    combine_docs_chain = create_stuff_documents_chain(llm, prompt)
    chain = create_retrieval_chain(retriever, combine_docs_chain)

    # Optional: prewarm to reduce cold-start delay
    try:
        for _ in chain.stream({"input": "Hello"}):
            break
    except Exception as e:
        print("Prewarm failed:", e)

    return chain
