import React, { useRef } from "react";
import search from "../assets/search.svg";
import { useNavigate } from "react-router-dom";

export default function Search({ onSearch }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(inputRef.current.value);
    navigate("/search-result");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border  top-5  border-gray-400 inline-flex items-center w-11/12 lg:w-2/2 mx-auto bg-white  h-10 px-5 rounded-full text-sm "
    >
      <input
        ref={inputRef}
        className="outline-none border-none h-full w-full mr-2"
        type="search"
        name="search"
        placeholder="Search"
      />
      <button type="submit" className="inline h-6 cursor-pointer">
        <img src={search} alt="Search" />
      </button>
    </form>
  );
}
