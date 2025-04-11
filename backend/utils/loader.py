from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

def load_split_documents(doc_path="../documents"):
    documents = []
    for file in os.listdir(doc_path):
        if file.endswith(".pdf"):
            loader = PyPDFLoader(os.path.join(doc_path, file))
            docs = loader.load()
            documents.extend(docs)
    splitter = RecursiveCharacterTextSplitter(
    chunk_size=500, chunk_overlap=100)
    return splitter.split_documents(documents)
