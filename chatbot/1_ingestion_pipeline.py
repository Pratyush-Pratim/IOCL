import os
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, UnstructuredPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter 
from langchain_huggingface import HuggingFaceEmbeddings 
from langchain_chroma import Chroma
import os
import pytesseract

# Tesseract path set karein
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

load_dotenv()

def get_embedding_model():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")



def load_documents(docs_path="docs"):
    print("PDFs scan ho rahi hain (OCR mode)...")
    
    # 1. Tesseract aur Poppler ke paths ko system path mein force karein
    tesseract_bin = r'C:\Program Files\Tesseract-OCR'
    poppler_bin = r'C:\Users\Beauty Kumari\Downloads\Release-25.12.0-0\poppler-25.12.0\Library\bin'
    
    os.environ["PATH"] += os.pathsep + tesseract_bin + os.pathsep + poppler_bin
    
    # Langchain loader ko tesseract_cmd ka path bhi batayein
    pytesseract.pytesseract.tesseract_cmd = os.path.join(tesseract_bin, "tesseract.exe")

    loader = DirectoryLoader(
        path=docs_path,
        glob="*.pdf",
        loader_cls=UnstructuredPDFLoader,
        loader_kwargs={
            "strategy": "ocr_only",
            "poppler_path": poppler_bin
        }
    )
    return loader.load()

def main():
   
    documents = load_documents("docs")
    
    # 2. Chunk size badha diya gaya hai taaki tables na tootey
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,   # Bada chunk size table structure bachane ke liye
        chunk_overlap=200, 
        separators=["\n\n", "\n", " ", ""]
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Total chunks created: {len(chunks)}")
    
    # 3. Create Vector Database
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=get_embedding_model(),
        persist_directory="db/chroma_db"
    )
    print("✅ Ingestion Complete with larger chunks!")

if __name__ == "__main__":
    main()