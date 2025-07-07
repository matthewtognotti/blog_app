
import { Post } from "../page";

type PostItemProps = {
  post: Post;
  onPostDeleted: (id: string) => void;
};

export default function PostItem({ post, onPostDeleted }: PostItemProps) {
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

  return (
    <div className="p-4 bg-black rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className=" mt-2">{post.content}</p>
      <p className="text-sm text-gray-500 mt-4">
        Created at: {new Date(post.created_at).toLocaleString()}
      </p>
      <button
        onClick={handleDelete}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
