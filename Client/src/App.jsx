import React, { useContext } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { UserContext } from "./context/userContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Friends from "./pages/Friends.jsx";
import Liked from "./pages/Liked.jsx";
import Saved from "./pages/Saved.jsx";
import Comments from "./pages/Comments.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./context/themeContext.jsx";
import Layout from "./Layout.jsx";

function App() {
  const { user } = useContext(UserContext);
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
          <Route path="post/:postId/comments" element={<Comments />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </>
    )
  );

  const { theme: themeMode } = useContext(ThemeContext);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme={themeMode} autoClose={3000} />
    </>
  );
}

export default App;
