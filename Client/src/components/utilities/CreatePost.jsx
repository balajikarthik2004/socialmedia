import React from 'react'
import userImage from '../../assets/user.png'
import Image from '../../assets/image.png'
import Video from '../../assets/video.png'
import Feeling from '../../assets/happy-face.png'

const CreatePost = () => {
  return (
    <div className='bg-white px-3 sm:px-4 py-2 rounded-lg shadow'>
        <div className='flex gap-4 items-center'>
            <img src={userImage} alt="userImage" className='h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover outline-0 shadow'/>
            <input type="text" placeholder={`What's on your mind?`} className='p-2 pl-0 flex-grow outline-none sm:text-lg'/>
        </div>
        <hr className='mt-2 mb-3' />
        <div className='flex justify-between'>
            <div className='flex gap-2 sm:gap-3'>
                <div className='flex items-center gap-1 sm:gap-2 rounded-md hover:bg-[#f3f3f3] sm:py-1 sm:px-2'>
                    <img src={Image} alt="images" className='h-7 w-7'/>
                    <p className='text-[#00000081] font-semibold text-sm sm:text-md'>Images</p>
                </div>
                <div className='flex items-center gap-1 sm:gap-2  rounded-md hover:bg-[#f3f3f3] sm:py-1 sm:px-2 mr-0.5 sm:mr-1'>
                    <img src={Video} alt="videos" className='h-7 w-7'/>
                    <p className='text-[#00000081] font-semibold text-sm'>Videos</p>
                </div>
                <div className='flex items-center gap-1 sm:gap-2.5 rounded-md hover:bg-[#f3f3f3] sm:py-1 sm:px-2'>
                    <img src={Feeling} alt="feeling" className='h-5 w-5 sm:h-6 sm:w-6'/>
                    <p className='text-[#00000081] font-semibold text-sm'>Feeling</p>
                </div>
            </div>
            <div>
                <button className='py-1.5 px-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm'>Share</button>
            </div>
        </div>
        
    </div>
  )
}

export default CreatePost