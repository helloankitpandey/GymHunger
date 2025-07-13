import React, { useState } from "react";
import './signup.css';
import Modal from "../Modal/modal";
import ForgetPassword from "../ForgetPassword/forgetpassword";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Signup = () => {

    const [forgetPassword, setForgetPassword] = useState(false);

    // for loading img
    const [loaderImg, setLoaderImg] = useState(false);


    // formhandling of signup form
    const [inputField, setInputField] = useState({
      gynName: "",
      email: "",
      username: "",
      password: "",
      profilPic: "https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg"
    });

    const handleOnChange = (event, name) => {
      setInputField({...inputField, [name]: event.target.value })
    }
    console.log(inputField);

    const handleClose = () => {
        setForgetPassword(prev => !prev);
    }


    // for uploading img on cloundnary
    const uploadImage = async(event) => {

      setLoaderImg(true)

      const files = event.target.files;
      const data = new FormData();
      data.append('file', files[0]);

      // cloud name -> dw7n1fvp0
      data.append('upload_preset', 'gym-managment');

      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dw7n1fvp0/image/upload", data);
        console.log(response);
        const imageUrl = response.data.url;
        setInputField({...inputField, ['profilPic']: imageUrl});
        setLoaderImg(false)
      } catch (error) {
        console.log(error);
        setLoaderImg(false)
      }
    }


  return (
    <div className="customSignup  w-1/3 p-10 mt-20 ml-20 bg-black bg-opacity-70 h-[450px] overflow-y-auto ">
      <div className="font-sans text-white text-center text-4xl ">
        Register Your Gym
      </div>
      <input
        value={inputField.email}
        onChange={(event) => {handleOnChange(event, "email" ) }}
        types="text"
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter Email"
      />
      <input
        value={inputField.gynName}
        onChange={(event) => {handleOnChange(event, "gynName" ) }}
        types="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Gym Name"
      />
      <input
        value={inputField.username}
        onChange={(event) => {handleOnChange(event, "username" ) }}
        types="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Username"
      />
      <input
        value={inputField.password}
        onChange={(event) => {handleOnChange(event, "password" ) }}
        type="password"
        className="w-full mb-10 p-2 rounded-lg "
        placeholder="Enter Password"
      />


      <input onChange={(event) => {uploadImage(event)}} type="file" className="w-full mb-10 p-2 rounded-lg " />

      {
        loaderImg &&  <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                      <LinearProgress color="secondary" />
                      </Stack>
      }


      <img
        src={inputField.profilPic}
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
