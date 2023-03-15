import { createContext, useState } from "react";

export const contextApiState = createContext();

const ContextApiProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return (
    <contextApiState.Provider value={{ count, setCount }}>
      {children}
    </contextApiState.Provider>
  );
};

export default ContextApiProvider;
