import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import Post from "../components/Post";
import axios from "axios";
import { toast } from "react-toastify";

const Saved = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const res = await axios.get(`api/posts/timeline/${user._id}`);
      const posts = res.data;
      setSavedPosts(posts.filter((post) => post.saves.includes(user._id)));
    };
    fetchSavedPosts();
  }, []);

  const removePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`, { data: { userId: user._id }});
    setSavedPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    toast.info("Post deleted successfully!", { theme });
  };

  return (
    <>
      <div className="bg-white text-xl sm:text-2xl font-bold text-center p-3 mb-5 shadow rounded-lg dark:bg-[#101010] dark:text-white">
        Saved Posts
      </div>
      {savedPosts.map((post) => {
        return <Post post={post} deletePost={removePost} key={post._id} />;
      })}
    </>
  );
};

export default Saved;
