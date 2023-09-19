import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { createQuestion } from '../../api/QuestionApi.js';
import { EditWindow } from '../ConfirmationWindow/ConfirmationWindows.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast, showFailureToast, showDuplicateQuestionErrorToast } from '../../utils/toast.js';
import TextEditor from '../TextEditor/TextEditor.js';
import './CreateQuestion.css';
import '../../css/Tags.css';

const CreateQuestion = () => {

  const [newTitleValue, setTitleValue] = useState('');
  const [newComplexityValue, setComplexityValue] = useState('');
  const [newTags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isEditWindowOpen, setEditWindowOpen] = useState(false);
  const [newDescriptionValue, setDescriptionValue] = useState('');

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
      switch (error.response.status) {
        case 400: 
          showValidationErrorToast(error);
          break;
        case 408:
          showServerErrorToast(error);
          break;
        case 409:
          showDuplicateQuestionErrorToast(error);
          break;
        default:
          showFailureToast(error);
      }
    }
  };

  const handleTitleValueChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleComplexityValueChange = (event) => {
    setComplexityValue(event.target.value);
  };

  const handleDescriptionValueChange = (html) => {
    setDescriptionValue(html);
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
      <form className='create-question-form needs-validation' onSubmit={handleSaveClick} >
        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='createQuestionTitle' placeholder='title' onChange={handleTitleValueChange} />
          <label htmlFor='createQuestionTitle'>Title</label>
        </div>
        <div className='form-floating mb-3'>
          <select className='form-select mb-3' id='createQuestitonComplexity' defaultValue='' onChange={handleComplexityValueChange} >
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
        <div className="form-floating mb-3">
          <TextEditor value={newDescriptionValue} onChange={handleDescriptionValueChange} />
        </div>
        <div className='d-flex justify-content-between'>
          <button type='button' className='btn btn-secondary' onClick={handleBackClick}>Back</button>
          <button type='submit' className='btn btn-success'>Save</button>
        </div>
      </form>
      {isEditWindowOpen && <EditWindow onClose={handleEditWindowClose} onConfirm={handleConfirmQuit}/>}
    </div>
  );
};

export default CreateQuestion;
