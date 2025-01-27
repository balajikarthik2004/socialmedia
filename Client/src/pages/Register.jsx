import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeContext } from "../context/themeContext";
import { DarkMode, LightMode } from '@mui/icons-material';

const Register = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerUser = async (userCredentials) => {
    setIsLoading(true);
    try {
      await axios.post(`api/auth/register`, userCredentials);
      setIsLoading(false);
      toast.success("User registered successfully", { theme });
      navigate(-1);
    } catch (error) {
      toast.error("Failed to register", { theme });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const userCredentials = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
    registerUser(userCredentials);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
    // Reset the error when the user types in the password fields
    if (name === "password" || name === "confirmPassword") {
      setError("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#171717] flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-[#101010] shadow-equal rounded-lg p-6 pt-2">
        <h2 className="text-[35px] sm:text-[45px] text-center dark:text-white italianno-regular">FriendsZone</h2>
        <p className="sm:text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
          Create a new account.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-[#181818] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${theme === "dark" && "custom-autofill"}`}
                placeholder="Enter your username"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-[#181818] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none ${theme === "dark" && "custom-autofill"}`}
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-[#181818] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Create a password"
                onChange={handleChange}
                value={formData.password}
                minLength={6}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-[#181818] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Re-enter your password"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-500 transition ease-in-out duration-200"
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <button onClick={changeTheme} className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 bg-gray-200 dark:bg-[#101010] border border-gray-400 dark:border-gray-600 rounded-lg dark:text-white p-2.5 sm:p-3 z-50">
        {theme === 'light' ? (
          <LightMode sx={{ fontSize: 27 }} />
        ) : (
          <DarkMode sx={{ fontSize: 27 }} />
        )}
      </button>
    </div>
  );
};

export default Register;
