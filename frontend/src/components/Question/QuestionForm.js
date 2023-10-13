import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { showFailureToast } from '../../utils/toast.js';
import TextEditor from '../TextEditor/TextEditor.js';

const QuestionForm = ({ onFormSubmit }) => {
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    complexity: '',
    description: '',
    tags: [],
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDescriptionChange = (html) => {
    setFormData((prevFormData) => ({ ...prevFormData, description: html }));
  };

  const handleTagsChange = (tags) => {
    setFormData((prevFormData) => ({ ...prevFormData, tags: tags }));
  };

  const handleTagInputChange = (input) => {
    if (input.length > 40) {
      showFailureToast('Tag cannot be longer than 40 characters');
      return;
    }
    setTagInput(input);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  }

  return (
    <form className="create-question-form needs-validation" id="questionForm" onSubmit={handleFormSubmit}>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" name="title" value={formData.title} placeholder="title" onChange={handleFormChange} />
        <label htmlFor="createQuestionTitle">Title</label>
      </div>
      <div className="form-floating mb-3">
        <select className="form-select mb-3" name="complexity" value={formData.complexity} onChange={handleFormChange}>
          <option disabled value="">Select a complexity...</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <label htmlFor="createQuestitonComplexity">Complexity</label>
      </div>
      <div className="form-floating mb-3">
        <TagsInput
          value={formData.tags}
          onChange={handleTagsChange}
          inputValue={tagInput}
          onChangeInput={handleTagInputChange}
          addOnBlur={true}
          addKeys={[9, 13, 188]} // Tab, Enter, Comma
        />
      </div>
      <div className="form-floating">
        <TextEditor
          value={formData.description}
          onChange={handleDescriptionChange}
        />
      </div>
    </form>
  );
};

export default QuestionForm;