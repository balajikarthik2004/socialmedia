import React from 'react'

const FriendRequest = ({name, url}) => {
  return (
    <div className='flex mb-3 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <img src={url} alt="userImage" className='block h-9 w-9 rounded-full object-cover'/>
            <div>
            <p>{name}</p> 
            <p className='text-[0.75rem] text-[#00000081]'>5 mutual friends</p> 
            </div> 
        </div>
        <div className='flex'>
            <button className='p-1.5 bg-gray-200 hover:bg-gray-300 text-sm mr-2 rounded'>Cancel</button>
            <button className='p-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded'>Accept</button>
        </div>    
    </div>
  )
}

export default FriendRequest