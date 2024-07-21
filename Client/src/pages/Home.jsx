import React from 'react'
import CreatePost from '../components/utilities/CreatePost'
import Post from '../components/utilities/Post'
import posts from '../data/posts.json'

const Home = () => {
  return (
    <div className='p-5 sm:px-7 overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-9 lg:col-span-6'>
      <CreatePost />
      {posts.map((post) => {
        return <Post post={post} key={post.id} />
      })}
    </div>
  )
}

export default Home