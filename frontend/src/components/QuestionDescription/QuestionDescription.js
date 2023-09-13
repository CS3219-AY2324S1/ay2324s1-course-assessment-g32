import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'react-toastify/dist/ReactToastify.css';
import { getQuestionDetails, deleteQuestion } from '../../api_connector/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../../utils/toast.js';
import './QuestionDescription.css'

const QuestionDescription = () => {

  const [question, setQuestion] = useState([]);

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

  return (
    <Box className="box" sx={{ borderRadius: '25px', p: 3, boxShadow: 2, border: 2 }}>

      <div className="question-description">
        <div className="horizontal-row">
          <Button variant="outlined"
            onClick={handleBackClick} startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
          <Button style={{ maxWidth: '110px', minWidth: '110px', float: 'right' }} color="error" variant="contained"
            onClick={handleDeleteClick} startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button style={{ maxWidth: '110px', minWidth: '110px', float: 'right' }} variant="contained"
            sx={{ mr: 2 }} onClick={handleEditClick} startIcon={<EditIcon />}>
            Edit
          </Button>
        </div>
        <h1 className="question-title">{question?.title}</h1>
        <h3>Complexity: {question?.complexity}</h3>
        <p>{question?.description}</p>
      </div>
    </Box>
  )
};

export default QuestionDescription;
