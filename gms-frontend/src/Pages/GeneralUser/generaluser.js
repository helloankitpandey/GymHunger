 import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MemberCard from '../../Components/MemberCard/memberCard'
import { getMonthlyJoined,threeDayExpire ,fourSevenDaysexpire,expired,inActive} from "./data";

const Generaluser = () => {

  const [header, setHeader] = useState("");
  const [data,setData] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem('func');
    funtionCall(func)
  },[]);

  const funtionCall = async(func) =>{
    switch(func) {

      case "monthlyJoined":

          setHeader("Monthly Joined Members")
         
          var  datas = await getMonthlyJoined();
          //  console.log(datas);
          setData(datas.members);
          break;
      
      case "threeDaysExpired":

          setHeader("Expiring In 3 Days Members")
          var datas = await threeDayExpire();
          setData(datas.members);
          break;
      
      case "fourTOSevenDaysExpired":

          setHeader("Expiring In 4-7 Days Members")
          var datas = await fourSevenDaysexpire();
          setData(datas.members);
          break;

      case "expired":

          setHeader("Expired Members")
           var datas = await expired();
          setData(datas.members);
          break;

      case "inActiveMembers":

          setHeader("InActive Members")
           var datas = await inActive();
          setData(datas.members);
          break;

    }
  }

  return (
    <div className="text-black p-5 w-full max-w-full overflow-x-hidden box-border flex flex-col min-h-screen">

      <div className="border-2 bg-slate-900 flex justify-between w-full text-white text-lg p-3">
          <Link to={'/dashboard'} className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black">
              <ArrowBackIcon />Back To Dashboard
          </Link> 

      </div>

      <div className="mt-5 text-xl text-slate-900 font-mono">
          {header}
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg w-full max-w-full flex-grow overflow-y-auto max-h-[80vh]">
        {
          data.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-center text-xl font-semibold text-gray-500">
              No members found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full">
              {
                data.map((item, index) => {
                  return <MemberCard key={index} item={item} />
                })
              }
            </div>
          )
        }
      </div>


    </div>
  )
};

export default Generaluser;
