import { useEffect } from "react";
import { usePostStore } from "../store/post";
import PostItem from "./PostItem";

const PostList = () => {
  const posts = usePostStore((state) => state.posts);
  const loadPosts = usePostStore((state) => state.loadPosts);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div>
      <h2>Blog Posts: Humans of NYC</h2>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
