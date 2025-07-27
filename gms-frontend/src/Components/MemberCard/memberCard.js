import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { Link } from "react-router-dom";

const MemberCard = ({ item, onDelete }) => {
  const backendURL = process.env.REACT_APP_BACKEND_API;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete member ${item.name}?`)) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${backendURL}/members/delete-member/${item._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (onDelete) {
          onDelete(item._id);
        }
      } catch (error) {
        console.error("Failed to delete member:", error);
        alert("Failed to delete member. Please try again.");
      }
    }
  };

  return (
    <Link
      to={`/member/${item?._id}`}
      className="relative bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-105 active:shadow-lg cursor-pointer"
    >
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 z-10 bg-white text-black border border-black rounded p-1 hover:bg-gray-200 focus:outline-none"
        title="Delete Member"
      >
        <CloseIcon fontSize="small" />
      </button>
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rouded-full sm:shadow-none shadow-lg rounded-full">
        <img
          className="w-full h-full rounded-full"
          alt="Profil pic"
          src={item?.profilePic}
        />
        <CircleIcon
          className="absolute top-0 left-0"
          sx={{ color: item?.status === "Active" ? "greenyellow" : "red" }}
        />
      </div>

      <div className="mx-auto mt-5 text-center text-xl font-serif font-bold text-indigo-600">
        {item?.name}
      </div>
      <div className="mx-auto mt-2 text-center text-xl">
        <span className="font-serif font-semibold text-pink-600">Mobile: </span>
        <span className="font-sans italic text-purple-700">{`+91${item?.mobileNo}`}</span>
      </div>
      <div className="mx-auto mt-2 text-center text-xl">
        <span className="font-serif font-semibold text-pink-600">Next Bill Date: </span>
        <span className="font-sans italic text-purple-700">{item?.nextBillDate.slice(0, 10).split('-').reverse().join('-')}</span>
      </div>
    </Link>
  );
};

export default MemberCard;
