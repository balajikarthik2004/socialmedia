import React from "react";

const FriendRequest = ({ name, url }) => {
  return (
    <div className="flex mb-3 items-center justify-between">
      <div className="flex gap-2 items-center">
        <img
          src={url}
          alt="userImage"
          className="block h-9 w-9 rounded-full object-cover"
        />
        <div>
          <p>{name}</p>
          <p className="text-[0.75rem] opacity-70">5 mutual friends</p>
        </div>
      </div>
      <div className="flex">
        <button className="p-1.5 px-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#272727] dark:hover:bg-[#333333] text-sm mr-2 rounded border dark:border-gray-700">
          Reject
        </button>
        <button className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
          Accept
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
