import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Switch from "react-switch";
import { ToastContainer, toast } from "react-toastify";

const TrainerDetail = () => {
  const backendURL = process.env.REACT_APP_BACKEND_API;
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Inactive");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/trainers/get-trainer/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.trainer);
      setStatus(response.data.trainer.status);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch trainer details");
    }
  };

  const handleSwitchBtn = async () => {
    let newStatus = status === "Active" ? "Inactive" : "Active";
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendURL}/trainers/change-status/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus(newStatus);
      toast.success("Status changed successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to change status");
    }
  };

  return (
    <div className="w-3/4 sm:w-[70%] md:w-3/5 md:h-1/2 text-black p-2 mx-auto">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 pr-4 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
      >
        <ArrowBackIcon /> Go Back
      </div>

      {data ? (
        <div className="mt-10 p-2">
          <div className="w-[100%] h-fit flex flex-col sm:flex-row">
            {/* image block */}
            <div className="w-full sm:w-1/3 mx-auto mb-5 sm:mb-0">
              <img className="w-full mx-auto rounded-full" src={data.profilePic} alt="Trainer Profile" />
            </div>

            {/* details block */}
            <div className="w-full sm:w-2/3 mt-5 sm:mt-0 p-5 text-xl space-y-4">
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Name:</span>
                <br />
                <span className="font-sans italic text-purple-700 ml-4">{data.name}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Mobile:</span>
                <br />
                <span className="font-sans italic text-purple-700 ml-4">{data.mobileNo}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Address:</span>
                <br />
                <span className="font-sans italic text-purple-700 ml-4">{data.address}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Joined Date:</span>
                <br />
                <span className="font-sans italic text-purple-700 ml-4">{data.createdAt?.slice(0, 10).split("-").reverse().join("-")}</span>
              </div>
              <div className="flex gap-4 text-2xl font-semibold items-center">
                <span className="font-serif font-bold text-indigo-600">Status:</span>
                <Switch
                  className="mt-1"
                  onColor="#6366F1"
                  checked={status === "Active"}
                  onChange={handleSwitchBtn}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl font-semibold text-gray-500 py-20">Loading trainer details...</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TrainerDetail;
