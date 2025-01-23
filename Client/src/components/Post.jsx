import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MoreHoriz as MoreIcon,
  FavoriteBorderOutlined as NotLikeIcon,
  Favorite as LikeIcon,
  SmsOutlined as CommentIcon,
  Share as ShareIcon,
  BookmarkBorderOutlined as NotSaveIcon,
  Bookmark as SaveIcon,
} from "@mui/icons-material";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { format } from "timeago.js";
import CommentsModal from "./CommentsModal";
import { OnlineUsersContext } from "../context/onlineUsersContext";
import socket from "../socketConnection";
import { toast } from "react-toastify";

const Post = ({ post, deletePost }) => {
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;

  const { user: currentUser } = useContext(UserContext);
  const { onlineUsers } = useContext(OnlineUsersContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
  const [isSaved, setIsSaved] = useState(post.saves.includes(currentUser._id));
  const [blocked, setBlocked] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${post.userId}`);
      setUser(res.data);
      setBlocked(
        res.data.blockedUsers.includes(currentUser._id) ||
          currentUser.blockedUsers.includes(post.userId)
      );
    };
    fetchUser();
  }, [post.userId]);

  // handle like action
  const handleLike = async () => {
    await axios.put(`/api/posts/${post._id}/like`, { userId: currentUser._id });
    setLikes(isLiked ? likes - 1 : likes + 1);
    if (!isLiked && currentUser._id !== user._id) {
      const notification = {
        userId: user._id,
        senderId: currentUser._id,
        content: `has liked your post.`,
        sender: {
          username: currentUser.username,
          profilePicture: currentUser.profilePicture,
        },
      };
      await axios.post(`/api/notifications`, notification);
      if (onlineUsers.some((user) => user.userId === post.userId)) {
        socket.emit("sendNotification", {
          recieverId: post.userId,
          notification: notification,
        });
      }
    }
    setIsLiked(!isLiked);
  };

  // handle save action
  const handleSave = async () => {
    await axios.put(`/api/posts/${post._id}/save`, { userId: currentUser._id });
    setIsSaved(!isSaved);
  };

  return (
    <>
      {!blocked && (
        <div className="bg-white mb-5 p-3 sm:p-4 rounded-lg shadow dark:bg-[#101010] dark:text-white">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/userProfile/${user._id}`}>
                <img
                  src={
                    user.profilePicture
                      ? uploads + user.profilePicture
                      : assets + "noAvatar.png"
                  }
                  alt=""
                  className="block h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
              </Link>
              <div>
                <p>{user.username}</p>
                <p className="text-[0.7rem] opacity-70">
                  posted {format(post.createdAt)}
                </p>
              </div>
            </div>
            <div className="relative">
              <MoreIcon
                className="hover:opacity-70 cursor-pointer align-top"
                onClick={() => {
                  if (post.userId === currentUser._id) setMenuOpen(!menuOpen);
                }}
              />
              {menuOpen && (
                <button
                  className="absolute top-5 right-0 bg-gray-200 dark:bg-[#202020] dark:text-white p-1 px-2 text-center text-sm rounded"
                  onClick={()=>{deletePost(post._id)}}>
                  Delete
                </button>
              )}
            </div>
          </div>

          {post.img && (
            <div className="pt-3">
              <img
                src={uploads + post.img}
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
                  src={uploads + post.video}
                  className="block w-full rounded"
                  crossOrigin="anonymous"
                  controls
                />
              </div>
            </div>
          )}

          {post.desc && (
            <p className="text-sm mt-2 p-1 leading-tight">{post.desc}</p>
          )}

          <div className="flex justify-between pt-3">
            <div className="flex justify-start gap-5">
              <div
                className="flex gap-1.5 items-center hover:opacity-70"
                onClick={handleLike}
              >
                {isLiked ? (
                  <LikeIcon className="text-red-500" />
                ) : (
                  <NotLikeIcon />
                )}
                <p className="text-sm">{likes}</p>
              </div>
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="flex gap-2 items-center hover:opacity-70"
              >
                <CommentIcon className="mt-0.5" />
                <p className="text-sm">{commentCount}</p>
              </div>
              <div className="flex items-center hover:opacity-70">
                <ShareIcon fontSize="small" />
              </div>
            </div>
            <div
              className="mt-0.5 flex items-center hover:opacity-70"
              onClick={handleSave}
            >
              {isSaved ? <SaveIcon /> : <NotSaveIcon />}
            </div>
          </div>
          <CommentsModal
            isModalOpen={isModalOpen}
            closeModal={() => {
              setIsModalOpen(false);
            }}
            post={post}
            increaseCount={() => {
              setCommentCount(commentCount + 1);
            }}
            decreaseCount={() => {
              setCommentCount(commentCount - 1);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Post;
