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
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const navigate = useNavigate();
  const [isLogIn, setIsLogIn] = useState(false);
  
  

  useEffect(() => {
    let isLogedIn = localStorage.getItem("isLogin");
    if(isLogedIn){
      setIsLogIn(true);
      navigate('/dashboard')
    }else{
      setIsLogIn(false);
      navigate('/')
    }
    
  },[localStorage.getItem("isLogin")])

  return (
    <div className="flex">
      {/* Welcom to Gym Managment System(gms) */}
      {
        isLogIn && <Sidebar />
      }
      <div className={`flex-grow ${isLogIn ? 'md:ml-80' : ''}`}>
        <Routes>

          <Route path="/" element={<Home />}  />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/member' element={<Member />} />
          <Route path='/specific/:page' element={<Generaluser />} />
          <Route path='/member/:id' element={<MemberDetail />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
