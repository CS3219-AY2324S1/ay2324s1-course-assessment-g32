import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionForm from '../../components/Question/QuestionForm.js';
import Header from '../../components/Header.js';
import Spinner from '../../components/Spinner.js';
import { editQuestion, getQuestionDetails } from '../../api/QuestionApi.js';
import { EditWindow } from '../../components/ConfirmationWindow/ConfirmationWindows.js';
import { getCookie } from '../../utils/helpers.js';
import { showSuccessToast } from '../../utils/toast.js';
import { errorHandler } from '../../utils/errors.js';
import '../../css/Tags.css';

const EditQuestion = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditWindowOpen, setEditWindowOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id, getCookie());
        setFormData({
          title: question.title,
          complexity: question.complexity,
          description: question.description,
          tags: question.tags,
        });
        setIsLoading(false);
      } catch (error) {
        navigate('../');
        errorHandler(error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleBackClick = () => {
    setEditWindowOpen(true);
  };

  const handleConfirmQuit = () => {
    setEditWindowOpen(false);
    navigate(-1);
  };

  const handleEditWindowClose = () => {
    setEditWindowOpen(false);
  };

  const handleSaveClick = async (formData) => {
    const { title, complexity, description, tags } = formData;
    try {
      await editQuestion(id, title, complexity, description, tags, getCookie());
      navigate(-1);
      showSuccessToast('Question Edited Successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='landing'>
      <Header />
      <div className='container'>
        <div className='card'>
          <div className='card-header text-center'>
            <h2>Edit</h2>
          </div>
          <div className='card-body'>
            <QuestionForm oldFormData={formData} onFormSubmit={handleSaveClick} />
          </div>
          <div className='card-footer'>
            <div className='d-flex justify-content-between'>
              <button type='button' className='btn btn-secondary' onClick={handleBackClick}>Back</button>
              <button type='submit' form='questionForm' className='btn btn-success'>Save</button>
            </div>
          </div>
          {isEditWindowOpen && (
            <EditWindow
              onClose={handleEditWindowClose}
              onConfirm={handleConfirmQuit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
