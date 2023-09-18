import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ManageUserProfiles from './pages/ManageUserProfiles/ManageUserProfiles';
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
        <Route path='/users-management/*' element={<ManageUserProfiles />} /> {/* TODO: create an unauthorised action page */}
        <Route path='/' element={<Login />} /> {/* Display Login component by default */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
