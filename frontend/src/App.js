import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Collaboration from './pages/Collaboration';

// Question pages
import Landing from './pages/Landing';
import {
  CreateQuestion,
  EditQuestion,
  QuestionDescription,
} from './pages/Question';
// Normal user pages
import {
  ChangeUserPassword,
  ManageUserProfile,
  NormalEditUser,
} from './pages/User/UserProfile';
// Maintainer pages
import {
  AddUser,
  MaintainerEditUser,
  ManageUserProfiles,
} from './pages/User/UsersManagement';
// Unauthorized page
import UnauthorizedPage from './pages/UnauthorizedPage';
// Page not found page
import PageNotFound from './pages/PageNotFound';
// Special routes
import ProtectedRoute from './utils/ProtectedRoute';
import MaintainerRoute from './utils/MaintainerRoute';

import './App.css';
import './css/Auth.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Question management for normal users */}
        <Route path='/landing' element={<ProtectedRoute />}>
          <Route index element={<Landing />} />
          <Route path='/landing/question/:id' element={<QuestionDescription />} />
        </Route>

        {/* Question management for maintainers only */}
        <Route path='/landing' element={<MaintainerRoute />}>
          <Route path='/landing/new' element={<CreateQuestion />} />
        </Route>
        <Route path='/landing/edit' element={<MaintainerRoute />}>
          <Route path='/landing/edit/:id' element={<EditQuestion />} />
        </Route>

        {/* Profile management for normal users */}
        <Route path='/user-profile' element={<ProtectedRoute />}>
          <Route index element={<ManageUserProfile />} />
          <Route path='/user-profile/edit' element={<NormalEditUser />} />
          <Route path='/user-profile/change-password' element={<ChangeUserPassword />} />
        </Route>

        {/* Profile management for maintainers only */}
        <Route path='/users-management' element={<MaintainerRoute />}>
          <Route index element={<ManageUserProfiles />} />
          <Route path='/users-management/edit' element={<MaintainerEditUser />} />
          <Route path='/users-management/new' element={<AddUser />} />
        </Route>

        {/* Collaboration page for normal users*/}
        <Route path='/collaboration' element={<ProtectedRoute />}>
          <Route index element={<Collaboration />} />
        </Route>

        {/* Display Login component by default */}
        <Route path='/' element={<Login />} />

        {/* Display UnauthorizedPage component if user is not authorized */}
        <Route path='/unauthorized' element={<UnauthorizedPage />} />

        {/* Display PageNotFound component if route does not exist */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
