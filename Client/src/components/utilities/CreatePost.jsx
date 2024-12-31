import React, { useState, useContext, useRef } from "react";
import userImage from "../../assets/user.png";
import Image from "../../assets/image.png";
import Video from "../../assets/video.png";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
    if(file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append("name", fileName)
      data.append("file", file)
      newPost.img = fileName
      try {
        await axios.post("/api/upload", data)
      } catch (error) {
        console.log(error)
      }
    }

    try {
      await axios.post("/api/posts", newPost);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 sm:px-4 rounded-lg shadow dark:bg-[#171717] dark:text-white"
    >
      <div className="flex gap-4 items-center">
        <img
          src={user.profilePicture}
          alt="userImage"
          className="h-9 w-9 rounded-full object-cover outline-0"
        />
        <input
          type="text"
          placeholder={`Have something to say? Post it here!`}
          className="bg-transparent p-2 pl-0 flex-grow outline-none sm:text-lg"
          ref={desc}
        />
      </div>
      <hr className="my-3 dark:opacity-30" />
      <div className="flex justify-between">
        <div className="flex gap-3">
          <label htmlFor="file" className="flex items-center gap-2 rounded-md hover:bg-[#f3f3f3] dark:hover:bg-[#222222] py-1 px-2">
            <img src={Image} alt="images" className="h-7 w-7" />
            <p className="opacity-70 font-semibold text-sm">Image</p>
            <input
              type="file"
              id="file"
              accept="/image*"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <label htmlFor="file" className="flex items-center gap-2 rounded-md hover:bg-[#f3f3f3] dark:hover:bg-[#222222] py-1 px-2">
            <img src={Video} alt="images" className="h-7 w-7" />
            <p className="opacity-70 font-semibold text-sm">Video</p>
            <input
              type="file"
              id="file"
              accept="/video*"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
        </div>
        <div>
          <button
            className="py-1.5 px-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
            type="submit"
          >
            Share
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
