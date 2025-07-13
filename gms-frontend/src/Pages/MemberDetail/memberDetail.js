import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const MemberDetail = () => {

  
  const [inputField, setInputField] = useState();


  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);

  const handleSwitchBtn = () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    setStatus(statuss);
  };

  const navigate = useNavigate();

  return (
    <div className="w-3/4 text-black p-2">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 pr-4 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
      >
        <ArrowBackIcon /> Go Back
      </div>

      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          {/* image wala block */}
          <div className="w-1/3 mx-auto">
            <img
              className="w-full mx-auto"
              src="https://cdn.pixabay.com/photo/2016/12/02/08/30/man-1877208_1280.jpg"
            />
          </div>

          {/* block for details */}
          <div className="w-2/3 mt-5 p-5 text-xl">
            <div className="mt-1 mb-2 text-2xl font-semibold">Name : Ankit</div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile : +918745123559
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address : Lucknow, UP
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date : 10-07-2025
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date : 10-12-2025
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              Status :
              <Switch
                className="mt-1  "
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={() => handleSwitchBtn()}
              />
            </div>

            <div
              onClick={() => {
                setRenew((prev) => !prev);
              }}
              className={` ${
                renew && status === "Active"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                  : null
              }  mt-4 p-3 border-2 border-slate-900 text-center font-medium w-full md:w-1/2 cursor-pointer rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white `}
            >
              Renew
            </div>

            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 justify-center items-center mt-5 mb-5 h-fit bg-slate-50 w-[100%]">
                <div className="w-full">
                  <div className=" justify-center items-center text-center my-5">
                    <div className="font-medium text-3xl">MemberShip</div>

                    <select className="w-full border-2 p-2 rounded-lg">
                      <option>1 Month Plan</option>
                      <option>2 Month Plan</option>
                    </select>

                    <div
                      className={`mt-1 p-3 border-4 border-slate-900 justify-center items-center mx-auto w-1/2 text-center  cursor-pointer  rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white`}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
