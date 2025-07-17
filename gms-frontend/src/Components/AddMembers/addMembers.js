import axios from "axios";
import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from "react-toastify";


const AddMember = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    joiningDate: "",
    memberShip: "",
    profilePic: "https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg",
  });

  // for loading img
  const [loaderImg, setLoaderImg] = useState(false);

  // for hadling membership state
  const [membershipList, setMembershipList] = useState([]);

  // for getting selected's option value
  const [selectedOption, setSelectedOption] = useState("");

  // backend url
  const backendURL = process.env.REACT_APP_BACKEND_API;

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
      setInputField({ ...inputField, ["profilePic"]: imageUrl });

      setLoaderImg(false)

    } catch (error) {
      console.log(error);
      setLoaderImg(false)
    }
  };

  // const fetchMembership = async() => {
  //   await axios.get(`${backendURL}/plans/get-membership`, {withCredentials: true}).then((res) => {
  //     setMembershipList(res.data.membership);
  //     if(res.data.membership.length === 0){
  //       return toast.error("No any MemberShip Added yet",{
  //         className: "text-lg"
  //       })
  //     }else{
  //       let a = res.data.membership[0]._id;
  //       setSelectedOption(a);
  //       setInputField({...inputField, membership: a});
  //     }

  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }

  const fetchMembership = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${backendURL}/plans/get-membership`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMembershipList(res.data.membership);

    if (res.data.membership.length === 0) {
      return toast.error("No any MemberShip Added yet", {
        className: "text-lg",
      });
    } else {
      let a = res.data.membership[0]._id;
      setSelectedOption(a);
      setInputField({ ...inputField, membership: a });
    }

  } catch (err) {
    console.log(err);
    toast.error("Something went wrong", {
      className: "text-lg",
    });
  }
};



  useEffect(() => {
    console.log(inputField);
    
    fetchMembership();
  },[])

  // for option selection and storing in memship of inputfield
  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    setInputField({...inputField, membership: value})
  }

  // for registration of new member
  // const handleRegisterButton = async() => {
  //   await axios.post(`${backendURL}/members/register-member`, inputField, {withCredentials: true}).then((res) => {
  //     toast.success("Member Added Successfully");
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 2000);
  //   }).catch(err => {
  //     console.log(err);
  //     toast.error("Something Wrong Happened")
  //   })
  // }

  const handleRegisterButton = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${backendURL}/members/register-member`,
      inputField,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Member Added Successfully");

    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (err) {
    console.log(err);
    toast.error("Something Wrong Happened");
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
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray"
        >
          {
            membershipList.map((item, index) => {
              return(
                <option key={index} value={item._id} > {item.months} Months MemberShip </option>
              )
            })
          }
        </select>

        <input onChange={(e) => {uploadImage(e)}} type="file" />

        

        <div className="w-1/4">
          <img
            src={inputField.profilePic}
            className="h-full w-full rounded-full"
          />
          {
          loaderImg &&  <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                        </Stack>
          }
          </div>

        <div onClick={handleRegisterButton} className="border-2 p-3 w-28 tet-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>

      <ToastContainer />

    </div>
  );
};

export default AddMember;
