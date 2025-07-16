import React, { useEffect, useState,useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate,useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios"
import {ToastContainer,toast} from 'react-toastify'

const MemberDetail = () => {

  
  const [inputField, setInputField] = useState();


  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data,setData] = useState(null);
  const [membership,setMembership] = useState([]);
  const [planMember,setPlanMember] = useState("");
  const hasFetched = useRef(false);
  const {id} = useParams();


  const handleSwitchBtn =async () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    await  axios.post(`http://localhost:4000/members/change-status/${id}`,{status:statuss},{withCredentials:true}).then((response)=>{
      console.log(response.data)  
      toast.success("Status Changed");
    }).catch((err)=>{
      console.log(err)  ;
      toast.error("Something Went Wrong");
    })
    setStatus(statuss);
  };

  
  const isDateInPast =  (inputdate)=>{
    const today = new Date();
    const givenDate = new Date(inputdate);
    return givenDate<today;
  }
;
  const navigate = useNavigate();

  

  useEffect(()=>{
    if (!hasFetched.current) {
      fetchData();
      fetchMembership();
      hasFetched.current = true; // ✅ Double fetch block ho gaya
    }
  },[])

   const fetchMembership = async()=>{
      axios.get('http://localhost:4000/plans/get-membership',{withCredentials:true}).then((response)=>{
          setMembership(response.data.membership);
          setPlanMember(response.data.membership[0]._id);
      }).catch((err)=>{
        console.log(err);
        toast.error("Something went Wrong");
      })
   }

  const fetchData = async()=>{
      await axios.get(`http://localhost:4000/members/get-member/${id}`,{withCredentials:true}).then((response)=>{
        // console.log(response);
        setData(response.data.member);
        setStatus(response.data.member.status);
        toast.success(response.data.message);
      }).catch((err)=>{
          console.log(err);
          toast.error("Failed to Fetch Data");
      })
  }

  const handelOnChangeSelect = (event)=>{
      let value = event.target.value;
      setPlanMember(value);
  }
  // console.log(planMember);
  const handelRenewSaveBtn = async()=>{
     await axios.put(`http://localhost:4000/members/update-member-plan/${id}`,{membership:planMember},{withCredentials:true}).then((res)=>{
          setData(res.data.member);
          toast.success("Plan updated successfully !!")
     }).catch((err)=>{
          console.log(err);
          toast.error("Failed to update Data");
      })
  }

  return (
    <div className="w-3/4 text-black p-2">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 pr-4 w-fit text-xl font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
      >
        <ArrowBackIcon /> Go Back
      </div>

      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          {/* image wala block */}
          <div className="w-1/3 mx-auto">
            <img
              className="w-full mx-auto"
              src={data?.profilePic}
            />
          </div>

          {/* block for details */}
          <div className="w-2/3 mt-5 p-5 text-xl">
            <div className="mt-1 mb-2 text-2xl font-semibold">Name: {data?.name}</div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile : {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address : {data?.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date : {data?.createdAt.slice(0,10).split('-').reverse().join('-')}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date : {data?.nextBillDate.slice(0,10).split('-').reverse().join('-')}
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              Status :
              <Switch
                className="mt-1  "
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={() => handleSwitchBtn()}
              />
            </div>
            {isDateInPast(data?.nextBillDate) && 
              <div
                onClick={() => {
                  setRenew((prev) => !prev);
                }}
                className={` ${
                  renew && status === "Active"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : null
                }  mt-4 p-3 border-2 border-slate-900 text-center font-medium w-full md:w-1/2 cursor-pointer rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white `}
              >
                Renew
              </div>
            }

            {renew && status === "Active" ? (
              <div className="rounded-lg p-3 justify-center items-center mt-5 mb-5 h-fit bg-slate-50 w-[100%]">
                <div className="w-full">
                  <div className=" justify-center items-center text-center my-5">
                    <div className="font-medium text-3xl">MemberShip</div>

                    <select value={planMember} onChange={handelOnChangeSelect} className="w-full border-2 p-2 rounded-lg">
                      {
                        membership.map((item,index)=>{
                          return(
                            <option value={item._id} > {item.months} Months Membership </option>
                          )
                        })
                      }
                    </select>

                    <div
                      className={`mt-1 p-3 border-4 border-slate-900 justify-center items-center mx-auto w-1/2 text-center  cursor-pointer  rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white`}
                      onClick={()=>{handelRenewSaveBtn()}}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MemberDetail;
