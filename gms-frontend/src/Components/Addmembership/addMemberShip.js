import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddMemberShip = ({handleClose}) => {
  const [inputField, setInputField] = useState({
    months: "",
    price: "",
  });

  // for handling membership
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  // console.log(inputField);

  const fetchMembership = async () => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        setMembership(res.data.membership);
        toast.success(res.data.membership.length+" Membership Fetched");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };

  // fetching all membership with page loading using useeffect
  useEffect(() => {
    fetchMembership();
  }, []);

  const handleAddmembership = async () => {
    await axios
      .post("http://localhost:4000/plans/add-membership", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };

  return (
    <div>
      {/* for upper part */}
      <div className="flex flex-wrap gap-5 items-start justify-start overflow-y-auto max-h-[300px] scrollbar-hide">
        {/* block for membership details */}
        {membership.map((item, index) => {
          return (
            <div className="text-lg bg-slate-900 text-white border-2 rounded-xl font-semibold flex flex-col items-center justify-center gap-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full">
              <div> {item.months} Months Membership </div>
              <div>
                Rs {item.price}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="mt-10 mb-10" />
      {/* for lower part */}
      <div className="flex flex-col gap-5 mb-8">
        <input
          value={inputField.months}
          onChange={(event) => {
            handleOnChange(event, "months");
          }}
          className="border-2 rounded-lg text-lg w-full h-12 p-2"
          type="number"
          placeholder="Add No. of Months"
        />
        <input
          value={inputField.price}
          onChange={(event) => {
            handleOnChange(event, "price");
          }}
          className="border-2 rounded-lg text-lg w-full h-12 p-2"
          type="number"
          placeholder="Add Price"
        />
        <div
          onClick={() => {
            handleAddmembership();
          }}
          className="text-lg border-2 p-3 w-full rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center"
        >
          Add+
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMemberShip;
