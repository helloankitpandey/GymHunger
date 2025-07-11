import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/home';
import Dashboard from './Pages/Dashboard/dashboard';
import Sidebar from './Components/Sidebar/sidebar';
import { useEffect, useState } from 'react';
import Member from './Pages/Member/member';

function App() {

  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false);
  

  useEffect(() => {
    let isLogedIn = sessionStorage.getItem("isLogin");
    if(isLogedIn){
      setIsLogIn(true);
      // navigate('/dashboard')
    }else{
      navigate('/')
    }
    
  },[sessionStorage.getItem("isLogin")])

  return (
    <div className="flex">
      {/* Welcom to Gym Managment System(gms) */}
      {
        isLogIn && <Sidebar />
      }
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/member' element={<Member />} />
      </Routes>
    </div>
  );
}

export default App;
