import { useContext } from "react";
import { contextApiState } from "./contextApi";
const Info = () => {
  const { count, setCount } = useContext(contextApiState);
  // console.log(count);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>increase</button>
      <button onClick={() => setCount(count - 1)}>decrease</button>
    </>
  );
};

export default Info;
