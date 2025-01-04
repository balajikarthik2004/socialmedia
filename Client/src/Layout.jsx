import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { SidebarProvider } from "./context/sideBarContext.jsx";

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <TopBar />
        <div className="h-[calc(100vh-50px)] sm:h-[calc(100vh-58px)] grid grid-cols-12 bg-[#eeeeee] dark:bg-[#202020]">
          <LeftBar />
          <div className="p-3 lg:p-5 lg:px-7 overflow-y-scroll scroll-smooth no-scrollbar col-span-12 sm:col-span-8 lg:col-span-6">
            <Outlet />
          </div>
          <RightBar />
        </div>
      </SidebarProvider>
    </>
  );
};

export default Layout;
