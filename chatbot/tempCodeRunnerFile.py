import os
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq # Groq for Chatting
from dotenv import load_dotenv

load_dotenv()

persistent_directory = "db/chroma_db"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# 1. Load existing vector store
db = Chroma(
    persist_directory=persistent_directory,
    embedding_function=embedding_model
)

# 2. Setup Groq LLM
llm = ChatGroq(
    model="llama-3.1-8b-instant", # Groq ka super fast model
    temperature=0
)

query = "What is the total number of promotions in Grade AB?"

# 3. Retrieve Context
retriever = db.as_retriever(search_kwargs={"k": 3})
relevant_docs = retriever.invoke(query)

# 4. Generate Answer using Groq
context = "\n".join([doc.page_content for doc in relevant_docs])
prompt = f"Context: {context}\n\nQuestion: {query}\n\nAnswer based on context:"

response = llm.invoke(prompt)

print(f"\nUser Query: {query}")
print("-" * 30)
print(f"Chatbot Response: {response.content}")