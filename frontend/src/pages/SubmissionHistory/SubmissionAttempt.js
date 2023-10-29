import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAttempt } from '../../api/HistoryApi';
import { getQuestionDetails } from '../../api/QuestionApi';
import { getCookie } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import Header from '../../components/Header';
import { SubmissionCode } from '../../components/SubmissionHistory';
import { QuestionContent } from '../../components/Question';
import '../../css/SubmissionAttempt.css';

function SubmissionAttempt() {

  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [attempt, setAttempt] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAttempt(await getCookie(), id);
        const question = await getQuestionDetails(response.data.attempt.questionId, await getCookie());
        setAttempt(response.data.attempt);
        setQuestion(question);

      } catch (error) {
        errorHandler(error);
        navigate('../')
      }
    };
    fetchData();
  }, [id, navigate]);

  return (
    <div className='submission-container'>
      <Header />
      <div className='content'>
        <div className='left p-3 '>
          <QuestionContent question={question} />
        </div>
        <div className='right'>
          <SubmissionCode attempt={attempt} />
        </div>
      </div>
    </div>
  );
}

export default SubmissionAttempt;
