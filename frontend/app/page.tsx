"use client";

import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8000/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <main className="p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <PostForm onPostCreated={handlePostCreated} />
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">❌ {error}</p>}
        {!loading && posts.length === 0 && <p>No posts yet.</p>}
        <PostList posts={posts} />
      </div>
    </main>
  );
}