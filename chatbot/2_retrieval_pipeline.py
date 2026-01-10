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

# import os
# from dotenv import load_dotenv
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain_chroma import Chroma
# from langchain_groq import ChatGroq
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.runnables import RunnablePassthrough
# from langchain_core.output_parsers import StrOutputParser

# load_dotenv()

# def main():
#     # 1. Embeddings Setup
#     embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    
#     # 2. Load Vector Database
#     if not os.path.exists("db/chroma_db"):
#         print("Error: db/chroma_db folder nahi mila. Pehle ingestion pipeline chalayein.")
#         return

#     vectorstore = Chroma(persist_directory="db/chroma_db", embedding_function=embeddings)
#     retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

#     # 3. LLM Setup
#     llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0)

#     # 4. Prompt Engineering
#     template = """You are an expert assistant for IndianOil (IOCL). 
#     The context below contains OCR data from a promotion table.
#     Format: [Grade] [Transfers] [Promotions]
#     Example: AB 746 1151 means Grade AB has 746 Transfers and 1151 Promotions.

#     Use the context to answer precisely.
    
#     Context:
#     {context}

#     Question: {question}
#     """
#     prompt = ChatPromptTemplate.from_template(template)

#     # 5. LCEL Chain (Isme 'langchain.chains' ki zaroorat nahi hai)
#     def format_docs(docs):
#         return "\n\n".join(doc.page_content for doc in docs)

#     rag_chain = (
#         {"context": retriever | format_docs, "question": RunnablePassthrough()}
#         | prompt
#         | llm
#         | StrOutputParser()
#     )

#     # 6. Run Query
#     user_query = "What is the total number of promotions in Grade AB?"
#     print(f"\nUser Query: {user_query}")
#     print("-" * 30)
    
#     try:
#         response = rag_chain.invoke(user_query)
#         print(f"Chatbot Response: {response}")
#     except Exception as e:
#         print(f"An error occurred: {e}")

# if __name__ == "__main__":
#     main()