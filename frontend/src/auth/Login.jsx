import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1000/auth/login",
        data
      );
      console.log("Response Data:", response.data);

      const { token, role, user } = response.data;

      // Store token, role, and email in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user?._id || "");
      localStorage.setItem("email", user?.email || "");
      localStorage.setItem("isloggedIn", true);

      setLoading(false);
      if (role === "admin") {
        navigate("/BlogList");
        alert("Admin logged in successfully!");
      } else {
        navigate("/BlogList");
        alert("User logged in successfully!");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password");
      } else {
        console.error(error);
        setServerError("Error logging in!");
      }
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    setServerError(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={data.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={data.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {serverError && (
          <p className="text-red-600 text-center mt-3">{serverError}</p>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
