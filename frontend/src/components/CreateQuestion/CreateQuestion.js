import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { createQuestion } from '../../api/QuestionApi.js';
import { EditWindow } from '../ConfirmationWindow/ConfirmationWindows.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast, showFailureToast } from '../../utils/toast.js';
import './CreateQuestion.css';

const CreateQuestion = () => {
  const [newTitleValue, setTitleValue] = useState();
  const [newDescriptionValue, setDescriptionValue] = useState();
  const [newComplexityValue, setComplexityValue] = useState();
  const [newTags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
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

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const response = await createQuestion(newTitleValue, newComplexityValue, newDescriptionValue, newTags);
      navigate('../question/' + response.data.question._id);
      showSuccessToast('Question Created Successfully!');
    } catch (error) {
      if (error.response.status === 400) {
        showValidationErrorToast(error);
      } else {
        showServerErrorToast(error);
      }
    }
  };

  const handleTitleValueChange = (event) => {
    console.log(event.target.value);
    setTitleValue(event.target.value);
  };

  const handleComplexityValueChange = (event) => {
    console.log(event.target.value);
    setComplexityValue(event.target.value);
  };

  const handleDescriptionValueChange = (event) => {
    console.log(event.target.value);
    setDescriptionValue(event.target.value);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const handleInputChange = (input) => {
    if (input.length > 40) {
      showFailureToast('Tag cannot be longer than 40 characters');
      return;
    }
    setTagInput(input);
  };

  return (
    <div className='container'>
      <h1>Add a Question</h1>
      <form className='create-question-form needs-validation' onSubmit={handleSaveClick} noValidate>
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='createQuestionTitle' placeholder='title' onChange={handleTitleValueChange} required />
          <label htmlFor='createQuestionTitle'>Title</label>
        </div>
        <div className='form-floating mb-3'>
          <select className='form-select mb-3' id='createQuestitonComplexity' defaultValue='' onChange={handleComplexityValueChange} required>
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
          <TagsInput
            value={newTags}
            onChange={handleTagsChange}
            inputValue={tagInput}
            onChangeInput={handleInputChange}
            addOnBlur={true}
            addKeys={[9, 13, 188]} // Tab, Enter, Comma
          />
        </div>
        <div className='form-floating mb-3'>
          <textarea className='form-control' id='createQuestionDescription' placeholder='description' onChange={handleDescriptionValueChange} required />
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
      {isEditWindowOpen && <EditWindow onClose={handleEditWindowClose} onConfirm={handleConfirmQuit}/>}
    </div>
  );
};

export default CreateQuestion;
