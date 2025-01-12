import React, { useContext, useEffect, useState } from "react";
import suggestions from "../data/suggestions.json";
import FriendRequest from "./FriendRequest";
import Suggestion from "./Suggestion";
import { UserContext } from "../context/userContext";
import axios from "axios";
import OnlineFriend from "./OnlineFriend";
import socket from "../socketConnection";

const RightBar = () => {
  const { user } = useContext(UserContext);
  const [followRequests, setFollowRequests] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchFollowRequests = async () => {
      const res = await axios.get(`/api/users/followRequests/${user._id}`);
      setFollowRequests(res.data);
    };
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });
    fetchFollowRequests();
  }, [user._id]);

  return (
    <div className="hidden lg:block col-span-4 overflow-y-scroll scroll-smooth no-scrollbar p-5 pl-2">
      {/* followRequests */}
      {followRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow px-4 py-3 pb-1 mb-5 dark:bg-[#171717] dark:text-white">
          <div className="flex items-center pb-3 gap-2">
            <p className="opacity-70">Friend Requests</p>
            <div className="mt-0.5 h-2 w-2 bg-red-500 rounded-full"></div>
          </div>
          {followRequests.map((user) => {
            return <FriendRequest key={user._id} user={user} />;
          })}
        </div>
      )}
      {/* onlineUsers */}
      {onlineUsers.length > 0 && (
        <div className="bg-white rounded-lg shadow px-4 py-3 pb-1 mb-5 dark:bg-[#171717] dark:text-white">
          <div className="flex items-center pb-4 gap-2">
            <p className="opacity-70">Active Users</p>
            <div className="mt-0.5 h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
          {onlineUsers
            .filter((onlineUser) => user.following.includes(onlineUser.userId))
            .map((friend) => {
              return (
                <OnlineFriend userId={friend.userId} key={friend.userId} />
              );
            })}
        </div>
      )}
      {/* suggestions */}
      {suggestions.length && (
        <div className="bg-white rounded-lg shadow px-4 py-3 pb-1 mb-5 dark:bg-[#171717] dark:text-white">
          <p className="opacity-70 pb-4">Suggestions for you</p>
          {suggestions.map((item) => {
            return <Suggestion name={item.name} url={item.url} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RightBar;
