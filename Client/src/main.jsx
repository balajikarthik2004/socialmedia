import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import { OnlineUsersProvider } from "./context/onlineUsersContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <OnlineUsersProvider>
          <App />
        </OnlineUsersProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
