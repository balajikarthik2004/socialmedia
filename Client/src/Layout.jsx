import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "./context/userContext.jsx";
import { SidebarProvider } from "./context/sideBarContext.jsx";
import TopBar from "./components/TopBar";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import socket from "./socketConnection.js";

const Layout = () => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    socket.on("getFollowed", (sourceUserId) => {
      dispatch({ type: "GET_FOLLOWED", payload: sourceUserId });
    });
    socket.on("getUnfollowed", (sourceUserId) => {
      dispatch({ type: "GET_UNFOLLOWED", payload: sourceUserId });
    });
    socket.on("getRequest", (sourceUserId) => {
      dispatch({ type: "GET_REQUEST", payload: sourceUserId });
    });
    socket.on("getRequestAccepted", (sourceUserId) => {
      dispatch({ type: "GET_REQUEST_ACCEPTED", payload: sourceUserId });
    });
    socket.on("getRequestRejected", (sourceUserId) => {
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
