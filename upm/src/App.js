import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ManageUserProfiles from './pages/ManageUserProfiles';
import 'css/App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<ManageUserProfiles />} /> {/* Display Login component by default */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
