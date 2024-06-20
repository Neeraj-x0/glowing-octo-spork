import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://machine-test-backend.onrender.com/login", {
        email: username,
        password,
      });
      setCookie("token", response.data.token, { path: "/" });
      navigate("/");
    } catch (error) {
    
      setError(true);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
          Login
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            autoComplete="on"
            value={username}
            onChange={handleUsername}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            value={password}
            onChange={handlePassword}
            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Invalid username or password
          </p>
        )}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-black hover:underline">
              Sign Up
            </a>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Forgot Password?{" "}
            <a href="/forgot" className="text-black hover:underline">
              Reset Password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
