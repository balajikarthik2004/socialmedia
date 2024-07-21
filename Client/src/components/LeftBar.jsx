import React from 'react'
import { NavLink } from 'react-router-dom'
import userImage from '../assets/user.png'
import HomeIcon from '@mui/icons-material/Home';
import FriendsIcon from '@mui/icons-material/PeopleAlt';
import MessageIcon from '@mui/icons-material/Forum';
import LikedIcon from '@mui/icons-material/Favorite';
import SavedIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';

const LeftBar = ({isOpen, toggleBar}) => {

  return (
    <div className={`${!isOpen? "left-[-100%]" : "left-0 w-[60vw] sm:w-full z-10"} fixed shadow-md sm:static sm:col-span-3 lg:col-span-2 h-[calc(100vh-50px)] sm:h-[calc(100vh-58px)] bg-white transition-all duration-300`}>
        <div className='flex flex-col gap-0 mx-4 justify-evenly h-full'>
            <NavLink to="/userProfile" className="flex items-center hover:bg-[#eeeeee] p-2 rounded-lg">
                <img src={userImage} alt="userImage" className='h-10 w-10 rounded-full object-cover shadow'/>
                <div className='ml-3'>
                    <p className=' text-lg font-medium'>Rajvir Singh</p>
                    <p className='text-sm'>@rajvir2003</p>
                </div>
            </NavLink>
            <hr />
            <ul className='h-[65%] flex flex-col items-start gap-2'>
                <NavLink to="/" className={({isActive}) => `flex items-center hover:bg-[#eeeeee] w-full p-2 rounded-lg ${isActive && "bg-[#eeeeee]"}`} onClick={()=>toggleBar()}>
                    <HomeIcon fontSize='large'/>
                    <p className='ml-3.5 text-lg font-medium'>Home</p>
                </NavLink>
                <NavLink to="/friends" className={({isActive}) => `flex items-center hover:bg-[#eeeeee] w-full p-2 rounded-lg ${isActive && "bg-[#eeeeee]"}`}>
                    <FriendsIcon fontSize='large' />
                    <p className='ml-3.5 text-lg font-medium'>Friends</p>
                </NavLink>
                <NavLink to="/messages" className={({isActive}) => `flex items-center hover:bg-[#eeeeee] w-full p-2 rounded-lg ${isActive && "bg-[#eeeeee]"}`}>
                    <MessageIcon fontSize='large'/>
                    <p className='ml-3.5 text-lg font-medium'>Messages</p>
                </NavLink>
                <NavLink to="/liked" className={({isActive}) => `flex items-center hover:bg-[#eeeeee] w-full p-2 rounded-lg ${isActive && "bg-[#eeeeee]"}`}>
                    <LikedIcon fontSize='large' />
                    <p className='ml-3.5 text-lg font-medium'>Liked</p>
                </NavLink>
                <NavLink to="/saved" className={({isActive}) => `flex items-center hover:bg-[#eeeeee] w-full p-2 rounded-lg ${isActive && "bg-[#eeeeee]"}`}>
                    <SavedIcon fontSize='large'/>
                    <p className='ml-3.5 text-lg font-medium'>Saved</p>
                </NavLink>
            </ul>
            <hr />
            <NavLink className='flex items-center hover:bg-[#eeeeee] p-2 rounded-lg'>
                <LogoutIcon fontSize='large'/>
                <p className='ml-3.5 text-lg font-medium'>Logout</p>
            </NavLink>
        </div>
        
    </div>
    
  )
}

export default LeftBar