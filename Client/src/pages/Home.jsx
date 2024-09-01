import React from 'react'
import CreatePost from '../components/utilities/CreatePost'
import Post from '../components/utilities/Post'
import posts from '../data/posts.json'

const Home = () => {
  return (
    <>
      <CreatePost />
      {posts.map((post) => {
        return <Post post={post} key={post.id} />
      })}
    </>
  )
}

export default Home