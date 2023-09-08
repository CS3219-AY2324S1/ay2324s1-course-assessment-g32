import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import 'react-toastify/dist/ReactToastify.css';
import './QuestionList.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 100, headerClassName: 'theme--header' },
  { field: 'title', headerName: 'Title', width: 800, headerClassName: 'theme--header' },
  { field: 'difficulty', headerName: 'Difficulty', width: 200, headerClassName: 'theme--header' }
]

const QuestionList = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    // Dummy Data, to be replaced by Database when set up

    // Read data from cookies

    if (!Cookies.get('questions')) {
      Cookies.set('questions', JSON.stringify([]));
    }

    const cookieData = Cookies.get('questions');


    try {
      const parsedData = JSON.parse(cookieData);
      setTableData(parsedData);
    } catch (error) {
      console.error('Error parsing cookie data:', error);
    }
    // End of Dummy Data

  }, []);

  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate('/question/' + params.row.id);
  };

  const handleNewQuestionClick = () => {
    navigate('/new');
  };

  return (

    <Box bgcolor="#2d2d2d" sx={{ height: '80vh', width: '80%', borderRadius: '25px' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        onRowClick={handleRowClick}
        pageSize={12}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        rowHeight={60}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <h2>
                No Questions Found!
              </h2>
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <h2>
                Search Found No Questions!
              </h2>
            </Stack>
          )
        }}
        sx={{
          boxShadow: 2,
          border: 2,
          p: 2,
          borderRadius: '25px',
          '.MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            color: "white",
            fontWeight: 600,
          },
          '& .theme--header': {
            backgroundColor: 'rgba(white, 0.55)',
          },
        }}
      />

      <Button style={{ maxWidth: '110px', minWidth: '110px', float: 'right' }} variant="contained"
        sx={{ m: 2 }} onClick={handleNewQuestionClick} color="success" startIcon={<AddIcon />}>
        Add
      </Button>
    </Box>

  )
}

export default QuestionList;
