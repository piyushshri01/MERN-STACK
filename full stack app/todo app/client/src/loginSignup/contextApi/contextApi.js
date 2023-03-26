import { createContext, useState } from "react";

export const userContext = createContext();
const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("todoToken")
  );
  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </userContext.Provider>
  );
};
export default UserContextProvider;