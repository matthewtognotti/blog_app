import httpx
import os
from dotenv import load_dotenv

# Load environment variables before using them
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")


def get_posts():
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    response = httpx.get(
        f"{SUPABASE_URL}/rest/v1/posts", headers=headers, params={"select": "*"}
    )
    response.raise_for_status()
    return response.json()


def create_post(title: str, content: str):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    payload = {"title": title, "content": content}
    response = httpx.post(
        f"{SUPABASE_URL}/rest/v1/posts", headers=headers, json=payload
    )
    print("Response:", response.status_code, response.text)
    response.raise_for_status()
    return response.json()


def delete_post(post_id: str):
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    }
    response = httpx.delete(
        f"{SUPABASE_URL}/rest/v1/posts?id=eq.{post_id}", headers=headers
    )
    response.raise_for_status()
    return response
