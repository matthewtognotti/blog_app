from fastapi import FastAPI, HTTPException, status
from supabase import get_posts, create_post, delete_post
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


@app.delete("/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_post(post_id: str):
    try:
        delete_post(post_id)
        return
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
