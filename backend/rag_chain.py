from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import Runnable
import os
from dotenv import load_dotenv

from utils.loader import load_split_documents
from utils.embeddings import get_embedding_model

load_dotenv()
VECTORSTORE_PATH = "vectorstore_index"

def make_vectorstore():
    documents = load_split_documents("documents")
    embeddings = get_embedding_model()
    db = FAISS.from_documents(documents, embeddings)
    db.save_local(VECTORSTORE_PATH)
    return db

def load_local():
    embeddings = get_embedding_model()
    return FAISS.load_local(VECTORSTORE_PATH, embeddings, allow_dangerous_deserialization=True)

def get_chain() -> Runnable:
    # Load or build the vectorstore
    db = load_local() if os.path.exists(VECTORSTORE_PATH) else make_vectorstore()
    retriever = db.as_retriever()

    # Load the LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash-001",
        google_api_key=os.getenv("GOOGLE_API_KEY"),
        streaming=True  # make sure this is enabled for .stream() support
    )

    # Prompt Template
    prompt = ChatPromptTemplate.from_template(
        "Answer the following question based on the provided context.\n"
        "In the given context consider I as Rajeev Goel..\n"
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
