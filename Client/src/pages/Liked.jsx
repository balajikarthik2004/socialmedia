import React, { useContext, useState, useEffect } from "react";
import Post from "../components/utilities/Post";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Liked = () => {
  const { user } = useContext(UserContext);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const res = await axios.get(`api/posts/timeline/${user._id}`);
      const posts = res.data;
      setLikedPosts(posts.filter((post) => post.likes.includes(user._id)));
    };
    fetchLikedPosts();
  }, []);

  return (
    <>
      <div className="bg-white text-xl sm:text-2xl font-bold text-center p-3 mb-5 shadow rounded-lg dark:bg-[#171717] dark:text-white">
        Liked Posts
      </div>
      {likedPosts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </>
  );
};

export default Liked;
