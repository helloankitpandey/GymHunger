import React, { useState } from "react";
import './signup.css';
import Modal from "../Modal/modal";
import ForgetPassword from "../ForgetPassword/forgetpassword";

const Signup = () => {

    const [forgetPassword, setForgetPassword] = useState(false);

    const handleClose = () => {
        setForgetPassword(prev => !prev);
    }


  return (
    <div className="customSignup  w-1/3 p-10 mt-20 ml-20 bg-black bg-opacity-70 h-[450px] overflow-y-auto ">
      <div className="font-sans text-white text-center text-4xl ">
        Register Your Gym
      </div>
      <input
        types="text"
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter Email"
      />
      <input
        types="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Gym Name"
      />
      <input
        types="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Username"
      />
      <input
        type="password"
        className="w-full mb-10 p-2 rounded-lg "
        placeholder="Enter Password"
      />
      <input type="file" className="w-full mb-10 p-2 rounded-lg " />
      <img
        src="https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg"
        className="h-[200px] w-[250px] mb-10 "
      />
      <div className="p-2 w-[80%] bg-blue-700  mx-auto rounded-lg text-white text-center text-lg hover:bg-blue-400 hover:text-black font-semibold  cursor-pointer">
        Register
      </div>
      <div onClick={handleClose} className="p-2 w-[80%] mt-5 bg-blue-700  mx-auto rounded-lg text-white text-center text-lg hover:bg-blue-400 hover:text-black font-semibold  cursor-pointer">
        Forget Password
      </div>
      {forgetPassword && <Modal header="Forget Password" handleClose={handleClose} content={<ForgetPassword />}/> }
    </div>
  );
};

export default Signup;
