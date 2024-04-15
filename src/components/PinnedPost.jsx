import React from "react";
import { useNavigate } from "react-router-dom";

const PinnedPost = ({
  pinnedPost,
  authorFilterHandler,
  categoryFilterHandler,
}) => {
  const {
    title,
    author,
    category,
    author_image,
    lastUpdated,
    blog_post_background,
    body,
    id,
  } = pinnedPost;
  const navigate = useNavigate();
  const formattedTitle = encodeURIComponent(
    decodeURIComponent(title).replace(/ /g, "-")
  );
  const handleBlogtitle = (e) => {
    e.preventDefault();
    navigate(`/blog-info/${id}-${formattedTitle}`);
  };

  // Find the first paragraph in the body array and extract its content
  let firstParagraphContent = "";
  const firstParagraph = body.find((item) => item.type === "paragraph");
  if (firstParagraph) {
    firstParagraphContent = firstParagraph.content.substring(0, 230);
  }

  return (
    <article className="flex flex-row max-sm:flex-col rounded-lg gap-3 border-gray-400 overflow-hidden">
      <div className="flex-shrink-0">
        <img
          className="h-44 w-full object-cover scale-100 hover:scale-110 duration-1000 mb-1"
          draggable="false"
          src={blog_post_background}
          alt={title}
        />
      </div>

      <div className="flex-1 bg-white p-2 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">
            <span
              onClick={() => categoryFilterHandler(category)}
              className="cursor-pointer inline-flex items-center px-3 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {category}
            </span>
          </p>
          <a href="# " className="block mt-1">
            <p
              className="text-base font-bold text-gray-900 w-full"
              onClick={(e) => handleBlogtitle(e)}
            >
              {title}
            </p>
          </a>
          {/* Display the content of the first paragraph */}
          <p className="text-gray-700 text-sm w-full">
            {firstParagraphContent}...
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8 rounded-full" src={author_image} alt="" />
          </div>
          <div className="ml-3  w-full">
            <div className="flex flex-row justify-between">
              <p
                onClick={() => authorFilterHandler(author)}
                className="text-xs font-medium cursor-pointer text-gray-900 hover:underline"
              >
                {author}
              </p>
              <p className="text-purple-600 text-xs font-medium cursor-pointer">
                Read more
              </p>
            </div>
            <div className="flex space-x-1 text-[10px] text-gray-500">
              <time dateTime="2020-03-16">{lastUpdated}</time>
              <span aria-hidden="true"> &middot; </span>
              <span> 6 min read </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PinnedPost;
