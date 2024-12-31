import React, { useContext } from "react";
import {
  GridViewOutlined,
  CloseOutlined,
  DarkMode,
  LightMode,
  SearchOutlined,
  EmailOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";
import { SidebarContext } from "../context/sideBarContext";

const TopBar = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { isOpen, toggleBar } = useContext(SidebarContext);

  return (
    <div className="flex bg-white z-20 items-center justify-between p-2 sm:p-2.5 shadow sticky top-0 dark:bg-[#171717] dark:text-white border-b border-b-white dark:border-opacity-10">
      {/* left */}
      <div className="flex gap-2.5 sm:gap-5 items-center w-[68%]">
        <div className="sm:hidden ml-1">
          {isOpen ? (
            <CloseOutlined onClick={toggleBar} />
          ) : (
            <GridViewOutlined onClick={toggleBar} />
          )}
        </div>
        <div className="hidden sm:block text-xl sm:text-2xl font-bold text-blue-700 sm:mx-3">
          FriendsZone
        </div>
        <div className="flex items-center p-1 sm:p-1.5 rounded-md border border-gray-400 dark:border-opacity-40 w-full">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search..."
            className="ml-1 sm:ml-2 bg-transparent outline-none w-full"
          />
        </div>
      </div>
      {/* right */}
      <div className="flex gap-2.5 sm:gap-5 items-center">
        {theme === "light" ? (
          <LightMode onClick={changeTheme} />
        ) : (
          <DarkMode onClick={changeTheme} />
        )}
        <div className="hidden sm:block">
          <EmailOutlined />
        </div>
        <NotificationsOutlined />
        <div className="user">
          <img
            src={user.profilePicture}
            alt="userImage"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full mr-2 object-cover shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
