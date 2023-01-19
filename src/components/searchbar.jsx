import React from "react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ handleSubmit, placeholder }) => {
  const searchRef = useRef();

  return (
    <form onSubmit={(e) => handleSubmit(e, searchRef)} className="w-2/5">
      <label className="w-4/5 rounded-full bg-white mb-4 h-8 text-left flex items-center pl-4 justify-between">
        <input
          type="text"
          ref={searchRef}
          placeholder={placeholder}
          className="w-full outline-none h-full"
        ></input>
        <button type="submit">
          <BsSearch
            className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full h-8 w-9 p-1.5 "
            size="1rem"
            color="white"
          />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
