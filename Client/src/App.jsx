import React, { useContext, useEffect } from "react";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { UserContext } from "./context/userContext.jsx";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Activity from "./pages/Activity.jsx";
import Chats from "./pages/Chats.jsx";
import Messages from "./pages/Messages.jsx";
import Liked from "./pages/Liked.jsx";
import Saved from "./pages/Saved.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import axios from "axios";
import socket from "./socketConnection.js";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { user, dispatch } = useContext(UserContext);
  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  useEffect(() => {
    if(!user) return;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${user._id}`);
        dispatch({ type: "REFETCH", payload: response.data });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }
    fetchUserData();
    socket.emit("addUser", user._id);
  }, [user?._id]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="" element={<Home />} />
          <Route path="userProfile/:userId" element={<UserProfile />} />
          <Route path="chats" element={<Chats />} />
          <Route path="chats/:chatId/:senderId" element={<Messages />} />
          <Route path="activity" element={<Activity />} />
          <Route path="liked" element={<Liked />} />
          <Route path="saved" element={<Saved />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;