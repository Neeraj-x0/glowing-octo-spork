import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { togglePopUp } from "../redux/popUpSlice";
import PropTypes from "prop-types";
import axios from "axios";
import { useCookies } from "react-cookie";

const PopUp = ({ action, email }) => {
  const [data, setData] = useState({});
  const [cookies] = useCookies(["token"]);
  let token = cookies.token;

  const [roleError, setRoleError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [exists, setExists] = useState(false);

  const SetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const closePopUp = () => {
    dispatch(togglePopUp({ action: null, email: null }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Reset all error states
    setNameError(false);
    setLocationError(false);
    setEmailError(false);
    setPhoneError(false);
    setRoleError(false);
    setGenderError(false);
    setExists(false);

    if (action !== "edit") {
      if (!data.name) {
        setNameError(true);
        hasError = true;
      }
      if (!data.location) {
        setLocationError(true);
        hasError = true;
      }
      if (!data.email) {
        setEmailError(true);
        hasError = true;
      }
      if (!data.phone) {
        setPhoneError(true);
        hasError = true;
      }
      if (!data.role) {
        setRoleError(true);
        hasError = true;
      }
      if (!data.gender) {
        setGenderError(true);
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    // Remove empty fields
    const sanitizedData = { ...data };
    Object.keys(sanitizedData).forEach((key) => {
      if (sanitizedData[key] === "") {
        delete sanitizedData[key];
      }
    });

    try {
      const url =
        action === "edit"
          ? `https://machine-backend.neerajx0.xyz/profile/editUser`
          : `https://machine-backend.neerajx0.xyz/profile/addUser`;

      await axios.post(
        url,
        { ...sanitizedData, oldMail: email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      closePopUp();
    } catch (err) {
      if (err.response?.status === 400) {
        setExists(true);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 w-3/5 max-w-lg rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          {action === "edit" ? "Edit" : "Add"} Contact
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={SetData}
            value={data.name || ""}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
            required
          />
          {nameError && (
            <p className="text-red-500 text-sm">Please enter your name</p>
          )}

          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={SetData}
            value={data.location || ""}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
            required
          />
          {locationError && (
            <p className="text-red-500 text-sm">Please enter your location</p>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={SetData}
            value={data.email || ""}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm">Please enter your email</p>
          )}
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            onChange={SetData}
            value={data.phone || ""}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:border-black"
            required
          />
          {phoneError && (
            <p className="text-red-500 text-sm">
              Please enter your phone number
            </p>
          )}
          <fieldset className="border border-gray-300 rounded-lg p-3">
            <legend className="text-sm font-medium text-gray-900 mb-1">
              Choose Role
            </legend>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="role"
                  value="customer"
                  onChange={SetData}
                  required
                />
                <span className="ml-2 text-gray-900">Customer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="role"
                  value="employee"
                  onChange={SetData}
                  required
                />
                <span className="ml-2 text-gray-900">Employee</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="role"
                  value="partner"
                  onChange={SetData}
                  required
                />
                <span className="ml-2 text-gray-900">Partner</span>
              </label>
            </div>
            {roleError && (
              <p className="text-red-500 text-sm">Please select a role</p>
            )}
          </fieldset>
          <fieldset className="border border-gray-300 rounded-lg p-3">
            <legend className="text-sm font-medium text-gray-900 mb-1">
              Gender
            </legend>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="gender"
                  value="male"
                  onChange={SetData}
                  required
                />
                <span className="ml-2 text-gray-900">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="gender"
                  value="female"
                  onChange={SetData}
                  required
                />
                <span className="ml-2 text-gray-900">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-gray-600 border-gray-300 focus:ring-gray-400"
                  name="gender"
                  value="other"
                  onChange={SetData}
                  required
                />
                <span className="ml-2 text-gray-900">Other</span>
              </label>
            </div>
            {genderError && (
              <p className="text-red-500 text-sm">Please select a gender</p>
            )}
          </fieldset>
          {exists && (
            <p className="text-red-500 text-sm">This email is already in use</p>
          )}
          <div className="flex gap-4 mt-6 justify-end">
            <button
              onClick={closePopUp}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200 focus:outline-none transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={HandleSubmit}
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  action: PropTypes.string,
  email: PropTypes.string,
};

export default PopUp;
