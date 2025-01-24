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
import { ThemeContext } from "../context/themeContext";
import { toast } from "react-toastify";
import UserProfileSkeleton from "../components/skeletons/userProfileSkeleton";

const UserProfile = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { userId } = useParams();
  const { user: currentUser, dispatch } = useContext(UserContext);
  const {onlineUsers} = useContext(OnlineUsersContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({ followers: [], following: [] });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [followStatus, setFollowStatus] = useState(() => currentUser.requestedTo.includes(userId) 
  ? "Requested" : currentUser.following.includes(userId) ? "Unfollow" : "Follow");
  const [isBlocked, setIsBlocked] = useState(currentUser.blockedUsers.includes(userId));
  const [isModalOpen, setIsModalOpen] = useState({ edit: false, followers: false, following: false });
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userResponse = await axios.get(`/api/users/${userId}`);
      setUser(userResponse.data);
      const postResponse = await axios.get(`/api/posts/userPosts/${userId}`);
      setPosts(postResponse.data);
      setIsLoading(false);
    };
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
          content: "has requested to follow you.",
          sender: {
            username: currentUser.username,
            profilePicture: currentUser.profilePicture
          }
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
          content: "has started following you.",
          sender: {
            username: currentUser.username,
            profilePicture: currentUser.profilePicture
          }
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

  const handleBlock = async () => {
    await axios.put(`/api/users/${userId}/block`, { userId: currentUser._id });
    if(isBlocked) dispatch({ type: "UNBLOCK", payload: user._id });
    else dispatch({ type: "BLOCK", payload: user._id });
    setIsBlocked(!isBlocked);
  }

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

  const removePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`, { data: { userId: currentUser._id }});
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    toast.info("Post deleted successfully!", { theme });
  }

  if (isLoading) return <UserProfileSkeleton />;

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

        <div className="w-full lg:w-[85%] mx-auto mt-1 mb-4 p-4 pt-[55px] bg-white dark:bg-[#101010] flex flex-col gap-3 items-center dark:text-white rounded-md shadow">
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
              <button onClick={handleBlock} className="col-span-3 p-2.5 text-white bg-red-600 hover:bg-red-500 rounded-md">
                {isBlocked ? "Unblock": "Block"}
              </button>
              <button
                onClick={handleFollowStatus}
                className={`col-span-4 p-2.5 ${followStatus === "Follow" ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-gray-200 dark:bg-[#202020] hover:bg-gray-300 hover:dark:bg-[#252525]"} rounded-md`}
              >
                {followStatus}
              </button>
              <button
                onClick={openChat}
                className="col-span-3 p-2.5 text-white bg-gray-700 hover:bg-gray-600 rounded-md"
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
              return <Post post={post} user={post.user} deletePost={removePost} key={post._id} />;
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
