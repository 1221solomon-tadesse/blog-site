import React, { useState, useEffect } from "react";
import axios from "axios";

const Mypost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({
    blogname: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          throw new Error("User not logged in or user ID missing");
        }

        const response = await axios.get(
          `http://localhost:1000/api/v1/getUserBlogs/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:1000/api/v1/deleteBlog/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditPostId(post._id);
    setUpdatedBlog({
      blogname: post.blogname,
      description: post.description,
      image: post.image,
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:1000/api/v1/updateBlogs/${editPostId}`,
        updatedBlog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(
        posts.map((post) =>
          post._id === editPostId ? { ...post, ...updatedBlog } : post
        )
      );
      setEditPostId(null);
      setUpdatedBlog({ blogname: "", description: "", image: "" });
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Blog Posts</h2>
      <ul className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li
              key={post._id}
              className="border border-gray-300 p-4 rounded shadow"
            >
              <h3 className="text-xl font-semibold">{post.blogname}</h3>
              <p>{post.description}</p>
              <p className="text-gray-500">
                Posted on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <img
                src={post.image}
                alt={post.blogname}
                className="mt-2 w-full h-auto rounded"
              />
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </ul>

      {editPostId && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Update Blog Post</h3>
          <input
            type="text"
            value={updatedBlog.blogname}
            onChange={(e) =>
              setUpdatedBlog({ ...updatedBlog, blogname: e.target.value })
            }
            placeholder="Blog Name"
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={updatedBlog.description}
            onChange={(e) =>
              setUpdatedBlog({ ...updatedBlog, description: e.target.value })
            }
            placeholder="Description"
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            value={updatedBlog.image}
            onChange={(e) =>
              setUpdatedBlog({ ...updatedBlog, image: e.target.value })
            }
            placeholder="Image URL"
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default Mypost;
