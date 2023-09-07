import React from 'react';
import './LandingPage.css';
import QuestionList from '../components/QuestionList';
import QuestionDescription from '../components/QuestionDescription';
import EditQuestion from '../components/EditQuestion';
import logo from '../images/logo.png';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function LandingPage() {
  const divStyle = {
    backgroundColor: '#242323'
  };
  return (
    <div className="landing-page">
      <Routes>
        <Route path="/" element={<QuestionList />} />
        <Route path="/question/:id" element={<QuestionDescription />} />
        <Route path="/edit/:id" element={<EditQuestion />} />
        <Route path="/new" element={<EditQuestion />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default LandingPage;