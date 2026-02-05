import os
import requests
from sklearn.metrics.pairwise import cosine_similarity

HF_API_URL = (
    "https://api-inference.huggingface.co/models/"
    "sentence-transformers/all-MiniLM-L6-v2"
)

HF_API_KEY = os.getenv("HF_API_KEY")

HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}"
}


def get_embedding(text: str):
    response = requests.post(
        HF_API_URL,
        headers=HEADERS,
        json={"inputs": text},
        timeout=30,
    )

    if response.status_code != 200:
        raise Exception("Failed to fetch embeddings from Hugging Face")

    return response.json()


def get_similarity(text1: str, text2: str) -> float:
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)

    similarity = cosine_similarity([emb1], [emb2])[0][0]
    return float(similarity)
