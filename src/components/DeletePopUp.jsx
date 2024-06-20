import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleDelete } from "../redux/deletePop";
import { useCookies } from "react-cookie";
import axios from "axios";

const DeletePopUp = ({ email }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  let token = cookies.token;
  const handleDelete = () => {
    try {
      axios.post(
        "http://localhost:3000/profile/delete",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(toggleDelete(email));
  };

  const togglePop = () => {
    dispatch(toggleDelete(email));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 w-3/5 max-w-lg rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Are You Sure You want to Delete this contact
        </h2>
        <div className="flex justify-between gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-lg"
            onClick={togglePop}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;

DeletePopUp.propTypes = {
  email: PropTypes.string,
};
