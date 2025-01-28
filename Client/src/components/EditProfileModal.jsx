import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  ChangeCircle as ChangeIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/themeContext";

const EditProfileModal = ({ closeModal }) => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const uploads = import.meta.env.VITE_BACKEND_UPLOADS_URL;
  const { user, dispatch } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({
    fullname: user.fullname,
    username: user.username,
    isPrivate: user.isPrivate,
  });
  const [file, setFile] = useState({ profilePicture: null, coverPicture: null });
  const [usernameError, setUsernameError] = useState("");

  const handleFileChange = (event) => {
    const { id: name, files } = event.target;
    setFile({ ...file, [name]: files[0] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    if (name === "username") setUsernameError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProfile = new FormData();
    updatedProfile.append("_id", user._id);
    updatedProfile.append("fullname", data.fullname);
    updatedProfile.append("username", data.username);
    updatedProfile.append("isPrivate", data.isPrivate);
    if (file.profilePicture) {
      updatedProfile.append("profilePicture", file.profilePicture);
    }
    if (file.coverPicture) {
      updatedProfile.append("coverPicture", file.coverPicture);
    }
    try {
      const response = await axios.put(`/api/users/${user._id}`, updatedProfile);
      dispatch({ type: "UPDATE", payload: response.data });
      closeModal();
      setFile({ profilePicture: null, coverPicture: null });
      toast.success("Profile updated successfully", { theme });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setUsernameError(error.response.data.message);
      } else {
        toast.error("Failed to update profile", { theme });
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 dark:bg-opacity-70 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#101010] rounded-lg dark:text-white"
        >
          <div className="p-4 flex justify-between items-center">
            <h4 className="font-medium text-lg">Edit Profile</h4>
            <CloseIcon onClick={closeModal} className="hover:opacity-60" />
          </div>
          <hr className="dark:opacity-30" />
          <div className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <img
                  src={
                    file.profilePicture
                      ? URL.createObjectURL(file.profilePicture)
                      : user.profilePicture
                      ? uploads + user.profilePicture
                      : assets + "noAvatar.png"
                  }
                  alt=""
                  className="h-[100px] w-[100px] object-cover rounded block"
                  crossOrigin="anonymous"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute top-[-5px] right-[-5px] bg-black text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  <input
                    type="file"
                    id="profilePicture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <ChangeIcon />
                </label>
              </div>
              <div className="relative">
                <img
                  src={
                    file.coverPicture
                      ? URL.createObjectURL(file.coverPicture)
                      : user.coverPicture
                      ? uploads + user.coverPicture
                      : assets + "noCoverPicture.png"
                  }
                  alt=""
                  className="h-[100px] w-[200px] object-cover block rounded"
                  crossOrigin="anonymous"
                />
                <label
                  htmlFor="coverPicture"
                  className="absolute top-[-5px] right-[-5px] bg-black text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  <input
                    type="file"
                    id="coverPicture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <ChangeIcon />
                </label>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
            <div>
                <label
                  htmlFor="fullname"
                  className="block font-medium mb-1 sm:mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-[#171717] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  value={data.fullname}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block font-medium mb-1 sm:mb-2"
                >
                  Your username
                </label>
                <input
                  id="username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-[#171717] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  value={data.username}
                />
                {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
              </div>
              <div>
                <label
                  htmlFor="visibility"
                  className="block font-medium mb-1 sm:mb-2"
                >
                  Profile Visibility
                </label>
                <select
                  id="visibility"
                  name="isPrivate"
                  value={data.isPrivate}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-[#171717] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value={false}>Public</option>
                  <option value={true}>Private</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="dark:opacity-30" />

          <div className="p-4">
            <button
              type="submit"
              className="p-2.5 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileModal;
