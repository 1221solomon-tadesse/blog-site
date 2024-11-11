import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const AddPost = () => {
  const [data, setData] = useState({
    blogname: "",
    description: "",
    image: "",
  });
  const userId = localStorage.getItem('userId') 
  console.log(userId)
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data, userId)
    try {
      await axios.post("http://localhost:1000/api/v1/add", { data , userId});
      setData({
        blogname: "",
        description: "",
        image: "",
      });
      alert("post added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding posts!");
    }
  };

  const handleBackToBlogLists = () => {
    navigate("../BlogList");
  };

  return (
    <div className="flex bg-slate-200  w-1/2  p-6 justify-center border-2 rounded-lg shadow-lg  m-auto mt-20">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center m-4">Add New Post</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Post Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-orange-300"
            name="blogname"
            value={data.blogname}
            onChange={handleInputChange}
            placeholder="Enter post name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full border h-28 border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-orange-300"
            name="description"
            value={data.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-30 rounded-md shadow-sm p-2 focus:ring focus:ring-orange-300"
            name="image"
            value={data.image}
            onChange={handleInputChange}
            placeholder="Enter the URL of the image"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 transition duration-200"
          >
            Add Post
          </button>
          <button
            type="button"
            onClick={handleBackToBlogLists}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow hover:bg-gray-400 transition duration-200"
          >
            Back to Blogs
          </button>
        </div>
      </form>
      <div className="circlePosition absolute left-[50%] top-[50%] h-[200px] w-[200px] translate-x-[-50%] translate-y-[-50%] rounded-[100%] bg-[#28FF41] blur-[80px]"></div>
      <div className="circlePosition absolute left-[60%] top-[50%] h-[200px] w-[200px] translate-x-[-50%] translate-y-[-50%] rounded-[100%] bg-[#ab26fd] blur-[80px]"></div>
    </div>
  );
};

export default AddPost;
