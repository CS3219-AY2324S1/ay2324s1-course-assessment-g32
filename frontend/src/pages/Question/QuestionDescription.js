import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import SubmissionDropdown from '../../components/SubmissionHistory/SubmissionDropdown';
import { QuestionContent } from '../../components/Question';
import { DeletionWindow } from '../../components/ConfirmationWindows';
import { getQuestionDetails, deleteQuestion } from '../../api/QuestionApi';
import { getCookie, getIsMaintainer } from '../../utils/helpers';
import { showSuccessToast } from '../../utils/toast';
import { errorHandler } from '../../utils/errors';
import '../../css/QuestionDescription.css';
import '../../css/Tags.css';

const QuestionDescription = () => {
  const [question, setQuestion] = useState({});
  const [isDeletionWindowOpen, setDeletionWindowOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaintainer, setIsMaintainer] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id, getCookie());
        setQuestion(question);
        setIsLoading(false);
      } catch (error) {
        navigate('../questions');
        errorHandler(error);
      }
    };

    const fetchIsMaintainer = async () => {
      const isMaintainerValue = await getIsMaintainer();
      setIsMaintainer(isMaintainerValue);
    };

    fetchData();
    fetchIsMaintainer();
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate('../questions');
  };

  const handleEditClick = () => {
    navigate('./edit');
  };

  const handleDeleteClick = () => {
    setDeletionWindowOpen(true);
  };

  const handleConfirmDeletion = async () => {
    setDeletionWindowOpen(false);
    try {
      await deleteQuestion(id, getCookie());
      showSuccessToast('Successfully Deleted!');
      navigate('../questions');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeletionWindowClose = () => {
    setDeletionWindowOpen(false);
  };

  return (
    <div>
      <Header />
      <div className='background'>
        {isLoading ? (
            <Spinner />
        ) : (
          <div className='main'>
            <div className='container'>
              <div className='question-container'>
                <div className='card text-center'>
                  <div className='card-header'>
                    <div className='d-flex justify-content-between'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={handleBackClick}>
                        Back
                      </button>
                      {isMaintainer ? (
                        <div>
                          <button
                            type='button'
                            className='btn btn-primary me-2'
                            onClick={handleEditClick}>
                            Edit
                          </button>
                          <button
                            type='button'
                            className='btn btn-danger'
                            onClick={handleDeleteClick}>
                            Delete
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className='qc-container'>
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
              <SubmissionDropdown question={id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDescription;
