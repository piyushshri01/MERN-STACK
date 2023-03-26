import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { userContext } from "./contextApi/contextApi";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(userContext);
  const getData = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const res = await axios.post(
      "https://todo-api-main-server.vercel.app/v1/login",
      user
    );
    console.log(res.data);
    if (res.data.token !== "") {
      localStorage.setItem("todoToken", res.data.token);
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={getData} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
};
