import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createQuestion} from '../../api_connector/QuestionApi.js';
import './CreateQuestion.css';


const styles = {
  textBox: {
    width: '80%',
    '& .MuiInputBase-input': {
      color: 'white',
    },
    backgroundColor: '#3d3d3d',
    margin: '10px',
  },
};

const CreateQuestion = () => {

  const [newTitleValue, setTitleValue] = useState();
  const [newDescriptionValue, setDescriptionValue] = useState();
  const [newComplexityValue, setComplexityValue] = useState();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {

    createQuestion(newTitleValue, newComplexityValue, newDescriptionValue).then((response) => {
      navigate('../question/' + response.data.question._id);
      toast.success('Question created successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }).catch((error) => {
      if (error.response.status === 400) {
        toast.error('Validation Error: ' + error.response.data.error, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        console.error('Validation Error:', error.response.data.error);
      } else {
        toast.error('Server Error: ' + error.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    });

  };

  const handleTitleValueChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleDescriptionValueChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleComplexityValueChange = (event) => {
    setComplexityValue(event.target.value);
  };


  return (
    <Box bgcolor="#2d2d2d" sx={{ height: '90vh', width: '80%', borderRadius: '25px', p: 3, boxShadow: 2, border: 2 }}>
      <Button variant="outlined"
        onClick={handleBackClick} startIcon={<ArrowBackIosIcon />}>
        Back
      </Button>
      <FormControl fullWidth>
        <div style={{
          textAlign: 'center',
        }}>
          <TextField
            required
            variant="filled"
            id="outlined-required"
            label="Title"
            value={newTitleValue}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={styles.textBox}
            onChange={handleTitleValueChange}
          />
          <TextField
            required
            variant="filled"
            id="outlined-required"
            label="Complexity"
            value={newComplexityValue}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={styles.textBox}
            onChange={handleComplexityValueChange}
          />
          <TextField
            required
            variant="filled"
            id="outlined-multiline-static"
            multiline
            label="Description"
            rows={10}
            value={newDescriptionValue}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={styles.textBox}
            onChange={handleDescriptionValueChange}
          />
        </div>
      </FormControl>
      <Button style={{ maxWidth: '110px', minWidth: '110px', float: 'right' }} variant="contained"
        sx={{ mr: 2 }} color="success" onClick={handleSaveClick} startIcon={<SaveIcon />}>
        Save
      </Button>

    </Box>

  )
}

export default CreateQuestion;
