import React from 'react';
import './LandingPage.css';
import QuestionList from '../components/QuestionList';
import logo from '../images/logo.png';

function LandingPage() {
  const divStyle = {
    backgroundColor: '#242323'
  };
  return (
    <div className="landing-page">
      <QuestionList/>
      <img style={{ width: 750, height: 800 }} src={logo} alt="Logo" />;
    </div>
  );
}

export default LandingPage;