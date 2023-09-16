import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing/Landing';
import UserManagement from './pages/UserManagement/UserManagement';
import UserProfile from './pages/UserProfile/UserProfile';
import './App.css';
import './css/Auth.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* TODO: Create ProtectedRoute to handle the routes for authenticated users */}
        <Route path='/landing/*' element={<Landing />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/user-profile/*' element={<UserProfile />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/user-management/*' element={<UserManagement />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/' element={<Login />} /> {/* Display Login component by default */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
