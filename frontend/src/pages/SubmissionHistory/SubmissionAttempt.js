import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import { SubmissionCode } from '../../components/SubmissionHistory';
import { QuestionContent } from '../../components/Question';
import { getAttempt } from '../../api/HistoryApi';
import { getQuestionDetails } from '../../api/QuestionApi';
import { getCookie } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import '../../css/SubmissionAttempt.css';

function SubmissionAttempt() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [attempt, setAttempt] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = getCookie();
        const response = await getAttempt(jwt, id);
        const questionId = response.data.attempt.questionId;
        const question = await getQuestionDetails(questionId, jwt);
        setAttempt(response.data.attempt);
        setQuestion(question);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
        navigate('../');
      }
    };
    
    fetchData();
  }, [id, navigate]);

  return (
    <div className='submission-container'>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='submission-content'>
          <div className='submission-left p-3 '>
            <QuestionContent question={question} />
          </div>
          <div className='submission-right p-3'>
            <SubmissionCode attempt={attempt} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmissionAttempt;
