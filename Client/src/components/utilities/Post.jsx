import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MoreHoriz as MoreIcon,
  FavoriteBorderOutlined as NotLikeIcon,
  Favorite as LikeIcon,
  SmsOutlined as CommentIcon,
  Share as ShareIcon,
  BookmarkBorderOutlined as NotSaveIcon,
  Bookmark as SaveIcon,
} from "@mui/icons-material";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const Post = ({ post }) => {
  const uploadsFolder = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;

  const { user: currentUser } = useContext(UserContext);

  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
  const [isSaved, setIsSaved] = useState(post.saves.includes(currentUser._id));
  const [user, setUser] = useState({});

  // fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  // handle like action
  const handleLike = async () => {
    await axios.put(`/api/posts/${post._id}/like`, { userId: currentUser._id });
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  // handle save action
  const handleSave = async () => {
    await axios.put(`/api/posts/${post._id}/save`, { userId: currentUser._id });
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white mt-5 p-3 sm:p-4 rounded-lg shadow dark:bg-[#171717] dark:text-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <NavLink to={`/userProfile/${user._id}`}>
            <img
              src={user.profilePicture || assets + "noAvatar.png"}
              alt=""
              className="block h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
            />
          </NavLink>
          <div>
            <p>{user.username}</p>
            <p className="text-[0.7rem] opacity-70">
              created on: {post.createdAt?.split("T")[0]}
            </p>
          </div>
        </div>
        <MoreIcon />
      </div>

      {post.img && (
        <div className="pt-3">
          <img
            src={uploadsFolder + post.img}
            alt=""
            className="block w-full object-cover rounded"
            crossOrigin="anonymous"
          />
        </div>
      )}

      {post.video && (
        <div>
          <div className="pt-3">
            <video
              src={uploadsFolder + post.video}
              className="block w-full rounded"
              crossOrigin="anonymous"
              controls
            />
          </div>
        </div>
      )}

      <p className="text-sm pt-2 leading-tight">{post.desc}</p>

      <div className="flex justify-between pt-2.5">
        <div className="flex justify-start gap-5">
          <div className="flex gap-1.5 items-center hover:opacity-70" onClick={handleLike}>
            {isLiked ? <LikeIcon className="text-red-500" /> : <NotLikeIcon />}
            <p className="text-sm">{likes}</p>
          </div>
          <NavLink
            to={`/post/${post._id}/comments`}
            className="flex gap-2 items-center hover:opacity-70"
          >
            <CommentIcon className="mt-0.5" />
            <p className="text-sm">{post.commentCount}</p>
          </NavLink>
          <div className="flex items-center hover:opacity-70">
            <ShareIcon fontSize="small" />
          </div>
        </div>
        <div className="mt-0.5 flex items-center hover:opacity-70" onClick={handleSave}>
          {isSaved ? <SaveIcon /> : <NotSaveIcon />}
        </div>
      </div>
    </div>
  );
};

export default Post;
