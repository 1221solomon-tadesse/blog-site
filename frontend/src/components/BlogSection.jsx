import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogSection = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(data);

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete blog with ID:", id);
    try {
      await axios.delete(`http://localhost:1000/api/v1/deleteBlog/${id}`);
      console.log("Blog deleted successfully");
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center">
        <h2>No blogs found.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
      {blogs.map((blog) => (
        <div key={blog._id} className=" shadow-lg rounded-lg overflow-hidden">
          {blog.image && (
            <div className="h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.blogname}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold">{blog.blogname}</h3>
            <p className="text-gray-700 mb-2">{blog.description}</p>
            <p className="text-gray-500 text-sm mb-4">
              Posted on: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
           
              <div className="flex justify-between">
                <button
                  onClick={() => handleUpdate(blog._id)}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSection;
