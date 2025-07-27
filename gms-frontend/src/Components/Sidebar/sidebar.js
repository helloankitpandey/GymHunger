import React, { useEffect, useState, useRef } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [greeting, setGreeting] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle
    const [gymPic, setGymPic] = useState(localStorage.getItem("gymPic") || "");
    const fileInputRef = useRef(null);

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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;

            try {
                const token = localStorage.getItem("token");
                // Read gymId directly from localStorage here to get latest value
                const gymId = localStorage.getItem("gymId");
                if (!gymId) {
                    // alert("Gym ID not found. Please login again.");
                    toast.error("Gym ID not found. Please login again.");
                    return;
                }
                const response = await axios.put(
                    `${process.env.REACT_APP_BACKEND_API}/auth/update-gym-profile-pic/${gymId}`,
                    { profilePic: base64String },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
                setGymPic(response.data.profilePic);
                localStorage.setItem("gymPic", response.data.profilePic);
                // alert("Profile picture updated successfully");
                toast.success("Profile picture updated successfully");
                navigate('/dashboard');
            } catch (error) {
                console.error("Error updating gym profile picture:", error);
                // alert("Failed to update profile picture");
                toast.error("Failed to update profile picture");
            }
        };
        reader.readAsDataURL(file);
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
                    <div className='w-[100px] h-[100px] rounded-full overflow-hidden mb-2 border-4 border-white relative'>
                        <img
                            alt='gym pic'
                            className='w-full h-full object-cover object-center'
                            src={gymPic}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="w-[100px] bg-white text-black font-semibold py-1 rounded-md shadow-md hover:bg-gray-200 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                        title="Edit Gym Profile Picture"
                    >
                        Edit 
                        
                    </button>
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

                    <Link
                        to='/trainer'
                        onClick={() => setIsSidebarOpen(false)}
                        className={` ${location.pathname === "/trainer"
                            ? 'border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                            : ''} flex gap-4 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black`}
                    >
                        <FitnessCenterIcon />
                        <span>Trainer</span>
                    </Link>

                    <div
                        onClick={handleLogout}
                        className='flex gap-4 font-semibold text-lg bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'
                    >
                        <LogoutIcon />
                        <span>Logout</span>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Sidebar;
