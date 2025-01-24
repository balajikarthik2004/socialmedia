import React from "react";

const NotificationSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-3 hover:bg-gray-100 dark:hover:bg-[#202020] animate-pulse">
        {/* Left Section: Profile Picture and Text */}
        <div className="flex gap-2 sm:gap-4 items-center w-full">
          {/* Profile Picture */}
          <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-[#202020]"></div>
          {/* Text */}
          <div className="flex-1">
            <div className="h-4 w-2/3 bg-gray-300 dark:bg-[#202020] rounded mb-1"></div>
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-[#202020] rounded"></div>
          </div>
        </div>

        {/* Right Section: Time and Read Indicator */}
        <div className="flex w-[25%] gap-2 items-center justify-end">
          {/* Time */}
          <div className="h-3 w-12 bg-gray-300 dark:bg-[#202020] rounded"></div>
          {/* Unread Dot */}
          <div className="h-2.5 w-2.5 rounded-full bg-gray-300 dark:bg-[#202020]"></div>
        </div>
      </div>
      <hr className="border border-black dark:border-white opacity-15" />
    </>
  );
};

export default NotificationSkeleton;
