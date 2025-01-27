import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import Post from "../components/Post";
import axios from "axios";
import { toast } from "react-toastify";
import PostSkeleton from "../components/skeletons/PostSkeleton";

const Saved = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const res = await axios.get(`api/posts/timeline/${user._id}`);
      const posts = res.data;
      setSavedPosts(posts.filter((post) => post.saves.includes(user._id)));
      setIsLoading(false);
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
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <PostSkeleton key={index} />
          ))
        : savedPosts.length > 0 ? savedPosts.map((post) => (
            <Post post={post} user={post.user} deletePost={removePost} key={post._id} />
          ))
        : <div className="h-[50vh] px-5 flex items-center justify-center dark:text-white">
            <div className="text-center">
              <p className="text-2xl font-medium mb-2">You haven't saved any posts yet.</p>
              <p className="text-lg opacity-80">Start exploring and save your favorites for later!</p>
            </div>
          </div>}
    </>
  );
};

export default Saved;
