import React from 'react'

const Friend = ({url, name}) => {
  return (
    <>
    <div className='flex mb-4 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <img src={url} alt="userImage" className='block h-10 w-10 rounded-full object-cover'/>
            <div className='sm:ml-2'>
            <p className='text-[1rem] sm:text-normal'>{name}</p> 
            <p className='text-xs opacity-90 sm:text-sm font-light'>34 friends | 243 posts</p> 
            </div> 
        </div>
        <div className='flex'>
            <button className='p-1 px-2 sm:p-1.5 sm:px-3 bg-gray-200 hover:bg-gray-300 dark:bg-[#272727] dark:hover:bg-[#333333] text-[0.8rem] sm:text-[0.9rem] mr-2 sm:mr-3.5 rounded border dark:border-gray-700'>Message</button>
            <button className='p-1 px-2 sm:p-1.5 py-1 sm:px-3 bg-red-600 hover:bg-red-700 text-white text-[0.8rem] sm:text-[0.9rem] rounded'>Remove</button>
        </div>    
    </div>
    </>
  )
}

export default Friend