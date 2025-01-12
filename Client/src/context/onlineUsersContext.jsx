import React, { createContext, useState, useEffect } from "react";
import socket from "../socketConnection";

export const OnlineUsersContext = createContext();

export const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Listen for online users globally
    socket.on("getUsers", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("getUsers");
    };
  }, []);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};
