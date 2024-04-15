import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchByKeyword } from "../store/blogpost/search/actions";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { useCategoryFilterContext } from "./CategoryFilterProvider";
import deleteSvg from "../assets/delete.svg";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryFilterInfo, clearAuthorFilterHandler } =
    useCategoryFilterContext();

  function onSearch(keyword) {
    dispatch(searchByKeyword(keyword));
  }

  const handleLogout = () => {
    if (window.gapi && window.gapi.auth2) {
      window.gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => {
          console.log("User signed out from Google");
        });
    }

    // Remove the cookies or perform logout logic here
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "Credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Cookies cleared");
    // Redirect to the home page or any other desired route
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-300 px-4 lg:px-6 py-2">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <div className="sm:inline-flex flex-1 sm:flex-row flex-wrap flex-col items-center">
            <div className="flex-1 sm:w-1/2">
              <Search onSearch={onSearch} />
            </div>
            <div className="flex max-sm:mt-3 w-1/2 justify-start items-center gap-2">
              {categoryFilterInfo.show && (
                <p className="bg-slate-200 px-2 py-1 rounded-full">
                  {categoryFilterInfo.keyword}
                </p>
              )}
              {categoryFilterInfo.show && (
                <button
                  onClick={clearAuthorFilterHandler}
                  className="flex justify-center items-center gap-1 cursor-pointer bg-red-200 hover:bg-red-300 px-2 max-sm:px-3 py-1 rounded-full"
                >
                  <img className="inline-block" src={deleteSvg} alt="clear" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <div
            className="flex flex-row justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-row mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Create
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-2 my-auto  py-1 pr-4 pl-3 text-white border rounded-lg border-gray-100 bg-blue-500  lg:border  "
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
