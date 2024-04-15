import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  fetchBlogs,
  searchByCategory,
} from "../store/blogpost/search/actions";
import Card from "./Card";
import { useCategoryFilterContext } from "./CategoryFilterProvider";

const BlogPosts = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const { categoryFilterInfo, categoryFilterHandler } =
    useCategoryFilterContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/posts/get");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const posts = await response.json();
        console.log(posts);
        dispatch(fetchBlogs(posts));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="relative bg-white pt-2 pb-20 px-4 sm:px-6 lg:pt-1 lg:pb-16 lg:px-8">
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full lg:w-5/6">
          <section className="w-full p-2 sm:pl-28 ">
            <h1 className="text-lg text-black font-bold mt-4 mb-2">
              Latest Posts
            </h1>
            <div className="grid gap-4 lg:grid-cols-3 lg:max-w-none">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  blog={blog}
                  categoryFilterHandler={categoryFilterHandler}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BlogPosts;
