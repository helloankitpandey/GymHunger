import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgetPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentVal, setContentVal] = useState("Submit Your Email-id");
  // for loading
  const [loader, setLoader] = useState(false);

  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  // console.log(inputField);

  const sendOtp = async() => {
    setLoader(true);
    await axios.post("http://localhost:4000/auth/reset-password/sendOtp", {email: inputField.email}).then((res) => {
      // console.log(res);
      setEmailSubmit(true);
      setContentVal("Submit Your OTP");
      toast.success(res.data.message);
      setLoader(false)

    }).catch(err => {

      toast.error("Some Techical Error")
      console.log(err);
      setLoader(false)
    })
  }

  const verifyOtp = async() => {
    setLoader(true)
    await axios.post("http://localhost:4000/auth/reset-password/checkOtp", {email: inputField.email, otp: inputField.otp}).then((res) => {
      setOtpValidate(true);
      setContentVal("Submit New Password");
      toast.success(res.data.message);
      setLoader(false);
    }).catch(err => {

      toast.error("Some Techical Error")
      console.log(err);
      setLoader(false)
    })
  }

  const changePassword = async() => {
    setLoader(true)
    await axios.post("http://localhost:4000/auth/reset-password", {email: inputField.email, newPassword: inputField.newPassword}).then((res) => {
      console.log(res);
      
      toast.success(res.data.message)
      setLoader(false);
    }).catch(err => {
      toast.error("Some Techical Error")
      console.log(err);
      setLoader(false)
    })
  }

  const handleSubmit = () => {

    if (!emailSubmit) {
      // setEmailSubmit(true);
      // setContentVal("Submit Your OTP");
      sendOtp();
    }else if(emailSubmit && !otpValidate) {
      // setOtpValidate(true);
      // setContentVal("Submit New Password");
      verifyOtp();
    }else{
      
      changePassword();
    }
  }

  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <div className="text-xl">Enter Your Email</div>
        <input
          value={inputField.email}
          onChange={(event) => {handleOnChange(event, "email" ) }}
          type="text"
          className="w-1/2 p-2 rounded-lg border-2 border-slate-400"
          placeholder="Enter Email"
        />
      </div>
      {emailSubmit && (
        <div className="w-full mb-5">
          <div className="text-xl">Enter Your OTP</div>
          <input
            value={inputField.otp}
            onChange={(event) => {handleOnChange(event, "otp" ) }}
            type="text"
            className="w-1/2 p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter OTP"
          />
        </div>
      )}
      {otpValidate && (
        <div className="w-full mb-5">
          <div className="text-xl">Enter Your Password</div>
          <input
            value={inputField.newPassword}
            onChange={(event) => { handleOnChange(event, "newPassword" ) }}
            type="password"
            className="w-1/2 p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter New Password"
          />
        </div>
      )}

      <div
        onClick={handleSubmit}
        className="bg-blue-800 text-white mx-auto w-2/3 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-blue-700 hover:text-black"
      >
        {contentVal}
      </div>

      {
        loader && <Loader />
      }
      <ToastContainer />

    </div>
  );
};

export default ForgetPassword;
