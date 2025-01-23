import React, { useContext, useEffect, useState } from "react";
import {
  GridViewOutlined,
  CloseOutlined,
  DarkMode,
  LightMode,
  SearchOutlined,
  EmailOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { UserContext } from "../context/userContext";
import { SidebarContext } from "../context/sideBarContext";
import axios from "axios";
import socket from "../socketConnection";

const TopBar = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { theme, changeTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const { isOpen, toggleBar } = useContext(SidebarContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [unreadNotifications, setUnreadNotifications] = useState(false);
  const [unreadChats, setUnreadChats] = useState(false);

  const checkUnreadNotifications = async () => {
    const res = await axios.get(`/api/notifications/${user._id}/has-unread`);
    setUnreadNotifications(res.data.hasUnreadNotifications);
  }
  const checkUnreadChats = async () => {
    const res = await axios.get(`/api/chats/${user._id}/has-unread`);
    setUnreadChats(res.data.hasUnreadChats);
  }

  useEffect(() => {
    checkUnreadNotifications();
    checkUnreadChats();
  }, [user._id]);

  useEffect(() => {
    socket.on("getNotification", checkUnreadNotifications);
    socket.on("getMessage", checkUnreadChats); 
    socket.on("checkUnreadNotifications", checkUnreadNotifications);
    socket.on("checkUnreadChats", checkUnreadChats);
    return () => {
      socket.off("getNotification", checkUnreadNotifications);
      socket.off("getMessage", checkUnreadChats);
      socket.on("checkUnreadNotifications", checkUnreadNotifications);
      socket.off("checkUnreadChats", checkUnreadChats);
    }
  }, [checkUnreadNotifications, checkUnreadChats]);

  const handleSearch = async (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value.trim()) {
      try {
        const res = await axios.get(`/api/users/search?username=${value}`);
        setSearchResults(res.data);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      }
    } else setSearchResults([]);
  };

  return (
    <div className="flex bg-white z-20 items-center justify-between p-2 sm:p-2.5 shadow sticky top-0 dark:bg-[#101010] dark:text-white border-b border-b-white dark:border-opacity-10">
     
      <div className="flex justify-between items-center w-[68%]">
        <div className="sm:hidden mr-2">
          {isOpen ? (
            <CloseOutlined onClick={toggleBar} />
          ) : (
            <GridViewOutlined onClick={toggleBar} />
          )}
        </div>
        <div className="italianno-regular hidden sm:block text-2xl sm:text-[35px] sm:mx-3">
          FriendsZone
        </div>
        <div className="relative w-full lg:w-[630px]">
          <div className="flex items-center p-1 sm:p-1.5 rounded-md border border-gray-500 dark:border-opacity-40 w-full">
            <SearchOutlined />
            <input
              type="text"
              placeholder="Search..."
              className="ml-1 sm:ml-2 placeholder-black opacity-70 dark:placeholder-white bg-transparent outline-none w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {searchResults.length > 0 && (
            <div className="absolute bg-white dark:bg-[#101010] dark:text-white shadow rounded-b-md max-h-60 w-full overflow-y-auto z-10 border dark:border-white dark:border-opacity-10">
              {searchResults.map((result) => {
                return (
                  <SearchResult
                    key={result._id}
                    user={result}
                    closeResults={() => {
                      setSearchResults([]);
                      setSearchQuery([]);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
  
      <div className="flex gap-2.5 sm:gap-5 items-center">
        {theme === "light" ? (
          <LightMode onClick={changeTheme} />
        ) : (
          <DarkMode onClick={changeTheme} />
        )}
        <Link to={`/chats`} className="relative">
          <EmailOutlined sx={{ fontSize: 27 }} />
          {unreadChats && (
            <div className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </Link>
        <Link to={`/activity`} className="relative">
          <NotificationsOutlined sx={{ fontSize: 27 }} />
          {unreadNotifications && (
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Link>
        <div className="hidden sm:block">
          <img
            src={
              user.profilePicture
                ? uploads + user.profilePicture
                : assets + "noAvatar.png"
            }
            alt="userImage"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full mr-2 object-cover shadow"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  );
};

const SearchResult = ({ user, closeResults }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  return (
    <div className="flex items-center justify-between">
      <Link
        onClick={closeResults}
        to={`/userProfile/${user._id}`}
        className="px-4 py-2 flex gap-3 sm:gap-4 items-center w-full hover:bg-gray-100 dark:hover:bg-[#171717]"
      >
        <img
          src={
            user.profilePicture
              ? uploads + user.profilePicture
              : assets + "noAvatar.png"
          }
          className="block h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover"
          alt="user image"
          crossOrigin="anonymous"
        />
        <p>{user.username}</p>
      </Link>
    </div>
  );
};

export default TopBar;
