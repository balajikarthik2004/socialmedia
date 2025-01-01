import React, { useState, useEffect, useContext } from "react";
import CreatePost from "../components/utilities/CreatePost";
import Post from "../components/utilities/Post";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get(`api/posts/timeline/${user._id}`);
    console.log(response.data);
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
