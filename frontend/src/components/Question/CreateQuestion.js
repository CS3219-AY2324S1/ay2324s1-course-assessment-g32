import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-tagsinput/react-tagsinput.css';
import QuestionForm from './QuestionForm.js';
import { createQuestion } from '../../api/QuestionApi.js';
import { EditWindow } from '../ConfirmationWindow/ConfirmationWindows.js';
import { showSuccessToast } from '../../utils/toast.js';
import { errorHandler } from '../../utils/errors.js';
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
      const response = await createQuestion(title, complexity, description, tags);
      navigate('../question/' + response.data.question._id);
      showSuccessToast('Question Created Successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-center">
          <h2>Add a Question</h2>
        </div>
        <div className="card-body">
          <QuestionForm onFormSubmit={handleSaveClick} />
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            <button type="submit" form="questionForm" className="btn btn-success">Save</button>
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
  );
};

export default CreateQuestion;
