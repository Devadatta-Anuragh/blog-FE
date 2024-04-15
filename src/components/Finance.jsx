import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useCategoryFilterContext } from "./CategoryFilterProvider";

const Finance = () => {
  window.scrollTo(0, 0);

  const blogs = useSelector((state) => state.blogs);

  const { categoryFilterInfo, categoryFilterHandler } =
    useCategoryFilterContext();

  const financeBlogs = blogs.filter((blog) => blog.category === "Finance");

  return (
    <>
      <main className="relative bg-white pt-2 pb-20 px-4 sm:px-6 lg:pt-1 lg:pb-16 lg:px-8">
        <section className="w-full p-2 sm:pl-28 ">
          <h1 className="text-lg text-black font-bold mt-4 mb-2">Finance</h1>
          <div className="flex flex-col border border-gray-400 rounded-lg bg-white p-4 gap-3 max-sm:flex-col ">
            {financeBlogs.length
              ? financeBlogs.map((blog) => (
                  <Card
                    key={blog.id}
                    categoryFilterHandler={categoryFilterHandler}
                    blog={blog}
                  />
                ))
              : "No Results"}
          </div>
        </section>
      </main>
    </>
  );
};

export default Finance;
