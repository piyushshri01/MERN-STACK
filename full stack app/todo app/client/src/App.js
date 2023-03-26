import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoList from "./todo";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./loginSignup/login";
import { Signup } from "./loginSignup/signup";
import { Header } from "./header";
export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
