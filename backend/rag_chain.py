from langchain.chains import ConversationalRetrievalChain
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

def get_chain(vector_index, llm, memory):
    retriever = vector_index.vectorstore.as_retriever()

    # Prompt Template
    prompt = ChatPromptTemplate.from_template(
        "You are a friendly and knowledgeable AI assistant designed to help users explore Rajeev Goel's professional portfolio. Provide concise, accurate, and engaging answers based on the provided context documents, which include details about Rajeev's projects, experiences, skills, and achievements. If the answer is not in the context, respond honestly and say you don't have that information. Always maintain a helpful and approachable tone. Refer to Rajeev in the third person (e.g., 'Rajeev has worked on...').\n\n"
        "<context>\n{context}\n</context>\n\n"
        "Question: {question}"
    )

    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={"prompt": prompt}
    )

    # Optional: prewarm to reduce cold-start delay
    try:
        chain({"question": "Hello"})
    except Exception as e:
        print("Prewarm failed:", e)

    return chain
