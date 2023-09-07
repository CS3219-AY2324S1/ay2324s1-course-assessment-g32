import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import './QuestionDescription.css';
import Cookies from 'js-cookie';
import { navigate, useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionDescription = () => {

  const [question, setQuestion] = useState([]);

  const { id } = useParams();

  useEffect(() => {
      const cookieData = Cookies.get('questions');

      if (cookieData) {
        try {
          const parsedData = JSON.parse(cookieData);
          setQuestion(parsedData.filter((question) => question.id == id));
          console.log(parsedData.filter((question) => question.id == id));
        } catch (error) {
          console.error('Error parsing cookie data:', error);
        }
      }
  }, []);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('../');
  };

  const handleEditClick = () => {
    const cookieData = Cookies.get('questions');
    const parsedData = JSON.parse(cookieData);
    const objectToEdit = parsedData.find(item => item.id == id)
    objectToEdit.description = "Edited Description";
    Cookies.set('questions', JSON.stringify(parsedData));
  };

  const handleDeleteClick = () => {
    const cookieData = Cookies.get('questions');
    const parsedData = JSON.parse(cookieData);
    const indexToDelete = parsedData.findIndex(item => item.id == id);
    if (indexToDelete !== -1) {
      parsedData.splice(indexToDelete, 1);
    }
    Cookies.set('questions', JSON.stringify(parsedData));
    toast.success('Successfully Deleted !', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    navigate('../');
  };

  return (
  <Box bgcolor="#2d2d2d"  sx={{ height: '90vh', width: '80%', borderRadius: '25px', p: 3, boxShadow: 2, border: 2}}>

    <div className="question-description">
        <div className="horizontal-row">
            <Button variant ="outlined"
                    onClick={handleBackClick} startIcon={<ArrowBackIosIcon />}>
              Back
            </Button>
            <Button style={{maxWidth: '110px', minWidth: '110px', float: 'right'}} color="error" variant ="contained"
                    onClick={handleDeleteClick} startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button style={{maxWidth: '110px', minWidth: '110px', float: 'right' }} variant ="contained"
                    sx={{ mr: 2 }} onClick={handleEditClick} startIcon={<EditIcon />}>
              Edit
            </Button>
        </div>
        <h1>{question[0]?.title}</h1>
      <h3>Difficulty: {question[0]?.difficulty}</h3>
      <p>{question[0]?.description}</p>
    </div>
  </Box>

  )
}

export default QuestionDescription