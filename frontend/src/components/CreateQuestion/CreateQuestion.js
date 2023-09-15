import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { createQuestion } from '../../api/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast, showFailureToast } from '../../utils/toast.js';
import TextEditor from '../TextEditor/TextEditor.js';
import './CreateQuestion.css';

const CreateQuestion = () => {

  const [newTitleValue, setTitleValue] = useState('');
  const [newComplexityValue, setComplexityValue] = useState('');
  const [newTags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [newDescriptionValue, setDescriptionValue] = useState('');

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
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
    setTitleValue(event.target.value);
  };

  const handleComplexityValueChange = (event) => {
    setComplexityValue(event.target.value);
  };

  const handleDescriptionValueChange = (html) => {
    setDescriptionValue(html);
  };

  const handleTagsChange = (tags) => {
    console.log(tags);
    setTags(tags);
  };

  const handleInputChange = (input) => {
    if (input.length > 40) {
      showFailureToast('Tag cannot be longer than 40 characters');
      return;
    }
    setTagInput(input);
  };

  const handleRemoveTag = (tagIndex) => {
    const updatedTags = newTags.filter((_, index) => index !== tagIndex);
    setTags(updatedTags);
  };

  return (
    <div class="container">
      <h1>Add a Question</h1>
      <form class="create-question-form needs-validation" onSubmit={handleSaveClick} >
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="createQuestionTitle" placeholder="title" onChange={handleTitleValueChange} />
          <label for="createQuestionTitle">Title</label>
        </div>
        <div class="form-floating mb-3">
          <select class="form-select mb-3" id="createQuestitonComplexity" defaultValue="" onChange={handleComplexityValueChange} >
            <option disabled value="">Select a complexity...</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <label for="createQuestitonComplexity">Complexity</label>
        </div>
        <div class="form-floating mb-3">
          <TagsInput
            value={newTags}
            onChange={handleTagsChange}
            inputValue={tagInput}
            onChangeInput={handleInputChange}
            addOnBlur={true}
            addKeys={[9, 13, 188]} // Tab, Enter, Comma
          />
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
  )
};

export default CreateQuestion;
