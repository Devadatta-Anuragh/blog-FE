import React, { useEffect, useState } from "react";
import { BsBookmarkPlus } from "react-icons/bs";
import { HiShare } from "react-icons/hi";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const BlogPost = ({ id }) => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("../data/data.json")
      .then((response) => response.json())
      .then((data) => {
        const blogPost = data.find((blog) => blog.id === parseInt(id));
        setBlogData(blogPost);
      });
  }, [id]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const { title, lastUpdated, estimatedReadTime, author, body } = blogData;

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-black">
        <span className="mr-1">Home</span>
        <span>/</span>
        <span className="ml-1">Blog</span>
      </nav>

      {/* Blog Title */}
      <div className="flex flex-row  items-center justify-between my-1">
        <h1 className="text-3xl text-black font-bold">{title}</h1>
        <div className="flex justify-items-end text-end mt-1.5 text-black">
          <span className="mr-2">
            <BsBookmarkPlus />
          </span>
          <span>
            <HiShare />
          </span>
        </div>
      </div>

      {/* Author and Hashtags */}
      <div className="flex flex-wrap justify-between items-center mt-2 ">
        <div className="flex gap-1 items-center">
          <img
            src="/author.png"
            alt="Author"
            className="rounded-full h-5 w-5 mr-2"
          />
          <span className="text-[16px] text-xs font-semibold text-gray-800">
            {author}
          </span>
          <span className="mr-2 text-sm text-gray-800">{lastUpdated}</span>
          <span className="mr-2 text-sm text-gray-800">
            {estimatedReadTime}
          </span>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center max-sm:mt-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-1.5 rounded-full mr-2">
            <FaTwitter />
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-1.5 rounded-full mr-2">
            <FaFacebookF />
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1.5 px-1.5 rounded-full">
            <FaWhatsapp />
          </button>
          <button className=" text-black font-bold py-2 px-4 rounded-full">
            <SlOptions />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Blog post content here */}
        {body.map((item, index) => {
          if (item.type === "paragraph") {
            return (
              <p key={index} className="font-[400] text-[16px] text-gray-800">
                {item.content}
              </p>
            );
          } else if (item.type === "listItem") {
            return (
              <h1
                key={index}
                className="text-xl text-black font-bold mt-4 mb-2"
              >
                {item.content}
              </h1>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default BlogPost;
