import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {

    const [greeting, setGreeting] = useState("");

    const greetingMsg = () => {
        const currentHour = new Date().getHours();
        if(currentHour < 12){
            setGreeting("Good Morning 🌞")
        }else if(currentHour < 18){
            setGreeting("Good Afternoon ☀️");
        }else if(currentHour < 21){
            setGreeting("Good Evening 🌃");
        }else{
            setGreeting("Good Night 🌙")
        }
    }

    // for once loading
    useEffect(() => {
        greetingMsg();
    }, [])


  return (
    <div className='w-1/4 h-[100vh] border-2 bg-black text-white p-5 font-extralight'>
        <div className='text-center text-3xl'>
            Power Zone
        </div>
        <div className='flex gap-5 my-5'>
            <div className='w-[100px] h-[100px] rounded-lg'>
                <img alt='gym pic' className='w-full h-full rounded-full' src='https://colorlib.com/wp/wp-content/uploads/sites/2/klipsan-squarespace-gym-website.jpg' />
            </div>
            <div>
                <div className='text-2xl' >{ greeting }</div>
                <div className='text-xl mt-1 font-semibold' >admin</div>
            </div>
        </div>

        <div className='mt-10 py-10 border-t-2 border-gray-700'>
            <div className='flex gap-4 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                <div><HomeIcon /></div>
                <div>Dashboard</div>
            </div>

            <div className='flex gap-4 mt-6 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                <div><GroupIcon /></div>
                <div>Members</div>
            </div>

            <div className='flex gap-4 mt-6 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                <div><LogoutIcon /></div>
                <div>Logout</div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar