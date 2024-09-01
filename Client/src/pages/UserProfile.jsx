import React from 'react'
import Post from '../components/utilities/Post'
import posts from '../data/posts.json'
import userImg from '../assets/user.png'
import EditIcon from '@mui/icons-material/Edit';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const UserProfile = () => {
  return (
    <>
      <div className='flex justify-around gap-2 sm:gap-4 p-3 sm:p-5 rounded-lg shadow bg-white dark:bg-[#171717] dark:text-white'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <img src={userImg} alt="" className='h-[4rem] w-[4rem] sm:h-[4.5rem] sm:w-[4.5rem] rounded-full object-cover block shadow' />
          <h1 className='font-medium sm:text-lg'>Rajvir Singh</h1>
        </div>
        <div className='border border-r-gray-600 border-l-gray-600 rounded opacity-20'></div>
        <div className='w-[64%] flex flex-col justify-between font-medium'>
          <div className='flex gap-10 mt-2 sm:mt-3 text-lg sm:text-xl'>
            <p>542 Friends</p>
            <p>24 Posts</p>
          </div>
          <button className='justify-self-end rounded-md bg-blue-600 hover:bg-blue-700 text-white p-2 text-lg'>Add Friend</button>
        </div>
      </div>

      {posts.map((post) => {
        return <Post post={post} key={post.id} />
      })}
    </>
  )
}

export default UserProfile