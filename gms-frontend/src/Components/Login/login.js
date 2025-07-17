import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Modal from "../Modal/modal";
import ForgetPassword from "../ForgetPassword/forgetpassword";

const Login = () => {

  const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();
  // backend url
  const backendURL = process.env.REACT_APP_BACKEND_API;


  const handleLogin = async () => {
<<<<<<< HEAD
    await axios.post("http://localhost:4000/auth/login", loginField, { withCredentials: true }).then((res) => {
=======
    await axios.post(`${backendURL}/auth/login`, loginField, { withCredentials: true }).then((res) => {
>>>>>>> 6dc12115cf91760f82d919916dd85b571b05705f
      localStorage.setItem('gymName', res.data.gym.gymName);
      localStorage.setItem('gymPic', res.data.gym.profilePic);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('token', res.data.token);
      navigate("/dashboard");
    }).catch(err => {
      const errorMessage = err.response.data.error;
      toast.error(errorMessage);
    });
  }

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  }

  const handleClose = () => {
    setForgetPassword(prev => !prev);
  }

  return (
    <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/3 h-auto lg:h-[500px] p-6 mt-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl">
      <div className="font-sans text-white text-center text-4xl font-bold mb-8 border-b border-gray-600 pb-4">
        Login
      </div>

      <input
        value={loginField.userName}
        onChange={(event) => handleOnChange(event, "userName")}
        type="text"
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Username"
      />

      <input
        value={loginField.password}
        onChange={(event) => handleOnChange(event, "password")}
        type="password"
        className="w-full mb-8 mt-4 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Password"
      />

      <div
        onClick={handleLogin}
        className="p-3 mt-6 w-full bg-blue-600 rounded-lg text-white text-center text-lg hover:bg-blue-500 font-semibold transition-colors duration-200 cursor-pointer"
      >
        Login
      </div>

      <div
        onClick={handleClose}
        className="p-3 mt-8 w-full bg-blue-600 rounded-lg text-white text-center text-lg hover:bg-blue-500 font-semibold transition-colors duration-200 cursor-pointer"
      >
        Forget Password
      </div>

      <ToastContainer />

      {forgetPassword && (
        <Modal
          header="Forgot Password"
          handleClose={handleClose}
          content={<ForgetPassword handleClose={handleClose} />}
        />
      )}
    </div>
  );
};

export default Login;
