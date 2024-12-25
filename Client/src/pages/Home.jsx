import React, { useState, useEffect } from 'react'
import CreatePost from '../components/utilities/CreatePost'
import Post from '../components/utilities/Post'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("api/posts/timeline/676a9fdd8a425aaa8a4c9e33");
      console.log(response.data);
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <CreatePost />
      {posts.map((post) => {
        return <Post post={post} key={post._id} />
      })}
    </>
  )
}

export default Home