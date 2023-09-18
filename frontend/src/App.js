import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing/Landing';
import UserManagement from './pages/UserManagement/UserManagement';
import UserProfile from './pages/UserProfile/UserProfile';
import './App.css';
import './css/Auth.css';
import { useRef } from 'react';

function App() {
  const user = useRef(null);
  user.current = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* TODO: Create ProtectedRoute to handle the routes below */}
        <Route path='/landing/*' element={user.current ? <Landing /> : <Navigate to='/login' />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/user-profile/*' element={user.current ? <UserProfile /> : <Navigate to='/login' />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/user-management/*' element={user.current && user.current.isAdmin ? <UserManagement /> : <Navigate to='/login' />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/' element={<Login />} /> {/* Display Login component by default */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
