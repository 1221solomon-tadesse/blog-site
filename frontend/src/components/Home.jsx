import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {data.map(
        (
          blog 
        ) => (
          <div key={blog._id} className="shadow-lg rounded-lg overflow-hidden">
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
              <h2 className="text-lg font-bold">{blog.blogname}</h2>
            </div>
             <div className="p-4">
            <h3 className="text-xl font-semibold">{blog.blogname}</h3>
            <p className="text-gray-700 mb-2">{blog.description}</p>
            <p className="text-gray-500 text-sm mb-4">
              Posted on: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
