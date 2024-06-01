## Overview
This project demonstrates how to build a Q&A assistant using various AI and NLP tools, including HuggingFace, LLaMA, and LangChain. The assistant is designed to answer questions accurately based on a provided dataset.

## Installation
To set up the environment and install the necessary packages, follow these steps:

1. Install pypdf for PDF manipulation:
```
pip install pypdf
```
2. Install transformers, einops, accelerate, langchain, and bitsandbytes for AI model operations:

```
pip install -q transformers einops accelerate langchain bitsandbytes
```
3. Install sentence_transformers for sentence embeddings:
```
pip install sentence_transformers
```
4. Install llama_index and related packages:
```
pip install llama_index
pip install llama-index-llms-huggingface
```
5. Upgrade langchain-community and install llama-index-embeddings-langchain:
```
pip install -U langchain-community
pip install llama-index-embeddings-langchain
```
## Usage
1. Import the required modules and classes:
```
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms.huggingface import HuggingFaceLLM
from llama_index.core.prompts.prompts import SimpleInputPrompt
from langchain.embeddings import HuggingFaceEmbeddings
from llama_index.embeddings.langchain import LangchainEmbedding
import torch
```
2. Load the data from a directory:

```
documents = SimpleDirectoryReader("/content/data").load_data()
```
3. Define the system prompt and query wrapper prompt:

```
system_prompt = """
You are a Q&A assistant. Your goal is to answer questions as accurately as possible based on the instructions and context provided.
"""
query_wrapper_prompt = SimpleInputPrompt("{query_str}")
```

4. Log in to HuggingFace CLI (ensure you have a HuggingFace account):
```
huggingface-cli login
```

5. Set up the HuggingFace LLM:
```
llm = HuggingFaceLLM(
    context_window=4096,
    max_new_tokens=256,
    generate_kwargs={"temperature": 0.0, "do_sample": False},
    system_prompt=system_prompt,
    query_wrapper_prompt=query_wrapper_prompt,
    tokenizer_name="meta-llama/Llama-2-7b-chat-hf",
    model_name="meta-llama/Llama-2-7b-chat-hf",
    device_map="auto",
    model_kwargs={"torch_dtype": torch.float16, "load_in_8bit": True}
)
```

6. Set up the embedding model:
```
embed_model = LangchainEmbedding(
    HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
)

```
7. Create the service context:
```
service_context = ServiceContext.from_defaults(
    chunk_size=1024,
    llm=llm,
    embed_model=embed_model
)
```
8. Build the index from the documents:

```
index = VectorStoreIndex.from_documents(documents, service_context=service_context)
```
9. Initialize the query engine and perform a query:
```
query_engine = index.as_query_engine()
response = query_engine.query("Give me the details of the candidate")
print(response)
```
## Conclusion
This project sets up a robust Q&A assistant by integrating various state-of-the-art AI models and libraries. Customize and expand upon this example to fit your specific needs and datasets.
