import React from 'react';
import Login from '../../Components/Login/login';
import Signup from '../../Components/Signup/signup';

const Home = () => {
  return (
    <div className='w-full min-h-screen'>
      {/* Header */}
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl text-center">
        Welcome To Gym Management System
      </div>

      {/* Background with forms */}
      <div
        className='w-full flex justify-center items-center bg-cover bg-center min-h-[calc(100vh-72px)]'
        style={{ backgroundImage: 'url("https://wallpapers.com/images/hd/professional-gym-interior-vomd24bjg2wxd65f.jpg")' }}
      >
        <div className='w-full flex flex-col lg:flex-row gap-10 lg:gap-32 justify-center items-center p-4'>
          <Login />
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Home;
