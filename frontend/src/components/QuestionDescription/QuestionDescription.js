import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getQuestionDetails, deleteQuestion } from '../../api/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../../utils/toast.js';
import './QuestionDescription.css';

const QuestionDescription = () => {

  const [titleValue, setTitleValue] = useState('');
  const [complexityValue, setComplexityValue] = useState('');
  const [tagsValue, setTagsValue] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id);
        setTitleValue(question.title);
        setComplexityValue(question.complexity);
        setTagsValue(question.tags);
        const sanitizedDescription = DOMPurify.sanitize(question.description);
        setDescriptionValue(sanitizedDescription);
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
    navigate('../');
  };

  const handleEditClick = () => {
    navigate('../edit/' + id);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteQuestion(id);
      showSuccessToast('Successfully Deleted!');
      navigate('../');
    } catch (error) {
      showServerErrorToast(error);
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Hard':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const RenderTags = () => {
    return tagsValue?.map((tag) => {
      return <span class="badge bg-secondary">{tag}</span>
    });
  };

  return (
    <div className='container'>
      <div className='card text-center'>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-secondary' onClick={handleBackClick}>
              Back
            </button>
            <div>
              <button type='button' className='btn btn-primary me-2' onClick={handleEditClick}>
                Edit
              </button>
              <button type='button' className='btn btn-danger' onClick={handleDeleteClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h1 class="card-title">{titleValue}</h1>
          <div class="scrollable-div" dangerouslySetInnerHTML={{ __html: descriptionValue }}></div>
        </div>
        <div className='card-footer d-flex'>
          <div className='d-flex flex-wrap gap-1'>{RenderTags()}</div>
          <div className='ms-auto'>
            <span className={`badge ${getComplexityColor(complexityValue)}`}>{complexityValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDescription;
