import React from "react";
import friendRequests from "../data/friendRequests.json";
import FriendRequest from "../components/utilities/FriendRequest";
import myFriends from "../data/friendData.json";
import Friend from "../components/utilities/Friend";
import suggestions from "../data/suggestions.json";
import Suggestion from "../components/utilities/Suggestion";

const Friends = () => {
  return (
    <>
      {friendRequests.length > 0 && (
        <div className="lg:hidden bg-white rounded-lg shadow px-4 py-3 pb-1 mb-4 dark:bg-[#171717] dark:text-white">
          <div className="flex items-center pb-3 gap-2">
            <p className="opacity-70">Friend Requests</p>
            <div className="mt-0.5 h-2 w-2 bg-red-500 rounded-full"></div>
          </div>
          {friendRequests.map((request) => {
            return (
              <FriendRequest
                name={request.name}
                url={request.url}
                key={request.id}
              />
            );
          })}
        </div>
      )}

      {myFriends.length > 0 && (
        <div className="bg-white px-3 sm:px-4 py-3 rounded-lg shadow font-medium text-lg dark:bg-[#171717] dark:text-white">
          <div className="mb-5">
            <h1>Friends</h1>
            <hr className="dark:opacity-30 mt-3" />
          </div>
          {myFriends.map((item) => {
            return <Friend name={item.name} url={item.url} key={item.key} />;
          })}
        </div>
      )}

      <div
        className={`${
          (myFriends.length || friendRequests.length) && "mt-5"
        } lg:hidden bg-white rounded-lg shadow px-4 py-3 pb-1 dark:bg-[#171717] dark:text-white`}
      >
        <p className="opacity-70 pb-4">Suggestions for you</p>
        {suggestions.map((item) => {
          return <Suggestion name={item.name} url={item.url} key={item.id} />;
        })}
      </div>
    </>
  );
};

export default Friends;
