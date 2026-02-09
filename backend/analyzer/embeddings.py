import os
import requests
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

load_dotenv()

HF_API_URL = (
    "https://api-inference.huggingface.co/models/"
    "sentence-transformers/all-MiniLM-L6-v2"
)

HF_API_KEY = os.getenv("HF_API_KEY")

if not HF_API_KEY:
    raise RuntimeError("HF_API_KEY environment variable is not set")

HEADERS = {
    "Authorization": f"Bearer {HF_API_KEY}"
}


def get_embedding(text: str) -> list[float]:
    response = requests.post(
        HF_API_URL,
        headers=HEADERS,
        json={"inputs": text},
        timeout=30,
    )

    if response.status_code != 200:
        raise Exception(
            f"Hugging Face API error: {response.status_code} {response.text}"
        )

    data = response.json()

    # HF returns: [[vector]]
    if not isinstance(data, list) or not isinstance(data[0], list):
        raise Exception("Unexpected embedding format from Hugging Face")

    return data[0]  # 👈 extract the actual vector


def get_similarity(text1: str, text2: str) -> float:
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)

    similarity = cosine_similarity([emb1], [emb2])[0][0]
    return float(similarity)
