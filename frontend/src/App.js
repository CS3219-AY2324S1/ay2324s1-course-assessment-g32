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
// Submission History page
import SubmissionHistory from './pages/SubmissionHistory/SubmissionHistory';
// Submission Attempt page
import SubmissionAttempt from './pages/SubmissionHistory/SubmissionAttempt';
// Question page
import QuestionPage from './pages/Question/QuestionPage';
// Special routes
import NonLoggedInRoute from './utils/NonLoggedInRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import MaintainerRoute from './utils/MaintainerRoute';

import './App.css';
import './css/Auth.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<NonLoggedInRoute />}>
          {/* Display Login component by default */}
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        {/* Landing for normal users */}
        <Route path='/landing' element={<ProtectedRoute />}>
          <Route index element={<Landing />} />
        </Route>

        {/* Question page for normal users */}
        <Route path='/ques' element={<ProtectedRoute />}>
          <Route index element={<QuestionPage />} />
          <Route path='/ques/:id' element={<QuestionDescription />} />
        </Route>

        {/* Question management for maintainers only */}
        <Route path='/ques' element={<MaintainerRoute />}>
          <Route path='/ques/new' element={<CreateQuestion />} />
        </Route>
        <Route path='/ques/edit' element={<MaintainerRoute />}>
          <Route path='/ques/edit/:id' element={<EditQuestion />} />
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


        {/* Submission History for normal users */}
        <Route path='/submission-history' element={<ProtectedRoute />}>
          <Route index element={<SubmissionHistory />} />
          <Route path='/submission-history/:id' element={<SubmissionAttempt />} />
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
