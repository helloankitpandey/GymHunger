import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddMemberShip = ({handleClose}) => {
  const [inputField, setInputField] = useState({
    months: "",
    price: "",
  });
  
  // backend url
  const backendURL = process.env.REACT_APP_BACKEND_API;

  // for handling membership
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  // console.log(inputField);

  // const fetchMembership = async () => {
  //   await axios
  //     .get(`${backendURL}/plans/get-membership`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       // console.log(res);
  //       setMembership(res.data.membership);
  //       toast.success(res.data.membership.length+" Membership Fetched");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Something Wrong Happened");
  //     });
  // };

  const fetchMembership = async () => {
  try {
    const token = localStorage.getItem("token"); // Make sure this key matches where you stored it

    const res = await axios.get(`${backendURL}/plans/get-membership`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMembership(res.data.membership);
    toast.success(res.data.membership.length + " Membership Fetched");

  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong");
  }
};


  // fetching all membership with page loading using useeffect
  useEffect(() => {
    fetchMembership();
  }, []);

  // const handleAddmembership = async () => {
  //   await axios
  //     .post(`${backendURL}/plans/add-membership`, inputField, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       // console.log(res);
  //       toast.success(res.data.message);
  //       handleClose();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Something Wrong Happened");
  //     });
  // };

  const handleAddmembership = async () => {
  try {
    const token = localStorage.getItem("token"); // Make sure it's stored in localStorage after login

    const res = await axios.post(
      `${backendURL}/plans/add-membership`,
      inputField,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(res.data.message);
    handleClose();

  } catch (err) {
    console.log(err);
    toast.error("Something Wrong Happened");
  }
};


  return (
    <div>
      {/* for upper part */}
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {/* block for membership details */}
        {membership.map((item, index) => {
          return (
            <div className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 pt-1 pb-1 rounded-xl font-semibold flex-col gap-3 justify-center hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
              <div> {item.months} Months Membership </div>
              <div className="items-center justify-center pl-14">
                Rs {item.price}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="mt-10 mb-10" />
      {/* for lower part */}
      <div className="flex gap-10 mb-8">
        <input
          value={inputField.months}
          onChange={(event) => {
            handleOnChange(event, "months");
          }}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add No. of Months"
        />
        <input
          value={inputField.price}
          onChange={(event) => {
            handleOnChange(event, "price");
          }}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          placeholder="Add Price"
        />
        <div
          onClick={() => {
            handleAddmembership();
          }}
          className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
        >
          Add+
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMemberShip;
