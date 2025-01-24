import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import axios from "axios";
import { toast } from "react-toastify";
import PostSkeleton from "../components/skeletons/PostSkeleton";

const Home = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`api/posts/timeline/${user._id}`);
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to fetch posts. Please try again.", { theme });
    } finally {
      setIsLoading(false);
    }
  };

  const removePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`, { data: { userId: user._id } });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.info("Post deleted successfully!", { theme });
    } catch (error) {
      toast.error("Failed to delete post. Please try again.", { theme });
    }
  };

  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        : posts.map((post) => (
            <Post post={post} user={post.user} deletePost={removePost} key={post._id} />
          ))}
    </>
  );
};

export default Home;
