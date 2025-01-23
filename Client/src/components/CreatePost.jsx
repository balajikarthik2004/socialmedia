import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeContext } from "../context/themeContext";

const CreatePost = ({ fetchPosts }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const desc = useRef();
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const newPost = new FormData();
    newPost.append("userId", user._id);
    newPost.append("desc", desc.current.value);
    if (file) newPost.append("file", file);
    try {
      await axios.post("/api/posts", newPost);
      desc.current.value = "";
      setFile(null);
      setIsUploading(false);
      fetchPosts();
      toast.info("Post uploaded successfully", { theme });
    } catch (error) {
      toast.error("Failed to upload post", { theme });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 sm:px-4 mb-5 rounded-lg shadow dark:bg-[#101010] dark:text-white"
    >
      <div className="flex justify-between items-center">
        <div className={`flex gap-4 ${file ? "flex-grow" : "w-full"}`}>
          <img
            src={user.profilePicture ? uploads + user.profilePicture : assets + "noAvatar.png"}
            alt="userImage"
            className="h-10 w-10 rounded-full object-cover outline-0"
            crossOrigin="anonymous"
          />
          <input
            type="text"
            placeholder={`Write something cool...`}
            className={`bg-transparent placeholder-black opacity-70 dark:placeholder-white p-2 pl-0 flex-grow outline-none sm:text-lg ${
              file ? "w-[80%]" : "flex-grow"
            }`}
            ref={desc}
          />
        </div>
        {file && (
          <div className="relative">
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="image-preview"
                className="h-[70px] object-cover rounded"
              />
            )}
            {file.type.startsWith("video/") && (
              <video
                src={URL.createObjectURL(file)}
                alt="video-preview"
                className="h-[70px] object-cover rounded"
                controls
              />
            )}
            <button
              type="button"
              className="absolute top-[-5px] right-[-5px] bg-gray-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
              onClick={() => setFile(null)}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        )}
      </div>
      <hr className="my-3 border-black border-opacity-40 dark:border-white dark:border-opacity-20" />
      <div className="flex justify-between">
        <div className="flex gap-3">
          <label
            htmlFor="file"
            className="flex items-center gap-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#181818] hover:shadow py-1 px-2"
          >
            <img src={assets + "imageIcon.png"} alt="images" className="h-7 w-7" />
            <p className="opacity-80 font-semibold text-sm">Image</p>
            <input
              type="file"
              id="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <label
            htmlFor="video"
            className="flex items-center gap-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#181818] hover:shadow py-1 px-2"
          >
            <img src={assets + "videoIcon.png"} alt="video" className="h-7 w-7" />
            <p className="opacity-80 font-semibold text-sm">Video</p>
            <input
              type="file"
              id="video"
              accept="video/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <div>
          <button
            className="py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md"
            type="submit"
          >
            {isUploading ? (
              <>
                <span>sharing </span>{" "}
                <CircularProgress size={15} color="inherit" />
              </>
            ) : (
              "share"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
