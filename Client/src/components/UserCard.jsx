import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import socket from "../socketConnection";
import { OnlineUsersContext } from "../context/onlineUsersContext";
import { assets } from "../assets/assets";

const UserCard = ({ user, closeModal }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user: currentUser, dispatch } = useContext(UserContext);
  const { onlineUsers } = useContext(OnlineUsersContext);
  const [followStatus, setFollowStatus] = useState(() =>
    currentUser.requestedTo.includes(user._id)
      ? "Requested"
      : currentUser.following.includes(user._id)
      ? "Unfollow"
      : "Follow"
  );

  const handleFollowStatus = async () => {
    if (currentUser.requestedTo.includes(user._id)) return;
    if (!currentUser.following.includes(user._id)) {
      await axios.put(`${API_URL}/api/users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      dispatch({
        type: user.isPrivate ? "SEND_REQUEST" : "FOLLOW",
        payload: user._id,
      });

      if(user.isPrivate) {
        const notification = {
          userId: user._id,
          senderId: currentUser._id,
          content: "has requested to follow you.",
          sender: {
            username: currentUser.username,
            profilePicture: currentUser.profilePicture
          }
        };
        await axios.post(`${API_URL}/api/notifications`, notification);
        if (onlineUsers.some((onlineUser) => onlineUser.userId === user._id)) {
          socket.emit("sendRequest", {
            targetUserId: user._id,
            sourceUserId: currentUser._id,
          });
          socket.emit("sendNotification", {
            recieverId: user._id,
            notification: notification
          });
        }
        setFollowStatus("Requested");
      } else {
        const notification = {
          userId: user._id, 
          senderId: currentUser._id,
          content: "has started following you.",
          sender: {
            username: currentUser.username,
            profilePicture: currentUser.profilePicture
          }
        }
        await axios.post(`${API_URL}/api/notifications`, notification);
        if (onlineUsers.some((onlineUser) => onlineUser.userId === user._id)) {
          socket.emit("follow", {
            targetUserId: user._id,
            sourceUserId: currentUser._id,
          });
          socket.emit("sendNotification", {
            recieverId: user._id,
            notification: notification
          });
        }
        setFollowStatus("Unfollow");
      }

    } else {
      await axios.put(`${API_URL}/api/users/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
      if (onlineUsers.some((user) => user.userId === user._id)) {
        socket.emit("unfollow", {
          targetUserId: user._id,
          sourceUserId: currentUser._id,
        });
      }
      setFollowStatus("Follow");
    }
  };

  return (
    <div className="flex mb-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <Link onClick={closeModal} to={`/userProfile/${user._id}`}>
          <img
            src={user.profilePicture ? `${API_URL}/uploads/${user.profilePicture}` : assets.noAvatar}
            className="block h-10 w-10 rounded-full object-cover"
            alt="user image"
            crossOrigin="anonymous"
          />
        </Link>

        <p className="font-medium">{user.username}</p>
      </div>
      {currentUser._id !== user._id && (
        <button
          onClick={handleFollowStatus}
          className={`p-2 w-[100px] font-semibold transition-colors duration-200 ${followStatus === "Follow" ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-gray-200 dark:bg-[#202020] hover:bg-gray-300 hover:dark:bg-[#252525]"} rounded-md`}
        >
          {followStatus}
        </button>
      )}
    </div>
  );
};

export default UserCard;
