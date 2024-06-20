import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenTrue, setTokenTrue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (newPassword === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.post(
          "https://machine-test-backend.onrender.com/verify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTokenTrue("valid");
      } catch (error) {
        setTokenTrue("invalid");
      }
    };

    if (token) {
      checkToken();
    } else {
      setTokenTrue("null");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("https://machine-test-backend.onrender.com/reset", {
        token,
        newPassword,
      });
      if (response.status === 200) {
        console.log("Password changed successfully");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(true);
      }
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://machine-test-backend.onrender.com/forgot", {
        email,
      });
      setSuccess(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(true);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {token && tokenTrue === "invalid" && (
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
            Invalid Token
          </h1>
          <p className="text-red-500 text-sm text-center">
            The token you've entered is invalid.
          </p>
        </div>
      )}
      {tokenTrue === "valid" && (
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
            Enter New Password
          </h1>
          <form className="flex flex-col gap-4">
            <label htmlFor="password" className="text-gray-700">
              New Password
            </label>
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              id="password"
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your new password"
              required
            />
            <label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Confirm your new password"
              required
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm text-left mt-2">
                Passwords do not match
              </p>
            )}
            <button
              type="submit"
              disabled={!passwordMatch}
              onClick={handleSubmit}
              className="bg-gray-900 disabled:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      )}
      {!success && tokenTrue == "null" && (
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
            Reset Password
          </h1>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <button
              type="submit"
              onClick={handleReset}
              className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Reset Password
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-sm text-left mt-2">Invalid Email</p>
          )}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Remembered your password?{" "}
              <a href="/login" className="text-black hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      )}
      {success && (
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
            Password Reset Email Sent
          </h1>
          <p className="text-gray-600 text-sm text-center">
            Check your email for a password reset link
          </p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
