import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [accordianDash, setAccordianDash] = useState(false);
    const ref = useRef();

    // useeffect for closing pop-up window
    useEffect(() => {

        const checkIfClickedOutside = e => {
            if(accordianDash && ref.current && !ref.current.contains(e.target)){
                setAccordianDash(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    })


  return (
    <div className='w-3/4 text-black p-5 relative'>
        <div className='w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center'>
            <MenuIcon sx={{cursor:"pointer"}} onClick={() => {setAccordianDash(prev => !prev)} } />

            <img className='w-8 h-8 rounded-3xl border-2' src='https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg' alt='Image' />
            
        </div>

        {/* pop-up window */}
        {
            accordianDash && <div ref={ref} className=' absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
                <div>Hi Welcome to our Gym Management System.</div>
                <p>Feel free to ask any queries</p>
                </div>
        }


        <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-3 grid-cols-3 w-ful pb-5 overflow-x-auto h-[80%]' >

            {/* this is card block */}
            <Link to={"/member"} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>
                <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rouded-b-lg hover:bg-slate-900 hover:text-white'>
                    <PeopleAltIcon sx={{color:"green", fontSize:"50px"}} />
                    <p className='text-xl my-3 font-semibold font-mono'>Joined Member</p>
                </div>
            </Link>

            {/* this is card block */}
            <div className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>
                <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rouded-b-lg hover:bg-slate-900 hover:text-white'>
                    <SignalCellularAltIcon sx={{color:"purple", fontSize:"50px"}} />
                    <p className='text-xl my-3 font-semibold font-mono'>Monthly Joined</p>
                </div>
            </div>

            {/* this is card block */}
            <div className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>
                <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rouded-b-lg hover:bg-slate-900 hover:text-white'>
                    <AccessAlarmIcon sx={{color:"red", fontSize:"50px"}} />
                    <p className='text-xl my-3 font-semibold font-mono'>Expiring with 3 days</p>
                </div>
            </div>

            {/* this is card block */}
            <div className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>
                <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rouded-b-lg hover:bg-slate-900 hover:text-white'>
                    <AccessAlarmIcon sx={{color:"red", fontSize:"50px"}} />
                    <p className='text-xl my-3 font-semibold font-mono'>Expiring with 4-7 days</p>
                </div>
            </div>

            {/* this is card block */}
            <div className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>
                <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rouded-b-lg hover:bg-slate-900 hover:text-white'>
                    <ErrorIcon sx={{color:"red", fontSize:"50px"}} />
                    <p className='text-xl my-3 font-semibold font-mono'>Expired</p>
                </div>
            </div>

            {/* this is card block */}
            <div className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
                <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                </div>
                <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rouded-b-lg hover:bg-slate-900 hover:text-white'>
                    <ReportIcon sx={{color:"brown", fontSize:"50px"}} />
                    <p className='text-xl my-3 font-semibold font-mono'>InActive Member</p>
                </div>
            </div>







        </div>

        <div className='md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl' >
            Contact Developer for any Technical Eroor at +91868461###
        </div>

    </div>
  )
}

export default Dashboard