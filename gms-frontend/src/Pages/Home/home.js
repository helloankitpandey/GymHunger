import React from 'react';

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl">
        Welcome To Gym Managment System
      </div>
      <div className='w-full flex justify-center bg-cover h-[100%] bg-[url("https://wallpapers.com/images/hd/professional-gym-interior-vomd24bjg2wxd65f.jpg")]' >
        <div className='w-full'>
            <div className='w-1/3 p-10 mt-20 ml-20 bg-black bg-opacity-70'>
                <div className='font-sans text-white text-center text-4xl '>
                    Login
                </div>

            </div>
        </div>
      </div>
      

    </div>
  );
};

export default Home;
