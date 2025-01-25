import React from "react";

const OnlineFriendSkeleton = () => {
  return (
    <div className="flex mt-4 items-center justify-between animate-pulse">
      <div className="flex gap-4 items-center">
        {/* Profile Picture Placeholder */}
        <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-[#202020]"></div>

        {/* Username Placeholder */}
        <div className="h-4 w-28 bg-gray-300 dark:bg-[#202020] rounded"></div>
      </div>
    </div>
  );
};

export default OnlineFriendSkeleton;