import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { RemoveCircleOutline as DeleteIcon }  from '@mui/icons-material';
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import { format } from "timeago.js";

const Comment = ({ comment, fetchComments, post }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const { user: currentUser } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${comment.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [comment.userId]);

  const deleteComment = async () => {
    try {
      await axios.delete(`/api/comments/${comment._id}`, { data: {userId: currentUser._id} });
      fetchComments();
      toast.info("Comment removed successfully", {autoClose: 3000});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex mt-4 items-center">
      <div className="w-full flex justify-between">
      <div className="flex gap-3 w-[95%]">
        <img
          src={user.profilePicture || assets+"noAvatar.png"}
          alt=""
          className="mt-1 block h-9 w-9 rounded-full object-cover"
        />
        <div>
          <p>
            {user.username}{" "}
            <span className="text-[0.8rem] opacity-70"> ~ {format(comment.createdAt)}</span>
          </p>
          <p className="text-sm leading-tight">{comment.text}</p>
        </div>
      </div>
      {(comment.userId === currentUser._id || post.userId === currentUser._id) && <button onClick={deleteComment} className="opacity-60 hover:opacity-45">
        <DeleteIcon sx={{ fontSize: 17 }} />
      </button>}
      
      </div>
    </div>
  );
};

export default Comment;
