import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchResult = ({
  pinnedPost,
  authorFilterHandler,
  categoryFilterHandler,
}) => {
  const blogs = useSelector((state) => state.posts);

  const navigate = useNavigate();

  return (
    <>
      <section className="w-full p-2 sm:pl-28 ">
        <h1 className="text-lg text-black font-bold mt-4 mb-2">
          Search Results{" "}
        </h1>
        <div className="flex flex-col border border-gray-400 rounded-lg bg-white p-4 gap-3 max-sm:flex-col ">
          {blogs.length
            ? blogs.map((blog) => {
                const formattedTitle = encodeURIComponent(
                  decodeURIComponent(blog.title).replace(/ /g, "-")
                );

                const handleBlogtitle = (e) => {
                  e.preventDefault();
                  navigate(`/blog-info/${blog.id}-${formattedTitle}`);
                };

                return (
                  <article
                    key={blog.id}
                    className="flex flex-row rounded-lg gap-3 border-gray-400 overflow-hidden"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-44 w-full object-cover scale-100 hover:scale-110 duration-1000 mb-1"
                        draggable="false"
                        src={blog.imageUrl}
                        alt={blog.title}
                      />
                    </div>

                    <div className="flex-1 bg-white p-2 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">
                          <span
                            onClick={() => categoryFilterHandler(blog.category)}
                            className="cursor-pointer inline-flex items-center px-3 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                          >
                            {blog.category}
                          </span>
                        </p>
                        <a href="# " className="block mt-1">
                          <p
                            className="text-base font-bold text-gray-900 w-full"
                            onClick={(e) => handleBlogtitle(e)}
                          >
                            {blog.title}
                          </p>
                        </a>
                        <p className="text-gray-700 text-sm w-full">
                          {blog.description && blog.description.length > 200
                            ? `${blog.description.substring(0, 200)}...`
                            : blog.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">Tags : {blog.tags}</div>
                      </div>
                    </div>
                  </article>
                );
              })
            : "No Match Found"}
        </div>
      </section>
    </>
  );
};

export default SearchResult;
