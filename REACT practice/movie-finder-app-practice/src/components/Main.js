import SearchBar from "./SearchBar";
import Movies from "./Movies";
import { useState } from "react";

const Main = () => {
  const [value, setValueBySearch] = useState("");

  return (
    <>
      <SearchBar setValueBySearch={setValueBySearch} />
      <Movies value={value} />
    </>
  );
};

export default Main;
