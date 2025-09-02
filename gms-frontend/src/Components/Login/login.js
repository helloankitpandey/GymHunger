import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ForgetPassword from "../ForgetPassword/forgetpassword";
import Modal from "../Modal/modal";

const Login = () => {
  const [loginField, setLoginField] = useState({
    userName: "",
    password: "",
    role: "gym",
  });
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_API;

  const handleClose = () => {
    setForgetPassword(false);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${backendURL}/auth/login`, loginField, {
        withCredentials: true,
      });
      localStorage.setItem("gymName", res.data.gym.gymName);
      localStorage.setItem("gymPic", res.data.gym.profilePic);
      localStorage.setItem("gymId", res.data.gym._id);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.gym.role);
      
      // Redirect based on role
      if (res.data.gym.role === 'user') {
        navigate("/user-home");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed";
      toast.error(errorMessage);
    }
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  return (
    <div className="w-[95%] sm:w-[90%] md:w-[90%] lg:w-1/3 h-auto lg:h-[500px] p-6 mt-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl">
      <div className="font-sans text-white text-center text-4xl font-bold mb-9 border-b border-gray-600 pb-4">
        Login
      </div>

      <select
        name="role"
        value={loginField.role || "gym"}
        onChange={(event) => handleOnChange(event, "role")}
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="gym">Gym Owner/Admin</option>
        <option value="user">Regular User</option>
      </select>

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
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Password"
      />

      <div
        onClick={handleLogin}
        className="p-3 w-full bg-blue-600 rounded-lg text-white text-center text-lg hover:bg-blue-500 font-semibold transition-colors duration-200 cursor-pointer mb-4"
      >
        Login
      </div>

      <div
        onClick={() => setForgetPassword(true)}
        className="text-blue-400 text-center cursor-pointer underline hover:text-blue-300 transition duration-150"
      >
        Forgot Password?
      </div>

      {forgetPassword && (
        <Modal
          header="Forget Password"
          handleClose={handleClose}
          content={<ForgetPassword handleClose={handleClose} />}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
