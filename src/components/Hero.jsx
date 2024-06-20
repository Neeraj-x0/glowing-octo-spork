import React, { useEffect, useState } from "react";
import { MdOutlineViewAgenda, MdOutlineGridView, MdSort } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi2";
import { RiTableLine } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { togglePopUp } from "../redux/popUpSlice";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const selectedOption = useSelector((state) => state.dropdown.selectedOption);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendDispatch = () => {
    dispatch(togglePopUp({ action: "add" }));
  };

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "https://machine-backend.neerajx0.xyz/profile/users",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setData(response.data);
    };
    fetchData();
  }, []);

  const employee = data.filter((contact) => contact.role === "employee");
  const partners = data.filter((contact) => contact.role === "partner");
  const customers = data.filter((contact) => contact.role === "customer");
  return (
    <div>
      {/* DropDown */}
      {selectedOption && (
        <div className="absolute flex flex-col w-40 bg-white rounded-lg shadow-md right-5 border border-gray-200">
          <button className="py-2 w-full text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="py-2 w-full text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}

      {/* NavBar */}
      <div className="border-b h-20 flex items-center justify-between">
        <h2 className="text-3xl mx-6 font-semibold">Contacts</h2>
        <div className="flex px-14 w-full">
          <button className="flex gap-2 py-2 rounded-lg mx-4">
            <MdOutlineViewAgenda className="text-2xl" />
            <span>List</span>
          </button>
          <button className="flex gap-2 py-2 rounded-lg mx-4">
            <HiOutlineChartBar className="text-2xl rotate-180 " />
            <span>Kanban</span>
          </button>
          <button className="flex gap-2 py-2 rounded-lg mx-4">
            <RiTableLine className="text-2xl" />
            <span>Table</span>
          </button>
          <button className="flex gap-2 py-2 rounded-lg mx-4">
            <MdOutlineGridView className="text-2xl" />
            <span>Grid</span>
          </button>
        </div>
        <div className="flex mx-10 pr-3 gap-2 ">
          <div className="flex gap-2 border-r">
            <button className="border-2 gap-2 border-black rounded-lg border-b-4 w-max flex px-5 py-2">
              <MdSort className="text-2xl" />
              <span>Sort By</span>
            </button>
            <button className="border-2 gap-2 border-black rounded-lg border-b-4 w-max flex px-5 py-2">
              <LuFilter className="text-2xl" />
              <span>Filter</span>
            </button>
          </div>
          <button
            onClick={sendDispatch}
            className="flex gap-2 rounded-lg w-max bg-gray-950 text-slate-200 font-semibold px-5 py-2"
          >
            <FiPlus className="text-2xl" />
            <span>New Contact</span>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full h-max items-center overflow-x-hidden justify-between flex p-16 ">
        <div className="w-[25vw] border rounded-lg">
          <div className="p-4 border-black items-center flex">
            <FaChevronDown className="mr-2 text-2xl" />
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              Customers
            </span>
            <span className="bg-slate-200 mx-2 rounded px-2 py-1 ">
              {customers.length}
            </span>
            <div className="w-full flex justify-end">
              <FiPlus className="text-2xl cursor-pointer" />
            </div>
          </div>
          {/* Contact List */}
          <div className="overflow-y-auto max-h-[70vh] min-h-[70vh]">
            {customers.map((contact) => (
              <ContactCard key={contact.email} contact={contact} />
            ))}
          </div>
        </div>

        <div className="w-[25vw] border rounded-lg">
          <div className="p-4 border-black items-center flex">
            <FaChevronDown className="mr-2 text-2xl" />
            <span className="bg-indigo-700 bg-opacity-30 text-indigo-700 px-2 py-1 rounded">
              Employee
            </span>
            <span className="bg-slate-200 mx-2 rounded px-2 py-1 ">
              {employee.length}
            </span>
            <div className="w-full flex justify-end">
              <FiPlus className="text-2xl cursor-pointer" />
            </div>
          </div>
          {/* Contact List */}
          <div className="overflow-y-auto max-h-[70vh] min-h-[70vh]">
            {employee.map((contact) => (
              <ContactCard key={contact.email} contact={contact} />
            ))}
          </div>
        </div>

        <div className="w-[25vw] border rounded-lg">
          <div className="p-4 border-black items-center flex">
            <FaChevronDown className="mr-2 text-2xl" />
            <span className="bg-orange-400 bg-opacity-30 text-amber-700 px-2 py-1 rounded">
              Partners
            </span>
            <span className="bg-slate-200 mx-2 rounded px-2 py-1 ">
              {partners.length}
            </span>
            <div className="w-full flex justify-end">
              <FiPlus className="text-2xl cursor-pointer" />
            </div>
          </div>
          {/* Contact List */}
          <div className="overflow-y-auto max-h-[70vh] min-h-[70vh]">
            {partners.map((contact) => (
              <ContactCard key={contact.email} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* Contact List */
}
