import React, { useEffect, useState } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import UserCard from "./UserCard";
import axios from "axios";

const FollowingModal = ({ isModalOpen, closeModal, userId }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const res = await axios.get(`/api/users/following/${userId}`);
      setFollowing(res.data);
    };
    fetchFollowing();
  }, [userId]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30 dark:bg-opacity-70">
          <div className="bg-white dark:bg-[#171717] rounded-lg dark:text-white">
            <div className="p-4 flex justify-between items-center">
              <h4 className="font-medium text-lg">Following</h4>
              <CloseIcon onClick={closeModal} className="hover:opacity-60" />
            </div>
            <hr className="dark:opacity-30" />

            <div className="p-4 overflow-y-scroll scroll-smooth w-[85vw] h-[65vh] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] scrollbar-thin">
              {following.length > 0 ? (
                following.map((user) => {
                  return <UserCard user={user} closeModal={closeModal} key={user._id} />;
                })
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <p className="text-xl font-bold">No Following</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowingModal;
