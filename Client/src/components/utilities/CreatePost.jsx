import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeContext } from "../../context/themeContext";

const CreatePost = ({ fetchPosts }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const { user } = useContext(AuthContext);
  const { theme : themeMode } = useContext(ThemeContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file) => {
    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);

    try {
      await axios.post("/api/upload", data);
      return fileName;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const fileName = await handleFileUpload(file);
      if (file.type.startsWith("image/")) {
        newPost.img = fileName;
      } else if (file.type.startsWith("video/")) {
        newPost.video = fileName;
      }
    }

    try {
      await axios.post("/api/posts", newPost);
      desc.current.value = "";
      setFile(null);
      setIsUploading(false);
      fetchPosts();
      toast.success("Post uploaded successfully", { autoClose: 3000, theme: themeMode });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 sm:px-4 rounded-lg shadow dark:bg-[#171717] dark:text-white"
    >
      <div className="flex justify-between items-center">
        <div className={`flex gap-4 ${file ? "flex-grow" : "w-full"}`}>
          <img
            src={user.profilePicture || assets + "noAvatar.png"}
            alt="userImage"
            className="h-10 w-10 rounded-full object-cover outline-0"
          />
          <input
            type="text"
            placeholder={`Write something cool...`}
            className={`bg-transparent p-2 pl-0 flex-grow outline-none sm:text-lg ${
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
      <hr className="my-3 dark:opacity-30" />
      <div className="flex justify-between">
        <div className="flex gap-3">
          <label
            htmlFor="file"
            className="flex items-center gap-2 rounded-md hover:bg-[#f3f3f3] dark:hover:bg-[#222222] py-1 px-2"
          >
            <img src={assets + "image.png"} alt="images" className="h-7 w-7" />
            <p className="opacity-70 font-semibold text-sm">Image</p>
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
            className="flex items-center gap-2 rounded-md hover:bg-[#f3f3f3] dark:hover:bg-[#222222] py-1 px-2"
          >
            <img src={assets + "video.png"} alt="video" className="h-7 w-7" />
            <p className="opacity-70 font-semibold text-sm">Video</p>
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
            className="py-1.5 px-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
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
