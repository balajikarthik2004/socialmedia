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
      console.log("Fetching chats");
      fetchChats();
    })
    return () => {socket.off("getMessage")}
  }, [])

  return (
    <div className="h-[100%] shadow-md bg-white dark:bg-[#101010] dark:text-white rounded-lg">
      <div className="p-4 flex justify-center items-center">
        <h4 className="font-bold text-2xl">Chats</h4>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
      <div className="overflow-hidden overflow-y-scroll scroll-smooth scrollbar-thin pl-2 h-[85%]">
        {chats.length > 0 &&
          chats.map((chat) => {
            return <ChatItem key={chat._id} chat={chat} sender={chat.sender} />;
          })}
      </div>
    </div>
  );
};

const ChatItem = ({ chat, sender }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const {user: currentUser} = useContext(UserContext);

  return (
    <>
      <Link to={`/messages/${chat._id}/${sender._id}`}
       className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#202020] px-4 py-3">
        <div
          className="flex gap-4 items-center w-full"
        >
          <img
            src={
              sender.profilePicture
                ? uploads + sender.profilePicture
                : assets + "noAvatar.png"
            }
            className="block h-12 w-12 rounded-full object-cover"
            alt="sender image"
            crossOrigin="anonymous"
          />
          <div>
            <p className="text-lg">{sender.username}</p>
            {chat.lastMessage ? (
              <p className="opacity-60 text-sm">{chat.lastMessage.content} <CircleIcon sx={{fontSize: 4}}/> {format(chat.lastMessage.createdAt)}</p>
            ) : (
              <p className="opacity-60">No messages yet</p>
            )}
          </div>
        </div>
        {chat.unreadMessagesCount > 0 && chat.lastMessage.senderId !== currentUser._id && (
          <div className="h-6 w-6 flex items-center justify-center text-center rounded-full bg-blue-500 text-white text-sm font-semibold shadow-md">
            {chat.unreadMessagesCount}
          </div>
        )}
      </Link>
      <hr className="border border-black dark:border-white opacity-15" />
    </>
  );
};

export default Chats;
