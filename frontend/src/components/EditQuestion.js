import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { editQuestion, getQuestionDetails } from '../api/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast, showFailureToast } from '../utils/toast.js';
import TextEditor from './TextEditor/TextEditor.js';

const EditQuestion = () => {

  const [newTitleValue, setTitleValue] = useState('');
  const [newComplexityValue, setComplexityValue] = useState('');
  const [newDescriptionValue, setDescriptionValue] = useState('');
  const [newTags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
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
        setTags(question.tags);
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
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      await editQuestion(id, newTitleValue, newComplexityValue, newDescriptionValue, newTags);
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

  const handleComplexityValueChange = (event) => {
    setComplexityValue(event.target.value);
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

  const handleDescriptionValueChange = (html) => {
    setDescriptionValue(html);
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
          <textarea className='form-control' id='createQuestionDescription' placeholder='description' value={newDescriptionValue} onChange={handleDescriptionValueChange} required />
          <label htmlFor='createQuestionTitle'>Description</label>
        </div>
        <div class="form-floating mb-3">
          <TextEditor value={newDescriptionValue} onChange={handleDescriptionValueChange} />
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" onClick={handleBackClick}>Back</button>
          <button type="submit" class="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
