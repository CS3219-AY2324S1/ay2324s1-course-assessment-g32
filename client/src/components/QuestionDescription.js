import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import './QuestionDescription.css';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';


const QuestionDescription = () => {

  const [question, setQuestion] = useState([])

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

  return (
  <Box bgcolor="#2d2d2d"  sx={{ height: '90vh', width: '80%', borderRadius: '25px', p: 3, boxShadow: 2, border: 2}}>
    <div className="question-description">
      <h1>Question {id}</h1>
      <h2>{question[0]?.title}</h2>
      <h3>Difficulty: {question[0]?.difficulty}</h3>
      <p>{question[0]?.description}</p>
    </div>
  </Box>
  )
}

export default QuestionDescription