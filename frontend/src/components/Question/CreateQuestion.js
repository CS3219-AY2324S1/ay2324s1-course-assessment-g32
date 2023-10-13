import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { createQuestion } from '../../api/QuestionApi.js';
import { EditWindow } from '../ConfirmationWindow/ConfirmationWindows.js';
import { showSuccessToast, showFailureToast } from '../../utils/toast.js';
import { errorHandler } from '../../utils/errors.js';
import TextEditor from '../TextEditor/TextEditor.js';
import '../../css/Tags.css';

const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [complexity, setComplexity] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
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
      const response = await createQuestion(title, complexity, description, tags);
      navigate('../question/' + response.data.question._id);
      showSuccessToast('Question Created Successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleComplexityChange = (event) => {
    setComplexity(event.target.value);
  };

  const handleDescriptionChange = (html) => {
    setDescription(html);
  };

  const handleTagsChange = (tags) => {
    setTags(tags);
  };

  const handleTagInputChange = (input) => {
    if (input.length > 40) {
      showFailureToast('Tag cannot be longer than 40 characters');
      return;
    }
    setTagInput(input);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header text-center">
          <h2>Add a Question</h2>
        </div>
        <div className="card-body">
          <form className="create-question-form needs-validation" id="addQuestionForm" onSubmit={handleSaveClick}>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="createQuestionTitle" placeholder="title" onChange={handleTitleChange}/>
              <label htmlFor="createQuestionTitle">Title</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-select mb-3" id="createQuestitonComplexity" defaultValue="" onChange={handleComplexityChange}>
                <option disabled value="">Select a complexity...</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <label htmlFor="createQuestitonComplexity">Complexity</label>
            </div>
            <div className="form-floating mb-3">
              <TagsInput
                value={tags}
                onChange={handleTagsChange}
                inputValue={tagInput}
                onChangeInput={handleTagInputChange}
                addOnBlur={true}
                addKeys={[9, 13, 188]} // Tab, Enter, Comma
              />
            </div>
            <div className="form-floating">
              <TextEditor
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            <button type="submit" form="addQuestionForm" className="btn btn-success">Save</button>
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
