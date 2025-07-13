import axios from "axios";
import React, { useState } from "react";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


const AddMember = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    joiningDate: "",
    memberShip: "",
    profilPic: "https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg",
  });

  // for loading img
  const [loaderImg, setLoaderImg] = useState(false);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);

  // for uploading img on cloundnary
  const uploadImage = async (event) => {

    setLoaderImg(true)

    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    // cloud name -> dw7n1fvp0
    data.append("upload_preset", "gym-managment");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dw7n1fvp0/image/upload",
        data
      );
      console.log(response);
      const imageUrl = response.data.url;
      setInputField({ ...inputField, ["profilPic"]: imageUrl });

      setLoaderImg(false)

    } catch (error) {
      console.log(error);
      setLoaderImg(false)
    }
  };

  return (
    <div className="text-black">
      <div className="grid grid-cols-2 gap-5 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {
            handleOnChange(event, "name");
          }}
          placeholder="Name of the Joinee"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />
        <input
          value={inputField.mobileNo}
          onChange={(event) => {
            handleOnChange(event, "mobileNo");
          }}
          placeholder="Mobile No"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />

        <input
          value={inputField.address}
          onChange={(event) => {
            handleOnChange(event, "address");
          }}
          placeholder="Address"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />
        <input
          value={inputField.joiningDate}
          onChange={(event) => {
            handleOnChange(event, "joiningDate");
          }}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />

        <select
          value={inputField.memberShip}
          onChange={(event) => {
            handleOnChange(event, "memberShip");
          }}
          className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray"
        >
          <option>1 Month MemberShip</option>
          <option>2 Month MemberShip</option>
          <option>3 Month MemberShip</option>
          <option>4 Month MemberShip</option>
        </select>

        <input onChange={(e) => {uploadImage(e)}} type="file" />

        

        <div className="w-1/4">
          <img
            src={inputField.profilPic}
            className="h-full w-full rounded-full"
          />
          {
          loaderImg &&  <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                        </Stack>
          }
          </div>

        <div className="border-2 p-3 w-28 tet-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>
    </div>
  );
};

export default AddMember;
