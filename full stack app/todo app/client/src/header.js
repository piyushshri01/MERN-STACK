import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { userContext } from "./loginSignup/contextApi/contextApi";
export const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const handleLogout = () => {
    localStorage.removeItem("todoToken");
    setIsLoggedIn(false);
  };
  // console.log(isLoggedIn, "isloogedin");

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Todo List App
      </Link>
      <div className="navbar-links">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};
