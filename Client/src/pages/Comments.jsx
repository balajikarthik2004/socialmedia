import React, { useContext, useEffect, useState, useRef } from "react";
import Post from "../components/utilities/Post";
import Comment from "../components/utilities/Comment";
import { UserContext } from "../context/userContext";
import {
  Send as SendIcon,
  KeyboardBackspace as BackIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Comments = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const commentText = useRef();

  const fetchPost = async () => {
    const res = await axios.get(`/api/posts/${postId}`);
    setPost(res.data);
  };
  const fetchComments = async () => {
    const res = await axios.get(`/api/comments/${postId}`);
    setComments(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPost();
      await fetchComments();
      setDataLoaded(true);
    }
    loadData();
  }, [postId]);

  useEffect(() => {
    if(dataLoaded && commentText.current) {
      commentText.current.scrollIntoView({ behavior: "smooth" });
      commentText.current.focus();
    }
  }, [dataLoaded])

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const newComment = {
        userId: user._id,
        postId: post._id,
        text: commentText.current.value,
      };
      await axios.put(`/api/comments`, newComment);
      commentText.current.value = "";
      fetchComments();
      toast.info("Your comment has been added!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="rounded-lg shadow bg-white dark:bg-[#171717] dark:text-white">
        <div className="px-4 py-2 rounded-t-lg border-b border-gray-300 dark:border-opacity-10 font-medium">
          <BackIcon
            onClick={() => {
              navigate(-1);
            }}
            className="mb-0.5 mr-1.5 hover:opacity-70"
          />{" "}
          <span>Return to the post</span>
        </div>
        {Object.keys(post).length > 0 && <Post post={post} />}
        <div className="px-4 pb-4 sm:pb-5 mt-[-7px]">
          <form
            onSubmit={addComment}
            className="flex gap-3 justify-between items-center"
          >
            <img
              src={user.profilePicture ? uploads + user.profilePicture : assets + "noAvatar.png"}
              alt=""
              className="block h-9 w-9 rounded-full object-cover shadow"
              crossOrigin="anonymous"
            />
            <input
              type="text"
              placeholder="Write your comment here..."
              className="block w-full border border-gray-300 bg-transparent outline-none shadow rounded p-2 text-sm dark:border-opacity-40"
              ref={commentText}
            />
            <button
              type="submit"
              className="pb-2 pt-1 pr-1.5 pl-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              <SendIcon />
            </button>
          </form>
          {comments.map((comment) => {
            return (
              <Comment
                comment={comment}
                post={post}
                fetchComments={fetchComments}
                key={comment._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comments;
