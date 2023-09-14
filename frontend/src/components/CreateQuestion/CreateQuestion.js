import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../../api/QuestionApi.js';
import { showServerErrorToast, showSuccessToast, showValidationErrorToast } from '../../utils/toast.js';
import './CreateQuestion.css';

const CreateQuestion = () => {

  const [newTitleValue, setTitleValue] = useState();
  const [newDescriptionValue, setDescriptionValue] = useState();
  const [newComplexityValue, setComplexityValue] = useState();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    try {
      const response = await createQuestion(newTitleValue, newComplexityValue, newDescriptionValue);
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

  return (
    <div class="container">
      <h1>Add a Question</h1>
      <form class="create-question-form needs-validation" onSubmit={handleSaveClick} novalidate>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="createQuestionTitle" placeholder="title" onChange={handleTitleValueChange} required />
          <label for="createQuestionTitle">Title</label>
        </div>
        <div class="form-floating mb-3">
          <select class="form-select mb-3" id="createQuestitonComplexity" onChange={handleComplexityValueChange} required>
            <option selected disabled value="">Select a complexity...</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <label for="createQuestitonComplexity">Complexity</label>
        </div>
        <div class="form-floating mb-3">
          <textarea class="form-control" id="createQuestionDescription" placeholder="description" onChange={handleDescriptionValueChange} required />
          <label for="createQuestionTitle">Description</label>
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
