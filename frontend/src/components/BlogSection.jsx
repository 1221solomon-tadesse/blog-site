import React, { useState } from "react";

const BlogSection = ({ data, isLoading }) => {
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  const handleToggleDetails = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center">
        <h2>No blogs found.</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 m-20 mx-auto">
      {data.map((blog) => (
        <div key={blog._id} className="shadow-lg rounded-lg overflow-hidden">
          {blog.image && (
            <div className="h-70 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.blogname}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="text-lg font-bold">{blog.blogname}</h2>
            <button
              onClick={() => handleToggleDetails(blog._id)}
              className="text-blue-500 hover:underline"
            >
              {expandedBlogId === blog._id ? "Hide Details" : "Show Details"}
            </button>
            {expandedBlogId === blog._id && (
              <div className="mt-2 p-2 border-t border-gray-300">
                <p className="text-gray-600">{blog.description}</p> 
              </div>
            )}
            <p className="text-gray-500 text-sm mt-4">
              Posted on: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default BlogSection;
