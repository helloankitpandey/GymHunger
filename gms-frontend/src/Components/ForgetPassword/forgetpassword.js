import React, { useState } from "react";

const ForgetPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentVal, setContentVal] = useState("Submit Your Email-id");

  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);

  const handleSubmit = () => {
    if (!emailSubmit) {
      setEmailSubmit(true);
      setContentVal("Submit Your OTP");
    } else if (emailSubmit && !otpValidate) {
      setOtpValidate(true);
      setContentVal("Submit New Password");
    }
  };

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
    </div>
  );
};

export default ForgetPassword;
