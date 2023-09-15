import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editQuestion, getQuestionDetails } from '../api/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../utils/toast.js';

const EditQuestion = () => {
  const [newTitleValue, setTitleValue] = useState([]);
  const [newDescriptionValue, setDescriptionValue] = useState([]);
  const [newComplexityValue, setComplexityValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id);
        setTitleValue(question.title);
        setComplexityValue(question.complexity);
        setDescriptionValue(question.description);
        setIsLoading(false);
      } catch (error) {
        navigate('../');
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      await editQuestion(id, newTitleValue, newComplexityValue, newDescriptionValue);
      navigate(-1);
      showSuccessToast('Question Edited Successfully!');
    } catch (error) {
      if (error.response.status === 400) {
        showValidationErrorToast(error);
      } else {
        showServerErrorToast(error);
      }
    }
  };

  const handleTitleValueChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleDescriptionValueChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleComplexityValueChange = (event) => {
    setComplexityValue(event.target.value);
  };

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div className='container'>
      <h1>Edit</h1>
      <form className='create-question-form needs-validation' onSubmit={handleSaveClick} noValidate>
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='createQuestionTitle' placeholder='title' value={newTitleValue} onChange={handleTitleValueChange} required />
          <label htmlFor='createQuestionTitle'>Title</label>
        </div>
        <div className='form-floating mb-3'>
          <select className='form-select mb-3' id='createQuestitonComplexity' value={newComplexityValue} onChange={handleComplexityValueChange} required>
            <option disabled value=''>
              Select a complexity...
            </option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
          <label htmlFor='createQuestitonComplexity'>Complexity</label>
        </div>
        <div className='form-floating mb-3'>
          <textarea className='form-control' id='createQuestionDescription' placeholder='description' value={newDescriptionValue} onChange={handleDescriptionValueChange} required />
          <label htmlFor='createQuestionTitle'>Description</label>
        </div>
        <div className='d-flex justify-content-between'>
          <button type='button' className='btn btn-secondary' onClick={handleBackClick}>
            Back
          </button>
          <button type='submit' className='btn btn-success'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
