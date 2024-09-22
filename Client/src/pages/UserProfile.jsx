import React from 'react'
import Post from '../components/utilities/Post'
import posts from '../data/posts.json'
import CoverImage from '../assets/coverImage.jpeg';
import userImg from '../assets/user.png'

const UserProfile = () => {
  return (
    <>
      <div className='relative overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-9 lg:col-span-6'>
        <img src={CoverImage} alt="" className='h-[160px] sm:h-[200px] w-full object-cover block rounded' />
        <img src={userImg} alt="" className='h-[95px] sm:h-[110px] rounded-full block absolute top-[115px] sm:top-[145px] left-0 right-0 mx-auto border-2 border-transparent bg-[#eeeeee] dark:bg-[#202020]' />
        
        <div className='w-full lg:w-[85%] mx-auto mt-1 p-4 pt-[58px] bg-white dark:bg-[#171717] flex flex-col gap-4 items-center dark:text-white rounded-md shadow'>
          <p className='text-2xl font-medium'>Rajvir Singh</p>
          <div className='flex justify-center gap-10 w-[full] text-sm font-medium'>
            <div className='text-center px-3'><p className='text-lg font-semibold'>146</p><p>Posts</p></div>
            <div className='text-center'><p className='text-lg font-semibold'>786</p><p>Followers</p></div>
            <div className='text-center'><p className='text-lg font-semibold'>512</p><p>Following</p></div>
          </div>
          <div className='grid grid-cols-12 gap-2 w-full sm:font-medium'>
            <button className='col-span-3 p-1.5 sm:p-2 text-white bg-red-600 hover:bg-red-700 rounded'>Block</button>
            {/* <button className='col-span-3 p-1.5 sm:p-2 text-white bg-green-600 hover:bg-green-700 rounded'>Edit</button> */}
            <button className='col-span-6 p-1.5 sm:p-2 text-white bg-blue-600 hover:bg-blue-700 rounded'>Follow</button>
            <button className='col-span-3 p-1.5 sm:p-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#272727] dark:hover:bg-[#333333] border dark:border-gray-700 rounded'>Message</button>
          </div>
        </div>
        
        <div className='pt-2'>
          {posts.map((post) => {
            return <Post post={post} key={post.id} />
          })}
        </div>
        
      </div>
    </>
  )
}

export default UserProfile