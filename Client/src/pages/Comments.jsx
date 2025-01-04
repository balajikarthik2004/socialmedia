import React, { useContext, useEffect, useState } from "react";
import Post from "../components/utilities/Post";
import Comment from "../components/utilities/Comment";
import { UserContext } from "../context/userContext";
import { Send as SendIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Comments = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const { postId } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/api/posts/${postId}`);
      setPost(res.data);
    }
    const fetchComments = async () => {
      const res = await axios.get(`/api/comments/${postId}`);
      setComments(res.data);
    };
    fetchPost();
    fetchComments();
  }, [postId]);

  return (
    <><div className="rounded-lg shadow bg-white dark:bg-[#171717] dark:text-white">
      {Object.keys(post).length > 0 && <Post post={post} />}
      <div className="pt-1 px-4 sm:px-4 pb-4">
        <div className="flex gap-3 justify-between items-center">
          <img
            src={currentUser.profilePicture || assets+"noAvatar.png"}
            alt=""
            className="block h-9 w-9 rounded-full object-cover shadow"
          />
          <input
            type="text"
            placeholder="Write a comment"
            className="block w-full border border-gray-300 bg-transparent outline-none rounded p-2 text-sm dark:border-opacity-40"
          />
          <div className="pb-2 pt-1 pr-1.5 pl-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
            <SendIcon />
          </div>
        </div>
        {comments.map((comment) => {
          return <Comment comment={comment} key={comment._id} />;
        })}
      </div>
      </div>
    </>
  );
};

export default Comments;
