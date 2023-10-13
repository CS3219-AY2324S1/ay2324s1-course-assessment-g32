import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import QuestionList from '../../components/Question/QuestionList';
import Question from '../../components/Question/Question';
import EditQuestion from '../../components/Question/EditQuestion';
import CreateQuestion from '../../components/Question/CreateQuestion/CreateQuestion';
import Header from '../../components/Header';
import './Landing.css';

function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  useEffect(() => {
    if (!storedUser) {
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate, storedUser]);

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div className='landing'>
      <Header />
      <div className='body'>
        <Routes>
          <Route path='/' element={<QuestionList />} />
          <Route path='/question/:id' element={<Question />} />
          <Route path='/edit/:id' element={<EditQuestion />} />
          <Route path='/new' element={<CreateQuestion />} />
        </Routes>
      </div>
    </div>
  );
}

export default Landing;
