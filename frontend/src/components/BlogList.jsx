import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogSection from "./BlogSection"; 
const BlogList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getBlogs"
        );
        console.log("API response:", response);
        if (response.data && response.data.blogs) {
          setData(response.data.blogs);
        } else {
          console.error(
            "API response did not contain expected data format:",
            response.data
          );
          setData([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center my-6 bg-green-500 text-white py-2 rounded-md">
        Blog Section
      </h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : data.length > 0 ? (
        <BlogSection data={data} isLoading={isLoading} />
      ) : (
        <div className="text-center">No blogs available</div>
      )}
    </div>
  );
};

export default BlogList;