import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast, ToastContainer } from 'react-toastify';

const Login = () => {

  const [loginField, setLoginField] = useState({"userName": "", "password": ""});

  const navigate = useNavigate();


  const handleLogin = async() => {
    // sessionStorage.setItem("isLogin", true);
    // navigate("/dashboard");
    await axios.post("http://localhost:4000/auth/login", loginField, {withCredentials: true}).then((res) => {
      console.log(res.data);
      localStorage.setItem('gymName', res.data.gym.gymName);
      localStorage.setItem('gymPic', res.data.gym.profilePic);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('token', res.data.token);

      // console.log("TOAST MESSAGE:", res.data.message);
      // toast.success(res.data.message);
      // after saving all data to localstorage
      navigate("/dashboard");
    }).catch(err => {
      const errorMessage = err.response.data.error; 
      // console.log(err);
      toast.error(errorMessage)
    })
  }

  // form handling of login form
  const handleOnChange = (event, name) => {
    setLoginField({...loginField, [name]: event.target.value });
  }
  // console.log(loginField);
  


  return (
    <div className="w-1/3 p-10 mt-20 ml-20 bg-black bg-opacity-70 h-fit">
      <div className="font-sans text-white text-center text-4xl ">Login</div>
      <input
        value={loginField.userName} 
        onChange={(event) => {handleOnChange(event,"userName") }}
        types="text"
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter UserName"
      />
      <input
        value={loginField.password}
        onChange={(event) => {handleOnChange(event, "password") }}
        type="password"
        className="w-full mb-10 p-2 rounded-lg "
        placeholder="Enter Password"
      />
      <div onClick={handleLogin} className="p-2 w-[80%] bg-blue-700  mx-auto rounded-lg text-white text-center text-lg hover:bg-blue-400 hover:text-black font-semibold  cursor-pointer">
        Login
      </div>

      <ToastContainer />

    </div>
  );
};

export default Login;
