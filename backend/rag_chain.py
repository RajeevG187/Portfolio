from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

def get_chain(vector_index, llm, conversation: list = None) -> Runnable:
    retriever = vector_index.vectorstore.as_retriever()
    conversation_text = "\n".join([f"- {conv['role']}: {conv['message']}" for conv in conversation]) if conversation else "No previous conversation"
    
    # Prompt Template
    prompt = ChatPromptTemplate.from_template(
        "You are a friendly and knowledgeable AI assistant designed to help users explore Rajeev Goel's professional portfolio. Provide concise, accurate, and engaging answers based on the provided context documents, which include details about Rajeev's projects, experiences, skills, and achievements. If the answer is not in the context, respond honestly and say you don't have that information. Always maintain a helpful and approachable tone. Refer to Rajeev in the third person (e.g., 'Rajeev has worked on...').\n\n"
        "Previous Conversation:\n{conversation}\n\n"
        "<context>\n{context}\n</context>\n\n"
        "Question: {question}"
    )

    # Function to format retrieved documents
    def format_docs(docs):
        return "\n\n".join([doc.page_content for doc in docs])

    # Create the RAG chain
    chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough(),
            "conversation": lambda x: conversation_text  # Pass conversation as constant
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    return chain