import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Chats = () => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await axios.get(`/api/chats/${user._id}`);
      setChats(res.data);
    };
    fetchChats();
  }, [user._id]);

  return (
    <div className="h-[100%] shadow-md bg-white dark:bg-[#171717] dark:text-white rounded-lg">
      <div className="p-4 flex justify-center items-center">
        <h4 className="font-bold text-2xl">Chats</h4>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
      <div className="overflow-y-scroll scroll-smooth scrollbar-thin pl-2">
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <ChatItem
                key={chat._id}
                chatId={chat._id}
                senderId={chat.senderId}
              />
            );
          })}
      </div>
    </div>
  );
};

const ChatItem = ({ chatId, senderId }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${senderId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [senderId]);

  return (
    <>
    <div className="flex items-center justify-between">
      <Link
        to={`/messages/${chatId}/${senderId}`}
        className="px-4 py-3 flex gap-4 items-center w-full hover:bg-[#eeeeee] dark:hover:bg-[#202020]"
      >
        <img
          src={
            user.profilePicture
            ? uploads + user.profilePicture
            : assets + "noAvatar.png"
          }
          className="block h-12 w-12 rounded-full object-cover"
          alt="user image"
          crossOrigin="anonymous"
        />
        <p className="text-lg">{user.username}</p>
      </Link>
    </div>
    <hr className="border border-black dark:border-white opacity-15" />
    </>
  );
};

export default Chats;
