// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { PiChartPieLight } from "react-icons/pi";
import { FaRegNoteSticky } from "react-icons/fa6";
import { PiNotepad } from "react-icons/pi";
import { LuLineChart } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoGridOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { CiBellOn } from "react-icons/ci";

const SideBar = () => {
  return (
    <div className="flex flex-col w-[12vw] border-r h-screen bg-slate-50">
      <h1 className="px-14 h-16 w-max text-center py-4 font-semibold border-b">Tecforz Innovation</h1>
      <div className="border-b flex flex-col gap-4 items-start px-4 py-4  text-slate-700">
        <button className="flex items-center gap-2 w-full rounded-md duration-150  hover:bg-slate-300  hover:text-black px-2 py-2">
          <PiChartPieLight className="text-2xl font-bold" />
          <span>Dashboard</span>
        </button>

        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <CiBellOn className="text-2xl" />
          <span>Notification</span>
        </button>
        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <FaRegNoteSticky className="text-xl" />
          <span>Notes</span>
        </button>
        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <PiNotepad className="text-2xl" />
          <span>Tasks</span>
        </button>
        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <MdOutlineEmail className="text-2xl" />
          <span>Emails</span>
        </button>
        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <IoCalendarNumberOutline className="text-2xl" />
          <span>Calendar</span>
        </button>
      </div>
      <div className="border-b flex flex-col gap-4 py-4 text-slate-700">
        <h2 className="px-8">Database</h2>
        <div className="flex flex-col items-start gap-4 px-6">
          <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
            <LuLineChart className="text-2xl" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
            <RiContactsBook3Line className="text-2xl" />
            <span>Contacts</span>
          </button>
          <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
            <HiMiniBuildingOffice2 className="text-2xl" />
            <span>Companies</span>
          </button>
        </div>
      </div>
      <div className="border-b flex flex-col gap-4 items-start py-4 px-6  text-slate-700 ">
        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <IoGridOutline className="text-2xl" />
          <span>Integrations</span>
        </button>
        <button className="flex items-center gap-2 w-full rounded-md duration-150 hover:bg-slate-300  hover:text-black px-2 py-2">
          <GoGear className="text-2xl" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
