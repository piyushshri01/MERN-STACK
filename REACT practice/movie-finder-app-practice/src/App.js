import "./styles.css";
import NavbarCom from "./components/Navbar";
import Main from "./components/Main";
import MovieDetails from "./components/MovieDetails";
import WishList from "./components/wishlist";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <NavbarCom />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Movie/:id" element={<MovieDetails />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}
