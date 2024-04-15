import React from "react";
import { Provider } from "react-redux";
import Navigation from "./components/NavBar";
import store from "./store/index";
import { Outlet } from "react-router-dom";
import { CategoryFilterProvider } from "./components/CategoryFilterProvider";

function App() {
  return (
    <Provider store={store}>
      <CategoryFilterProvider>
        <Navigation />
        <Outlet />
      </CategoryFilterProvider>
    </Provider>
  );
}

export default App;
