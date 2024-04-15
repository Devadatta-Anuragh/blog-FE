import React, { useEffect, useRef, useState } from "react";
import BlogPost from "./BlogPostContent";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogPostPage = () => {
  const blogs = useSelector((state) => state.blogs);

  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const commentInputRef = useRef(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    commentInputRef.current.focus();
  }, []);

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      document.body.style.overflow = "hidden"; // Disable scrolling when comments section is open
    } else {
      document.body.style.overflow = ""; // Enable scrolling when comments section is closed
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = commentInputRef.current.value.trim();
    if (newComment !== "") {
      setComments([...comments, newComment]);
      commentInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full md:w-4/5 p-4 sm:pl-28">
          {/* Body content */}
          <div className="bg-white p-4">
            {/* Your body content here */}

            <div className="font-light sm:mt-3 text-gray-500 sm:text-lg ">
              <BlogPost id={id} />
              <button
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="block w-full mb-4 text-black border border-slate-700 rounded-xl font-medium text-sm px-5 py-2.5 text-center "
                type="button"
                onClick={toggleComments}
              >
                Leave a comment...
              </button>
            </div>

            <div
              id="default-modal"
              tabIndex="-1"
              aria-hidden="true"
              className={`${
                showComments ? "flex" : "hidden"
              } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-gray-800 bg-opacity-50`}
            >
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                      Comments
                    </h3>
                    <button
                      type="button"
                      onClick={toggleComments}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                      data-modal-hide="default-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5 space-y-4">
                    {/* <h2 className="text-lg font-bold mb-4">Comments</h2> */}
                    <ul>
                      {comments.map((comment, index) => (
                        <li key={index} className="mb-2">
                          {comment}
                        </li>
                      ))}
                    </ul>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <textarea
                        ref={commentInputRef}
                        className="w-full border rounded-md p-2"
                        placeholder="Write your comment here..."
                        rows={4}
                      />
                      <button
                        type="submit"
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Post Comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
