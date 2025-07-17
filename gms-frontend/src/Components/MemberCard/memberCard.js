import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from "react-router-dom";

const MemberCard = ({item}) => {
  return (
    <Link to={`/member/${item?._id}`} className="bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-105 active:shadow-lg cursor-pointer">
      <div className="w-28 h-28 flex justify-center relative items-center border-2 p-1 mx-auto rouded-full sm:shadow-none shadow-lg rounded-full">
        <img
          className="w-full h-full rounded-full"
          alt="Profil pic"
          src={item?.profilePic}
        />
        <CircleIcon
          className="absolute top-0 left-0"
          sx={{ color: item?.status==="Active" ? "greenyellow" : "red" }}
        />
      </div>

      <div className="mx-auto mt-5 text-center text-xl font-mono">
        {item?.name}
      </div>
      <div className="mx-auto mt-2 text-center text-xl font-mono">
        {`+91${item?.mobileNo}`}
      </div>
      <div className="mx-auto mt-2 text-center text-xl font-mono">
        Next Bill Date : {item?.nextBillDate.slice(0,10).split('-').reverse().join('-')}
      </div>
    </Link>
  );
};

export default MemberCard;
