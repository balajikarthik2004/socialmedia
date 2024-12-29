import React from "react";
import Post from "../components/utilities/Post";
import posts from "../data/posts.json";

const Liked = () => {
  return (
    <>
      <div className="bg-white px-3 sm:px-4 py-3 rounded-lg shadow font-medium text-lg dark:bg-[#171717] dark:text-white">
        Liked Posts
      </div>
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </>
  );
};

export default Liked;
