import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { format } from "timeago.js";
import CircleIcon from '@mui/icons-material/Circle';
import socket from "../socketConnection";

const Chats = () => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const fetchChats = async () => {
    const res = await axios.get(`/api/chats/${user._id}`);
    setChats(res.data);
  };
  useEffect(() => {

    fetchChats();
  }, [user._id]);

  useEffect(() => {
    socket.on("getMessage", () => {
      fetchChats();
    })
  })

  return (
    <div className="h-[100%] shadow-md bg-white dark:bg-[#171717] dark:text-white rounded-lg">
      <div className="p-4 flex justify-center items-center">
        <h4 className="font-bold text-2xl">Chats</h4>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
      <div className="overflow-y-scroll scroll-smooth scrollbar-thin pl-2">
        {chats.length > 0 &&
          chats.map((chat) => {
            return <ChatItem key={chat._id} chat={chat} />;
          })}
      </div>
    </div>
  );
};

const ChatItem = ({ chat }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${chat.senderId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [chat.senderId]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Link
          to={`/messages/${chat._id}/${chat.senderId}`}
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
          <div>
            <p className="text-lg">{user.username}</p>
            {chat.lastMessage ? (
              <p className="opacity-50 text-sm">{chat.lastMessage.content} <CircleIcon sx={{fontSize: 5}}/> {format(chat.lastMessage.createdAt)}</p>
            ) : (
              <p className="opacity-50">No messages yet</p>
            )}
          </div>
        </Link>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
    </>
  );
};

export default Chats;
