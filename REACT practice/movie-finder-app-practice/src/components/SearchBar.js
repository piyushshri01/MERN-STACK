import { useState } from "react";

const SearchBar = ({ setValueBySearch }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={() => setValueBySearch(value)}
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;
