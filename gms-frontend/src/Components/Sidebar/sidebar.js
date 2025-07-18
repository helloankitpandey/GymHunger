import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [greeting, setGreeting] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

    const greetingMsg = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good Morning 🌞");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon ☀️");
        } else if (currentHour < 21) {
            setGreeting("Good Evening 🌃");
        } else {
            setGreeting("Good Night 🌙");
        }
    };

    useEffect(() => {
        greetingMsg();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Toggle Button for Mobile */}
            <div className='md:hidden fixed bottom-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-full shadow-lg'>
                {isSidebarOpen ? (
                    <CloseIcon onClick={toggleSidebar} sx={{ fontSize: 30, cursor: "pointer" }} />
                ) : (
                    <MenuIcon onClick={toggleSidebar} sx={{ fontSize: 30, cursor: "pointer" }} />
                )}
            </div>

            {/* Sidebar */}
            <div
                className={`fixed z-40 top-0 left-0 h-full w-80 bg-black text-white p-5 font-extralight transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                style={{ minHeight: '100%' }} // ensures sidebar stretches
            >
                <div className='text-center text-3xl mb-6 font-bold uppercase'>
                    {localStorage.getItem("gymName")}
                </div>
                <div className='flex flex-col items-center mb-8 mt-4'>
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden mb-4 border-4 border-white'>
                        <img
                            alt='gym pic'
                            className='w-full h-full object-contain object-center'
                            src={localStorage.getItem("gymPic")}
                        />
                    </div>
                    <div className='text-xl mb-2'>{greeting}</div>
                    <div className='text-lg font-semibold'>Admin</div>
                </div>

                <div className='mt-6 space-y-6'>
                    <Link
                        to='/dashboard'
                        onClick={() => setIsSidebarOpen(false)}
                        className={` ${location.pathname === "/dashboard"
                            ? 'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                            : ''} flex gap-4 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black`}
                    >
                        <HomeIcon />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        to='/member'
                        onClick={() => setIsSidebarOpen(false)}
                        className={` ${location.pathname === "/member"
                            ? 'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                            : ''} flex gap-4 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black`}
                    >
                        <GroupIcon />
                        <span>Members</span>
                    </Link>

                    <div
                        onClick={handleLogout}
                        className='flex gap-4 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'
                    >
                        <LogoutIcon />
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
