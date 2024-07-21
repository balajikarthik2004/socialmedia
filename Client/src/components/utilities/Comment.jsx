import React from 'react'

const Comments = ({comment}) => {
  return (
    <div className='flex mt-3 items-center'>
      <div className='flex gap-2 w-[95%]'>
        <img src={comment.profilePic} alt="" className='mt-1 block h-9 w-9 rounded-full object-cover'/>
        <div>
          <p>{comment.name} <span className='text-[0.8rem] text-[#0000009d]'> ~ 1 hour ago</span></p>
          <p className='text-sm leading-tight'>{comment.comment}</p>
        </div>
      </div>
    </div>
  )
}

export default Comments