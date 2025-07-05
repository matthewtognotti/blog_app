
import { Post } from "../page";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="p-4 bg-black rounded shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className=" mt-2">{post.content}</p>
      <p className="text-sm text-gray-500 mt-4">
        Created at: {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
}
