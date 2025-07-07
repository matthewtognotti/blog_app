
"use client";

import { useState } from "react";
import { Post } from "../page";

type PostFormProps = {
  onPostCreated: (post: Post) => void;
};

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      onPostCreated(newPost);
      setTitle("");
      setContent("");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded shadow space-y-4 bg-black hover:shadow-lg transition"
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
        className="bg-white text-black px-4 py-2 rounded disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Add Post"}
      </button>
    </form>
  );
}
