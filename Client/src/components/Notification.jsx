import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

const Notification = ({ senderId, content, isRead, createdAt }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const [sender, setSender] = useState({});

  useEffect(() => {
    const fetchSender = async () => {
      const res = await axios.get(`/api/users/${senderId}`);
      setSender(res.data);
    };
    fetchSender();
  }, [senderId]);

  return (
    <>
      <div className="flex items-center justify-between hover:bg-[#eeeeee] dark:hover:bg-[#202020] px-2 py-3">
        <div className="flex gap-4 items-center w-full">
          <img
            src={
              sender.profilePicture
                ? uploads + sender.profilePicture
                : assets + "noAvatar.png"
            }
            className="block h-9 w-9 rounded-full object-cover"
            alt="sender image"
            crossOrigin="anonymous"
          />

          <p className="text-sm md:text-base">
            <span className="font-semibold">{sender.username} </span>
            {content}
          </p>
        </div>

        <div className="flex w-[25%] gap-2 items-center justify-end">
          <p className="text-xs opacity-70">{format(createdAt)}</p>
          {!isRead && <p className="h-2.5 w-2.5 rounded-full bg-blue-500"></p>}
        </div>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
    </>
  );
};

export default Notification;
