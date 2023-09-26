import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ManageUserProfiles from './pages/ManageUserProfiles/ManageUserProfiles';
import ManageUserProfile from './pages/ManageUserProfile/ManageUserProfile';
import './App.css';
import './css/Auth.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/landing/*' element={<Landing />} />
        <Route path='/user-profile/*' element={<ManageUserProfile />} />
        <Route path='/users-management/*' element={<ManageUserProfiles />} />
        <Route path='/' element={<Login />} /> {/* Display Login component by default */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
