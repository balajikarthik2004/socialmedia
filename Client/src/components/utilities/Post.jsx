import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';

const Post = () => {
  return (
    <div className='bg-white mt-5 p-3 sm:p-4 rounded-xl shadow'>
        <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
                <img src="https://miro.medium.com/v2/resize:fit:2400/1*8OkdLpw_7VokmSrzwXLnbg.jpeg" alt="" className='block h-9 w-9 sm:h-10 sm:w-10 rounded-full' />
                <div>
                    <p>Angela Yu</p>
                    <p className='text-[0.7rem] text-[#00000081]'>a few minutes ago</p>
                </div>
            </div>
            <MoreHorizIcon />
        </div>

        <div className='py-3'>
            <img src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?cs=srgb&dl=pexels-nout-gons-80280-378570.jpg&fm=jpg" alt="" className='block w-full object-cover rounded-lg'/>
        </div>

        <div>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum animi et quasi!</p>
            <div className='flex justify-start gap-4 pt-2'>
                <LikeIcon />
                <CommentIcon />
                <ShareIcon />
            </div>
        </div>
    </div>
  )
}

export default Post