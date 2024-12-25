import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Comment from './Comment';
import comments from '../../data/comments.json';
import currentUser from '../../assets/user.png';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const Post = ({post}) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false); 
  const [saved, setSaved] = useState(false); 
  const [openComments, setOpenComments] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]);

  const handleLike = () => {
    setLikes(isLiked ? likes-1 : likes+1);
    setIsLiked(!isLiked);
  }

  return (
    <div className='bg-white mt-5 p-3 sm:p-4 rounded-lg shadow dark:bg-[#171717] dark:text-white'>
        <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
                <Link to={`/userProfile/${user._id}`}>
                  <img src={user.profilePicture} alt="" className='block h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover' />
                </Link>
                <div>
                    <p>{user.username}</p>
                    <p className='text-[0.7rem] opacity-70'>created on: {post.createdAt.split('T')[0]}</p>
                </div>
            </div>
            <MoreHorizIcon />
        </div>

        {post.img && <div className='pt-3'>
            <img src={post.img} alt="" className='block w-full object-cover rounded'/>
        </div>}

        <p className='text-sm pt-2 leading-tight'>{post.desc}</p>

        <div className='flex justify-between pt-2.5'>
            <div className='flex justify-start gap-5'>
                <div className='flex gap-1.5 items-center' onClick={handleLike}>
                    {isLiked ? <FavoriteIcon className='text-red-500' /> : <FavoriteBorderIcon />} 
                    <p className='text-sm'>{likes}</p>
                </div>
                {/* <div className='flex gap-2 items-center'>
                    <CommentIcon className='mt-0.5' onClick={()=>{setOpenComments(!openComments)}} />
                    <p className='text-sm'>{post.comments}</p>
                </div> */}
                <div className='flex items-center'><ShareIcon fontSize='small'/></div>
            </div>
            <div className='mt-0.5 flex items-center' onClick={()=>{setSaved(!saved)}}>
                {saved ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
            </div>
        </div>
        
        {openComments && <div>
            <div className='mt-3 flex gap-3 justify-between items-center'>
                <img src={currentUser} alt="" className='block h-9 w-9 rounded-full object-cover shadow'/>
                <input type="text" placeholder='Write a comment' className='block w-full border border-gray-300 bg-transparent outline-none rounded p-2 text-sm dark:border-opacity-40' />
                <div className='pb-2 pt-1 pr-1.5 pl-2 rounded bg-blue-600 hover:bg-blue-700 text-white'><SendIcon /></div>
            </div>
            {comments.map((comment) => {
                return <Comment comment={comment} />
            })}
        </div>}
    </div>
  )
}

export default Post