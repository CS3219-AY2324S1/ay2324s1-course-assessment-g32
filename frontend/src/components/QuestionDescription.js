import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionDetails, deleteQuestion } from '../api/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../utils/toast.js';

const QuestionDescription = () => {

  const [question, setQuestion] = useState([]);
  const tags = ['tag1', 'tag2', 'tag3'];

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getQuestionDetails(id);
        setQuestion(questions);
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
    navigate('../');
  };

  const handleEditClick = () => {
    navigate('../edit/' + id);
  };

  const handleDeleteClick = () => {
    try {
      deleteQuestion(id);
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
    return question?.tags?.map((tag) => {
      return <span class="badge bg-secondary me-1">{tag}</span>
    });
  };

  return (
    <div class="container">
      <div class="card text-center">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" onClick={handleBackClick}>Back</button>
            <div>
              <button type="button" class="btn btn-primary me-2" onClick={handleEditClick}>Edit</button>
              <button type="button" class="btn btn-danger" onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h1 class="card-title">{question?.title}</h1>
          <p>{question?.description}</p>
        </div>
        <div class="card-footer d-flex">
          {RenderTags()}
          <div class="ms-auto">
            <span class={`badge ${getComplexityColor(question?.complexity)}`}>{question?.complexity}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default QuestionDescription;
