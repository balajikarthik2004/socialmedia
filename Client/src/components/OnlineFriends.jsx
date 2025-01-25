import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { OnlineUsersContext } from "../context/onlineUsersContext";
import OnlineFriendsSkeleton from "./skeletons/OnlineFriendsSkeleton";

const OnlineFriends = () => {
  const { user } = useContext(UserContext);
  const { onlineUsers } = useContext(OnlineUsersContext);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      const res = await axios.get(`/api/users/following/${user._id}`);
      const friends = res.data;
      const onlineUserIds = onlineUsers.map((user) => user.userId);
      setOnlineFriends(friends.filter((friend) => onlineUserIds.includes(friend._id) &&
      !user.blockedUsers.includes(friend._id) && !friend.blockedUsers.includes(user._id)));
      setIsLoading(false);
    }
    fetchFriends();
  }, [user, onlineUsers]);

  if (isLoading) return <OnlineFriendsSkeleton />

  return (
    <>
      {onlineFriends.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4 mb-5 dark:bg-[#101010] dark:text-white">
          <div className="flex items-center gap-2">
            <p className="opacity-70">Online Friends</p>
            <div className="mt-0.5 h-2.5 w-2.5 bg-green-500 rounded-full"></div>
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
