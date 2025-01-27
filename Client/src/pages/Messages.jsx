import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import {
  KeyboardBackspace as BackIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import socket from "../socketConnection";
import { v4 as uuidv4 } from "uuid";
import { OnlineUsersContext } from "../context/onlineUsersContext";

const Messages = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const navigate = useNavigate();
  const { chatId, senderId } = useParams();
  const { user } = useContext(UserContext);
  const [sender, setSender] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messageText = useRef();
  const [activeUsers, setactiveUsers] = useState([]);
  const scrollRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const { onlineUsers } = useContext(OnlineUsersContext);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    socket.emit("joinChatPage", { userId: user._id, chatId });
    socket.on("activeUsersInChat", (users) => {
      setactiveUsers(users);
    });
    return () => {
      socket.emit("leaveChatPage", { userId: user._id, chatId });
      socket.off("activeUsersInChat");
    };
  }, [chatId, user._id]);

  useEffect(() => {
    const fetchData = async () => {
      // fetch sender details
      const senderResponse = await axios.get(`/api/users/${senderId}`);
      setSender(senderResponse.data);
      setBlocked(senderResponse.data.blockedUsers.includes(user._id) || user.blockedUsers.includes(senderId));
      // fetch messages
      const messagesResponse = await axios.get(`/api/messages/${chatId}`);
      setMessages(messagesResponse.data);
      setIsLoading(false);
    }
    
    fetchData();
  }, [chatId, senderId]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      const unreadMessages = messages.filter(
        (message) => message.senderId === senderId && !message.isRead
      );
      if (unreadMessages.length > 0) {
        const messageIds = unreadMessages.map((message) => message._id);
        try {
          await axios.post(`/api/messages/mark-as-read`, { messageIds, chatId })
          setMessages((prev) => prev.map((msg) => messageIds.includes(msg._id) ? { ...msg, isRead: true } : msg));
        } catch (error) {
          console.log("Failed to mark messages as read");
        }
      }
    }
    if(messages?.length > 0) {
      markMessagesAsRead();
      socket.emit("refetchUnreadChats", {userId: user._id});
    }
  }, [messages, senderId, chatId]);

  useEffect(() => {
    socket.on("getMessage", ({ senderId, content }) => {
      const newMessage = { senderId, content, createdAt: Date.now() };
      setMessages((prev) => [...prev, newMessage]); // Update messages directly
    });
    return () => {socket.off("getMessage")};
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    const newMessage = {
      chatId: chatId,
      senderId: user._id,
      content: messageText.current.value,
      isRead: activeUsers.includes(senderId)
    };
    try {
      await axios.post(`/api/messages`, newMessage);
      if(onlineUsers.some((user) => user.userId === senderId) ||
        activeUsers.includes(senderId)){
        console.log("message sent on other side")

        socket.emit("sendMessage", { 
          senderId: user._id,
          recieverId: senderId, // senderId is other user's id
          content: messageText.current.value
        })
      } 
      messageText.current.value = "";
      setIsSending(false);
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100%] flex flex-col justify-between shadow-md bg-white dark:bg-[#101010] dark:text-white rounded-lg">
      {isLoading 
        ? <div className="p-2 py-3 flex gap-4 items-center">
            <BackIcon onClick={() => { navigate(-1) }} className="hover:opacity-70" sx={{ fontSize: 30 }} />
            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-[#252525] animate-pulse" />
            <div className="flex-1"><div className="h-5 w-32 bg-gray-300 dark:bg-[#252525] rounded animate-pulse" /></div>
          </div>
        : <div className="p-2 py-3 flex gap-4 items-center">
            <BackIcon onClick={() => { navigate(-1) }} className="hover:opacity-70" sx={{ fontSize: 30 }} />
            <img src={ sender.profilePicture ? uploads + sender.profilePicture : assets + "noAvatar.png"} className="block h-10 w-10 rounded-full object-cover" alt="sender image" crossOrigin="anonymous" />
            <div className="flex gap-2 items-center">
              <h4 className="font-medium text-xl">{sender.username}</h4>
              {onlineUsers.some((user) => user.userId === sender._id) && <div className="mt-0.5 h-2.5 w-2.5 bg-green-500 rounded-full"></div>}
            </div>
          </div>}

      <hr className="border border-black dark:border-white opacity-15" />

      <div className="h-full py-2 overflow-y-scroll scroll-smooth scrollbar-thin pl-2">
        {isLoading 
          ? <div className="text-center"><CircularProgress color="inherit" /></div>
          : messages.map((message) => (
              <div key={uuidv4()} ref={scrollRef}>
                <Message senderId={message.senderId} content={message.content} />
              </div>
            ))}
      </div>
      <hr className="border border-black dark:border-white opacity-15" />

      <div className="p-3">
        {blocked ? <div className="text-center py-2 opacity-80 font-medium">You cannot send messages to this user </div> : <form
          onSubmit={handleSubmit}
          className="flex gap-3 justify-between items-center"
        >
          <input
            type="text"
            placeholder="Send Message"
            className="block w-full border border-gray-300 bg-transparent outline-none shadow rounded p-2 dark:border-opacity-20"
            ref={messageText}
          />
          <button
            type="submit"
            className="flex justify-center items-center p-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isSending ? (
              <CircularProgress
                className="text-center"
                size={24}
                color="inherit"
              />
            ) : (
              <SendIcon sx={{ fontSize: 28 }} />
            )}
          </button>
        </form>}
      </div>
    </div>
  );
};

const Message = ({ senderId, content }) => {
  const { user } = useContext(UserContext);

  return (
    <div
      className={`pt-2 pb-1 px-1 flex ${
        senderId === user._id ? "justify-end" : "justify-start"
      }`}
    >
      <p
        className={`p-2 max-w-[60%] break-all rounded-lg ${
          senderId === user._id
            ? "rounded-tr-none bg-gray-200 dark:bg-[#202020] dark:text-white"
            : "rounded-tl-none bg-blue-600 text-white"
        }`}
      >
        {content}
      </p>
    </div>
  );
};

export default Messages;
