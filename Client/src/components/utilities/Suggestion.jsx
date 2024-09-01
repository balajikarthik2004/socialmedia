import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Suggestion = ({name, url}) => {
  return (
    <div className='flex mb-4 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <img src={url} alt="userImage" className='block h-9 w-9 rounded-full object-cover'/>
            <p>{name}</p>  
        </div>
        <button className='py-[0.45rem] pl-2 pr-3.5 text-sm font-semibold rounded bg-blue-100 text-blue-700 dark:bg-white dark:text-black'><AddRoundedIcon sx={{mb : 0.4, fontSize : 15}}/> Add Friend</button>  
    </div>
  )
}

export default Suggestion