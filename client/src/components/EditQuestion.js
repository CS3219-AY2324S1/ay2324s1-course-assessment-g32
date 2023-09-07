import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import './EditQuestion.css';
import Cookies from 'js-cookie';
import { navigate, useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';

const styles = {
  textBox: {
width: '80%',
        '& .MuiInputBase-input': {
          color: 'white',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
        },
        backgroundColor: '#3d3d3d',
        borderRadius: '5px',
        margin: '10px',
  },
};


const EditQuestion = () => {

  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [newIDValue, setIDValue] = useState();
  const [newTitleValue, setTitleValue] = useState();
  const [newDescriptionValue, setDescriptionValue] = useState();
  const [newDifficultyValue, setDifficultyValue] = useState();

  useEffect(() => {
      console.log(id);
  }, []);

  useEffect(() => {
      const cookieData = Cookies.get('questions');
      if (cookieData) {
        try {
          const parsedData = JSON.parse(cookieData);
          setQuestion(parsedData.filter((question) => question.id == id)[0]);
          setIDValue(parsedData.filter((question) => question.id == id)[0].id);
          setTitleValue(parsedData.filter((question) => question.id == id)[0].title);
          setDescriptionValue(parsedData.filter((question) => question.id == id)[0].description);
          setDifficultyValue(parsedData.filter((question) => question.id == id)[0].difficulty);
          console.log(parsedData.filter((question) => question.id == id));
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
    const cookieData = Cookies.get('questions');
    const parsedData = JSON.parse(cookieData);
    console.log(newIDValue);
    var updatedParsedData = parsedData;
    if (id != null) {
        updatedParsedData = updatedParsedData.map((item) => {
          if (item.id == id) {
            return { id: parseInt(newIDValue), title: newTitleValue,
            description: newDescriptionValue, difficulty: newDifficultyValue };
          }
          return item;
        });
    } else {
        updatedParsedData.push({ id: parseInt(newIDValue), title: newTitleValue,
        description: newDescriptionValue, difficulty: newDifficultyValue });
    }
    console.log(updatedParsedData);
    Cookies.set('questions', JSON.stringify(updatedParsedData), { expires: 7 });

    toast.success('Successfully Updated!', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
    navigate('../question/' + newIDValue);
  };

  const handleIDValueChange = (event) => {
    setIDValue(event.target.value);
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
  <Box bgcolor="#2d2d2d"  sx={{ height: '90vh', width: '80%', borderRadius: '25px', p: 3, boxShadow: 2, border: 2}}>
    <Button variant ="outlined"
            onClick={handleBackClick} startIcon={<ArrowBackIosIcon />}>
      Back
    </Button>
    <div style={{
        textAlign: 'center',
               }}>
    <div>
    <TextField
      required
      variant="filled"
      id="outlined-required"
      label="ID"
      multiline
      rows={1}
      defaultValue= {question?.id}
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
      multiline
      rows={1}
      defaultValue={question?.title}
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
      multiline
      rows={1}
      defaultValue={question?.difficulty}
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
      rows={16}
      defaultValue={question?.description}
        InputLabelProps={{
          style: { color: '#fff' },
        }}
      sx={styles.textBox}
        onChange={handleDescriptionValueChange}
    />
    </div>
    </div>

    <Button style={{maxWidth: '110px', minWidth: '110px', float: 'right' }} variant ="contained"
            sx={{ mr: 2 }} color="success" onClick={handleSaveClick} startIcon={<SaveIcon />}>
      Save
    </Button>

  </Box>

  )
}

export default EditQuestion