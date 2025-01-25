import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import socket from "../socketConnection";
import { OnlineUsersContext } from "../context/onlineUsersContext";
import SuggestionsSkeleton from "./skeletons/SuggestionsSkeleton";

const Suggestions = () => {
  const { user } = useContext(UserContext);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      const res = await axios.get(`/api/users/suggestions/${user._id}`);
      setSuggestions(res.data);
      setIsLoading(false);
    };
    fetchSuggestions();
  }, [user._id]);

  if (isLoading) return <SuggestionsSkeleton />

  return (
    <>
      {suggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 pb-5 mb-5 dark:bg-[#101010] dark:text-white">
          <p className="opacity-70">Suggestions for you</p>
          {suggestions.map((user) => {
            return <Suggestion key={user._id} user={user} />;
          })}
        </div>
      )}
    </>
  );
};

const Suggestion = ({ user }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
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
      await axios.put(`/api/users/${user._id}/follow`, {
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
        await axios.post("/api/notifications", notification);
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
        await axios.post("/api/notifications", notification);
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
      await axios.put(`/api/users/${user._id}/unfollow`, {
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
    <div className="flex mt-4 items-center justify-between">
      <div className="flex gap-2 items-center">
        <img
          src={
            user.profilePicture
              ? uploads + user.profilePicture
              : assets + "noAvatar.png"
          }
          alt="userImage"
          className="block h-9 w-9 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <div>
          <p>{user.username}</p>
          {user.mutualFriends > 0 && <p className="opacity-70 text-[0.75rem]">
            {user.mutualFriends} mutual Friends
          </p>}
        </div>
      </div>
      <button
        onClick={handleFollowStatus}
        className={`p-1.5 w-[100px] font-semibold transition-colors duration-200 ${
          followStatus === "Follow"
            ? "bg-blue-600 hover:bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-[#202020] hover:bg-gray-300 hover:dark:bg-[#252525]"
        } rounded-md`}
      >
        {followStatus}
      </button>
    </div>
  );
};

export default Suggestions;
