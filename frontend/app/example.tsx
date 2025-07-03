"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setTitle("");
      setContent("");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">📝 Blog App</h1>

        {/* Add Post Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-xl font-semibold">Add New Post</h2>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Content</label>
            <textarea
              className="w-full border p-2 rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Add Post"}
          </button>
        </form>

        {/* Posts List */}
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">❌ {error}</p>}
        {!loading && posts.length === 0 && <p>No posts yet.</p>}

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.content}</p>
              <p className="text-sm text-gray-500 mt-4">
                Created at: {new Date(post.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
