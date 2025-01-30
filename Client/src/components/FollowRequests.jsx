import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { v4 as uuidv4 } from "uuid";
import { OnlineUsersContext } from "../context/onlineUsersContext";
import socket from "../socketConnection";
import RequestSkeleton from "../components/skeletons/RequestSkeleton";
import { assets } from "../assets/assets";

const FollowRequests = () => {
  const { user } = useContext(UserContext);
  const followRequests = user.requestedBy;

  return (
    <>
      {followRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow px-4 py-3 pb-1 sm:mb-5 dark:bg-[#101010] dark:text-white">
          <div className="flex items-center pb-3 gap-2">
            <p className="opacity-70">Follow Requests</p>
            <div className="mt-0.5 h-2.5 w-2.5 bg-blue-500 rounded-full"></div>
          </div>
          {followRequests.map((requesterId) => {
            return <FollowRequest key={uuidv4()} requesterId={requesterId} />;
          })}
        </div>
      )}
    </>
  );
};

const FollowRequest = ({ requesterId }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user: currentUser, dispatch } = useContext(UserContext);
  const [requester, setRequester] = useState(null);
  const [mutualFriends, setMutualFriends] = useState(0);
  const { onlineUsers } = useContext(OnlineUsersContext);

  useEffect(() => {
    const countMutualFriends = (friends1, friends2) => {
      return friends1.filter((friend) => friends2.includes(friend)).length;
    }
    const fetchRequester = async () => {
      const res = await axios.get(`${API_URL}/api/users/${requesterId}`);
      setRequester(res.data);
      setMutualFriends(countMutualFriends(currentUser.following, res.data.following));
    }
    fetchRequester();
  }, [requesterId]);

  const acceptRequest = async () => {
    await axios.put(`${API_URL}/api/users/${requesterId}/acceptRequest`, {
      userId: currentUser._id,
    });
    dispatch({ type: "ACCEPT_REQUEST", payload: requesterId });
    if(onlineUsers.some((user) => user.userId === requesterId)) {
      socket.emit("acceptRequest", {
        targetUserId: requesterId,
        sourceUserId: currentUser._id
      });
      // send notificaton to reciever that his request has been accepted
      const notification = {
        userId: requesterId,
        senderId: currentUser._id,
        content: "has accepted your follow request.",
        sender: {
          username: currentUser.username,
          profilePicture: currentUser.profilePicture
        }
      };
      await axios.post(`${API_URL}/api/notifications`, notification);
      socket.emit("sendNotification", {
        recieverId: requesterId,
        notification: notification
      });
      // Send notification to the current user
      const notificationToCurrentUser = {
        userId: currentUser._id,
        senderId: requesterId,
        content: "has started following you.",
        sender: {
          username: requester.username,
          profilePicture: requester.profilePicture
        }
      };
      await axios.post(`${API_URL}/api/notifications`, notificationToCurrentUser);
      socket.emit("sendNotification", {
        recieverId: currentUser._id,
        notification: notificationToCurrentUser,
      });
    }
  };

  const rejectRequest = async () => {
    await axios.put(`${API_URL}/api/users/${requesterId}/rejectRequest`, {
      userId: currentUser._id,
    });
    dispatch({ type: "REJECT_REQUEST", payload: requesterId });
    if(onlineUsers.some((user) => user.userId === requesterId)) {
      socket.emit("rejectRequest", {
        targetUserId: requesterId,
        sourceUserId: currentUser._id
      });
    }
  };

  if (!requester) return <RequestSkeleton />;

  return (
    <div className="flex mb-3 items-center justify-between">
      <div className="flex gap-2 items-center">
        <img
          src={requester.profilePicture ? `${API_URL}/uploads/${requester.profilePicture}` : assets.noAvatar}
          alt="userImage"
          className="block h-9 w-9 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <div>
          <p>{requester.username}</p>
          {mutualFriends > 0 && <p className="text-[0.75rem] opacity-70">
            {mutualFriends} mutual friends
          </p>}
        </div>
      </div>
      <div className="flex">
        <button
          onClick={rejectRequest}
          className="p-1.5 px-2 transition-colors duration-200 bg-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm mr-2 rounded-md"
        >
          Reject
        </button>
        <button
          onClick={acceptRequest}
          className="p-1.5 transition-colors duration-200 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default FollowRequests;
