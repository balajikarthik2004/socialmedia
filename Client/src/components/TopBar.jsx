import React from 'react';
import useThemeContext from '../context/theme';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import userImage from '../assets/user.png';

const TopBar = ({isOpen, toggleBar}) => {
  const {themeMode, changeTheme} = useThemeContext()

  return (
    <div className='flex bg-white z-20 items-center justify-between p-2 sm:p-2.5 shadow sticky top-0'>
        {/* left */}
        <div className="flex gap-2.5 sm:gap-5 items-center w-[68%]">
            <div className='sm:hidden ml-1'>{isOpen ? <CloseOutlinedIcon onClick={()=>toggleBar()} /> : <GridViewOutlinedIcon onClick={()=>toggleBar()} />}</div>
            <div className='hidden sm:block text-xl sm:text-2xl font-bold text-blue-700 sm:mx-3'>FriendsZone</div>
            <div className="flex items-center bg-white p-1 sm:p-1.5 rounded-md border border-gray-400 w-full">
                <SearchOutlinedIcon />
                <input type="text" placeholder='Search...' className='ml-1 sm:ml-2 bg-transparent outline-none w-full' />
            </div>
        </div>
        {/* right */}
        <div className="flex gap-2.5 sm:gap-5 items-center">
            {themeMode === "light" ? <DarkModeIcon onClick={()=>changeTheme()} /> : <LightModeIcon onClick={()=>changeTheme()} />}
            <div className='hidden sm:block'><EmailOutlinedIcon /></div>
            <NotificationsOutlinedIcon />
            <div className="user">
                <img src={userImage} alt="userImage" className='h-7 w-7 sm:h-8 sm:w-8 rounded-full mr-2 object-cover shadow'/>
            </div>
        </div>
    </div>
  )
}

export default TopBar