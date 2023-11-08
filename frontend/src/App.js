import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Collaboration from './pages/Collaboration';
import Landing from './pages/Landing';
// Question pages
import {
  CreateQuestion,
  EditQuestion,
  QuestionDescription,
  QuestionsPage,
} from './pages/Question';
// Normal user pages
import {
  ChangeUserPassword,
  ManageUserProfile,
  NormalEditUser,
} from './pages/User/UserProfile';
// Submission History pages
import {
  SubmissionAttempt,
  SubmissionHistory,
} from './pages/SubmissionHistory';
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

import './css/App.css';
import './css/Auth.css';

function App() {
  return (
    <div>
      <Routes>
        {/* Display Login component by default */}
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Landing for normal users */}
        <Route path='/landing' element={<ProtectedRoute />}>
          <Route index element={<Landing />} />
        </Route>

        {/* Question page for normal users */}
        <Route path='/questions' element={<ProtectedRoute />}>
          <Route index element={<QuestionsPage />} />
        </Route>

        {/* Question description for normal users */}
        <Route path='/question/:id' element={<ProtectedRoute />}>
          <Route index element={<QuestionDescription />} />
        </Route>

        {/* Question creation for maintainers only */}
        <Route path='/question/new' element={<MaintainerRoute />}>
          <Route index element={<CreateQuestion />} />
        </Route>

        {/* Question edit for maintainers only */}
        <Route path='/question/:id/edit' element={<MaintainerRoute />}>
          <Route index element={<EditQuestion />} />
        </Route>

        {/* Profile management for normal users */}
        <Route path='/user-profile' element={<ProtectedRoute />}>
          <Route index element={<ManageUserProfile />} />
          <Route path='/user-profile/edit' element={<NormalEditUser />} />
          <Route
            path='/user-profile/change-password'
            element={<ChangeUserPassword />}
          />
        </Route>

        {/* Profile management for maintainers only */}
        <Route path='/users-management' element={<MaintainerRoute />}>
          <Route index element={<ManageUserProfiles />} />
          <Route
            path='/users-management/edit'
            element={<MaintainerEditUser />}
          />
          <Route path='/users-management/new' element={<AddUser />} />
        </Route>

        {/* Submission History for normal users */}
        <Route path='/submission-history' element={<ProtectedRoute />}>
          <Route index element={<SubmissionHistory />} />
          <Route
            path='/submission-history/:id'
            element={<SubmissionAttempt />}
          />
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
