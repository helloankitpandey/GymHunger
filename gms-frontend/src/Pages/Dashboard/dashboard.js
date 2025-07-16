import React, { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const handleOnClickMenu = (value) => {
        sessionStorage.setItem('func', value);
    };

    return (
        <div className='w-full md:w-3/4 flex flex-col min-h-screen'>
            {/* Topbar */}
            <div className='p-4 md:p-6'>
                <div className='w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center shadow-md'>
                    <div className='font-bold text-lg'>Dashboard</div>
                    <img
                        className='w-10 h-10 rounded-full border-2 hover:scale-110 transition-transform duration-300'
                        src={localStorage.getItem("gymPic")}
                        alt='Gym DP'
                    />
                </div>
            </div>

            {/* Content */}
            <div className='flex-1 mt-2 px-6 pb-8 bg-slate-100 bg-opacity-60 rounded-lg grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                {/* Dashboard Cards */}
                <Link to={"/member"} className='border bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white'>
                    <div className='h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='py-10 px-6 flex flex-col items-center'>
                        <PeopleAltIcon sx={{ color: "green", fontSize: "60px" }} />
                        <p className='text-2xl my-4 font-semibold'>Joined Member</p>
                    </div>
                </Link>

                <Link onClick={() => handleOnClickMenu("monthlyJoined")} to={'/specific/monthly'} className='border bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white'>
                    <div className='h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='py-10 px-6 flex flex-col items-center'>
                        <SignalCellularAltIcon sx={{ color: "purple", fontSize: "60px" }} />
                        <p className='text-2xl my-4 font-semibold'>Monthly Joined</p>
                    </div>
                </Link>

                <Link onClick={() => handleOnClickMenu("threeDaysExpired")} to={'/specific/expire-with-in-3-days'} className='border bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white'>
                    <div className='h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='py-10 px-6 flex flex-col items-center'>
                        <AccessAlarmIcon sx={{ color: "red", fontSize: "60px" }} />
                        <p className='text-2xl my-4 font-semibold'>Expiring in 3 Days</p>
                    </div>
                </Link>

                <Link onClick={() => handleOnClickMenu("fourTOSevenDaysExpired")} to={'/specific/expire-with-in-4-7-days'} className='border bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white'>
                    <div className='h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='py-10 px-6 flex flex-col items-center'>
                        <AccessAlarmIcon sx={{ color: "red", fontSize: "60px" }} />
                        <p className='text-2xl my-4 font-semibold'>Expiring in 4-7 Days</p>
                    </div>
                </Link>

                <Link onClick={() => handleOnClickMenu("expired")} to={'/specific/expired'} className='border bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white'>
                    <div className='h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='py-10 px-6 flex flex-col items-center'>
                        <ErrorIcon sx={{ color: "red", fontSize: "60px" }} />
                        <p className='text-2xl my-4 font-semibold'>Expired</p>
                    </div>
                </Link>

                <Link onClick={() => handleOnClickMenu("inActiveMembers")} to={'/specific/inactive-member'} className='border bg-white rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:text-white'>
                    <div className='h-2 rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
                    <div className='py-10 px-6 flex flex-col items-center'>
                        <ReportIcon sx={{ color: "brown", fontSize: "60px" }} />
                        <p className='text-2xl my-4 font-semibold'>Inactive Member</p>
                    </div>
                </Link>
            </div>

            {/* Footer */}
            <footer className='p-4 md:p-6 bg-black text-white text-center rounded-t-xl text-lg mt-auto'>
                Contact Developer: +91868461###
            </footer>
        </div>
    )
};

export default Dashboard;
