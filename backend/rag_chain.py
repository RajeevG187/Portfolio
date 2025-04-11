from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.chat_models import ChatOllama
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import Runnable
import os
from utils.loader import load_split_documents
from utils.embeddings import get_embedding_model

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
    if os.path.exists(VECTORSTORE_PATH):
        db = load_local()
    else:
        db = make_vectorstore()    

    retriever = db.as_retriever(search_kwargs={"k": 3})
    llm = ChatOllama(model="mistral", temperature=0.2)

    prompt = ChatPromptTemplate.from_template("""
Answer the following question based on the provided context. Dont mention about the courses untill specifically asked. 
<context> {context} <context>.
Question : {input}""")

    combine_docs_chain = create_stuff_documents_chain(llm, prompt)

    chain = create_retrieval_chain(retriever, combine_docs_chain)
    try:
        for _ in chain.stream({"input": "Hello"}):
            break
    except:
        pass  # Skip if pre-warm fails
    return chain
