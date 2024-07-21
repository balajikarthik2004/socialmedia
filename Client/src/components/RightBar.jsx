import React from 'react'
import friendRequests from '../data/friendRequests.json'
import suggestions from '../data/suggestions.json'
import FriendRequest from './utilities/FriendRequest'
import Suggestion from './utilities/Suggestion'

const RightBar = () => {
  return (
    <div className='hidden lg:block col-span-4 overflow-y-scroll scroll-smooth no-scrollbar p-5'>
        {/* friendRequests */}
        {friendRequests.length > 0 && <div className="bg-white rounded-lg shadow px-4 py-3 pb-1">
            <div className='flex items-center pb-3 gap-2'>
                <p className='text-[#00000081]'>Friend Requests</p>
                <div className='mt-0.5 h-2 w-2 bg-red-500 rounded-full'></div>
            </div>
            {friendRequests.map((request) => {
                return <FriendRequest name={request.name} url={request.url} key={request.id} />
            })}
        </div>}
        {/* suggestions */}
        <div className={`${friendRequests.length && "mt-5"} bg-white rounded-lg shadow px-4 py-3 pb-1`}>
            <p className='text-[#00000081] pb-4'>Suggestions for you</p>
            {suggestions.map((item) => {
                return <Suggestion name={item.name} url={item.url} key={item.id} />
            })}
        </div>
    </div>
  )
}

export default RightBar