import React from "react";
import suggestions from "../data/suggestions.json";
import Suggestion from "./Suggestion";
import FollowRequests from "./FollowRequests";
import { AddLink } from "@mui/icons-material";
import OnlineFriends from "./OnlineFriends";

const RightBar = () => {
  return (
    <div className="hidden lg:block col-span-5 overflow-y-scroll scroll-smooth no-scrollbar p-5 pl-2">
      <FollowRequests />
      <OnlineFriends />
      {/* suggestions */}
      {suggestions.length && (
        <div className="bg-white rounded-lg shadow px-4 py-3 pb-1 mb-5 dark:bg-[#101010] dark:text-white">
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
