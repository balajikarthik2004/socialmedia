import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { UserContextProvider } from "./context/userContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
