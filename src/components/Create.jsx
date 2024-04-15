import React, { useState } from "react";

const CreateComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3001/posts/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle successful response
        console.log("Post created successfully");
        // Reset form fields after successful submission
        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);
      } else {
        // Handle unsuccessful response
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow border border-gray-900 md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            New Post
          </h1>
          <form
            method="POST"
            action="http://localhost:3001/posts/create"
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block w-full border focus:outline-none border-gray-900 p-1
               rounded-md shadow-sm "
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 block w-full border focus:outline-none border-gray-900 rounded-md shadow-sm sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags (Enter tags with space)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={tags}
                onChange={handleTagsChange}
                className="mt-1 block w-full border focus:outline-none border-gray-900 p-1 rounded-md shadow-sm  sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-900 p-1 focus:outline-none  rounded-md shadow-sm  sm:text-sm"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComponent;
