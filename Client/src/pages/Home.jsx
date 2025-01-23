import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get(`api/posts/timeline/${user._id}`);
    setPosts(response.data);
  };

  const removePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`, { data: { userId: user._id }});
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    toast.info("Post deleted successfully!", { theme });
  };

  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      {posts.map((post) => {
        return <Post post={post} deletePost={removePost} key={post._id} />;
      })}
    </>
  );
};

export default Home;
