import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { LuPencil } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { togglePopUp } from "../redux/popUpSlice";
import { toggleDelete } from "../redux/deletePop";

const ContactCard = ({ contact }) => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const toggleEditPopup = () => {
    dispatch(togglePopUp({ action: "edit", email: contact.email }));
  };

  const toggleDeletePopup = () => {
    dispatch(toggleDelete(contact.email));
  };

  return (
    <>
      <div key={contact.phone} className="relative ">
        <div className="flex  flex-col items-center border rounded justify-between p-4 m-4">
          <div className="flex w-full">
            <div className="relative inline-block">
              <img
                src={
                  "https://ui-avatars.com/api/?name=" +
                  contact.name.replace(" ", "+") +
                  "&background=random&color=fff&size=128&rounded=true&bold=true&length=1&font-size=0.33"
                }
                alt="profile"
                className="w-14  h-14 rounded-full"
              />
              {contact.gender === "male" ? (
                <IoIosMale className="text-xl border p-[2px] absolute bottom-2 right-2 transform translate-x-1/2 translate-y-1/2 bg-white rounded-full" />
              ) : (
                <IoIosFemale className="text-xl border p-[2px] absolute bottom-2 right-2 transform translate-x-1/2 translate-y-1/2 bg-white rounded-full" />
              )}
            </div>

            <div className="w-full pl-5">
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <div className="flex gap-2">
                <CiLocationOn className="text-xl" />
                <span>{contact.location}</span>
              </div>
            </div>
            <button onClick={toggleDropdown} className="relative z-10">
              <SlOptionsVertical className="text-2xl" />
            </button>
          </div>

          {dropdown && (
            <div className="absolute top-14 right-4 z-20 w-40 bg-white rounded-lg shadow-md border border-gray-200">
              <button
                className="py-2 px-4 w-full text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                onClick={toggleEditPopup}
              >
                <span className="flex items-center gap-2">
                  <LuPencil className="text-xl" />
                  Edit
                </span>
              </button>
              <button
                className="py-2 px-4 w-full text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                onClick={toggleDeletePopup}
              >
                <span className="flex text-red-500 items-center gap-2">
                  <HiOutlineTrash className="text-xl" />
                  Delete
                </span>
              </button>
            </div>
          )}
          <div className="flex flex-col w-full  gap-2 mt-4">
            <div className="flex items-center gap-2">
              <MdOutlineEmail className="text-xl text-slate-600" />
              <a href={"mailto:" + contact.email}>
                <u>{contact.email}</u>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineLocalPhone className="text-xl text-slate-600" />
              <a href={"tel:" + contact.phone}>{contact.phone}</a>
            </div>
          </div>

          <div className="flex gap-2 justify-between w-full mt-4">
            <a href={"tel:" + contact.phone} className="w-full" >
              <button className="border-2 items-center flex  justify-center gap-3 border-black rounded-lg w-full py-2">
                <MdOutlineLocalPhone className="text-xl" />
                Call
              </button>
            </a>
            <a href={`mailto:${contact.email}`} className="w-full">
              <button className="border-2 items-center flex justify-center gap-3 border-black rounded-lg w-full py-2">
                <MdOutlineEmail className="text-xl" />
                Email
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactCard;
