import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import { editQuestion, getQuestionDetails } from '../../api_connector/QuestionApi.js';
import { showValidationErrorToast, showServerErrorToast, showSuccessToast } from '../../utils/toast.js';
import './EditQuestion.css';

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

const EditQuestion = () => {

  const [newTitleValue, setTitleValue] = useState([]);
  const [newDescriptionValue, setDescriptionValue] = useState([]);
  const [newComplexityValue, setComplexityValue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const question = await getQuestionDetails(id);
        setTitleValue(question.title);
        setComplexityValue(question.complexity);
        setDescriptionValue(question.description);
        setIsLoading(false);
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
    navigate(-1);
  };

  const handleSaveClick = async () => {
    try {
      await editQuestion(id, newTitleValue, newComplexityValue, newDescriptionValue);
      navigate(-1);
      showSuccessToast('Question Edited Successfully!');
    } catch (error) {
      if (error.response.status === 400) {
        showValidationErrorToast(error);
      } else {
        showServerErrorToast(error);
      }
    }
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
    <Box className="box" sx={{ borderRadius: '25px', p: 3, boxShadow: 2, border: 2 }}>
      <Button variant="outlined"
        onClick={handleBackClick} startIcon={<ArrowBackIosIcon />}>
        Back
      </Button>
      <FormControl fullWidth>
        <div style={{
          textAlign: 'center',
        }}>
          {isLoading ? <h1>Loading...</h1> : (
            <>
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
            </>
          )}

        </div>
      </FormControl>
      <Button style={{ maxWidth: '110px', minWidth: '110px', float: 'right' }} variant="contained"
        sx={{ mr: 2 }} color="success" onClick={handleSaveClick} startIcon={<SaveIcon />}>
        Save
      </Button>

    </Box>
  )
};

export default EditQuestion;
