import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const assets = import.meta.env.VITE_FRONTEND_ASSETS_URL;
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (userCredentials, dispatch) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", userCredentials);
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success("logged in successfully", { theme });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#f3f3f3]">
      <div className="grid grid-cols-12 h-[65%] w-[85%] md:h-[80%] md:w-[70%] bg-white shadow-equal rounded-xl">
        <div
          className="hidden sm:visible p-5 sm:flex justify-center col-span-6 rounded-l-xl bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${assets + "background.png"})` }}
        >
          <div className="flex flex-col gap-4 items-center mt-4">
            <h2 className="text-3xl font-bold">FriendsZone</h2>
            <p className="font-semibold">
              Connect with friends, share updates, and join communities. Enjoy a
              safe, intuitive social experience with advanced privacy controls.
              Stay in touch and make new connections easily on FriendsZone!
            </p>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 p-1 pt-2">
          <div className="w-full h-full bg-white md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Your email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    placeholder="Email Address"
                    ref={email}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    ref={password}
                    required
                    autoComplete="true"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500">Remember me</label>
                    </div>
                  </div>
                  <a
                    href=""
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2 text-center"
                >
                  {isLoading ? (
                    <CircularProgress
                      className="mt-1"
                      size={20}
                      color="inherit"
                    />
                  ) : (
                    "Sign in"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don't have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
