import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(data);
      await axios.post("http://localhost:1000/user/register", data);
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
      alert("User registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Error registering user!");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center m-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-3/4"
      >
        <h1 className="text-center text-2xl font-bold">Signup page</h1>
        <div className="flex w-fit">
          <img src={signup} alt="sitgnup" className="w-1/2" />

          <div className="w-1/2 justify-center flex flex-col mt-20">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter full name"
                value={data.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
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
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
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
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
            >
              Sign Up
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/Login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
