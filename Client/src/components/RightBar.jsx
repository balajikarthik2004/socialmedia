import React, { useContext, useEffect, useState } from "react";
import suggestions from "../data/suggestions.json";
import FriendRequest from "./FriendRequest";
import Suggestion from "./Suggestion";
import { UserContext } from "../context/userContext";
import axios from "axios";

const RightBar = () => {
  const { user } = useContext(UserContext);
  const [followRequests, setFollowRequests] = useState([]);

  useEffect(() => {
    const fetchFollowRequests = async () => {
      const res = await axios.get(`/api/users/${user._id}`);
      const requests = res.data.requestedBy;
      setFollowRequests(requests);
    };
    fetchFollowRequests();
  }, [user._id]);

  return (
    <div className="hidden lg:block col-span-4 overflow-y-scroll scroll-smooth no-scrollbar p-5 pl-2">
      {/* followRequests */}
      {followRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow px-4 py-3 pb-1 dark:bg-[#171717] dark:text-white">
          <div className="flex items-center pb-3 gap-2">
            <p className="opacity-70">Friend Requests</p>
            <div className="mt-0.5 h-2 w-2 bg-red-500 rounded-full"></div>
          </div>
          {followRequests.map((userId) => {
            return <FriendRequest key={userId} userId={userId} />;
          })}
        </div>
      )}
      {/* suggestions */}
      {suggestions.length && (
        <div
          className={`${
            followRequests.length && "mt-5"
          } bg-white rounded-lg shadow px-4 py-3 pb-1 dark:bg-[#171717] dark:text-white`}
        >
          <p className="opacity-70 pb-4">Suggestions for you</p>
          {suggestions.map((item) => {
            return <Suggestion name={item.name} url={item.url} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RightBar;
