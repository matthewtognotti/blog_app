from fastapi import FastAPI, HTTPException
from supabase import get_posts, create_post
from pydantic import BaseModel

app = FastAPI()


class PostCreate(BaseModel):
    title: str
    content: str


@app.get("/")
def hello():
    return {"message": "Hello from FastAPI"}


@app.get("/posts")
def read_posts():
    return get_posts()


@app.post("/posts")
def add_post(post: PostCreate):
    try:
        return create_post(post.title, post.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
