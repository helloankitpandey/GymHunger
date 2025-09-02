import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/home';
import Dashboard from './Pages/Dashboard/dashboard';
import Sidebar from './Components/Sidebar/sidebar';
import { useEffect, useState } from 'react';
import Member from './Pages/Member/member';
import Generaluser from './Pages/GeneralUser/generaluser';
import NotFound from './Pages/NotFound/notFound';
import MemberDetail from './Pages/MemberDetail/memberDetail';
import Trainer from './Pages/Trainer/trainer';
import TrainerDetail from './Pages/TrainerDetail/trainerDetail';
import UserHome from './Pages/UserHome/userHome';

import Attendance from './Pages/Attendance/Attendance';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false);
  
  

  useEffect(() => {
    let isLogedIn = localStorage.getItem("isLogin");
    if(isLogedIn){
      setIsLogIn(true);
      const userRole = localStorage.getItem("userRole");
      // Redirect based on role
      if (userRole === 'user') {
        navigate('/user-home');
      } else {
        navigate('/dashboard');
      }
    }else{
      setIsLogIn(false);
      navigate('/')
    }
    
  },[localStorage.getItem("isLogin")])

  const userRole = localStorage.getItem("userRole");
  const shouldShowSidebar = isLogIn && userRole !== 'user';

  return (
    <div className="flex">
      {/* Welcom to Gym Managment System(gms) */}
      {
        shouldShowSidebar && <Sidebar />
      }
      <div className={`flex-grow ${shouldShowSidebar ? 'md:ml-80' : ''}`}>
        <Routes>

          <Route path="/" element={<Home />}  />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/member' element={<Member />} />
          <Route path='/trainer' element={<Trainer />} />
          <Route path='/trainer/:id' element={<TrainerDetail />} />
          <Route path='/specific/:page' element={<Generaluser />} />
          <Route path='/member/:id' element={<MemberDetail />} />
          <Route path='/user-home' element={<UserHome />} />

          <Route path='/workouts' element={<Attendance />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
