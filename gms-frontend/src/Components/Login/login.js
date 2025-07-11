import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const handleLogin = () =>{
    sessionStorage.setItem("isLogin", true);
    navigate("/dashboard");
  }

  return (
    <div className="w-1/3 p-10 mt-20 ml-20 bg-black bg-opacity-70 h-fit">
      <div className="font-sans text-white text-center text-4xl ">Login</div>
      <input
        types="text"
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter UserName"
      />
      <input
        type="password"
        className="w-full mb-10 p-2 rounded-lg "
        placeholder="Enter Password"
      />
      <div onClick={handleLogin} className="p-2 w-[80%] bg-blue-700  mx-auto rounded-lg text-white text-center text-lg hover:bg-blue-400 hover:text-black font-semibold  cursor-pointer">
        Login
      </div>
    </div>
  );
};

export default Login;
