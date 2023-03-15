import { createContext, useState, useEffect } from "react";
export const MovieContext = createContext();
const API_KEY = "209e42e2c66ab2cba7c280981a877ace";

export default function ContextApiProvider({ children }) {
  const [data, setData] = useState([]);
  const [list, addToWishList] = useState([]);

  const fetchFire = async () => {
    const values = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=2
    `);
    const res = await values.json();
    setData(res.results);
  };

  useEffect(() => {
    fetchFire();
  }, []);
  return (
    <MovieContext.Provider value={{ data, setData, list, addToWishList }}>
      {children}
    </MovieContext.Provider>
  );
}
