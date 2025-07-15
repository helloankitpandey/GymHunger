import React, { useState } from "react";
import './signup.css';
import Modal from "../Modal/modal";
import ForgetPassword from "../ForgetPassword/forgetpassword";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {

    const [forgetPassword, setForgetPassword] = useState(false);

    // for loading img
    const [loaderImg, setLoaderImg] = useState(false);


    // formhandling of signup form
    const [inputField, setInputField] = useState({
      gymName: "",
      email: "",
      userName: "",
      password: "",
      profilePic: "https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg"
    });

    const handleOnChange = (event, name) => {
      setInputField({...inputField, [name]: event.target.value })
    }

    // console.log(inputField);

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
        setInputField({...inputField, ['profilePic']: imageUrl});
        setLoaderImg(false)
      } catch (error) {
        console.log(error);
        setLoaderImg(false)
      }
    }

    const handleRegister = async() => {
      axios.post("http://localhost:4000/auth/register", inputField).then((res) => {
        console.log(res);
        const successMsg = res.data.message;
        toast.success(successMsg)
      }).catch(err => {
        const errorMessage = err.response.data.error;
        console.log(err);
        toast.error(errorMessage)
      })
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
        value={inputField.gymName}
        onChange={(event) => {handleOnChange(event, "gymName" ) }}
        types="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Gym Name"
      />
      <input
        value={inputField.userName}
        onChange={(event) => {handleOnChange(event, "userName" ) }}
        types="text"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter UserName"
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
        src={inputField.profilePic}
        className="h-[200px] w-[250px] mb-10 "
      />


      <div onClick={() => handleRegister()} className="p-2 w-[80%] bg-blue-700  mx-auto rounded-lg text-white text-center text-lg hover:bg-blue-400 hover:text-black font-semibold  cursor-pointer">
        Register
      </div>
      <div onClick={handleClose} className="p-2 w-[80%] mt-5 bg-blue-700  mx-auto rounded-lg text-white text-center text-lg hover:bg-blue-400 hover:text-black font-semibold  cursor-pointer">
        Forget Password
      </div>

      <ToastContainer />

      {forgetPassword && <Modal header="Forget Password" handleClose={handleClose} content={<ForgetPassword handleClose={handleClose} />}/> }
    </div>
  );
};

export default Signup;
