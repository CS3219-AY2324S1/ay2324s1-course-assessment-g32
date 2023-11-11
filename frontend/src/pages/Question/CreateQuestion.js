import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { QuestionForm } from '../../components/Question';
import { EditWindow } from '../../components/ConfirmationWindows';
import { createQuestion } from '../../api/QuestionApi';
import { getCookie } from '../../utils/helpers';
import { showSuccessToast } from '../../utils/toast';
import { errorHandler } from '../../utils/errors';
import '../../css/Tags.css';

const CreateQuestion = () => {
  const [isEditWindowOpen, setEditWindowOpen] = useState(false);

  const navigate = useNavigate();

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
      const response = await createQuestion(
        title,
        complexity,
        description,
        tags,
        getCookie()
      );
      navigate('../question/' + response.data.question._id);
      showSuccessToast('Question Created Successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className='background'>
      <div className='main'>
        <Header />
        <div className='container'>
          <div className='card'>
            <div className='card-header text-center'>
              <h2>Add a Question</h2>
            </div>
            <div className='card-body'>
              <QuestionForm onFormSubmit={handleSaveClick} />
            </div>
            <div className='card-footer'>
              <div className='d-flex justify-content-between'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={handleBackClick}>
                  Back
                </button>
                <button
                  type='submit'
                  form='questionForm'
                  className='btn btn-success'>
                  Save
                </button>
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
    </div>
  );
};

export default CreateQuestion;
