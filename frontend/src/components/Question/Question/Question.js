import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionContent from '../QuestionContent/QuestionContent';
import { getQuestionDetails, deleteQuestion } from '../../../api/QuestionApi';
import { showSuccessToast } from '../../../utils/toast';
import { DeletionWindow } from '../../ConfirmationWindow/ConfirmationWindows';
import { errorHandler } from '../../../utils/errors';
import './Question.css';
import '../../../css/Tags.css';

const Question = () => {
  const [question, setQuestion] = useState({});
  const [isDeletionWindowOpen, setDeletionWindowOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id);
        setQuestion(question);
        setIsLoading(false);
      } catch (error) {
        navigate('../');
        errorHandler(error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate('../');
  };

  const handleEditClick = () => {
    navigate('../edit/' + id);
  };

  const handleDeleteClick = () => {
    setDeletionWindowOpen(true);
  };

  const handleConfirmDeletion = async () => {
    setDeletionWindowOpen(false);
    try {
      await deleteQuestion(id);
      showSuccessToast('Successfully Deleted!');
      navigate('../');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeletionWindowClose = () => {
    setDeletionWindowOpen(false);
  };

  return isLoading ? (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="container question-container">
      <div className="card text-center">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            <div>
              <button type="button" className="btn btn-primary me-2" onClick={handleEditClick}>Edit</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
        <div className="qc-container">
          <QuestionContent question={question} />
        </div>
      </div>
      {isDeletionWindowOpen && (
        <DeletionWindow
          onConfirm={handleConfirmDeletion}
          onClose={handleDeletionWindowClose}
        />
      )}
    </div>
  );
};

export default Question;
