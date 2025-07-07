
import { Post } from "../page";
import PostItem from "./PostItem";

type PostListProps = {
  posts: Post[];
  onPostDeleted: (id: string) => void;
  onPostUpdated: (updatedPost: Post) => void;
};

export default function PostList({ posts, onPostDeleted, onPostUpdated }: PostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post} 
          onPostDeleted={onPostDeleted} 
          onPostUpdated={onPostUpdated} 
        />
      ))}
    </div>
  );
}
