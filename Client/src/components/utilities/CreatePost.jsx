import React from 'react'
import userImage from '../../assets/user.png'
import Image from '../../assets/image.png'
import Video from '../../assets/video.png'

const CreatePost = () => {
  return (
    <div className='bg-white px-3 sm:px-4 py-2 rounded-lg shadow dark:bg-[#171717] dark:text-white'>
        <div className='flex gap-4 items-center'>
            <img src={userImage} alt="userImage" className='h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover outline-0 shadow'/>
            <input type="text" placeholder={`What's on your mind?`} className='bg-transparent p-2 pl-0 flex-grow outline-none sm:text-lg'/>
        </div>
        <hr className='mt-2 mb-3 dark:opacity-30' />
        <div className='flex justify-between'>
            <div className='flex gap-3'>
                <div className='flex items-center gap-2 rounded-md hover:bg-[#f3f3f3] dark:hover:bg-[#222222] py-1 px-2'>
                    <img src={Image} alt="images" className='h-7 w-7'/>
                    <p className='opacity-70 font-semibold text-sm'>Images</p>
                </div>
                <div className='flex items-center gap-2  rounded-md hover:bg-[#f3f3f3] dark:hover:bg-[#222222] py-1 px-2'>
                    <img src={Video} alt="videos" className='h-7 w-7'/>
                    <p className='opacity-70 font-semibold text-sm'>Videos</p>
                </div>
            </div>
            <div>
                <button className='py-1.5 px-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm'>Share</button>
            </div>
        </div>
        
    </div>
  )
}

export default CreatePost