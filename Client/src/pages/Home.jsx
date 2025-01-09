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
    console.log(response.data);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      {posts.length > 0 ? (
        posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })
      ) : (
        <div className="h-[60%] flex flex-col gap-2 justify-center items-center dark:text-white">
          <p className="font-medium text-xl">No posts here yet</p>
          <p className="text-lg">Explore and connect to fill your feed!</p>
        </div>
      )}
    </>
  );
};

export default Home;
