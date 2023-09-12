import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getQuestionDetails } from '../../engine/QuestionEngine.js';
import './QuestionDescription.css'

const QuestionDescription = () => {

  const [question, setQuestion] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getQuestionDetails(id).then((response) => {
      setQuestion(response.data.question);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('../');
  };

  const handleEditClick = () => {
    navigate('../edit/' + id);
  };

  const handleDeleteClick = () => {
    const cookieData = Cookies.get('questions');
    const parsedData = JSON.parse(cookieData);
    const indexToDelete = parsedData.findIndex(item => item.id === id);
    if (indexToDelete !== -1) {
      parsedData.splice(indexToDelete, 1);
    }
    Cookies.set('questions', JSON.stringify(parsedData));
    toast.success('Successfully Deleted!', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    navigate('../');
  };

  return (
    <Box bgcolor="#2d2d2d" sx={{ height: '90vh', width: '80%', borderRadius: '25px', p: 3, boxShadow: 2, border: 2 }}>

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
        <h1>{question?.title}</h1>
        <h3>Complexity: {question?.complexity}</h3>
        <p>{question?.description}</p>
      </div>
    </Box>

  )
}

export default QuestionDescription;
