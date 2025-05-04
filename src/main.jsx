import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import "./index.css"; // Tailwind should be here
import { BrowserRouter } from "react-router-dom";

function Root() {
  const [page, setPage] = useState(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) return "app";
    if (window.location.hash === "#signup") return "signup";
    return "login";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const user = localStorage.getItem("loggedInUser");
      if (user) {
        setPage("app");
      } else if (window.location.hash === "#signup") {
        setPage("signup");
      } else {
        setPage("login");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleLogin = () => setPage("app");
  const handleSignup = () => {
    window.location.hash = "#login";
    setPage("login");
  };

  if (page === "signup") return <SignUpPage onSignup={handleSignup} />;
  if (page === "login") return <LoginPage onLogin={handleLogin} />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)