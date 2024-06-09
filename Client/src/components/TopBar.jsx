import React, { useState } from 'react';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import userImage from '../assets/user.png';
import useLeftBarContext from '../context/LeftBarContext';

const TopBar = () => {
  const {isActive, showBar, hideBar} = useLeftBarContext()

  return (
    <div className='flex bg-white z-10 items-center justify-between p-2 shadow sticky top-0'>
        {/* left */}
        <div className="flex gap-3 sm:gap-5 items-center">
            <div className='sm:hidden ml-1'>{isActive ? <CloseOutlinedIcon onClick={hideBar} /> : <GridViewOutlinedIcon onClick={showBar} />}</div>
            <div className='mt-0.5 sm:mt-0 text-xl sm:text-2xl font-semibold text-blue-900 sm:ml-2'>FRIENDS</div>
            <HomeOutlinedIcon />
            <DarkModeOutlinedIcon />
            <div className="hidden sm:visible sm:flex items-center bg-white p-1 rounded-md border border-gray-300">
                <SearchOutlinedIcon />
                <input type="text" placeholder='Search...' className='ml-2 bg-transparent outline-none lg:w-[25rem]' />
            </div>
        </div>
        {/* right */}
        <div className="flex gap-3 sm:gap-5 items-center">
            <EmailOutlinedIcon />
            <NotificationsOutlinedIcon />
            <div className="user">
                <img src={userImage} alt="userImage" className='h-7 w-7 sm:h-9 sm:w-9 rounded-full mr-2 object-cover shadow'/>
            </div>
        </div>
    </div>
  )
}

export default TopBar