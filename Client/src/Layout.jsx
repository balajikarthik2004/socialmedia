import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { SidebarProvider } from "./context/sideBarContext.jsx";
import socket from "./socketConnection.js";
import { UserContext } from "./context/userContext.jsx";

const Layout = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    socket.on("getFollowed", (sourceUserId) => {
      console.log("Follow on other side");
      dispatch({ type: "GET_FOLLOWED", payload: sourceUserId });
    });
    socket.on("getUnfollowed", (sourceUserId) => {
      console.log("Unfollow on other side");
      dispatch({ type: "GET_UNFOLLOWED", payload: sourceUserId });
    });
    socket.on("getRequest", (sourceUserId) => {
      console.log("Got request on other side");
      dispatch({ type: "GET_REQUEST", payload: sourceUserId });
    });
    socket.on("getRequestAccepted", (sourceUserId) => {
      console.log("Got request accepted on other side");
      dispatch({ type: "GET_REQUEST_ACCEPTED", payload: sourceUserId });
    });
    socket.on("getRequestRejected", (sourceUserId) => {
      console.log("Got request rejected on other side");
      dispatch({ type: "GET_REQUEST_REJECTED", payload: sourceUserId });
    });

    return () => {
      socket.off("getFollowed");
      socket.off("getUnfollowed");
      socket.off("getRequest");
      socket.off("getRequestAccepted");
      socket.off("getRequestRejected");
    };
  
  }, [dispatch]);

  return (
    <>
      <SidebarProvider>
        <TopBar />
        <div className="h-[calc(100vh-50px)] sm:h-[calc(100vh-58px)] grid grid-cols-16 bg-gray-100 dark:bg-[#171717]">
          <LeftBar />
          <div className="p-3 lg:p-5 lg:px-7 overflow-y-scroll scroll-smooth no-scrollbar col-span-full sm:col-span-10 lg:col-span-8">
            <Outlet />
          </div>
          <RightBar />
        </div>
      </SidebarProvider>
    </>
  );
};

export default Layout;
