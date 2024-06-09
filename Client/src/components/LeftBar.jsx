import React from 'react'
import { Link } from 'react-router-dom'
import userImage from '../assets/user.png'
import Home from '../assets/home.png'
import Bookmark from '../assets/bookmark.png'
import Post from '../assets/post.png'
import Friends from '../assets/followers.png'
import Chats from '../assets/chats.png'
import useLeftBarContext from '../context/LeftBarContext'

const LeftBar = () => {
  const {isActive} = useLeftBarContext()

  return (
    <div className={`${!isActive ? "hidden" : "fixed w-[50vw]"} shadow-md sm:block sm:col-span-3 lg:col-span-2 bg-white h-[calc(100vh-52px)]`}>
        <ul className='h-[65%] flex flex-col items-start pl-4 pt-4 gap-2.5'>
            <li className='flex items-center hover:bg-[#f3f3f3] w-[90%] p-2 rounded-lg'>
                <img src={userImage} alt="userImage" className='h-9 w-9 rounded-full object-cover shadow'/>
                <Link className='ml-3.5 text-lg font-semibold' to="/">Profile</Link>
            </li>
            <li className='flex items-center hover:bg-[#f3f3f3] w-[90%] p-2 rounded-lg'>
                <img src={Home} alt="" className='h-8 w-8' />
                <Link className='ml-3.5 text-lg font-semibold' to="/">Home</Link>
            </li>
            <li className='flex items-center hover:bg-[#f3f3f3] w-[90%] p-2 rounded-lg'>
                <img src={Friends} alt="" className='h-8 w-8' />
                <Link className='ml-3.5 text-lg font-semibold' to="/">Friends</Link>
            </li>
            <li className='flex items-center hover:bg-[#f3f3f3] w-[90%] p-2 rounded-lg'>
                <img src={Chats} alt="" className='h-8 w-8' />
                <Link className='ml-3.5 text-lg font-semibold' to="/">Chats</Link>
            </li>
            <li className='flex items-center hover:bg-[#f3f3f3] w-[90%] p-2 rounded-lg'>
                <img src={Post} alt="" className='h-8 w-8'/>
                <Link className='ml-3.5 text-lg font-semibold' to="/">My Posts</Link>
            </li>
            <li className='flex items-center hover:bg-[#f3f3f3] w-[90%] p-2 rounded-lg'>
                <img src={Bookmark} alt="" className='h-8 w-8'/>
                <Link className='ml-3.5 text-lg font-semibold' to="/">Saved</Link>
            </li>
            
        </ul>
    </div>
    
  )
}

export default LeftBar