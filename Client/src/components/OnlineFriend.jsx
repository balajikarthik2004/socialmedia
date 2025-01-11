import axios from "axios";
import React, { useEffect, useState } from "react";

const OnlineFriend = ({ userId }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [userId]);

  return (
    <div className="flex mb-4 items-center justify-between">
      <div className="flex gap-2 items-center">
        <img
          src={
            user.profilePicture
              ? uploads + user.profilePicture
              : assets + "noAvatar.png"
          }
          alt="userImage"
          className="block h-9 w-9 rounded-full object-cover"
          crossOrigin="anonymous"
        />
        <p>{user.username}</p>
      </div>
    </div>
  );
};

export default OnlineFriend;
