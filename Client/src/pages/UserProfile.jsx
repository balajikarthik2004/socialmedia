import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/utilities/Post";
import axios from "axios";
import { UserContext } from "../context/userContext";

const UserProfile = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const { user: currentUser } = useContext(UserContext);
  const { userId } = useParams();
  const [user, setUser] = useState({ followers: [], following: [] });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await axios.get(`/api/users/${userId}`);
      setUser(userData.data);
      const userPosts = await axios.get(`/api/posts/userPosts/${userId}`);
      setPosts(userPosts.data);
    };
    fetchData();
  }, [userId]);

  return (
    <>
      <div className="relative overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-9 lg:col-span-6">
        <img
          src={user.coverPicture || assets + "coverPicture.jpeg"}
          alt=""
          className="h-[170px] sm:h-[220px] w-full object-cover block rounded"
        />
        <img
          src={user.profilePicture || assets + "noAvatar.png"}
          alt=""
          className="h-[100px] w-[100px] sm:h-[110px] sm:w-[110px] object-cover rounded-full block absolute top-[120px] sm:top-[160px] left-0 right-0 mx-auto border-2 border-transparent bg-[#eeeeee] dark:bg-[#202020]"
        />

        <div className="w-full lg:w-[85%] mx-auto mt-1 p-4 pt-[58px] bg-white dark:bg-[#171717] flex flex-col gap-4 items-center dark:text-white rounded-md shadow">
          <p className="text-2xl font-medium">{user.username}</p>
          <div className="flex justify-center gap-10 w-[full] text-sm font-medium">
            <div className="text-center px-3">
              <p className="text-lg font-semibold">{posts.length}</p>
              <p>Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.followers.length}</p>
              <p>Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.following.length}</p>
              <p>Following</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 w-full sm:font-medium">
            <button className="col-span-3 p-1.5 sm:p-2 text-white bg-red-600 hover:bg-red-700 rounded">
              Block
            </button>
            {currentUser._id == userId ? (
              <button className="col-span-6 p-1.5 sm:p-2 text-white bg-violet-600 hover:bg-violet-700 rounded">
                Edit
              </button>
            ) : currentUser.requestedTo.includes(userId) ? (
              <button className="col-span-6 p-1.5 sm:p-2 text-white bg-blue-600 hover:bg-blue-700 rounded">
                Requested
              </button>
            ) : (
              <button className="col-span-6 p-1.5 sm:p-2 text-white bg-blue-600 hover:bg-blue-700 rounded">
                {currentUser.following.includes(userId) ? "Unfollow" : "Follow"}
              </button>
            )}
            <button className="col-span-3 p-1.5 sm:p-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#272727] dark:hover:bg-[#333333] border dark:border-gray-700 rounded">
              Message
            </button>
          </div>
        </div>

        <div className="pt-2">
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
