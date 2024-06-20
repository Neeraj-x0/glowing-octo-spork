import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    location: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const SetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://machine-test-backend.onrender.com/signup", data);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400){
        setError(true);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Sign Up
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            value={data.name}
            name="name"
            onChange={SetData}
            placeholder="Full Name"
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <input
            type="email"
            value={data.email}
            name="email"
            onChange={SetData}
            placeholder="Email"
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <input
            type="tel"
            value={data.phone}
            name="phone"
            onChange={SetData}
            placeholder="Phone Number"
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <input
            type="text"
            value={data.location}
            name="location"
            onChange={SetData}
            placeholder="Location"
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <input
            type="password"
            value={data.password}
            name="password"
            onChange={SetData}
            placeholder="Password"
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <fieldset className="border border-gray-300 rounded-lg p-3">
            <legend className="text-sm font-medium text-gray-900 mb-1">
              Gender
            </legend>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  onChange={SetData}
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="gender"
                  value="male"
                />
                <span className="ml-2 text-gray-900">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  onChange={SetData}
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="gender"
                  value="female"
                />
                <span className="ml-2 text-gray-900">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  onChange={SetData}
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="gender"
                  value="other"
                />
                <span className="ml-2 text-gray-900">Other</span>
              </label>
            </div>
          </fieldset>

          <button
            onClick={HandleSubmit}
            className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Email already exists
          </p>
        )}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-black hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
