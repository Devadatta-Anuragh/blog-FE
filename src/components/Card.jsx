import React, { useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

export default function Card({
  blog,
  authorFilterHandler,
  categoryFilterHandler,
}) {
  const { title, description, tags, imageUrl } = blog;

  const [comments, setComments] = useState([]);
  const commentInputRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [Like, setLike] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      document.body.style.overflow = "hidden"; // Disable scrolling when comments section is open
    } else {
      document.body.style.overflow = ""; // Enable scrolling when comments section is closed
    }
  };

  const toggleShare = () => {
    setShowShare(!showShare);
    if (!showShare) {
      document.body.style.overflow = "hidden"; // Disable scrolling when comments section is open
    } else {
      document.body.style.overflow = ""; // Enable scrolling when comments section is closed
    }
  };

  const handleLike = () => {
    setLike(!Like);
  };

  const handleSubmitComments = async (e) => {
    e.preventDefault();
    const newComment = commentInputRef.current.value.trim();
    if (newComment !== "") {
      try {
        const response = await fetch("http://localhost:3001/posts/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newComment,
            postId: blog._id, // Assuming you have a postId to associate the comment with the post
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          // Assuming the server responds with the newly created comment
          console.log(responseData);
          console.log(responseData.post.comments[0]);
          setComments(responseData.post.comments);

          commentInputRef.current.value = "";
        } else {
          console.error("Failed to post comment");
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`http://localhost:5174/`);
    alert("Link copied to clipboard!");
  };

  return (
    <article className="flex flex-col rounded-lg border border-gray-400 overflow-hidden">
      <div className="flex-shrink-0">
        <img
          className="h-44 w-full object-cover scale-100 hover:scale-110 duration-1000 mb-1"
          draggable="false"
          src={imageUrl}
          alt={title}
        />
      </div>

      <div className="flex-1 bg-white p-2 flex flex-col justify-between">
        <div className="flex-1">
          <a href="# " className="block mt-1">
            <p
              className="text-base font-bold text-gray-900 w-full"
              onClick={(e) => handleBlogtitle(e)}
            >
              Title : {title}
            </p>
          </a>
          {/* Display the content of the first paragraph */}
          <p className="text-gray-700 text-sm w-full">
            Description : {description}...
          </p>
          <p className="text-gray-700 text-sm w-full">Tags : {tags}</p>
        </div>
        <div className="flex items-center justify-between gap-2 mt-4">
          <div onClick={handleLike}>
            {!Like ? (
              <div className="flex flex-col cursor-pointer">
                <AiOutlineLike />
                <p className="text-xs font-medium  text-gray-900 ">Like</p>
              </div>
            ) : (
              <div className="flex flex-col cursor-pointer">
                <AiFillLike />
                <p className="text-xs font-medium  text-gray-900 ">
                  Liked
                </p>{" "}
              </div>
            )}
          </div>
          <div
            className="flex flex-col p-1 cursor-pointer "
            onClick={toggleShare}
          >
            <FaShare />{" "}
            <p
              // onClick={() => authorFilterHandler(author)}
              className="text-xs font-medium cursor-pointer text-gray-900"
            >
              Share
            </p>
          </div>

          <button
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="block w-full  text-black border border-slate-700 rounded-xl font-medium text-sm px-5 py-1 text-center "
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
                <ul>
                  <ul>
                    {comments.map((comment, index) => (
                      <li key={index} className="mb-2">
                        {comment}
                      </li>
                    ))}
                  </ul>
                </ul>
                <form onSubmit={handleSubmitComments} className="mt-4">
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

        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            showShare ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-gray-800 bg-opacity-50`}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-md">
              <div className="flex flex-col items-center justify-between p-4 md:p-5  rounded-t dark:border-gray-600">
                <div className="flex flex-row justify-between w-full mb-5">
                  {" "}
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Share
                  </h3>
                  <button
                    type="button"
                    onClick={toggleShare}
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

                <div className="relative flex-grow w-full">
                  <input
                    id="npm-install-copy-button"
                    type="text"
                    className="col-span-6  text-sm rounded-lg  block w-full p-2.5 bg-gray-800  placeholder-gray-400 text-whitebg-gray-50 border border-gray-300 text-gray-500"
                    value={`http://localhost:5173/`}
                    disabled
                    readOnly
                  />
                  <button
                    data-copy-to-clipboard-target="npm-install-copy-button"
                    data-tooltip-target="tooltip-copy-npm-install-copy-button"
                    className="absolute end-2 top-1/2 -translate-y-1/2

                  text-gray-500  hover:bg-gray-400
             rounded-lg p-2 inline-flex items-center justify-center"
                    onClick={handleCopy}
                  >
                    <span id="default-icon">
                      <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                    </span>
                    <span id="success-icon" className="hidden items-center">
                      <svg
                        className="w-3.5 h-3.5  text-blue-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
