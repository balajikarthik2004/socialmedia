import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import userImage from "../assets/user.png";
import HomeIcon from "@mui/icons-material/Home";
import FriendsIcon from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Forum";
import LikedIcon from "@mui/icons-material/Favorite";
import SavedIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/authContext";
import { SidebarContext } from "../context/sideBarContext";

const LeftBar = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, toggleBar } = useContext(SidebarContext);

  return (
    <div
      className={`${
        !isOpen ? "left-[-100%]" : "left-0 w-[60vw] sm:w-full z-10"
      } fixed shadow-md sm:static sm:col-span-4 lg:col-span-2 h-[calc(100vh-50px)] sm:h-[calc(100vh-58px)] transition-all duration-300`}
    >
      <div className="bg-white dark:bg-[#171717] dark:text-white w-full h-full">
        <div className="flex flex-col gap-0 mx-4 justify-evenly h-full">
          <NavLink
            to={`/userProfile/${user._id}`}
            className={({ isActive }) =>
              `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] p-2 rounded-lg ${
                isActive && "bg-[#eeeeee] dark:bg-[#222222]"
              }`
            }
            onClick={() => toggleBar()}
          >
            <img
              src={user.profilePicture}
              alt="userImage"
              className="h-10 w-10 rounded-full object-cover shadow"
            />
            <div className="ml-3">
              <p className=" text-lg font-medium">{user.username}</p>
              <p className="text-sm">@{user.email.split("@")[0]}</p>
            </div>
          </NavLink>
          <hr className="dark:opacity-30" />
          <ul className="h-[65%] flex flex-col items-start gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] w-full p-2 rounded-lg ${
                  isActive && "bg-[#eeeeee] dark:bg-[#222222]"
                }`
              }
              onClick={() => toggleBar()}
            >
              <HomeIcon sx={{ fontSize: 35 }} />
              <p className="ml-3.5 text-lg font-medium">Home</p>
            </NavLink>
            <NavLink
              to="/friends"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] w-full p-2 rounded-lg ${
                  isActive && "bg-[#eeeeee] dark:bg-[#222222]"
                }`
              }
              onClick={() => toggleBar()}
            >
              <FriendsIcon sx={{ fontSize: 34 }} />
              <p className="ml-3.5 text-lg font-medium">Friends</p>
            </NavLink>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] w-full p-2 rounded-lg ${
                  isActive && "bg-[#eeeeee] dark:bg-[#222222]"
                }`
              }
              onClick={() => toggleBar()}
            >
              <MessageIcon sx={{ fontSize: 33 }} />
              <p className="ml-3.5 text-lg font-medium">Messages</p>
            </NavLink>
            <NavLink
              to="/liked"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] w-full p-2 rounded-lg ${
                  isActive && "bg-[#eeeeee] dark:bg-[#222222]"
                }`
              }
              onClick={() => toggleBar()}
            >
              <LikedIcon sx={{ fontSize: 33 }} />
              <p className="ml-3.5 text-lg font-medium">Liked</p>
            </NavLink>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] w-full p-2 rounded-lg ${
                  isActive && "bg-[#eeeeee] dark:bg-[#222222]"
                }`
              }
              onClick={() => toggleBar()}
            >
              <SavedIcon sx={{ fontSize: 34 }} />
              <p className="ml-3.5 text-lg font-medium">Saved</p>
            </NavLink>
          </ul>
          <hr className="dark:opacity-30" />
          <button className="flex items-center hover:bg-[#eeeeee] dark:hover:bg-[#222222] p-2 rounded-lg">
            <LogoutIcon sx={{ fontSize: 34 }} />
            <p className="ml-3.5 text-lg font-medium">Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
