import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/latestPosts"
        );
        if (response.data && response.data.blogs) {
          setData(response.data.blogs);
        } else {
          console.error(
            "API response did not contain expected data format:",
            response.data
          );
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleDetails = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-fit m-auto mt-8 ">
        <h1 className="text-center p-5 bg-slate-400 text-2xl font-bold  ">
          Latest posts
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 m-20 mx-auto ">
        {data.map((blog) => (
          <div key={blog._id} className="shadow-lg rounded-lg overflow-hidden ">
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
                  <p className="text-gray-600">{blog.description}</p>{" "}
                </div>
              )}
              <p className="text-gray-500 text-sm mb-4">
                Posted on: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/Login"
        className="hover:text-blue-600 font-bold  text-center text-xl mx-auto ml-20"
      >
        All Posts ....
      </Link>
    </div>
  );
};

export default Home;
