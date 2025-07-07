
import { Post } from "../page";
import PostItem from "./PostItem";

type PostListProps = {
  posts: Post[];
  onPostDeleted: (id: number) => void;
};

export default function PostList({ posts, onPostDeleted }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onPostDeleted={onPostDeleted} />
      ))}
    </div>
  );
}
