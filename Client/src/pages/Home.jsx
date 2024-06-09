import React from 'react'
import CreatePost from '../components/utilities/CreatePost'
import Post from '../components/utilities/Post'
import posts from '../data/posts.json'

const Home = () => {
  return (
    <div className='p-5 overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-9 lg:col-span-6'>
      <CreatePost />
      {posts.map((post) => {
        return <Post />
      })}
    </div>
  )
}

export default Home