import React from 'react';
import Header from '../../components/Header';
import './Landing.css';
import QuestionList from '../../components/Question/QuestionList';

function Landing() {
  return (
    <div className='landing'>
      <Header />
      <div className='body'>
        <QuestionList />
      </div>
    </div>
  );
}

export default Landing;
