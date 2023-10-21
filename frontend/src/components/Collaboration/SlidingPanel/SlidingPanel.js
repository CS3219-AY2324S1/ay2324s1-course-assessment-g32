import React, { useState, useEffect } from 'react';
import Spinner from '../../Spinner.js';
import { getQuestions, getQuestionDetails } from '../../../api/QuestionApi.js';
import { errorHandler } from '../../../utils/errors.js';
import { getCookie } from '../../../utils/helpers.js';
import './SlidingPanel.css';

const SlidingPanel = ({ isOpen, onClose, onSelectQuestion }) => {
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

  const handleRowClick = async (id) => {
    const question = await getQuestionDetails(id, getCookie());
    onSelectQuestion(question);
    onClose();
  };

  const RenderTags = (tags) => {
    return tags?.map((tag, index) => {
      return (
        <span key={index} className='badge bg-secondary'>
          {tag}
        </span>
      );
    });
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
    <tr key={question._id} onClick={() => handleRowClick(question._id)}>
      <td>
        <div>
          <div className='d-flex justify-content-between'>
            <div style={{ wordWrap: 'break-word' }}>{question.title}</div>
            <span
              className={`badge ${getComplexityColor(question?.complexity)}`}
            >
              {question.complexity}
            </span>
          </div>
          <div>{RenderTags(question.tags)}</div>
        </div>
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
          <h2>Question List</h2>
          <table className='table table-hover table-striped'>
            <tbody className='table-group-divider'>{questionList}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SlidingPanel;