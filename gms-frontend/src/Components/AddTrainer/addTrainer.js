import axios from "axios";
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from "react-toastify";

const AddTrainer = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    profilePic: "https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg",
  });

  const [loaderImg, setLoaderImg] = useState(false);

  const backendURL = process.env.REACT_APP_BACKEND_API;

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoaderImg(true);

    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "gym-managment");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dw7n1fvp0/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ["profilePic"]: imageUrl });

      setLoaderImg(false);
    } catch (error) {
      console.log(error);
      setLoaderImg(false);
    }
  };

  const handleRegisterButton = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendURL}/trainers/register-trainer`,
        inputField,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Trainer Added Successfully");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Something Wrong Happened");
    }
  };

  return (
    <div className="text-black">
      <div className="grid grid-cols-2 gap-5 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {
            handleOnChange(event, "name");
          }}
          placeholder="Name of the Trainer"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />
        <input
          value={inputField.mobileNo}
          onChange={(event) => {
            handleOnChange(event, "mobileNo");
          }}
          placeholder="Mobile No"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />

        <input
          value={inputField.address}
          onChange={(event) => {
            handleOnChange(event, "address");
          }}
          placeholder="Address"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />

        <input onChange={(e) => {uploadImage(e)}} type="file" />

        <div className="w-1/4">
          <img
            src={inputField.profilePic}
            className="h-full w-full rounded-full"
          />
          {
          loaderImg &&  <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                        </Stack>
          }
          </div>

        <div onClick={handleRegisterButton} className="border-2 p-3 w-28 tet-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddTrainer;
