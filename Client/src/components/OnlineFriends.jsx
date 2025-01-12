import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { OnlineUsersContext } from "../context/onlineUsersContext";

const OnlineFriends = () => {
  const { user } = useContext(UserContext);
  const { onlineUsers } = useContext(OnlineUsersContext);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await axios.get(`/api/users/following/${user._id}`);
      setFriends(res.data);
    }
    fetchFriends();
  }, [user._id]);

  useEffect(() => {
    const findOnlineFriends = () => {
      const onlineUserIds = onlineUsers.map((user) => user.userId);
      const online = friends.filter((friend) => onlineUserIds.includes(friend._id));
      setOnlineFriends(online);
    };
    findOnlineFriends();
  }, [friends, onlineUsers]);

  return (
    <>
      {onlineFriends.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-5 dark:bg-[#171717] dark:text-white">
          <div className="flex items-center gap-2">
            <p className="opacity-70">Online Friends</p>
            <div className="mt-0.5 h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
          {onlineFriends.map((friend) => {
            return <OnlineFriend friend={friend} key={friend._id} />;
          })}
        </div>
      )}
    </>
  );
};

const OnlineFriend = ({ friend }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;

  return (
    <div className="flex mt-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <img
          src={
            friend.profilePicture
              ? uploads + friend.profilePicture
              : assets + "noAvatar.png"
          }
          alt="userImage"
          className="block h-9 w-9 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <p>{friend.username}</p>
      </div>
    </div>
  );
};

export default OnlineFriends;
