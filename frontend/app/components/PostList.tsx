
import { Post } from "../page";
import PostItem from "./PostItem";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
