import React, { useEffect, useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const MemberDetail = () => {
  const backendURL = process.env.REACT_APP_BACKEND_API;

  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState("");
  const hasFetched = useRef(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleSwitchBtn = async () => {
    const newStatus = status === "Active" ? "Pending" : "Active";
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${backendURL}/members/change-status/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus(newStatus);
      toast.success("Status Changed");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  const isDateInPast = (inputdate) => {
    const today = new Date();
    const givenDate = new Date(inputdate);
    return givenDate < today;
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData();
      fetchMembership();
      hasFetched.current = true;
    }
  }, []);

  const fetchMembership = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/plans/get-membership`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembership(response.data.membership);
      if (response.data.membership.length > 0) {
        setPlanMember(response.data.membership[0]._id);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong");
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/members/get-member/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.member);
      setStatus(response.data.member.status);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error("Failed to Fetch Data");
    }
  };

  const handelOnChangeSelect = (event) => {
    setPlanMember(event.target.value);
  };

  const handelRenewSaveBtn = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${backendURL}/members/update-member-plan/${id}`,
        { membership: planMember },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.member);
      toast.success("Plan updated successfully !!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update Data");
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

      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/3 mx-auto mb-5 sm:mb-0">
            <img className="w-full mx-auto" src={data?.profilePic} />
          </div>

            <div className="w-full sm:w-2/3 mt-5 sm:mt-0 p-5 text-xl space-y-4">
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Name: </span>
                <span className="font-sans italic text-purple-700">{data?.name}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Mobile: </span>
                <span className="font-sans italic text-purple-700">{data?.mobileNo}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Address: </span>
                <span className="font-sans italic text-purple-700">{data?.address}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Joined Date: </span>
                <span className="font-sans italic text-purple-700">{data?.createdAt?.slice(0, 10).split("-").reverse().join("-")}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Next Bill Date: </span>
                <span className="font-sans italic text-purple-700">{data?.nextBillDate?.slice(0, 10).split("-").reverse().join("-")}</span>
              </div>
              <div className="text-2xl">
                <span className="font-serif font-bold text-indigo-600">Trainer: </span>
                <span className="font-sans italic text-purple-700">{data?.trainer?.name || "Not Assigned"}</span>
              </div>
              <div className="flex gap-4 text-2xl font-semibold items-center">
                <span className="font-serif font-bold text-indigo-600">Status: </span>
                <Switch
                  className="mt-1"
                  onColor="#6366F1"
                  checked={status === "Active"}
                  onChange={() => handleSwitchBtn()}
                />
              </div>

            {isDateInPast(data?.nextBillDate) && (
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
            )}

            {renew && status === "Active" && (
              <div className="rounded-lg p-3 justify-center items-center mt-5 mb-5 h-fit bg-slate-50 w-[100%]">
                <div className="w-full">
                  <div className=" justify-center items-center text-center my-5">
                    <div className="font-medium text-3xl">MemberShip</div>

                    <select
                      value={planMember}
                      onChange={handelOnChangeSelect}
                      className="w-full border-2 p-2 rounded-lg"
                    >
                      {membership.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.months} Months Membership
                        </option>
                      ))}
                    </select>

                    <div
                      className={`mt-1 p-3 border-4 border-slate-900 justify-center items-center mx-auto w-1/2 text-center cursor-pointer rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white`}
                      onClick={handelRenewSaveBtn}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;
