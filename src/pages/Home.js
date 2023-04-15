import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { usePostStore } from "../store";
import PostList from "../components/PostList";

const Home = () => {
  const history = useHistory();
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts().catch((err) => console.error(err));
  }, [fetchPosts]);

  const handlePostClick = (postId) => {
    history.push(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>Latest Posts</h1>
      <PostList posts={posts} onPostClick={handlePostClick} />
    </div>
  );
};

export default Home;
