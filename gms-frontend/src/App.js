import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/home';
import Dashboard from './Pages/Dashboard/dashboard';

function App() {
  return (
    <div className="">
      {/* Welcom to Gym Managment System(gms) */}
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
