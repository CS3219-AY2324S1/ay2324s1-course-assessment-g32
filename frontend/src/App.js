import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing/Landing';
import UserManagement from './pages/UserManagement/UserManagement';
import './App.css';
import './css/Auth.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/landing/*' element={<Landing />} />
        <Route path='/user-management/*' element={<UserManagement />} />
        <Route path='/' element={<Login />} /> {/* Display Login component by default */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
