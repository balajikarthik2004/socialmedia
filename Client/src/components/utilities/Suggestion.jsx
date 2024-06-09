import React from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Suggestion = ({name, url}) => {
  return (
    <div className='flex mb-3.5 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <img src={url} alt="userImage" className='block h-9 w-9 rounded-full object-cover'/>
            <p>{name}</p>  
        </div>
        <button className='py-2 pl-2 pr-3 bg-blue-100 text-blue-600 hover:bg-[#cfdaf1] text-sm font-semibold rounded'><AddRoundedIcon fontSize='sm'/> Add Friend</button>  
    </div>
  )
}

export default Suggestion