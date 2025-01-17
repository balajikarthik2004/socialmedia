import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Notification from "../components/Notification";
import { v4 as uuidv4 } from "uuid";
import socket from "../socketConnection";
import FollowRequests from "../components/FollowRequests";

const Activity = () => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const markAsRead = async () => {
      const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n._id);
      if(unreadIds.length > 0) {
        await axios.put("/api/notifications/mark-as-read", { notificationIds: unreadIds });
      }
    }
    markAsRead();
  }, [notifications, user._id]);

  useEffect(() => {
    socket.on("getNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });
    return () => socket.off("getNotification");
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await axios.get(`/api/notifications/${user._id}`);
      setNotifications(res.data);
    }
    fetchNotifications();
  }, [user._id]);

  return (
    <div className="h-[100%] shadow-md bg-white dark:bg-[#101010] dark:text-white rounded-lg">
      <div className="p-4 flex justify-center items-center">
        <h4 className="font-bold text-2xl">Recent Activity</h4>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
      <div className="sm:hidden"><FollowRequests /></div>
      <div className="overflow-y-scroll scroll-smooth scrollbar-thin pl-2 h-[85%]">
        {notifications.length > 0 && notifications.map((notification) => {
          return <Notification 
            key={uuidv4()} 
            sender={notification.sender}
            content={notification.content}
            isRead={notification.isRead}
            createdAt={notification.createdAt}
           />
        })}
      </div>
    </div>
  );
};

export default Activity;
