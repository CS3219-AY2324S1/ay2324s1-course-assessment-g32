import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../Spinner.js';
import { getQuestions } from '../../api/QuestionApi.js';
import { errorHandler } from '../../utils/errors.js';
import { getCookie } from '../../utils/helpers.js';
import './SlidingPanel.css';

const SlidingPanel = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchDataAndInitializeTable = async () => {
      try {
        const questions = await getQuestions(getCookie());
        setQuestions(questions);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchDataAndInitializeTable();
  }, []);

  const handleOverlayClick = () => {
    onClose();
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Hard':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const questionList = questions.map((question, index) => (
    <tr key={question._id}>
      <th scope='row'>{index + 1}</th>
      <td style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
        {question.title}
      </td>
      <td>
        <span className={`badge ${getComplexityColor(question?.complexity)}`}>
          {question.complexity}{' '}
        </span>
      </td>
    </tr>
  ));

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      {/* Overlay for darkening the background */}
      <div
        className={`overlay ${isOpen ? 'open' : ''}`}
        onClick={handleOverlayClick}
      />
      <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
        <div className='panel-content'>
          <table className='table table-hover table-striped'>
            <thead className='table-dark'>
              <tr>
                <th scope='col' width='100'>
                  No.
                </th>
                <th scope='col' width='800'>
                  Title
                </th>
                <th scope='col' width='200'>
                  Complexity
                </th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>{questionList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SlidingPanel;
