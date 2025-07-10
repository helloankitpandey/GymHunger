import React from 'react';
import Login from '../../Components/Login/login';
import Signup from '../../Components/Signup/signup';

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl">
        Welcome To Gym Managment System
      </div>
      <div className='w-full flex justify-center bg-cover h-[100%] bg-[url("https://wallpapers.com/images/hd/professional-gym-interior-vomd24bjg2wxd65f.jpg")]' >
        <div className='w-full lg:flex gap-32'>

            <Login />

            <Signup />
        </div>
      </div>
      

    </div>
  );
};

export default Home;
