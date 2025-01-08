import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

const FriendRequest = ({ user }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { user: currentUser, dispatch } = useContext(UserContext);
  
  function countMutualFriends(friends1, friends2) {
    return friends1.filter(friend => friends2.includes(friend)).length;
  }

  const acceptRequest = async () => {
    await axios.put(`/api/users/${user._id}/accept`, { userId: currentUser._id });
    dispatch({ type: "ACCEPT_REQUEST", payload: user._id });
  }

  const rejectRequest = async () => {
    await axios.put(`/api/users/${user._id}/reject`, { userId: currentUser._id });
    dispatch({ type: "REJECT_REQUEST", payload: user._id});
  }

  return (
    <div className="flex mb-3 items-center justify-between">
      <div className="flex gap-2 items-center">
        <img
          src={user.profilePicture ? uploads + user.profilePicture : assets + "noAvatar.png"}
          alt="userImage"
          className="block h-9 w-9 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <div>
          <p>{user.username}</p>
          <p className="text-[0.75rem] opacity-70">{countMutualFriends(currentUser.following, user.following)} mutual friends</p>
        </div>
      </div>
      <div className="flex">
        <button onClick={rejectRequest} className="p-1.5 px-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#272727] dark:hover:bg-[#333333] text-sm mr-2 rounded-md border dark:border-gray-700">
          Reject
        </button>
        <button onClick={acceptRequest} className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md">
          Accept
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
