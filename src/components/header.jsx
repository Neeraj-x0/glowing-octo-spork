import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setDropdownOption } from "../redux/dropdownSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const dispatch = useDispatch();

  const sendDispatch = () => {
    dispatch(setDropdownOption(isDropdownOpen));
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    sendDispatch();
  };

  return (
    <div className="overflow-hidden w-[88vw] h-16 border-b flex justify-between items-center">
      <div className="border flex items-center px-2 gap-2 mx-4 rounded-lg w-1/5">
        <CiSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-max outline-none py-2 rounded"
        />
      </div>
      <div className="flex gap-4 items-center mx-3 relative">
        <button className="flex items-center gap-2 px-2 text-slate-500 py-2 rounded-lg ">
          <IoIosHelpCircleOutline className="text-2xl" />
          <span className="text-lg">Help Center</span>
        </button>
        <button
          className="flex items-center gap-2 px-2 py-2 rounded-lg focus:outline-none"
          onClick={toggleDropdown}
        >
          <span className="text-lg font-semibold px-2">John Doe</span>
          <img
            src="https://randomuser.me/api/portraits/men/43.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <FaChevronDown className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;
