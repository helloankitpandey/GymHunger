import React, { useState } from "react";
import './signup.css';
import Modal from "../Modal/modal";
import ForgetPassword from "../ForgetPassword/forgetpassword";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {

  // backend url
  const backendURL = process.env.REACT_APP_BACKEND_API;

  const [forgetPassword, setForgetPassword] = useState(false);
  const [loaderImg, setLoaderImg] = useState(false);

  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic: "https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg"
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  }

  const handleClose = () => {
    setForgetPassword(prev => !prev);
  }

  const uploadImage = async (event) => {
    setLoaderImg(true);
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gym-managment');
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dw7n1fvp0/image/upload", data);
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ['profilePic']: imageUrl });
      setLoaderImg(false);
    } catch (error) {
      console.log(error);
      setLoaderImg(false);
    }
  }

  const handleRegister = async () => {
    axios.post(`${backendURL}/auth/register`, inputField).then((res) => {
      const successMsg = res.data.message;
      toast.success(successMsg);
    }).catch(err => {
      const errorMessage = err.response.data.error;
      console.log(err);
      toast.error(errorMessage);
    });
  }

  return (
    <div className="signup-container w-[80%] sm:w-[70%] md:w-[60%] lg:w-1/3 h-auto lg:h-[500px] p-6 mt-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
      <div className="font-sans text-white text-center text-4xl font-bold mb-8 border-b border-gray-600 pb-4">
        Register Your Gym
      </div>

      <input
        value={inputField.email}
        onChange={(event) => handleOnChange(event, "email")}
        type="text"
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Email"
      />

      <input
        value={inputField.gymName}
        onChange={(event) => handleOnChange(event, "gymName")}
        type="text"
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Gym Name"
      />

      <input
        value={inputField.userName}
        onChange={(event) => handleOnChange(event, "userName")}
        type="text"
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Username"
      />

      <input
        value={inputField.password}
        onChange={(event) => handleOnChange(event, "password")}
        type="password"
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Password"
      />

      <input
        onChange={uploadImage}
        type="file"
        className="w-full mb-6 p-2 rounded-lg bg-gray-100 text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
      />

      {loaderImg && (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}

      {inputField.profilePic && (
        <img
          src={inputField.profilePic}
          className="h-[200px] w-[250px] object-cover rounded-lg mx-auto mb-6"
          alt="Profile Preview"
        />
      )}

      <div
        onClick={handleRegister}
        className="p-3 w-full bg-blue-600 rounded-lg text-white text-center text-lg hover:bg-blue-500 font-semibold transition-colors duration-200 cursor-pointer mb-4"
      >
        Register
      </div>

      <div
        onClick={handleClose}
        className="p-3 w-full bg-blue-600 rounded-lg text-white text-center text-lg hover:bg-blue-500 font-semibold transition-colors duration-200 cursor-pointer"
      >
        Forget Password
      </div>

      <ToastContainer />

      {forgetPassword && (
        <Modal
          header="Forget Password"
          handleClose={handleClose}
          content={<ForgetPassword handleClose={handleClose} />}
        />
      )}
    </div>
  );
};

export default Signup;