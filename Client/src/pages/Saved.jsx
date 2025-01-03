import React, { useContext, useEffect, useState } from "react";
import Post from "../components/utilities/Post";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Saved = () => {
  const { user } = useContext(UserContext);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const res = await axios.get(`api/posts/timeline/${user._id}`);
      const posts = res.data;
      setSavedPosts(posts.filter((post) => post.saves.includes(user._id)));
    };
    fetchSavedPosts();
  }, []);

  return (
    <>
      <div className="bg-white text-xl sm:text-2xl font-bold text-center p-3 shadow rounded-lg dark:bg-[#171717] dark:text-white">
        Saved Posts
      </div>
      {savedPosts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </>
  );
};

export default Saved;
