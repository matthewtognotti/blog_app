
import { Post } from "../page";
import { useState } from "react";

type PostItemProps = {
  post: Post;
  onPostDeleted: (id: string) => void;
  onPostUpdated: (updatedPost: Post) => void;
};

export default function PostItem({ post, onPostDeleted, onPostUpdated }: PostItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
      onPostDeleted(post.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        throw new Error("Failed to update post");
      }
      const updatedPost = await res.json();
      onPostUpdated(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-black rounded shadow hover:shadow-lg transition">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded"
              rows={4}
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2">{post.content}</p>
          <p className="text-sm text-gray-500 mt-4">
            Created at: {new Date(post.created_at).toLocaleString()}
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
