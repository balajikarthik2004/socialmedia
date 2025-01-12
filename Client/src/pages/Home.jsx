import React, { useState, useEffect, useContext } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get(`api/posts/timeline/${user._id}`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </>
  );
};

export default Home;
