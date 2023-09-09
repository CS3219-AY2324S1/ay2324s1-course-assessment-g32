import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const { id } = useParams();
  const [newIDValue, setIDValue] = useState();
  const [newTitleValue, setTitleValue] = useState();
  const [newDescriptionValue, setDescriptionValue] = useState();
  const [newDifficultyValue, setDifficultyValue] = useState();

  useEffect(() => {
    const cookieData = Cookies.get('questions');
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setIDValue(parsedData.filter((question) => question.id === id)[0].id);
        setTitleValue(parsedData.filter((question) => question.id === id)[0].title);
        setDescriptionValue(parsedData.filter((question) => question.id === id)[0].description);
        setDifficultyValue(parsedData.filter((question) => question.id === id)[0].difficulty);
        console.log(parsedData.filter((question) => question.id === id));
      } catch (error) {
        console.error('Error parsing cookie data:', error);
      }
    }

  }, []);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = () => {

    // Check if all fields are filled up
    if (!newIDValue || !newTitleValue || !newDescriptionValue || !newDifficultyValue) {
      toast.error('Please fill in all fields!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      return;
    }

    const cookieData = Cookies.get('questions');
    const parsedData = JSON.parse(cookieData);
    console.log(newIDValue);
    var updatedParsedData = parsedData;

    // Check if this page is for editing or creating a new question
    if (id != null) {
      updatedParsedData = updatedParsedData.map((item) => {
        if (item.id === id) {
          return {
            id: newIDValue, title: newTitleValue,
            description: newDescriptionValue, difficulty: newDifficultyValue
          };
        }
        return item;
      });
    } else {
      updatedParsedData.push({
        id: newIDValue, title: newTitleValue,
        description: newDescriptionValue, difficulty: newDifficultyValue
      });
    }
    console.log(updatedParsedData);
    Cookies.set('questions', JSON.stringify(updatedParsedData), { expires: 7 });

    toast.success('Successfully Updated!', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    navigate('../question/' + newIDValue);
  };

  const handleIDValueChange = (event) => {
    const regex = /[^0-9]/;

    // Check if ID contains only numbers
    if (regex.test(event.target.value)) {
      toast.error('ID can only contain digits!', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      const newValue = event.target.value.replace(/[^0-9]/g, '');
      setIDValue(newValue);
    } else {
      setIDValue(event.target.value);
    }
  };

  const handleTitleValueChange = (event) => {
    setTitleValue(event.target.value);
  }

  const handleDescriptionValueChange = (event) => {
    setDescriptionValue(event.target.value);
  }

  const handleDifficultyValueChange = (event) => {
    setDifficultyValue(event.target.value);
  }


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
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
            }}
            variant="filled"
            id="outlined-required"
            label="ID"
            value={newIDValue}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={styles.textBox}
            onChange={handleIDValueChange}
          />
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
            value={newDifficultyValue}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            sx={styles.textBox}
            onChange={handleDifficultyValueChange}
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

export default EditQuestion;
