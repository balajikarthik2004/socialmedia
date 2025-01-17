import React, { useContext, useState, useEffect, useRef } from "react";
import { Close as CloseIcon, Send as SendIcon } from "@mui/icons-material";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Comment from "./Comment";
import CircularProgress from "@mui/material/CircularProgress";
import socket from "../socketConnection";
import { OnlineUsersContext } from "../context/onlineUsersContext";

const CommentsModal = ({ isModalOpen, closeModal, post, increaseCount, decreaseCount }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const commentText = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { onlineUsers } = useContext(OnlineUsersContext);

  const fetchComments = async () => {
    const res = await axios.get(`/api/comments/${post._id}`);
    setComments(res.data);
  };
  useEffect(() => {
    fetchComments();
  }, [post]);

  const addComment = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newComment = {
        userId: user._id,
        postId: post._id,
        text: commentText.current.value,
      };
      await axios.put(`/api/comments`, newComment);
      commentText.current.value = "";
      setIsLoading(false);
      fetchComments();
      increaseCount();
      if(user._id !== post.userId) {
        const notification = {
          userId: post.userId,
          senderId: user._id,
          content: "has commented on your post.",
          sender: {
            username: user.username,
            profilePicture: user.profilePicture
          }
        }
        await axios.post("/api/notifications", notification);
        if(onlineUsers.some((user) => user.userId === post.userId)){
          console.log("notification sent on other side")
          socket.emit("sendNotification", {
            recieverId: post.userId,
            notification: notification
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 dark:bg-opacity-70">
          <div className="bg-white dark:bg-[#101010] rounded-lg dark:text-white">
            <div className="p-4 flex justify-between items-center">
              <h4 className="font-medium text-lg">Comments</h4>
              <CloseIcon onClick={closeModal} className="hover:opacity-60" />
            </div>
            <hr className="dark:opacity-30" />

            <div className="p-4 overflow-y-scroll scroll-smooth h-[65vh] w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw]  scrollbar-thin">
              {comments.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <Comment
                      comment={comment}
                      post={post}
                      fetchComments={fetchComments}
                      decreaseCount={decreaseCount}
                      key={comment._id}
                    />
                  );
                })
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <div className="text-center">
                    <p className="text-xl font-bold">No Comments Yet.</p>
                    <p className="opacity-60">Be the first one to comment.</p>
                  </div>
                </div>
              )}
            </div>

            <hr className="dark:opacity-30" />

            <div className="p-4">
              <form
                onSubmit={addComment}
                className="flex gap-3 justify-between items-center"
              >
                <img
                  src={
                    user.profilePicture
                      ? uploads + user.profilePicture
                      : assets + "noAvatar.png"
                  }
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
                  className="flex justify-center items-center p-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white"
                >
                  {isLoading ? (
                    <CircularProgress
                      className="text-center"
                      size={24}
                      color="inherit"
                    />
                  ) : (
                    <SendIcon />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsModal;
