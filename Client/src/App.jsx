import React, { useState, useContext } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  redirect,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import TopBar from "./components/TopBar";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Friends from "./pages/Friends.jsx";
import Liked from "./pages/Liked.jsx";
import Saved from "./pages/Saved.jsx";
import { SidebarProvider } from "./context/sideBarContext.jsx";

function App() {
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

  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="userProfile/:userId" element={<UserProfile />} />
          <Route path="friends" element={<Friends />} />
          <Route path="liked" element={<Liked />} />
          <Route path="saved" element={<Saved />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
