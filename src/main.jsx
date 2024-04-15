import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BlogPosts from "./components/BlogPosts.jsx";
import BlogPostPage from "./components/BlogPostPage.jsx";
import SearchResult from "./components/SearchResult.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/AuthProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Create from "./components/Create.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <BlogPosts />,
      },
      {
        path: "blog-info/:id",
        element: <BlogPostPage />,
      },
      {
        path: "search-result",
        element: <SearchResult />,
      },
      {
        path: "create",
        element: <Create />,
      },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="107954496633-879mkm2p1cacotlhocqb52nqqff4djng.apps.googleusercontent.com">
      <AuthProvider docCookie={document.cookie}>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>{" "}
  </React.StrictMode>
);
