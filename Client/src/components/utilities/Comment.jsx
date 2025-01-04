import axios from "axios";
import React, { useState, useEffect } from "react";

const Comment = ({ comment }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${comment.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [comment.userId]);

  return (
    <div className="flex mt-3 items-center">
      <div className="flex gap-2 w-[95%]">
        <img
          src={user.profilePicture || assets+"noAvatar.png"}
          alt=""
          className="mt-1 block h-9 w-9 rounded-full object-cover"
        />
        <div>
          <p>
            {user.username}{" "}
            <span className="text-[0.8rem] opacity-70"> ~ 1 hour ago</span>
          </p>
          <p className="text-sm leading-tight">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
