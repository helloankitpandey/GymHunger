import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

const TrainerCard = ({item, deleteTrainer}) => {
  return (
    <div className="relative bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-105 active:shadow-lg">
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteTrainer(item._id);
        }}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        aria-label="Delete Trainer"
      >
        <CloseIcon />
      </button>
      <Link to={`/trainer/${item?._id}`} className="block">
        <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rouded-full sm:shadow-none shadow-lg rounded-full">
          <img
            className="w-full h-full rounded-full"
            alt="Profile pic"
            src={item?.profilePic}
          />
          <CircleIcon
            className="absolute top-0 left-0"
            sx={{ color: item?.status==="Active" ? "greenyellow" : "red" }}
          />
        </div>

        <div className="mx-auto mt-5 text-center text-xl font-serif font-bold text-indigo-600">
          {item?.name}
        </div>
        <div className="mx-auto mt-2 text-center text-xl">
          <span className="font-serif font-semibold text-pink-600">Mobile: </span>
          <span className="font-sans italic text-purple-700">{`+91${item?.mobileNo}`}</span>
        </div>
      </Link>
    </div>
  );
};

export default TrainerCard;
