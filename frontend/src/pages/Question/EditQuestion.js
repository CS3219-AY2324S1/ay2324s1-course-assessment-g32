import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import { QuestionForm } from '../../components/Question';
import { EditWindow } from '../../components/ConfirmationWindows';
import { editQuestion, getQuestionDetails } from '../../api/QuestionApi';
import { getCookie } from '../../utils/helpers';
import { showSuccessToast } from '../../utils/toast';
import { errorHandler } from '../../utils/errors';
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
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <div className='container'>
            <div className='card'>
              <div className='card-header text-center'>
                <h2>Edit Question</h2>
              </div>
              <div className='card-body'>
                <QuestionForm
                  oldFormData={formData}
                  onFormSubmit={handleSaveClick}
                />
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
    </div>
  );
};

export default EditQuestion;
