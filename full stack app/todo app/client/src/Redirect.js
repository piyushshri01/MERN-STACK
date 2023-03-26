// import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { userContext } from "./loginSignup/contextApi/contextApi";

import ToDoList from "./todo";
import { Login } from "./loginSignup/login";
const Redirect = () => {
  const { isLoggedIn } = useContext(userContext);
  // const navigate = useNavigate();
  if (isLoggedIn) {
    return <ToDoList />;
  }

  return <Login />;
};
export default Redirect;