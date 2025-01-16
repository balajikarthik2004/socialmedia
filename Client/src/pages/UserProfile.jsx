import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import axios from "axios";
import { UserContext } from "../context/userContext";
import {
  Edit as EditIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";
import FollowersModal from "../components/FollowersModal";
import FollowingModal from "../components/FollowingModal";
import EditProfileModal from "../components/EditProfileModal";
import socket from "../socketConnection";
import { OnlineUsersContext } from "../context/onlineUsersContext";

const UserProfile = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { userId } = useParams();
  const { user: currentUser, dispatch } = useContext(UserContext);
  const [user, setUser] = useState({ followers: [], following: [] });
  const [posts, setPosts] = useState([]);
  const [followStatus, setFollowStatus] = useState();
  const [isModalOpen, setIsModalOpen] = useState({
    edit: false,
    followers: false,
    following: false,
  });
  const navigate = useNavigate();
  const {onlineUsers} = useContext(OnlineUsersContext);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await axios.get(`/api/users/${userId}`);
      setUser(userData.data);
      const userPosts = await axios.get(`/api/posts/userPosts/${userId}`);
      setPosts(userPosts.data);
    };
    setFollowStatus(() => {
      return currentUser.requestedTo.includes(userId)
        ? "Requested"
        : currentUser.following.includes(userId)
        ? "Unfollow"
        : "Follow";
    });
    fetchData();
  }, [userId]);

  const handleFollowStatus = async () => {
    if (currentUser.requestedTo.includes(userId)) return;
    if (!currentUser.following.includes(userId)) {
      await axios.put(`/api/users/${userId}/follow`, {
        userId: currentUser._id,
      });
      dispatch({
        type: user.isPrivate ? "SEND_REQUEST" : "FOLLOW",
        payload: userId,
      });

      if(user.isPrivate) {
        const notification = {
          userId: userId,
          senderId: currentUser._id,
          content: "has requested to follow you."
        };
        await axios.post("/api/notifications", notification);
        if (onlineUsers.some((user) => user.userId === userId)) {
          socket.emit("sendRequest", {
            targetUserId: userId,
            sourceUserId: currentUser._id,
          });
          socket.emit("sendNotification", {
            recieverId: userId,
            notification: notification
          });
        }
        setFollowStatus("Requested");
      } else {
        const notification = {
          userId: userId, 
          senderId: currentUser._id,
          content: "has started following you."
        }
        await axios.post("/api/notifications", notification);
        if (onlineUsers.some((user) => user.userId === userId)) {
          socket.emit("follow", {
            targetUserId: userId,
            sourceUserId: currentUser._id,
          });
          socket.emit("sendNotification", {
            recieverId: userId,
            notification: notification
          });
        }
        setFollowStatus("Unfollow");
      }

    } else {
      await axios.put(`/api/users/${userId}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: userId });
      if (onlineUsers.some((user) => user.userId === userId)) {
        socket.emit("unfollow", {
          targetUserId: userId,
          sourceUserId: currentUser._id,
        });
      }
      setFollowStatus("Follow");
    }
  };

  const openChat = async () => {
    try {
      const res = await axios.post("/api/chats", {
        senderId: currentUser._id,
        recieverId: userId,
      });
      navigate(`/messages/${res.data._id}/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-9 lg:col-span-6">
        <img
          src={
            user.coverPicture
              ? uploads + user.coverPicture
              : assets + "noCoverPicture.jpeg"
          }
          alt=""
          className="h-[170px] sm:h-[220px] w-full object-cover block rounded"
          crossOrigin="anonymous"
        />
        <img
          src={
            user.profilePicture
              ? uploads + user.profilePicture
              : assets + "noAvatar.png"
          }
          alt=""
          className="h-[100px] w-[100px] sm:h-[110px] sm:w-[110px] object-cover rounded-full block absolute top-[120px] sm:top-[160px] left-0 right-0 mx-auto border-2 border-transparent bg-[#eeeeee] dark:bg-[#202020]"
          crossOrigin="anonymous"
        />

        <div className="w-full lg:w-[85%] mx-auto mt-1 mb-4 p-4 pt-[55px] bg-white dark:bg-[#171717] flex flex-col gap-3 items-center dark:text-white rounded-md shadow">
          <p className="text-2xl font-medium">{user.username}</p>
          <div className="flex justify-center gap-10 w-[full] text-sm font-medium">
            <div className="text-center px-3">
              <p className="text-lg font-semibold">{posts.length}</p>
              <p>Posts</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onClick={() => {
                setIsModalOpen({ ...isModalOpen, followers: true });
              }}
            >
              <p className="text-lg font-semibold">{user.followers.length}</p>
              <p>Followers</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onClick={() => {
                setIsModalOpen({ ...isModalOpen, following: true });
              }}
            >
              <p className="text-lg font-semibold">{user.following.length}</p>
              <p>Following</p>
            </div>
          </div>
          {currentUser._id !== userId ? (
            <div className="grid grid-cols-10 gap-4 w-full font-medium">
              <button className="col-span-3 p-2.5 text-white bg-red-600 hover:bg-red-500 rounded-md">
                Block
              </button>
              <button
                onClick={handleFollowStatus}
                className="col-span-4 p-2.5 text-white bg-blue-600 hover:bg-blue-500 rounded-md"
              >
                {followStatus}
              </button>
              <button
                onClick={openChat}
                className="col-span-3 p-2.5 bg-gray-300 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#333333] border dark:border-gray-700 rounded-md"
              >
                Message
              </button>
            </div>
          ) : (
            <div className="flex justify-center w-full font-medium">
              <button
                onClick={() => {
                  setIsModalOpen({ ...isModalOpen, edit: true });
                }}
                className="p-2 px-4 text-white bg-purple-600 hover:bg-purple-500 rounded-md"
              >
                <EditIcon className="mb-0.5 sm:mb-1" sx={{ fontSize: 20 }} />{" "}
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="pt-2">
          {user.isPrivate &&
          !currentUser.following.includes(user._id) &&
          currentUser._id !== user._id ? (
            <div className="flex flex-col gap-2 justify-center items-center dark:text-white">
              <LockIcon />
              <div className="text-center">
                <p className="text-xl font-medium">This Account is Private</p>
                <p className="opacity-70">Follow to view their posts.</p>
              </div>
            </div>
          ) : (
            posts.map((post) => {
              return <Post post={post} key={post._id} />;
            })
          )}
        </div>

        <FollowersModal
          isModalOpen={isModalOpen.followers}
          closeModal={() => {
            setIsModalOpen({ ...isModalOpen, followers: false });
          }}
          userId={userId}
        />
        <FollowingModal
          isModalOpen={isModalOpen.following}
          closeModal={() => {
            setIsModalOpen({ ...isModalOpen, following: false });
          }}
          userId={userId}
        />
        <EditProfileModal
          isModalOpen={isModalOpen.edit}
          closeModal={() => {
            setIsModalOpen({ ...isModalOpen, edit: false });
          }}
        />
      </div>
    </>
  );
};

export default UserProfile;
