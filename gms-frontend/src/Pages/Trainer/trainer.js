import React, { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import TrainerCard from "../../Components/TrainerCard/trainerCard";
import Modal from "../../Components/Modal/modal";
import AddTrainer from "../../Components/AddTrainer/addTrainer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Trainer = () => {
  const backendURL = process.env.REACT_APP_BACKEND_API;

  const [addTrainer, setAddTrainer] = useState(false);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);

  const [noOfPage, setNoOfPage] = useState(0);

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const fetchData = async (skip, limits) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${backendURL}/trainers/all-trainer?skip=${skip}&limit=${limits}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let totalData = response.data.totalTrainers;
      // console.log("Total Trainers:", totalData);
      setTotalData(totalData);
      setData(response.data.trainers);

      let extraPage = totalData % limit === 0 ? 0 : 1;
      let totalPage = parseInt(totalData / limit) + extraPage;
      setNoOfPage(totalPage);

      if (totalData === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else if (totalData < 9) {
        setStartFrom(0);
        setEndTo(totalData);
      }
    } catch (err) {
      toast.error("Something Technical Issue Samar ");
      console.log(err);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);

      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip - 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);

      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip + 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleAddTrainer = () => {
    setAddTrainer((prev) => !prev);
  };

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      const token = localStorage.getItem("token");
      await axios
        .get(`${backendURL}/trainers/searched-trainer?searchTerm=${search}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.trainers);
          setTotalData(response.data.totalTrainers);
        })
        .catch((err) => {
          toast.error("Something Technical Issues");
          console.log(err);
        });
    } else {
      if (isSearchModeOn) {
      } else {
        toast.error("Please Enter Any Value !!");
      }
    }
  };

  const deleteTrainer = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${backendURL}/trainers/delete-trainer/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Trainer deleted successfully");
      // Update the data state to remove the deleted trainer without refreshing the page
      setData((prevData) => prevData.filter((trainer) => trainer._id !== id));
      setTotalData((prevTotal) => prevTotal - 1);
    } catch (error) {
      toast.error("Failed to delete trainer");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden box-border text-black p-5">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3 ">
        <div
          onClick={handleAddTrainer}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black font-medium flex items-center justify-center gap-1"
        >
          <span className="hidden sm:inline">Add Trainer</span>
          <PersonAddIcon className="ml-1 font-medium mb-1" />
        </div>
      </div>

      <Link className="mt-2 block text-black font-medium hover:underline" to={"/dashboard"}>
        <ArrowCircleLeftIcon />
        Back to Dashboard
      </Link>

      <div className="w-full sm:w-1/2 mt-5 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search By Name & Mobile No"
          className="border-2 w-full p-2 rounded-lg"
        />
        <div
          onClick={() => handleSearchData()}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          <SearchIcon />
        </div>
      </div>

      <div className="mt-5 text-xl flex justify-between text-slate-900 ">
        <div className="font-mono text-2xl "> Total Trainers {isSearchModeOn ? totalData : null}</div>
        {!isSearchModeOn ? (
          <div className="flex gap-5">
            <div className="hidden sm:block font-mono text-2xl">
              {startFrom + 1} - {endTo} of {totalData} Trainers
            </div>
            <div
              onClick={handlePrev}
              className={` ${currentPage === 1 ? "bg-gray-200 text-gray-300" : null}  w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
            >
              <ChevronLeftIcon />
            </div>
            <div
              onClick={handleNext}
              className={` ${currentPage === noOfPage ? "bg-gray-200 text-gray-300" : null}   w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
            >
              <ChevronRightIcon />
            </div>
          </div>
        ) : null}
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg w-full max-w-full">
        {data.length === 0 ? (
          <div className="text-center text-xl font-semibold text-gray-500 py-20">No trainers found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full">
            {data.map((item, index) => (
              <TrainerCard key={index} item={item} deleteTrainer={deleteTrainer} />
            ))}
          </div>
        )}
      </div>

      {addTrainer && (
        <Modal header="Add New Trainer" handleClose={handleAddTrainer} content={<AddTrainer />} />
      )}
      <ToastContainer />
    </div>
  );
};

export default Trainer;
