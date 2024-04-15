import React, { createContext, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { searchByCategory, clear } from "../store/blogpost/search/actions"; // Import the actions

const CategoryFilterContext = createContext();

export const useCategoryFilterContext = () => {
  return useContext(CategoryFilterContext);
};

export const CategoryFilterProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [categoryFilterInfo, setCategoryFilterInfo] = useState({
    keyword: "",
    show: false,
  });

  function categoryFilterHandler(keyword) {
    dispatch(searchByCategory(keyword));
    setCategoryFilterInfo({
      keyword: keyword,
      show: true,
    });
  }

  function clearAuthorFilterHandler() {
    dispatch(clear());
    setCategoryFilterInfo({
      keyword: "",
      show: false,
    });
  }

  return (
    <CategoryFilterContext.Provider
      value={{
        categoryFilterInfo,
        categoryFilterHandler,
        clearAuthorFilterHandler,
      }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};
