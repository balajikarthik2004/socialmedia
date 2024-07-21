import React from 'react'
import Background from '../assets/background.jpg'
import Post from '../components/utilities/Post'
import posts from '../data/posts.json'
import EditIcon from '@mui/icons-material/Edit';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UserProfile = () => {
  return (
    <div className='relative overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-9 lg:col-span-6'>
        <img src={Background} alt="" className='h-[170px] sm:h-[220px] w-full object-cover block' />
        <img src="https://miro.medium.com/v2/resize:fit:2400/1*8OkdLpw_7VokmSrzwXLnbg.jpeg" alt="" className='h-[90px] sm:h-[120px] rounded-full block absolute top-[125px] sm:top-[160px] left-0 right-0 mx-auto shadow' />
        <div className='p-5 sm:px-7'>
          <div className='grid grid-cols-7 justify-between bg-white p-3 sm:p-4 rounded-lg shadow'>
            <div className='col-span-2 font-semibold text-sm sm:text-[1.1rem]'>
              <div className='sm:mb-1'>100 Friends</div>
            </div>
            <div className='col-span-3 flex flex-col items-center gap-1.5 pt-5 sm:pt-7'>
              <p className='font-semibold text-xl'>Angela Yu</p>
              {/* <button className='py-2 pl-2 pr-4 bg-blue-500 text-white hover:bg-blue-600 font-semibold rounded'><AddRoundedIcon /> Add Friend</button>  */}
              <button className='p-2 pl-3 pr-4 bg-green-500 hover:bg-green-600 text-white rounded font-semibold'><EditIcon fontSize='small'/> Edit Profile</button>
            </div>
            <div className='col-span-2 flex justify-end items-start'>
              <div className='font-semibold'><LocationOnIcon fontSize='small'/> USA</div>
            </div>
          </div>
          
          {posts.map((post) => {
            return <Post post={post} key={post.id} />
          })}
        </div>
    </div>
  )
}

export default UserProfile